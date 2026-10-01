import type { Payload, TypedUser } from 'payload'
import React from 'react'

import { TENANTS } from '@/tenants'

import { TenantNavLinksClient, type NavTenant } from './index.client'
import { TENANT_NAV_PREFERENCE } from './preference'

const COLLECTION_FOR = { pages: 'pages', articles: 'textEditor' } as const

/**
 * One dropdown per tenant in the nav. Opening it lists the tenant's
 * subfolders (in the order src/tenants.ts gives them) and a Media entry; each
 * links to its own page under the tenant, e.g. /admin/ptofthecity/services
 * (src/admin/views/FolderList).
 *
 * Registered as admin.components.beforeNavLinks in src/payload.config.ts.
 */
export const TenantNavLinks = async ({ payload, user }: { payload: Payload; user?: TypedUser }) => {
  // Which dropdowns this user left open — read here so the nav renders in the
  // right state straight away instead of opening after the page loads.
  const savedOpen = user
    ? await payload
        .find({
          collection: 'payload-preferences',
          depth: 0,
          limit: 1,
          pagination: false,
          overrideAccess: true,
          where: {
            and: [
              { key: { equals: TENANT_NAV_PREFERENCE } },
              { 'user.relationTo': { equals: user.collection } },
              { 'user.value': { equals: user.id } },
            ],
          },
        })
        .then((res) => (res.docs[0]?.value as { open?: Record<string, boolean> } | undefined)?.open)
    : undefined

  const { docs: folders } = await payload.find({
    collection: 'folders',
    depth: 0,
    limit: 1000,
    overrideAccess: true,
  })
  const idByPath = new Map(folders.map((folder) => [folder.path, folder.id]))

  const tenants: NavTenant[] = []
  for (const tenant of TENANTS) {
    const tenantId = idByPath.get(tenant.slug)
    if (!tenantId) continue

    const links: NavTenant['links'] = []
    const folderIds = [tenantId]

    for (const subfolder of tenant.subfolders) {
      const folderId = idByPath.get(`${tenant.slug}/${subfolder.slug}`)
      if (!folderId) continue
      folderIds.push(folderId)

      const collection = COLLECTION_FOR[subfolder.contains]
      const { totalDocs } = await payload.count({
        collection,
        where: { folder: { equals: folderId } },
        overrideAccess: true,
      })
      links.push({
        key: subfolder.slug,
        label: subfolder.name,
        path: `/${tenant.slug}/${subfolder.slug}`,
        count: totalDocs,
      })
    }

    const { totalDocs: mediaCount } = await payload.count({
      collection: 'media',
      where: { folder: { in: folderIds } },
      overrideAccess: true,
    })
    links.push({
      key: 'media',
      label: 'Media',
      path: `/${tenant.slug}/media`,
      count: mediaCount,
    })

    tenants.push({ slug: tenant.slug, name: tenant.name, links })
  }

  return <TenantNavLinksClient initiallyOpen={savedOpen ?? {}} tenants={tenants} />
}
