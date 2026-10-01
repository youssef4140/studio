import type { BreakpointToken } from '@/fields/blockStyles'

import type { PageBlock } from './types'

export type BackgroundToken = 'none' | 'surface' | 'muted' | 'brand' | 'inverse'
export type PaddingYToken = 'none' | 'sm' | 'md' | 'lg'

export interface BlockAppearance {
  background: BackgroundToken
  paddingY: PaddingYToken
}

/** The tenant article sets (src/blocks/ptoc, src/blocks/tny), by their slug prefix. */
type TenantSetBlockType = Extract<PageBlock['blockType'], `ptoc${string}` | `tny${string}`>

/**
 * Background and vertical padding for each block type. Fixed here, not
 * editable in the admin. The Record type makes a new block a compile error
 * until it has an entry.
 */
export const BLOCK_APPEARANCE: Record<
  Exclude<PageBlock['blockType'], TenantSetBlockType>,
  BlockAppearance
> = {
  content: { background: 'none', paddingY: 'md' },
}

/**
 * The tenant article sets carry their own backgrounds and spacing in their
 * tenant stylesheet (ptofthecity.css, tny.css), so the wrapper adds neither.
 */
const TENANT_SET_APPEARANCE: BlockAppearance = { background: 'none', paddingY: 'none' }

const isTenantSetBlock = (blockType: PageBlock['blockType']): blockType is TenantSetBlockType =>
  blockType.startsWith('ptoc') || blockType.startsWith('tny')

/**
 * The one shared token -> class helper (§7). Every block's outer <section> gets
 * these classes; the matching rules live in the versioned stylesheet
 * (src/render/assets/blocks.css), authored with logical CSS properties only.
 *
 *   background: none -> (nothing)   surface|muted|brand|inverse -> block--bg-*
 *   paddingY:                        none|sm|md|lg               -> block--py-*
 *   hideOn:     []                   mobile|tablet|desktop       -> block--hide-*
 */
export function appearanceClasses(
  blockType: PageBlock['blockType'],
  hideOn?: BreakpointToken[] | null,
): string {
  const { background, paddingY } = isTenantSetBlock(blockType)
    ? TENANT_SET_APPEARANCE
    : (BLOCK_APPEARANCE[blockType] ?? { background: 'none', paddingY: 'md' })
  const classes = ['block']

  if (background !== 'none') classes.push(`block--bg-${background}`)
  classes.push(`block--py-${paddingY}`)

  for (const breakpoint of hideOn ?? []) {
    classes.push(`block--hide-${breakpoint}`)
  }

  return classes.join(' ')
}
