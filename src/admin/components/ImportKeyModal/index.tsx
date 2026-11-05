import React from 'react'

import { TENANTS } from '@/tenants'

import { ImportKeyModalClient } from './index.client'

/**
 * "New key" above the Import keys list (src/collections/ImportKeys): makes a
 * scoped, expiring key and the ready-to-send guide file for a content team's AI.
 */
export const ImportKeyModal = () => (
  <ImportKeyModalClient tenants={TENANTS.map((tenant) => ({ slug: tenant.slug, name: tenant.name }))} />
)
