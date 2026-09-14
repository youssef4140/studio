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
 * tenant -> Pages/Articles/Media -> every subfolder (services, programs,
 * ...), each with a doc count for that content type. Fetched once,
 * server-side, so the accordion is pure client-side expand/collapse over
 * data that's already there — no per-click loading state.
 *
 * Deliberately does NOT hide a subfolder from a bucket just because it has
 * zero docs of that type yet — a subfolder isn't restricted to one content
 * type (nothing stops "services" from holding an article too), and hiding
 * it would mean there's no way to navigate to a brand-new subfolder before
 * it has its first page/article/media in it.
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
          return { label, collection, subfolders: subfolderEntries }
        }),
      )

      return { id: tenant.id, name: tenant.name, slug: tenant.slug, buckets }
    }),
  )

  return <TenantNavLinksClient tenants={tree} />
}
