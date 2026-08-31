import React from 'react'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

import { Block } from './Block'
import type { PageBlock } from './types'

/**
 * Lexical -> JSX converters for the render pipeline. Text/heading/list/link etc.
 * use Payload's official `defaultConverters`; embedded blocks are routed through
 * the SAME <Block> component as layout-field blocks. One code path.
 *
 * The converter key is the block slug, so we can stamp `blockType` back on
 * `node.fields` before handing it to <Block>.
 */
const blockConverter =
  (blockType: PageBlock['blockType']) =>
  ({ node }: { node: { fields: Record<string, unknown> } }) => (
    <Block block={{ ...node.fields, blockType } as PageBlock} />
  )

export const studioJSXConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    hero: blockConverter('hero'),
    faq: blockConverter('faq'),
    entityList: blockConverter('entityList'),
  },
})
