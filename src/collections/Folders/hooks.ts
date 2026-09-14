import { APIError, type CollectionBeforeValidateHook } from 'payload'

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

/**
 * The JSON-paste theming path. Merges a pasted { typography, palette } object
 * into the structured fields, then clears themeJSON — the structured fields
 * (with their own per-field validators: select options, hex regex) stay the
 * single source of truth, and their normal validation runs right after this
 * (beforeValidate happens before field validation), so a malformed paste is
 * still caught, just by the same rules the GUI fields already enforce.
 */
export const applyThemeJSON: CollectionBeforeValidateHook = ({ data }) => {
  const raw = data?.theme?.themeJSON
  if (!raw) return data

  let parsed: { typography?: Record<string, unknown>; palette?: Record<string, unknown> }
  try {
    parsed = typeof raw === 'string' ? JSON.parse(raw) : (raw as typeof parsed)
  } catch {
    throw new APIError('Theme JSON is not valid JSON.', 400, undefined, true)
  }

  data.theme = {
    ...data.theme,
    typography: { ...data.theme?.typography, ...parsed.typography },
    palette: { ...data.theme?.palette, ...parsed.palette },
    themeJSON: null,
  }
  return data
}
