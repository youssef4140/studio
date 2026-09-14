import type { CollectionBeforeValidateHook, Field } from 'payload'

/**
 * Shared by Pages and TextEditor: files a document into a (sub)folder and
 * derives which tenant (root folder) it belongs to. `tenant` is denormalized
 * — resolved once here rather than walked live at render/publish time —
 * because Phase 5's block-tenant validation hook needs it synchronously on
 * every save, and because it mirrors this codebase's existing pattern of
 * doing lookup work in hooks rather than at read time.
 */
export const folderScopeFields: Field[] = [
  {
    name: 'folder',
    type: 'relationship',
    relationTo: 'folders',
    required: true,
    hasMany: false,
    filterOptions: {
      isTenant: { equals: false },
    },
    admin: {
      position: 'sidebar',
      description: 'The subfolder this lives in (pages sit in a subfolder, not directly in a tenant).',
    },
  },
  {
    name: 'tenant',
    type: 'relationship',
    relationTo: 'folders',
    hasMany: false,
    admin: {
      position: 'sidebar',
      readOnly: true,
      description: 'Computed from folder — the root (tenant) folder.',
    },
  },
]

export const syncTenant: CollectionBeforeValidateHook = async ({ data, originalDoc, req }) => {
  if (!data) return data

  const folderValue = data.folder !== undefined ? data.folder : originalDoc?.folder
  const folderId =
    folderValue && typeof folderValue === 'object' ? (folderValue as { id: unknown }).id : folderValue

  if (!folderId) return data

  const folder = await req.payload.findByID({
    collection: 'folders',
    id: folderId as string | number,
    depth: 0,
    overrideAccess: true,
  })

  const tenantSlug = folder.path?.split('/')[0]
  if (!tenantSlug) return data

  const { docs } = await req.payload.find({
    collection: 'folders',
    where: { path: { equals: tenantSlug } },
    limit: 1,
    overrideAccess: true,
    depth: 0,
  })

  data.tenant = docs[0]?.id ?? null
  return data
}
