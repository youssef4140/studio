import type { Block, Field } from 'payload'

import { ARTICLE_LAYOUT_BLOCKS, LAYOUT_BLOCKS } from '@/blocks/layoutBlocks'

/** What an import creates: Pages, or Articles (the `textEditor` collection). */
export type ImportContent = 'pages' | 'articles'

/**
 * The blocks a tenant's documents of this kind can hold: Page blocks for
 * `pages`, Article blocks for `articles`; in both, blocks tagged for that
 * tenant (`custom.studioTenant`) plus untagged ones. The same rule as
 * tenantBlockFilter in src/blocks/tenantScope.ts. The import prompt
 * (aiPrompt.ts) and the importer (src/import/pageService.ts) both read this, so
 * the prompt only offers blocks the importer accepts.
 */
export function importableBlocksFor(tenantSlug: string, content: ImportContent = 'pages'): Block[] {
  const source = content === 'articles' ? ARTICLE_LAYOUT_BLOCKS : LAYOUT_BLOCKS
  const tagged = (block: Block) =>
    (block.custom as { studioTenant?: string } | undefined)?.studioTenant
  const own = source.filter((block) => tagged(block) === tenantSlug)
  const shared = source.filter((block) => !tagged(block))
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
