import type { Payload } from 'payload'
import React from 'react'

import { TenantNavLinksClient, type TreeTenant } from './index.client'

const BUCKET_DEFS = [
  { label: 'Pages', collection: 'pages' as const, titleField: 'title' },
  { label: 'Articles', collection: 'textEditor' as const, titleField: 'title' },
  { label: 'Media', collection: 'media' as const, titleField: 'filename' },
]

/**
 * Surfaces the whole content tree in the nav itself, as an accordion:
 * tenant -> Pages/Articles/Media -> the subfolders that actually hold that
 * content type (services, programs, ...). Fetched once, server-side, so the
 * accordion is pure client-side expand/collapse over data that's already
 * there — no per-click loading state. Same underlying shape as
 * TenantContentTree (the folder edit view's own overview), just rendered as
 * nav rows instead of form content.
 *
 * Registered as admin.components.beforeNavLinks in src/payload.config.ts.
 */
export const TenantNavLinks = async ({ payload }: { payload: Payload }) => {
  const { docs: tenants } = await payload.find({
    collection: 'folders',
    where: { isTenant: { equals: true } },
    sort: 'name',
    depth: 0,
    limit: 100,
    overrideAccess: true,
  })

  const tree: TreeTenant[] = await Promise.all(
    tenants.map(async (tenant) => {
      const { docs: subfolders } = await payload.find({
        collection: 'folders',
        where: { parent: { equals: tenant.id } },
        sort: 'name',
        depth: 0,
        limit: 100,
        overrideAccess: true,
      })

      const buckets = await Promise.all(
        BUCKET_DEFS.map(async ({ label, collection, titleField }) => {
          const subfolderEntries = await Promise.all(
            subfolders.map(async (folder) => {
              const { docs } = await payload.find({
                collection,
                where: { folder: { equals: folder.id } },
                sort: titleField,
                depth: 0,
                limit: 100,
                overrideAccess: true,
              })
              return {
                folder: { id: folder.id, name: folder.name, slug: folder.slug },
                docs: docs.map((doc) => ({
                  id: doc.id as number,
                  title: ((doc as unknown as Record<string, unknown>)[titleField] as string) || `#${doc.id}`,
                })),
              }
            }),
          )
          return { label, subfolders: subfolderEntries.filter((entry) => entry.docs.length > 0) }
        }),
      )

      return { id: tenant.id, name: tenant.name, slug: tenant.slug, buckets }
    }),
  )

  return <TenantNavLinksClient tenants={tree} />
}
