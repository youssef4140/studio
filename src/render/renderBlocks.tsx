import React from 'react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

import { BlockList } from './Block'
import { getRenderAssets } from './assets'
import { buildHead } from './head'
import { studioJSXConverters } from './richTextConverters'
import type { RenderEnvelope, RenderableDoc } from './types'

/**
 * renderBlocks() — the one function (§3). Takes a document, returns the published
 * envelope: a body fragment (never a full document), the versioned asset URLs,
 * the head payload, and the global renderVersion.
 *
 * A doc carries EITHER a `layout` blocks array (Pages) OR a `content` Lexical doc
 * (Articles, §1.3). Both paths render blocks through the SAME <Block> component —
 * `studioJSXConverters` routes Lexical block nodes into it. One code path.
 *
 * Called by three places, never reimplemented: the preview iframe (step 10), the
 * canvas (step 14), and the publish job (step 9). `react-dom/server` is loaded
 * via dynamic import to clear Next's App Router import-trace guard.
 */

function isLexical(value: unknown): value is Parameters<typeof LexicalRichText>[0]['data'] {
  return Boolean(value) && typeof value === 'object' && 'root' in (value as object)
}

function Body({ doc }: { doc: RenderableDoc }): React.ReactElement {
  if (isLexical(doc.content)) {
    return (
      <div className="article-body">
        <LexicalRichText data={doc.content} converters={studioJSXConverters} disableContainer />
      </div>
    )
  }
  return <BlockList blocks={doc.layout ?? []} />
}

export async function renderBlocks(
  collection: string,
  doc: RenderableDoc,
): Promise<RenderEnvelope> {
  const assets = getRenderAssets()

  const { renderToStaticMarkup } = await import('react-dom/server.edge')
  const html = renderToStaticMarkup(<Body doc={doc} />)

  return {
    html,
    assets: {
      css: assets.css,
      js: assets.js,
    },
    head: buildHead(collection, doc),
    renderVersion: assets.version,
    renderedAt: new Date().toISOString(),
  }
}
