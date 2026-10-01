import type { BreakpointToken } from '@/fields/blockStyles'

import type { PageBlock } from './types'

export type BackgroundToken = 'none' | 'surface' | 'muted' | 'brand' | 'inverse'
export type PaddingYToken = 'none' | 'sm' | 'md' | 'lg'

export interface BlockAppearance {
  background: BackgroundToken
  paddingY: PaddingYToken
}

/**
 * Background and vertical padding for each block type. Fixed here, not
 * editable in the admin. The Record type makes a new block a compile error
 * until it has an entry.
 */
export const BLOCK_APPEARANCE: Record<PageBlock['blockType'], BlockAppearance> = {
  hero: { background: 'none', paddingY: 'md' },
  content: { background: 'none', paddingY: 'md' },
  faq: { background: 'none', paddingY: 'md' },
  faqTny: { background: 'none', paddingY: 'md' },
  entityList: { background: 'none', paddingY: 'md' },
}

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
  const { background, paddingY } = BLOCK_APPEARANCE[blockType] ?? { background: 'none', paddingY: 'md' }
  const classes = ['block']

  if (background !== 'none') classes.push(`block--bg-${background}`)
  classes.push(`block--py-${paddingY}`)

  for (const breakpoint of hideOn ?? []) {
    classes.push(`block--hide-${breakpoint}`)
  }

  return classes.join(' ')
}
