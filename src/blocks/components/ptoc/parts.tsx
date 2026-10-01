import type { TextEditor } from '@/payload-types'

import { articleParts } from '../articleParts'

/** Any block an Article's `layout` can hold. */
export type ArticleBlock = NonNullable<TextEditor['layout']>[number]

/** The block with this slug, as generated in payload-types. */
export type PtocBlock<T extends ArticleBlock['blockType']> = Extract<ArticleBlock, { blockType: T }>

export const { Media, Background, Button, Meta } = articleParts('ptoc')
