import type { Payload } from 'payload'
import React from 'react'

import { TENANTS } from '@/tenants'

import { TenantNavLinksClient, type NavTenant } from './index.client'

const COLLECTION_FOR = { pages: 'pages', articles: 'textEditor' } as const

/**
 * One dropdown per tenant in the nav. Opening it lists the tenant's
 * subfolders (in the order src/tenants.ts gives them) and a Media entry; each
 * is a plain link to that collection's list, filtered to the folder.
 *
 * Registered as admin.components.beforeNavLinks in src/payload.config.ts.
 */
export const TenantNavLinks = async ({ payload }: { payload: Payload }) => {
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
        collection,
        query: `where[folder][equals]=${folderId}`,
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
      collection: 'media',
      query: `where[folder][in]=${folderIds.join(',')}`,
      count: mediaCount,
    })

    tenants.push({ slug: tenant.slug, name: tenant.name, links })
  }

  return <TenantNavLinksClient tenants={tenants} />
}
