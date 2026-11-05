import type { Block, Field } from 'payload'

import { LAYOUT_BLOCKS } from '@/blocks/layoutBlocks'

/**
 * The Page blocks a tenant's documents can hold: blocks tagged for that tenant
 * (`custom.studioTenant`) plus untagged ones (the plain Rich Text Editor).
 * The same rule as tenantBlockFilter in src/blocks/tenantScope.ts. The import
 * prompt (aiPrompt.ts) and the importer (src/collections/Pages/importHandler.ts)
 * both read this, so the prompt only offers blocks the importer accepts.
 */
export function importableBlocksFor(tenantSlug: string): Block[] {
  const tagged = (block: Block) =>
    (block.custom as { studioTenant?: string } | undefined)?.studioTenant
  const own = LAYOUT_BLOCKS.filter((block) => tagged(block) === tenantSlug)
  const shared = LAYOUT_BLOCKS.filter((block) => !tagged(block))
  return [...own, ...shared]
}

/** Fields that are editor controls, not content; left out of the prompt. */
const CONTROL_FIELDS = new Set(['hideOn'])

/**
 * A field list with layout-only wrappers (row, collapsible, tabs) flattened
 * away, since their children are stored at the same level, and editor controls
 * removed.
 */
export function dataFields(fields: Field[]): Field[] {
  return fields.flatMap((field): Field[] => {
    if (field.type === 'row' || field.type === 'collapsible') return dataFields(field.fields)
    if (field.type === 'tabs') {
      return field.tabs.flatMap((tab) =>
        'name' in tab && tab.name
          ? [{ name: tab.name, type: 'group', fields: tab.fields } as Field]
          : dataFields(tab.fields),
      )
    }
    if (field.type === 'ui') return []
    if ('name' in field && CONTROL_FIELDS.has(field.name)) return []
    return [field]
  })
}
