import React from 'react'

import { buildAiPrompt } from '@/import/aiPrompt'
import { getTenant } from '@/tenants'

import { ImportPageModalClient } from './index.client'

/**
 * The "Import Page JSON" button above the Pages list. Shown only on a page
 * subfolder's list (/admin/<tenant>/<subfolder>), which fixes the folder the
 * page is imported into and the components the copied AI prompt lists. Renders
 * nothing anywhere else (the stock /admin/collections/pages list, templates).
 */
export const ImportPageModal = ({ params }: { params?: { segments?: string[] } }) => {
  const [tenantSlug, section, sub] = params?.segments ?? []
  const tenant = getTenant(tenantSlug)
  const subfolder = tenant?.subfolders.find((entry) => entry.slug === section)
  if (!tenant || !subfolder || subfolder.contains !== 'pages' || sub) return null

  return (
    <ImportPageModalClient
      aiPrompt={buildAiPrompt({
        tenantSlug: tenant.slug,
        tenantName: tenant.name,
        folderName: subfolder.name,
        folderSlug: subfolder.slug,
      })}
      folderLabel={`${tenant.name} / ${subfolder.name}`}
      folderPath={`${tenant.slug}/${subfolder.slug}`}
    />
  )
}
