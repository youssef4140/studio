import React from 'react'

import { BlockList } from './Block'
import { getRenderAssets } from './assets'
import { buildHead } from './head'
import { fillPlaceholders, markPlaceholders } from './placeholders'
import type { ResolvedTheme } from './theme'
import type { PageBlock, RenderEnvelope, RenderableDoc } from './types'

/**
 * renderBlocks() — the one function (§3). Takes a document, returns the published
 * envelope: a body fragment (never a full document), the versioned asset URLs,
 * the head payload, and the global renderVersion.
 *
 * Pages and Articles both carry a `layout` blocks array, rendered through the
 * one <Block> component. Prose is the Rich Text Editor block. One code path.
 *
 * Called by three places, never reimplemented: the preview iframe (step 10), the
 * canvas (step 14), and the publish job (step 9). `react-dom/server` is loaded
 * via dynamic import to clear Next's App Router import-trace guard.
 */

function Body({ blocks }: { blocks: PageBlock[] }): React.ReactElement {
  return <BlockList blocks={blocks} />
}

export async function renderBlocks(
  collection: string,
  doc: RenderableDoc,
  options?: {
    theme?: ResolvedTheme | null
    /**
     * Preview only: empty text fields render as their hint (src/render/placeholders.ts).
     * The publish job never sets this, so an empty field publishes empty.
     */
    placeholders?: boolean
  },
): Promise<RenderEnvelope> {
  const assets = getRenderAssets()

  const { renderToStaticMarkup } = await import('react-dom/server.edge')
  const blocks = doc.layout ?? []
  const html = options?.placeholders
    ? markPlaceholders(renderToStaticMarkup(<Body blocks={fillPlaceholders(blocks)} />))
    : renderToStaticMarkup(<Body blocks={blocks} />)

  return {
    html,
    assets: {
      css: assets.css,
      js: assets.js,
    },
    head: buildHead(collection, doc),
    theme: options?.theme ?? null,
    renderVersion: assets.version,
    renderedAt: new Date().toISOString(),
  }
}
