import React from 'react'

import { BlockList } from './Block'
import { getRenderAssets } from './assets'
import { buildHead } from './head'
import type { RenderEnvelope, RenderableDoc } from './types'

/**
 * renderBlocks() — the one function (§3). Takes a document, returns the published
 * envelope: a body fragment (never a full document), the versioned asset URLs,
 * the head payload, and the global renderVersion.
 *
 * Called by three places, never reimplemented: the preview iframe (step 10), the
 * canvas (step 14), and the publish job (step 9). Rendering happens at publish
 * time, not on consumer request paths.
 *
 * `react-dom/server` is loaded via dynamic import: Next's App Router refuses a
 * static import of it into the RSC/route graph. Runtime import sidesteps the
 * import-trace guard and keeps this usable from a route handler and a job.
 */
export async function renderBlocks(
  collection: string,
  doc: RenderableDoc,
): Promise<RenderEnvelope> {
  const assets = getRenderAssets()

  const { renderToStaticMarkup } = await import('react-dom/server.edge')
  const html = renderToStaticMarkup(<BlockList blocks={doc.layout ?? []} />)

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
