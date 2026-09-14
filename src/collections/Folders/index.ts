import type { CollectionConfig, Validate } from 'payload'

import { authenticated } from '@/access/authenticated'
import { superAdmin } from '@/access/superadmin'
import { compoundUniqueSlug } from '@/fields/compoundUnique'
import { applyThemeJSON, computeFolderPath } from './hooks'

const hexColor: Validate<string> = (value) =>
  !value || /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value) || 'Must be a hex color, e.g. #0D6E6E'

const paletteField = (name: string, label: string) => ({
  name,
  type: 'text' as const,
  label,
  validate: hexColor,
})

/**
 * The tenant/subfolder tree (§ Phase 2). A tenant IS a root folder (no
 * `parent`) — no separate Tenants collection. Subfolders are folders with a
 * parent, purely organizational. `parent`/`breadcrumbs` are injected by
 * nestedDocsPlugin (see src/plugins/index.ts), mirroring the same pattern
 * already proven on Categories.
 *
 * `path` is the render/storage address (e.g. `ptofthecity/services`) — NOT a
 * real public URL; Studio has no public frontend. Consumers fetch content
 * addressed by this path from their own separate apps.
 */
export const Folders: CollectionConfig = {
  slug: 'folders',
  labels: {
    singular: 'Folder',
    plural: 'Folders',
  },
  access: {
    create: superAdmin,
    update: superAdmin,
    delete: superAdmin,
    read: authenticated,
  },
  admin: {
    // `path`, not `name` — a bare name is ambiguous the moment two tenants
    // both have a same-named subfolder (compoundUniqueSlug only enforces
    // uniqueness WITHIN a parent, e.g. ptofthecity/services and tny/services
    // can both exist). This is what shows in the `folder` relationship
    // picker on Pages/TextEditor, in breadcrumbs, and in the doc header.
    useAsTitle: 'path',
    defaultColumns: ['name', 'path', 'isTenant'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
      validate: compoundUniqueSlug({ collection: 'folders', scopeField: 'parent' }),
      admin: {
        description: 'Used in the render/storage address — lowercase, no spaces.',
      },
    },
    {
      name: 'path',
      type: 'text',
      index: true,
      admin: {
        readOnly: true,
        description: 'Computed — the full folder chain, e.g. ptofthecity/services.',
      },
    },
    {
      name: 'isTenant',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        readOnly: true,
        description: 'Computed — true for a root folder (no parent), i.e. a tenant.',
      },
    },
    // A tenant (root folder) can only ever hold PAGES/ARTICLES indirectly —
    // folderScopeFields' `folder` field (src/fields/folderScope.ts) requires
    // a non-root folder, so a doc's `folder` can never equal a tenant's own
    // id. This tree fetches and groups everything from the tenant's
    // subfolders down, which the plain join fields below can't do (a join
    // is a flat, single-level "docs whose field X equals this doc's id" —
    // no recursion). Root-only.
    {
      name: 'contentOverview',
      type: 'ui',
      admin: {
        condition: (data) => !data?.parent,
        components: {
          Field: '@/admin/components/TenantContentTree#TenantContentTree',
        },
      },
    },
    // Virtual/computed — reverse lookups so a folder's own edit view shows
    // what's inside it ("subfolders and relevant media under it"). Not stored;
    // Payload resolves these live from each target collection's own scope
    // field. `on` must match the field name on the other side exactly.
    {
      name: 'subfolders',
      type: 'join',
      collection: 'folders',
      on: 'parent',
      admin: {
        defaultColumns: ['name', 'slug', 'path'],
      },
    },
    {
      name: 'pages',
      type: 'join',
      collection: 'pages',
      on: 'folder',
      admin: {
        // Always empty on a tenant/root — see contentOverview above, which
        // replaces this there with the real (recursive) picture.
        condition: (data) => Boolean(data?.parent),
        defaultColumns: ['title', 'slug', '_status'],
      },
    },
    {
      name: 'articles',
      type: 'join',
      collection: 'textEditor',
      on: 'folder',
      admin: {
        condition: (data) => Boolean(data?.parent),
        defaultColumns: ['title', 'slug', '_status'],
      },
    },
    {
      name: 'media',
      type: 'join',
      collection: 'media',
      on: 'folder',
      admin: {
        defaultColumns: ['filename', 'alt'],
      },
    },
    {
      name: 'theme',
      type: 'group',
      admin: {
        condition: (data) => !data?.parent,
        description: 'Typography and colour palette — set on the tenant (root folder) only.',
      },
      fields: [
        {
          name: 'typography',
          type: 'group',
          fields: [
            {
              name: 'fontFamily',
              type: 'select',
              defaultValue: 'system-ui',
              options: [
                { label: 'System default', value: 'system-ui' },
                { label: 'Inter', value: 'Inter' },
                { label: 'Merriweather', value: 'Merriweather' },
                { label: 'Poppins', value: 'Poppins' },
                { label: 'Lora', value: 'Lora' },
              ],
            },
          ],
        },
        {
          name: 'palette',
          type: 'group',
          fields: [
            paletteField('surface', 'Surface'),
            paletteField('muted', 'Muted'),
            paletteField('brand', 'Brand'),
            paletteField('onBrand', 'On brand'),
            paletteField('inverse', 'Inverse'),
            paletteField('onInverse', 'On inverse'),
            paletteField('border', 'Border'),
            paletteField('text', 'Text'),
          ],
        },
        {
          name: 'themeJSON',
          type: 'json',
          admin: {
            description:
              'Paste { "typography": {...}, "palette": {...} } to bulk-set the fields above. Cleared after import.',
          },
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [computeFolderPath, applyThemeJSON],
  },
}
