import type { Access, CollectionConfig, FieldAccess } from 'payload'

import { authenticated } from '../../access/authenticated'
import { superAdmin } from '../../access/superadmin'

// A regular admin can read/update only their own account; only a superadmin
// can create/delete accounts or touch anyone else's — src/access/superadmin.ts.
const superAdminOrSelf: Access = (args) => {
  const { req, id } = args
  return superAdmin(args) || req.user?.id === id
}

// Field-level access has a different args shape than collection-level access
// (no `id`, but `req` is still there) — a separate check, same rule.
const superAdminField: FieldAccess = ({ req }) => Boolean(req.user?.roles?.includes('superadmin'))

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: superAdmin,
    delete: superAdmin,
    read: superAdminOrSelf,
    update: superAdminOrSelf,
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['admin'],
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Superadmin', value: 'superadmin' },
      ],
      access: {
        // Only a superadmin can grant/revoke superadmin — a regular admin
        // can't elevate themselves even via a raw API call.
        update: superAdminField,
      },
      admin: {
        description: 'Superadmins manage other admin accounts, folders/tenants, and theming.',
      },
    },
  ],
  timestamps: true,
}
