import type { CollectionBeforeValidateHook } from 'payload'

/**
 * Computes `path` (the full ancestor chain, e.g. `ptofthecity/services`) and
 * `isTenant` (`true` for root/no-parent folders). Separate from
 * nestedDocsPlugin's own `breadcrumbs` (an admin-UI label concern) — this is
 * our own indexed field for O(1) reverse lookup in the render route.
 */
export const computeFolderPath: CollectionBeforeValidateHook = async ({
  data,
  originalDoc,
  req,
}) => {
  if (!data) return data

  const parentValue = data.parent !== undefined ? data.parent : originalDoc?.parent
  const parentId =
    parentValue && typeof parentValue === 'object' ? (parentValue as { id: unknown }).id : parentValue
  const slug = data.slug ?? originalDoc?.slug

  if (!parentId) {
    data.path = slug
    data.isTenant = true
    return data
  }

  const parent = await req.payload.findByID({
    collection: 'folders',
    id: parentId as string | number,
    depth: 0,
    overrideAccess: true,
  })
  data.path = `${parent.path}/${slug}`
  data.isTenant = false
  return data
}
