import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { getServerSideURL } from '@/utilities/getURL'

/**
 * The versioned CSS/JS bundle (§3).
 *
 * `renderVersion` is a content hash of the block CSS + JS and the files the CSS
 * refers to — the render-logic version, NOT document content. Any block/CSS/JS
 * change flips it, which is what invalidates every cached page (step 9's
 * re-render-everything job keys on it).
 *
 * Serving: when RENDER_ASSET_BASE_URL is unset the bundles are materialised into
 * `public/_render/` and served by this app. When it is set (step 9 points it at
 * R2/CDN) the publish pipeline uploads the bundles there instead and nothing is
 * written locally.
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

/** SVGs in src/render/assets that the stylesheet uses as background images. */
const ICONS = ['ptoc-check', 'ptoc-chevron-down']

function assetBaseURL(): string {
  return process.env.RENDER_ASSET_BASE_URL || getServerSideURL()
}

/** A file the stylesheet refers to by relative URL, shipped next to it. */
export interface RenderAssetFile {
  /** Versioned name, e.g. `ptoc-check.1a2b3c4d.svg`. */
  name: string
  body: string
  contentType: string
}

/** Raw bundle contents + their content hash. Used by the S3 uploader (step 9). */
export function readAssetSources(): {
  version: string
  css: string
  js: string
  files: RenderAssetFile[]
} {
  // One CSS bundle: the shared block rules, then each tenant's tokens and blocks.
  const cssSource = [
    readFileSync(join(SRC_DIR, 'blocks.css'), 'utf8'),
    readFileSync(join(SRC_DIR, 'ptofthecity.css'), 'utf8'),
    readFileSync(join(SRC_DIR, 'tny.css'), 'utf8'),
  ].join('\n')
  const jsSource = readFileSync(join(SRC_DIR, 'blocks.js'), 'utf8')
  // The stylesheet points at these as `<name>.__RENDER_VERSION__.svg`.
  const icons = ICONS.map((name) => ({
    name,
    body: readFileSync(join(SRC_DIR, `${name}.svg`), 'utf8'),
  }))
  const hash = createHash('sha256').update(cssSource).update('\0').update(jsSource)
  for (const icon of icons) hash.update('\0').update(icon.body)
  const version = hash.digest('hex').slice(0, 8)
  return {
    version,
    css: cssSource.replace(/__RENDER_VERSION__/g, version),
    js: jsSource.replace(/__RENDER_VERSION__/g, version),
    files: icons.map((icon) => ({
      name: `${icon.name}.${version}.svg`,
      body: icon.body,
      contentType: 'image/svg+xml',
    })),
  }
}

function build(): RenderAssets {
  const { version, css, js, files } = readAssetSources()

  const cssName = `blocks.${version}.css`
  const jsName = `blocks.${version}.js`
  const servedLocally = !process.env.RENDER_ASSET_BASE_URL

  if (servedLocally) {
    mkdirSync(OUT_DIR, { recursive: true })
    const current = new Set([cssName, jsName, ...files.map((file) => file.name)])
    for (const file of readdirSync(OUT_DIR)) {
      if (/^[a-z-]+\.[0-9a-f]{8}\.(css|js|svg)$/.test(file) && !current.has(file)) {
        unlinkSync(join(OUT_DIR, file))
      }
    }
    for (const [name, body] of [
      [cssName, css],
      [jsName, js],
      ...files.map((file) => [file.name, file.body]),
    ]) {
      const path = join(OUT_DIR, name)
      if (!existsSync(path)) writeFileSync(path, body)
    }
  }

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
  return readAssetSources().version
}
