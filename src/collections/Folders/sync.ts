import type { Payload } from 'payload'

import { TENANTS } from '@/tenants'

async function upsertFolder(
  payload: Payload,
  args: { name: string; slug: string; path: string; parent: number | null },
): Promise<number> {
  const { docs } = await payload.find({
    collection: 'folders',
    where: { path: { equals: args.path } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  const existing = docs[0]
  if (!existing) {
    const created = await payload.create({
      collection: 'folders',
      data: { name: args.name, slug: args.slug, ...(args.parent ? { parent: args.parent } : {}) },
      overrideAccess: true,
    })
    return created.id
  }

  if (existing.name !== args.name) {
    await payload.update({
      collection: 'folders',
      id: existing.id,
      data: { name: args.name },
      overrideAccess: true,
    })
  }
  return existing.id
}

/**
 * Mirrors src/tenants.ts into the Folders collection on boot. Creates what's
 * missing and corrects names; never deletes. A folder that exists in the
 * database but not in code is only logged, because removing it would orphan
 * whatever is filed under it.
 */
export async function syncFolders(payload: Payload): Promise<void> {
  const expected = new Set<string>()

  for (const tenant of TENANTS) {
    try {
      expected.add(tenant.slug)
      const tenantId = await upsertFolder(payload, {
        name: tenant.name,
        slug: tenant.slug,
        path: tenant.slug,
        parent: null,
      })

      for (const subfolder of tenant.subfolders) {
        const path = `${tenant.slug}/${subfolder.slug}`
        expected.add(path)
        await upsertFolder(payload, { name: subfolder.name, slug: subfolder.slug, path, parent: tenantId })
      }
    } catch (err) {
      payload.logger.error({ err, msg: `Could not sync folders for tenant "${tenant.slug}"` })
    }
  }

  const { docs: all } = await payload.find({
    collection: 'folders',
    limit: 1000,
    depth: 0,
    overrideAccess: true,
  })
  const extras = all.filter((folder) => !expected.has(folder.path ?? '')).map((folder) => folder.path)
  if (extras.length > 0) {
    payload.logger.warn(
      `Folders in the database that are not in src/tenants.ts (left untouched): ${extras.join(', ')}`,
    )
  }
}
