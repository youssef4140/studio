import type { Validate } from 'payload'

/**
 * A `slug` unique WITHIN a scope field (e.g. within a `parent` folder, or
 * within a `folder`) rather than globally. `unique: true` on the field itself
 * is a real single-column DB constraint and must be left OFF when using this —
 * it would still block two scopes from ever sharing a slug.
 *
 * Shared by Folders (slug unique within `parent`) and Pages/TextEditor (slug
 * unique within `folder`).
 */
export function compoundUniqueSlug({
  collection,
  scopeField,
}: {
  collection: 'folders' | 'pages' | 'textEditor'
  scopeField: string
}): Validate<string> {
  return async (value, { req, data, id }) => {
    if (!value) return true

    const rawScope = (data as Record<string, unknown> | undefined)?.[scopeField]
    const scopeId =
      rawScope && typeof rawScope === 'object' && 'id' in rawScope
        ? (rawScope as { id: unknown }).id
        : (rawScope ?? null)

    const conflicts = await req.payload.find({
      collection,
      where: {
        and: [
          { slug: { equals: value } },
          scopeId == null ? { [scopeField]: { exists: false } } : { [scopeField]: { equals: scopeId } },
          ...(id ? [{ id: { not_equals: id } }] : []),
        ],
      },
      limit: 1,
      overrideAccess: true,
      depth: 0,
    })

    return (
      conflicts.totalDocs === 0 ||
      `"${value}" is already used by another item in the same ${scopeField === 'parent' ? 'folder' : scopeField}.`
    )
  }
}
