import { APIError, type Block, type BlocksField, type CollectionBeforeValidateHook } from 'payload'

import { ALL_LAYOUT_BLOCKS } from './layoutBlocks'

/**
 * Single source of truth for "which tenant is this block tagged for" — reads
 * each block config's own `custom.studioTenant` (server-only metadata; see
 * src/blocks/articleFields.ts) so the tag lives in exactly one place, not duplicated here.
 * `undefined` = unrestricted, available to every tenant.
 */
const BLOCK_TENANT_TAGS: Record<string, string | undefined> = Object.fromEntries(
  ALL_LAYOUT_BLOCKS.map((block) => [
    block.slug,
    (block.custom as { studioTenant?: string } | undefined)?.studioTenant,
  ]),
)

/**
 * `filterOptions` for a `layout` blocks field: the picker only offers blocks
 * that are untagged or tagged for the document's own tenant. The tenant is
 * read from the chosen folder's path (its first segment) rather than from
 * `tenant`, which is only filled in on save. With no folder chosen yet, only
 * untagged blocks are offered.
 */
export function tenantBlockFilter(blocks: Block[]): NonNullable<BlocksField['filterOptions']> {
  return async ({ data, req }) => {
    const folderValue = (data as { folder?: unknown } | undefined)?.folder
    const folderId =
      folderValue && typeof folderValue === 'object'
        ? (folderValue as { id: unknown }).id
        : folderValue

    let tenantSlug: string | undefined
    if (folderId) {
      try {
        const folder = await req.payload.findByID({
          collection: 'folders',
          id: folderId as string | number,
          depth: 0,
          overrideAccess: true,
        })
        tenantSlug = folder.path?.split('/')[0]
      } catch {
        tenantSlug = undefined
      }
    }

    return blocks
      .map((block) => block.slug)
      .filter((slug) => !BLOCK_TENANT_TAGS[slug] || BLOCK_TENANT_TAGS[slug] === tenantSlug)
  }
}

function collectFromLayout(layout: unknown): string[] {
  if (!Array.isArray(layout)) return []
  return layout
    .map((block) =>
      block && typeof block === 'object' ? (block as { blockType?: string }).blockType : undefined,
    )
    .filter((blockType): blockType is string => Boolean(blockType))
}

/**
 * Rejects a save if it contains a block tagged for a DIFFERENT tenant than the
 * document's own. Hard-reject, not a silent pass-through — a tenant-mismatched
 * block that silently published would be a worse failure mode than a blocked
 * save. Must run AFTER syncTenant (src/fields/folderScope.ts) in the
 * beforeValidate array — needs data.tenant already resolved.
 *
 * There is no live "assign a block to a folder" superadmin UI yet — the canvas
 * that would provide that doesn't exist (later in this project's build order).
 * Tagging a block to a tenant today is a code change + deploy. The picker is
 * filtered separately by tenantBlockFilter above; this hook is the backstop.
 */
export const validateBlockTenants: CollectionBeforeValidateHook = async ({ data, req }) => {
  if (!data) return data

  const blockTypes = collectFromLayout(data.layout)
  const tagged = blockTypes
    .map((blockType) => ({ blockType, tenant: BLOCK_TENANT_TAGS[blockType] }))
    .filter((entry): entry is { blockType: string; tenant: string } => Boolean(entry.tenant))

  if (tagged.length === 0) return data

  const tenantValue = data.tenant
  const tenantId =
    tenantValue && typeof tenantValue === 'object'
      ? (tenantValue as { id: unknown }).id
      : tenantValue

  const tenantSlug = tenantId
    ? (
        await req.payload.findByID({
          collection: 'folders',
          id: tenantId as string | number,
          depth: 0,
          overrideAccess: true,
        })
      ).slug
    : null

  const mismatch = tagged.find((entry) => entry.tenant !== tenantSlug)
  if (mismatch) {
    // isPublic: true — otherwise Payload hides the message behind a generic
    // "Something went wrong." (its default for non-Payload error classes).
    throw new APIError(
      `The "${mismatch.blockType}" block is only available to the "${mismatch.tenant}" tenant, ` +
        `but this document belongs to ${tenantSlug ? `"${tenantSlug}"` : 'a different (or no) tenant'}.`,
      400,
      undefined,
      true,
    )
  }

  return data
}
