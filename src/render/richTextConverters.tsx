import React from 'react'
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

import { Block } from './Block'
import { resolveImage } from './media'
import type { PageBlock } from './types'
import { textColorStates, textEmphasisStates } from '@/fields/studioLexical'

/**
 * Lexical -> JSX converters for the render pipeline. Formatting/lists/links/etc.
 * use Payload's official `defaultConverters`; embedded blocks are routed through
 * the SAME <Block> component as layout-field blocks — one code path. `upload`
 * and `text` are overridden to support the image size/align fields and the
 * text-state (color/emphasis) tokens from src/fields/studioLexical.ts.
 *
 * The converter key is the block slug, so we can stamp `blockType` back on
 * `node.fields` before handing it to <Block>.
 */
const blockConverter =
  (blockType: PageBlock['blockType']) =>
  ({ node }: { node: { fields: Record<string, unknown> } }) => (
    <Block block={{ ...node.fields, blockType } as PageBlock} />
  )

/** `css` values on a text state are kebab-case (CSS property names); React wants camelCase. */
function cssToReactStyle(css: Record<string, string>): React.CSSProperties {
  const style: Record<string, string> = {}
  for (const [key, value] of Object.entries(css)) {
    style[key.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())] = value
  }
  return style as React.CSSProperties
}

const textStateGroups: Record<string, Record<string, { css: Record<string, string> }>> = {
  color: textColorStates,
  emphasis: textEmphasisStates,
}

interface UploadNodeShape {
  value: unknown
  fields?: { size?: string; align?: string; alt?: string } | null
}

export const studioJSXConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    hero: blockConverter('hero'),
    faq: blockConverter('faq'),
    faqTny: blockConverter('faqTny'),
    entityList: blockConverter('entityList'),
  },
  // Text-state tokens (color/emphasis) apply on top of the default bold/italic/
  // etc. handling — never replace it.
  text: (args) => {
    const defaultTextConverter = defaultConverters.text
    const rendered = typeof defaultTextConverter === 'function' ? defaultTextConverter(args) : null
    const state = (args.node as unknown as Record<string, unknown>)['$'] as
      | Record<string, string>
      | undefined
    if (!state) return rendered

    let style: React.CSSProperties = {}
    for (const [stateKey, stateValue] of Object.entries(state)) {
      const css = textStateGroups[stateKey]?.[stateValue]?.css
      if (css) style = { ...style, ...cssToReactStyle(css) }
    }
    if (Object.keys(style).length === 0) return rendered
    return <span style={style}>{rendered}</span>
  },
  // Images get a hard max-inline-size:100% ceiling in CSS regardless of the
  // chosen size token — never overflows the viewport on any screen.
  upload: ({ node }) => {
    const uploadNode = node as unknown as UploadNodeShape
    const img = resolveImage(uploadNode.value as Parameters<typeof resolveImage>[0])
    if (!img) return null

    const size = uploadNode.fields?.size || 'medium'
    const align = uploadNode.fields?.align || 'center'

    return (
      <img
        className={`editor-image editor-image--${size} editor-image--align-${align}`}
        src={img.src}
        srcSet={img.srcSet}
        alt={uploadNode.fields?.alt || img.alt}
        width={img.width}
        height={img.height}
        loading="lazy"
        decoding="async"
      />
    )
  },
})
