import React from 'react'

import { buildAiPrompt } from '@/import/aiPrompt'
import { importableBlocksFor } from '@/import/importableBlocks'
import { getTenant } from '@/tenants'

import { ImportPageModalClient } from './index.client'

/**
 * The "Import Page JSON" / "Import Article JSON" button above the Pages and
 * Articles lists. Shown only on a subfolder's list (/admin/<tenant>/<subfolder>),
 * which fixes the folder the document is imported into, whether it is a page or
 * an article (the folder's `contains`), and the components the copied AI prompt
 * lists. Renders nothing anywhere else (the stock /admin/collections/... lists,
 * templates), or for a tenant that has no components of that kind.
 */
export const ImportPageModal = ({ params }: { params?: { segments?: string[] } }) => {
  const [tenantSlug, section, sub] = params?.segments ?? []
  const tenant = getTenant(tenantSlug)
  const subfolder = tenant?.subfolders.find((entry) => entry.slug === section)
  if (!tenant || !subfolder || sub) return null
  const content = subfolder.contains
  if (importableBlocksFor(tenant.slug, content).length === 0) return null

  return (
    <ImportPageModalClient
      aiPrompt={buildAiPrompt({
        tenantSlug: tenant.slug,
        tenantName: tenant.name,
        folderName: subfolder.name,
        folderSlug: subfolder.slug,
        content,
      })}
      content={content}
      folderLabel={`${tenant.name} / ${subfolder.name}`}
      folderPath={`${tenant.slug}/${subfolder.slug}`}
    />
  )
}
