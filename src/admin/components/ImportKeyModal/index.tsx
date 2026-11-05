import React from 'react'

import { TENANTS } from '@/tenants'

import { ImportKeyModalClient } from './index.client'

/**
 * "New key" above the Import keys list (src/collections/ImportKeys): makes an
 * expiring key limited to the page folders you tick, and the ready-to-send
 * guide file for a content team's AI.
 */
export const ImportKeyModal = () => (
  <ImportKeyModalClient
    tenants={TENANTS.map((tenant) => ({
      slug: tenant.slug,
      name: tenant.name,
      folders: tenant.subfolders
        .filter((sub) => sub.contains === 'pages')
        .map((sub) => ({ path: `${tenant.slug}/${sub.slug}`, name: sub.name })),
    })).filter((tenant) => tenant.folders.length > 0)}
  />
)
