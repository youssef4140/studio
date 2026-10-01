import type { Field } from 'payload'

/**
 * Shared per-block controls spread onto every block.
 *
 * Usage — spread LAST in a block's `fields` array:
 *
 *   fields: [
 *     { name: 'heading', type: 'text' },
 *     ...blockStyles,
 *   ]
 *
 * Only visibility is editable. Background and padding are not editor
 * choices: they are fixed per block type in src/render/appearance.ts.
 */

export const BREAKPOINT_VALUES = ['mobile', 'tablet', 'desktop'] as const

export type BreakpointToken = (typeof BREAKPOINT_VALUES)[number]

const toOptions = (values: readonly string[]) =>
  values.map((value) => ({
    label: value.charAt(0).toUpperCase() + value.slice(1),
    value,
  }))

export const blockStyles: Field[] = [
  {
    type: 'collapsible',
    label: 'Visibility',
    admin: {
      initCollapsed: true,
    },
    fields: [
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
