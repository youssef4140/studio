import type { Access, CollectionConfig } from 'payload'

import { generateKey } from '@/import/auth'
import { buildTeamGuide } from '@/import/guideTemplate'
import { TENANTS, folderPathsFor, getTenant, type TenantSlug } from '@/tenants'
import { getServerSideURL } from '@/utilities/getURL'

const DAY_MS = 24 * 60 * 60 * 1000
const MAX_DAYS = 365

/** "PT of the City / Services" for a page folder path, for the admin and the guide. */
const folderLabel = (path: string) => {
  const [tenantSlug, subSlug] = path.split('/')
  const tenant = getTenant(tenantSlug)
  const sub = tenant?.subfolders.find((entry) => entry.slug === subSlug)
  return `${tenant?.name ?? tenantSlug} / ${sub?.name ?? subSlug}`
}

/** A superadmin manages every key; any other admin only the ones they made. */
const ownKeys: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.roles?.includes('superadmin')) return true
  return { createdBy: { equals: user.id } }
}

/**
 * Keys for the import API (src/app/api/import): what a content team's AI
 * authenticates with. Each is limited to the page folders chosen when it was
 * made (all within one tenant), expires and can be revoked. Any admin can make
 * one. A key can only be made through POST /api/importKeys/generate (the
 * "New key" button on the list), because the plaintext is shown once and only
 * its hash is stored (src/import/auth.ts); the stock create form is off.
 */
export const ImportKeys: CollectionConfig = {
  slug: 'importKeys',
  labels: { singular: 'Import key', plural: 'Import keys' },
  access: {
    create: () => false,
    read: ownKeys,
    update: ownKeys,
    delete: ownKeys,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'folders', 'expiresAt', 'lastUsedAt', 'revokedAt'],
    description:
      'Keys content teams give their AI so it can create, edit and publish pages. Each is limited to the folders it was made for and expires.',
    components: {
      beforeListTable: ['@/admin/components/ImportKeyModal#ImportKeyModal'],
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Who it is for, e.g. "PTOC programs team".' },
    },
    {
      name: 'folders',
      type: 'select',
      hasMany: true,
      required: true,
      options: folderPathsFor('pages').map((path) => ({ label: folderLabel(path), value: path })),
      admin: {
        readOnly: true,
        description: 'The only folders this key can create, edit or read pages in.',
      },
    },
    {
      name: 'tenant',
      type: 'select',
      required: true,
      options: TENANTS.map((tenant) => ({ label: tenant.name, value: tenant.slug })),
      admin: { readOnly: true, description: 'The tenant those folders belong to.' },
    },
    {
      name: 'keyPrefix',
      type: 'text',
      admin: { readOnly: true, description: 'The start of the key, to tell keys apart.' },
    },
    {
      name: 'keyHash',
      type: 'text',
      index: true,
      access: { read: () => false },
      admin: { hidden: true },
    },
    {
      name: 'expiresAt',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        description: 'The key stops working at this time.',
      },
    },
    {
      name: 'revokedAt',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Set a date to switch the key off now.',
      },
    },
    {
      name: 'canDelete',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Lets the key delete pages. Without it the AI can only unpublish.' },
    },
    { name: 'lastUsedAt', type: 'date', admin: { readOnly: true } },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true, position: 'sidebar' },
    },
  ],
  endpoints: [
    {
      path: '/generate',
      method: 'post',
      handler: async (req) => {
        if (!req.user) return Response.json({ error: 'Not logged in.' }, { status: 401 })

        const body = (await req.json?.()) as {
          name?: string
          folders?: string[]
          days?: number
          canDelete?: boolean
        }
        const name = body?.name?.trim()
        if (!name) return Response.json({ error: 'Give the key a name.' }, { status: 400 })

        const valid = folderPathsFor('pages')
        const folders = [...new Set(body?.folders ?? [])]
        if (folders.length === 0) {
          return Response.json({ error: 'Choose at least one folder.' }, { status: 400 })
        }
        if (folders.some((path) => !valid.includes(path))) {
          return Response.json({ error: 'One of those is not a page folder.' }, { status: 400 })
        }
        const tenantSlug = folders[0].split('/')[0]
        if (folders.some((path) => path.split('/')[0] !== tenantSlug)) {
          return Response.json({ error: 'A key can only cover folders of one tenant.' }, { status: 400 })
        }
        const tenant = getTenant(tenantSlug)

        const days = Math.min(Math.max(Math.round(Number(body?.days) || 90), 1), MAX_DAYS)
        const { key, keyHash, keyPrefix } = generateKey()
        const expiresAt = new Date(Date.now() + days * DAY_MS)
        await req.payload.create({
          collection: 'importKeys',
          data: {
            name,
            folders: folders as never,
            tenant: tenantSlug as TenantSlug,
            keyHash,
            keyPrefix,
            expiresAt: expiresAt.toISOString(),
            canDelete: Boolean(body?.canDelete),
            createdBy: req.user.id,
          },
          overrideAccess: true,
        })

        return Response.json({
          keyPrefix,
          expiresAt: expiresAt.toISOString(),
          guide: buildTeamGuide({
            serverURL: getServerSideURL(),
            key,
            tenantSlug,
            tenantName: tenant?.name ?? tenantSlug,
            folders: folders.map((path) => ({ path, label: folderLabel(path) })),
            expiresAt,
            canDelete: Boolean(body?.canDelete),
          }),
        })
      },
    },
  ],
  timestamps: true,
}
