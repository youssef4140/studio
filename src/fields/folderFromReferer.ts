import type { PayloadRequest } from 'payload'

import { getTenant, type SubfolderContent } from '@/tenants'

/**
 * Default folder for a new document, taken from the admin page the user came
 * from: "Create New" on /admin/ptofthecity/programs should start a page that
 * is already filed under Programs. Media created from /admin/<tenant>/media
 * defaults to the tenant's root folder. Anything else gets no default.
 */
export async function folderFromReferer(
  req: PayloadRequest | undefined,
  content: SubfolderContent | 'media',
): Promise<number | undefined> {
  const referer = req?.headers?.get('referer')
  if (!req || !referer) return undefined

  let pathname: string
  try {
    pathname = new URL(referer).pathname
  } catch {
    return undefined
  }

  const adminRoute = req.payload.config.routes.admin
  if (!pathname.startsWith(`${adminRoute}/`)) return undefined
  const [tenantSlug, section] = pathname.slice(adminRoute.length + 1).split('/')

  const tenant = getTenant(tenantSlug)
  if (!tenant || !section) return undefined

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
