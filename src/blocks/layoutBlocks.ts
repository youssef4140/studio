import { Content } from './Content'
import { PTOC_ARTICLE_BLOCKS } from './ptoc'
import { PTOC_PAGE_BLOCKS } from './ptoc/pages'
import { TNY_ARTICLE_BLOCKS } from './tny'

/**
 * The blocks an editor can add to a document's `layout`. A new block still has
 * to be added to the switch in src/render/Block.tsx and to BLOCK_APPEARANCE.
 *
 * Pages get LAYOUT_BLOCKS: the plain Rich Text Editor and ptofthecity's page
 * sections (src/blocks/ptoc/pages.ts). Articles get the tenant
 * article sets instead (ptofthecity's and TNY's, from Figma — src/blocks/ptoc,
 * src/blocks/tny), whose "Text Editor" blocks take the plain editor's place.
 * Which of them an editor actually sees depends on the document's tenant:
 * src/blocks/tenantScope.ts.
 */
export const LAYOUT_BLOCKS = [Content, ...PTOC_PAGE_BLOCKS]

export const ARTICLE_LAYOUT_BLOCKS = [...PTOC_ARTICLE_BLOCKS, ...TNY_ARTICLE_BLOCKS]

/** Every block any collection can hold, for lookups by slug. */
export const ALL_LAYOUT_BLOCKS = [...LAYOUT_BLOCKS, ...ARTICLE_LAYOUT_BLOCKS]
