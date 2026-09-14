import React from 'react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

import { studioJSXConverters } from './richTextConverters'

type LexicalData = Parameters<typeof LexicalRichText>[0]['data']

/**
 * Server-side Lexical -> HTML for the render pipeline. Same converters as the
 * top-level Article content (studioJSXConverters) — image sizing, text-state
 * tokens, and embedded blocks behave identically everywhere rich text appears
 * (Faq answers, the Content block). No container wrapper — styling comes from
 * the versioned block stylesheet. Synchronous, so it is safe under
 * renderToStaticMarkup.
 */
export function RichText({ data }: { data: unknown }): React.ReactNode {
  if (!data || typeof data !== 'object' || !('root' in data)) return null
  return (
    <LexicalRichText data={data as LexicalData} converters={studioJSXConverters} disableContainer />
  )
}
