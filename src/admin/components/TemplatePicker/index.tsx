import type { Payload, ServerProps } from 'payload'
import { formatAdminURL } from 'payload/shared'
import React from 'react'

import { TEMPLATES_SEGMENT } from '@/fields/template'
import { getTenant } from '@/tenants'

import { TemplatePickerClient, TemplatesNote, type TemplateSummary } from './index.client'

/**
 * The `Description` slot of the Pages and Articles lists: under the heading of
 * a subfolder list (/admin/<tenant>/<subfolder>) it is the "Create New" button,
 * which asks whether to start blank or from one of the folder's templates
 * (src/fields/template.ts). The stock button is hidden there by FolderListFrame.
 * On the folder's templates list it explains what templates are. Anywhere else
 * (e.g. /admin/collections/pages) it renders nothing.
 */
export const TemplatePicker = async ({
  collectionConfig,
  params,
  payload,
}: ServerProps & {
  collectionConfig?: { slug: string }
  params?: { segments?: string[] }
  payload: Payload
}) => {
  const [tenantSlug, section, sub] = params?.segments ?? []
  const tenant = getTenant(tenantSlug)
  const subfolder = tenant?.subfolders.find((entry) => entry.slug === section)
  const collection = collectionConfig?.slug
  if (!tenant || !subfolder || (collection !== 'pages' && collection !== 'textEditor')) return null

  const adminRoute = payload.config.routes.admin
  const folderURL = formatAdminURL({ adminRoute, path: `/${tenant.slug}/${subfolder.slug}` })
  const noun = subfolder.contains === 'pages' ? 'page' : 'article'

  if (sub === TEMPLATES_SEGMENT) {
    return <TemplatesNote folderName={subfolder.name} folderURL={folderURL} noun={noun} />
  }
  if (sub) return null

  const { docs: folders } = await payload.find({
    collection: 'folders',
    where: { path: { equals: `${tenant.slug}/${subfolder.slug}` } },
    depth: 0,
    limit: 1,
    overrideAccess: true,
  })
  const folderId = folders[0]?.id

  const { docs } = folderId
    ? await payload.find({
        collection,
        where: { and: [{ folder: { equals: folderId } }, { isTemplate: { equals: true } }] },
        depth: 0,
        draft: true,
        limit: 100,
        overrideAccess: true,
        sort: 'title',
        select: { title: true, layout: true },
      })
    : { docs: [] }

  const templates: TemplateSummary[] = docs.map((doc) => ({
    id: doc.id,
    title: doc.title || 'Untitled template',
    components: doc.layout?.length ?? 0,
  }))

  return (
    <TemplatePickerClient
      blankURL={formatAdminURL({ adminRoute, path: `/collections/${collection}/create` })}
      collection={collection}
      folderName={subfolder.name}
      manageURL={`${folderURL}/${TEMPLATES_SEGMENT}`}
      noun={noun}
      templates={templates}
    />
  )
}
