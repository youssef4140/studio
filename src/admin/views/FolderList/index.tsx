import { DefaultTemplate } from '@payloadcms/next/templates'
import { renderListView } from '@payloadcms/next/views'
import { notFound, redirect } from 'next/navigation'
import type { AdminViewServerProps, CollectionSlug, ListQuery, Where } from 'payload'
import { formatAdminURL } from 'payload/shared'
import React from 'react'

import { notTemplate, TEMPLATES_SEGMENT } from '@/fields/template'
import { getTenant } from '@/tenants'

import { FolderListFrame } from './Frame'

const COLLECTION_FOR = { pages: 'pages', articles: 'textEditor' } as const

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/** The fields the scope is made of; conditions on them from the URL are the scope coming back. */
const SCOPE_FIELDS = ['folder', 'isTemplate']

/**
 * Forces the scope `clauses` into every branch of a list `where`, in the `{ or:
 * [{ and: [...] }] }` shape the filter panel reads and writes. Any folder or
 * template condition that came back from the URL is replaced rather than added
 * to, so the scope can't be edited away and doesn't pile up as the list is
 * searched or sorted.
 */
function scopeWhere(urlWhere: unknown, clauses: Where[]): Where {
  const branches = isRecord(urlWhere) && Array.isArray(urlWhere.or) ? urlWhere.or : []
  const scoped = branches
    .filter((branch): branch is { and: Where[] } => isRecord(branch) && Array.isArray(branch.and))
    .map((branch) => ({
      and: [
        ...clauses,
        ...branch.and.filter(
          (condition) => !(isRecord(condition) && SCOPE_FIELDS.some((field) => field in condition)),
        ),
      ],
    }))
  return { or: scoped.length > 0 ? scoped : [{ and: clauses }] }
}

/**
 * /admin/<tenant>/<subfolder>, /admin/<tenant>/<subfolder>/templates and
 * /admin/<tenant>/media. The stock collection list (search, sort, columns,
 * pagination), locked to one folder: a subfolder's documents, or its templates
 * (src/fields/template.ts). Routes are registered per tenant/subfolder from
 * src/tenants.ts in src/payload.config.ts.
 */
export const FolderListView = async (props: AdminViewServerProps) => {
  const { initPageResult, params, searchParams } = props
  const { locale, permissions, req, visibleEntities } = initPageResult
  const { payload, user } = req
  const adminRoute = payload.config.routes.admin

  if (!user) redirect(formatAdminURL({ adminRoute, path: payload.config.admin.routes.login }))

  const segments = Array.isArray(params?.segments) ? params.segments : []
  const [tenantSlug, section, sub] = segments
  const tenant = getTenant(tenantSlug)
  if (!tenant || !section) notFound()
  const templates = sub === TEMPLATES_SEGMENT
  if (sub && (!templates || section === 'media')) notFound()

  const { docs: folders } = await payload.find({
    collection: 'folders',
    depth: 0,
    limit: 1000,
    overrideAccess: true,
    where: { path: { like: tenant.slug } },
  })
  const idByPath = new Map(folders.map((folder) => [folder.path, folder.id]))

  let collection: CollectionSlug
  let clauses: Where[]
  let title: string
  let crumbs = [tenant.name]
  if (section === 'media') {
    const ids = [tenant.slug, ...tenant.subfolders.map((sub) => `${tenant.slug}/${sub.slug}`)]
      .map((path) => idByPath.get(path))
      .filter((id): id is number => typeof id === 'number')
    collection = 'media'
    title = 'Media'
    crumbs = [...crumbs, title]
    clauses = [{ folder: { in: ids } }]
  } else {
    const subfolder = tenant.subfolders.find((sub) => sub.slug === section)
    const folderId = idByPath.get(`${tenant.slug}/${section}`)
    if (!subfolder || !folderId) notFound()
    collection = COLLECTION_FOR[subfolder.contains]
    title = templates ? `${subfolder.name} templates` : subfolder.name
    crumbs = templates ? [...crumbs, subfolder.name, 'Templates'] : [...crumbs, title]
    clauses = [
      { folder: { equals: folderId } },
      templates ? { isTemplate: { equals: true } } : notTemplate,
    ]
  }

  const collectionConfig = payload.collections[collection]?.config
  if (!collectionConfig) notFound()

  const query = { ...req.query, where: scopeWhere(req.query?.where, clauses) } as ListQuery

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
      <FolderListFrame
        collection={collection}
        crumbs={crumbs}
        templatePicker={section !== 'media' && !templates}
        title={title}
      >
        {List}
      </FolderListFrame>
    </DefaultTemplate>
  )
}
