import type { Payload } from 'payload'
import React from 'react'

import { TenantNavLinksClient } from './index.client'

/**
 * Surfaces each tenant (root Folder — ptofthecity, tny, ...) as its own nav
 * link, above the generic collections list — clicking one goes straight to
 * that folder's edit view, which already lists its subfolders/pages/
 * articles/media via the join fields on src/collections/Folders/index.ts.
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

  return (
    <TenantNavLinksClient
      tenants={tenants.map((tenant) => ({ id: tenant.id, name: tenant.name, slug: tenant.slug }))}
    />
  )
}
