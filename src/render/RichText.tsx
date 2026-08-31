import React from 'react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

type LexicalData = Parameters<typeof LexicalRichText>[0]['data']

/**
 * Server-side Lexical -> HTML for the render pipeline. Default converters, no
 * container wrapper — all styling comes from the versioned block stylesheet.
 * Synchronous, so it is safe under renderToStaticMarkup.
 */
export function RichText({ data }: { data: unknown }): React.ReactNode {
  if (!data || typeof data !== 'object' || !('root' in data)) return null
  return <LexicalRichText data={data as LexicalData} disableContainer />
}
