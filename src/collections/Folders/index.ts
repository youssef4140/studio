import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { compoundUniqueSlug } from '@/fields/compoundUnique'
import { computeFolderPath } from './hooks'

const nobody = () => false

/**
 * The tenant/subfolder tree. A tenant IS a root folder (no `parent`);
 * subfolders are folders with a parent. `parent`/`breadcrumbs` are injected by
 * nestedDocsPlugin (see src/plugins/index.ts).
 *
 * Read-only in the admin and over the API: the tree is defined in
 * src/tenants.ts and mirrored into this collection on boot (./sync.ts), which
 * writes with overrideAccess. The rows exist so Pages/Articles/Media can
 * relate to a folder by id.
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
    create: nobody,
    update: nobody,
    delete: nobody,
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
  ],
  hooks: {
    beforeValidate: [computeFolderPath],
  },
}
