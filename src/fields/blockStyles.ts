import type { Field } from 'payload'

/**
 * Shared "Appearance" controls spread onto every block.
 *
 * Usage — spread LAST in a block's `fields` array:
 *
 *   fields: [
 *     { name: 'heading', type: 'text' },
 *     ...blockStyles,
 *   ]
 *
 * The values are design tokens, never raw CSS. `renderBlocks()` maps them to
 * classes on the block's outer element via one shared helper (see src/render).
 * No colour picker, no free-text CSS — tokens only.
 */

export const BACKGROUND_VALUES = ['none', 'surface', 'muted', 'brand', 'inverse'] as const
export const PADDING_Y_VALUES = ['none', 'sm', 'md', 'lg'] as const
export const BREAKPOINT_VALUES = ['mobile', 'tablet', 'desktop'] as const

export type BackgroundToken = (typeof BACKGROUND_VALUES)[number]
export type PaddingYToken = (typeof PADDING_Y_VALUES)[number]
export type BreakpointToken = (typeof BREAKPOINT_VALUES)[number]

/** Shape of the appearance values as they arrive on a block from Payload. */
export interface BlockStyleValues {
  background?: BackgroundToken
  paddingY?: PaddingYToken
  hideOn?: BreakpointToken[]
}

const toOptions = (values: readonly string[]) =>
  values.map((value) => ({
    label: value.charAt(0).toUpperCase() + value.slice(1),
    value,
  }))

export const blockStyles: Field[] = [
  {
    type: 'collapsible',
    label: 'Appearance',
    admin: {
      initCollapsed: true,
    },
    fields: [
      {
        name: 'background',
        type: 'select',
        defaultValue: 'none',
        options: toOptions(BACKGROUND_VALUES),
        admin: {
          description: 'Surface token for the block background.',
        },
      },
      {
        name: 'paddingY',
        type: 'select',
        defaultValue: 'md',
        options: toOptions(PADDING_Y_VALUES),
        admin: {
          description: 'Vertical padding (block-start / block-end) token.',
        },
      },
      {
        name: 'hideOn',
        type: 'select',
        hasMany: true,
        options: toOptions(BREAKPOINT_VALUES),
        admin: {
          description: 'Breakpoints where this block is hidden. Empty = visible everywhere.',
        },
      },
    ],
  },
]
