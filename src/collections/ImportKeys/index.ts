import type { CollectionConfig } from 'payload'

import { superAdmin } from '@/access/superadmin'
import { generateKey } from '@/import/auth'
import { buildTeamGuide } from '@/import/guideTemplate'
import { TENANTS, getTenant, type TenantSlug } from '@/tenants'
import { getServerSideURL } from '@/utilities/getURL'

const DAY_MS = 24 * 60 * 60 * 1000
const MAX_DAYS = 365

/**
 * Keys for the import API (src/app/api/import): what a content team's AI
 * authenticates with. Scoped to one tenant, expiring, revocable. Superadmin
 * only. A key can only be made through POST /api/importKeys/generate (the
 * "New key" button on the list), because the plaintext is shown once and only
 * its hash is stored (src/import/auth.ts); the stock create form is off.
 */
export const ImportKeys: CollectionConfig = {
  slug: 'importKeys',
  labels: { singular: 'Import key', plural: 'Import keys' },
  access: {
    create: () => false,
    read: superAdmin,
    update: superAdmin,
    delete: superAdmin,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'tenant', 'expiresAt', 'lastUsedAt', 'revokedAt'],
    hidden: ({ user }) => !user?.roles?.includes('superadmin'),
    description:
      'Keys content teams give their AI so it can create, edit and publish pages. Each is limited to one tenant and expires.',
    components: {
      beforeListTable: ['@/admin/components/ImportKeyModal#ImportKeyModal'],
    },
  },
  fields: [
    { name: 'name', type: 'text', required: true, admin: { description: 'Who it is for, e.g. "PTOC content team".' } },
    {
      name: 'tenant',
      type: 'select',
      required: true,
      options: TENANTS.map((tenant) => ({ label: tenant.name, value: tenant.slug })),
      admin: { readOnly: true, description: 'The only tenant this key can touch.' },
    },
    { name: 'keyPrefix', type: 'text', admin: { readOnly: true, description: 'The start of the key, to tell keys apart.' } },
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
      admin: { date: { pickerAppearance: 'dayAndTime' }, description: 'The key stops working at this time.' },
    },
    {
      name: 'revokedAt',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' }, description: 'Set a date to switch the key off now.' },
    },
    {
      name: 'canDelete',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Lets the key delete pages. Without it the AI can only unpublish.' },
    },
    { name: 'lastUsedAt', type: 'date', admin: { readOnly: true } },
  ],
  endpoints: [
    {
      path: '/generate',
      method: 'post',
      handler: async (req) => {
        if (!req.user?.roles?.includes('superadmin')) {
          return Response.json({ error: 'Only a superadmin can create keys.' }, { status: 403 })
        }
        const body = (await req.json?.()) as {
          name?: string
          tenant?: string
          days?: number
          canDelete?: boolean
        }
        const tenant = getTenant(body?.tenant)
        const name = body?.name?.trim()
        if (!tenant) return Response.json({ error: 'Choose a tenant.' }, { status: 400 })
        if (!name) return Response.json({ error: 'Give the key a name.' }, { status: 400 })
        const days = Math.min(Math.max(Math.round(Number(body?.days) || 90), 1), MAX_DAYS)

        const { key, keyHash, keyPrefix } = generateKey()
        const expiresAt = new Date(Date.now() + days * DAY_MS)
        await req.payload.create({
          collection: 'importKeys',
          data: {
            name,
            tenant: tenant.slug as TenantSlug,
            keyHash,
            keyPrefix,
            expiresAt: expiresAt.toISOString(),
            canDelete: Boolean(body?.canDelete),
          },
          overrideAccess: true,
        })

        return Response.json({
          keyPrefix,
          expiresAt: expiresAt.toISOString(),
          guide: buildTeamGuide({
            serverURL: getServerSideURL(),
            key,
            tenantSlug: tenant.slug,
            tenantName: tenant.name,
            expiresAt,
            canDelete: Boolean(body?.canDelete),
          }),
        })
      },
    },
  ],
  timestamps: true,
}
