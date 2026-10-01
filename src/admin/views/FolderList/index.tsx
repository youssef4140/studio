import { DefaultTemplate } from '@payloadcms/next/templates'
import { renderListView } from '@payloadcms/next/views'
import { notFound, redirect } from 'next/navigation'
import type { AdminViewServerProps, CollectionSlug, ListQuery, Where } from 'payload'
import { formatAdminURL } from 'payload/shared'
import React from 'react'

import { getTenant } from '@/tenants'

import { FolderListFrame } from './Frame'

const COLLECTION_FOR = { pages: 'pages', articles: 'textEditor' } as const

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * Forces `clause` into every branch of a list `where`, in the `{ or: [{ and:
 * [...] }] }` shape the filter panel reads and writes. Any folder condition
 * that came back from the URL is replaced rather than added to, so the scope
 * can't be edited away and doesn't pile up as the list is searched or sorted.
 */
function scopeWhere(urlWhere: unknown, clause: Where): Where {
  const branches = isRecord(urlWhere) && Array.isArray(urlWhere.or) ? urlWhere.or : []
  const scoped = branches
    .filter((branch): branch is { and: Where[] } => isRecord(branch) && Array.isArray(branch.and))
    .map((branch) => ({
      and: [clause, ...branch.and.filter((condition) => !(isRecord(condition) && 'folder' in condition))],
    }))
  return { or: scoped.length > 0 ? scoped : [{ and: [clause] }] }
}

/**
 * /admin/<tenant>/<subfolder> and /admin/<tenant>/media. The stock collection
 * list (search, sort, columns, pagination), locked to one folder. Routes are
 * registered per tenant/subfolder from src/tenants.ts in src/payload.config.ts.
 */
export const FolderListView = async (props: AdminViewServerProps) => {
  const { initPageResult, params, searchParams } = props
  const { locale, permissions, req, visibleEntities } = initPageResult
  const { payload, user } = req
  const adminRoute = payload.config.routes.admin

  if (!user) redirect(formatAdminURL({ adminRoute, path: payload.config.admin.routes.login }))

  const segments = Array.isArray(params?.segments) ? params.segments : []
  const [tenantSlug, section] = segments
  const tenant = getTenant(tenantSlug)
  if (!tenant || !section) notFound()

  const { docs: folders } = await payload.find({
    collection: 'folders',
    depth: 0,
    limit: 1000,
    overrideAccess: true,
    where: { path: { like: tenant.slug } },
  })
  const idByPath = new Map(folders.map((folder) => [folder.path, folder.id]))

  let collection: CollectionSlug
  let clause: Where
  let title: string
  if (section === 'media') {
    const ids = [tenant.slug, ...tenant.subfolders.map((sub) => `${tenant.slug}/${sub.slug}`)]
      .map((path) => idByPath.get(path))
      .filter((id): id is number => typeof id === 'number')
    collection = 'media'
    title = 'Media'
    clause = { folder: { in: ids } }
  } else {
    const subfolder = tenant.subfolders.find((sub) => sub.slug === section)
    const folderId = idByPath.get(`${tenant.slug}/${section}`)
    if (!subfolder || !folderId) notFound()
    collection = COLLECTION_FOR[subfolder.contains]
    title = subfolder.name
    clause = { folder: { equals: folderId } }
  }

  const collectionConfig = payload.collections[collection]?.config
  if (!collectionConfig) notFound()

  const query = { ...req.query, where: scopeWhere(req.query?.where, clause) } as ListQuery

  const { List } = await renderListView({
    ...props,
    enableRowSelections: true,
    initPageResult: { ...initPageResult, collectionConfig },
    query,
    viewType: 'list',
  })

  return (
    <DefaultTemplate
      className={`${collection}-list`}
      collectionSlug={collection}
      i18n={req.i18n}
      locale={locale}
      params={params}
      payload={payload}
      permissions={permissions}
      req={req}
      searchParams={searchParams}
      user={user}
      viewType="list"
      visibleEntities={visibleEntities}
    >
      <FolderListFrame collection={collection} crumbs={[tenant.name, title]} title={title}>
        {List}
      </FolderListFrame>
    </DefaultTemplate>
  )
}
