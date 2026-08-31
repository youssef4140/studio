import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { getServerSideURL } from '@/utilities/getURL'

/**
 * The versioned CSS/JS bundle (§3).
 *
 * `renderVersion` is a content hash of the block CSS + JS — the render-logic
 * version, NOT document content. Any block/CSS/JS change flips it, which is what
 * invalidates every cached page (step 9's re-render-everything job keys on it).
 *
 * Here (step 7) the bundles are materialised into `public/_render/` and served by
 * this app. Step 9 swaps the destination for R2 + CDN by pointing
 * RENDER_ASSET_BASE_URL at the CDN — no code change.
 */

const SRC_DIR = join(process.cwd(), 'src', 'render', 'assets')
const OUT_DIR = join(process.cwd(), 'public', '_render')
const OUT_PREFIX = '/_render'

interface RenderAssets {
  version: string
  css: string
  js: string
}

let cached: RenderAssets | null = null

function assetBaseURL(): string {
  return process.env.RENDER_ASSET_BASE_URL || getServerSideURL()
}

function build(): RenderAssets {
  const css = readFileSync(join(SRC_DIR, 'blocks.css'), 'utf8')
  const jsSource = readFileSync(join(SRC_DIR, 'blocks.js'), 'utf8')

  const version = createHash('sha256')
    .update(css)
    .update('\0')
    .update(jsSource)
    .digest('hex')
    .slice(0, 8)

  const js = jsSource.replace(/__RENDER_VERSION__/g, version)

  const cssName = `blocks.${version}.css`
  const jsName = `blocks.${version}.js`

  mkdirSync(OUT_DIR, { recursive: true })

  // Drop stale bundles from older render versions.
  for (const file of readdirSync(OUT_DIR)) {
    if (/^blocks\.[0-9a-f]{8}\.(css|js)$/.test(file) && file !== cssName && file !== jsName) {
      unlinkSync(join(OUT_DIR, file))
    }
  }

  const cssPath = join(OUT_DIR, cssName)
  const jsPath = join(OUT_DIR, jsName)
  if (!existsSync(cssPath)) writeFileSync(cssPath, css)
  if (!existsSync(jsPath)) writeFileSync(jsPath, js)

  const base = assetBaseURL().replace(/\/$/, '')
  return {
    version,
    css: `${base}${OUT_PREFIX}/${cssName}`,
    js: `${base}${OUT_PREFIX}/${jsName}`,
  }
}

export function getRenderAssets(): RenderAssets {
  if (!cached) cached = build()
  return cached
}

/** Just the hash, for cache keys / manifests without materialising URLs. */
export function getRenderVersion(): string {
  return getRenderAssets().version
}
