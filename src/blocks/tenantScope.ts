import { APIError, type CollectionBeforeValidateHook } from 'payload'

import { Hero } from './Hero'
import { Faq } from './Faq'
import { FaqTny } from './FaqTny'
import { EntityList } from './EntityList'
import { Content } from './Content'

/**
 * Single source of truth for "which tenant is this block tagged for" — reads
 * each block config's own `custom.studioTenant` (server-only metadata; see
 * FaqTny.ts) so the tag lives in exactly one place, not duplicated here.
 * `undefined` = unrestricted, available to every tenant.
 */
const BLOCK_TENANT_TAGS: Record<string, string | undefined> = Object.fromEntries(
  [Hero, Faq, FaqTny, EntityList, Content].map((block) => [
    block.slug,
    (block.custom as { studioTenant?: string } | undefined)?.studioTenant,
  ]),
)

function collectFromLayout(layout: unknown): string[] {
  if (!Array.isArray(layout)) return []
  return layout
    .map((block) => (block && typeof block === 'object' ? (block as { blockType?: string }).blockType : undefined))
    .filter((blockType): blockType is string => Boolean(blockType))
}

/** Recursively walks a Lexical editor-state tree collecting embedded block types. */
function collectFromLexical(node: unknown, acc: string[] = []): string[] {
  if (!node || typeof node !== 'object') return acc
  const n = node as { type?: string; fields?: { blockType?: string }; children?: unknown[]; root?: unknown }

  if (n.type === 'block' && n.fields?.blockType) acc.push(n.fields.blockType)
  if (Array.isArray(n.children)) for (const child of n.children) collectFromLexical(child, acc)
  if (n.root) collectFromLexical(n.root, acc)

  return acc
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
 * Tagging a block to a tenant today is a code change + deploy; this hook only
 * rejects bad saves, it doesn't hide the wrong options from the picker.
 */
export const validateBlockTenants: CollectionBeforeValidateHook = async ({ data, req }) => {
  if (!data) return data

  const blockTypes = [...collectFromLayout(data.layout), ...collectFromLexical(data.content)]
  const tagged = blockTypes
    .map((blockType) => ({ blockType, tenant: BLOCK_TENANT_TAGS[blockType] }))
    .filter((entry): entry is { blockType: string; tenant: string } => Boolean(entry.tenant))

  if (tagged.length === 0) return data

  const tenantValue = data.tenant
  const tenantId =
    tenantValue && typeof tenantValue === 'object' ? (tenantValue as { id: unknown }).id : tenantValue

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
