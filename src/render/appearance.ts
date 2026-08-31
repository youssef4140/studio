import type { BackgroundToken, BreakpointToken, PaddingYToken } from '@/fields/blockStyles'

interface AppearanceInput {
  background?: BackgroundToken | null
  paddingY?: PaddingYToken | null
  hideOn?: BreakpointToken[] | null
}

/**
 * The one shared token -> class helper (§7). Every block's outer <section> gets
 * these classes; the matching rules live in the versioned stylesheet
 * (src/render/assets/blocks.css), authored with logical CSS properties only.
 *
 *   background: none   -> (nothing)        surface|muted|brand|inverse -> block--bg-*
 *   paddingY:   md (default)               none|sm|md|lg               -> block--py-*
 *   hideOn:     []                         mobile|tablet|desktop       -> block--hide-*
 */
export function appearanceClasses(input: AppearanceInput): string {
  const classes = ['block']

  const background = input.background ?? 'none'
  if (background !== 'none') classes.push(`block--bg-${background}`)

  const paddingY = input.paddingY ?? 'md'
  classes.push(`block--py-${paddingY}`)

  for (const breakpoint of input.hideOn ?? []) {
    classes.push(`block--hide-${breakpoint}`)
  }

  return classes.join(' ')
}
