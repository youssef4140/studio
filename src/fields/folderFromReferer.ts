import type { PayloadRequest } from 'payload'

import { getTenant, type SubfolderContent } from '@/tenants'

import { adminRefererSegments } from './adminReferer'

/**
 * Default folder for a new document, taken from the admin page the user came
 * from: "Create New" on /admin/ptofthecity/programs (or on its templates list,
 * /admin/ptofthecity/programs/templates) should start a page that is already
 * filed under Programs. Media created from /admin/<tenant>/media defaults to
 * the tenant's root folder. Anything else gets no default.
 */
export async function folderFromReferer(
  req: PayloadRequest | undefined,
  content: SubfolderContent | 'media',
): Promise<number | undefined> {
  const [tenantSlug, section] = adminRefererSegments(req)

  const tenant = getTenant(tenantSlug)
  if (!req || !tenant || !section) return undefined

  let path: string
  if (content === 'media') {
    if (section !== 'media') return undefined
    path = tenant.slug
  } else {
    const subfolder = tenant.subfolders.find((sub) => sub.slug === section)
    if (!subfolder || subfolder.contains !== content) return undefined
    path = `${tenant.slug}/${subfolder.slug}`
  }

  const { docs } = await req.payload.find({
    collection: 'folders',
    where: { path: { equals: path } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  return docs[0]?.id
}
