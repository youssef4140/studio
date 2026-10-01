import type { Page, TextEditor } from '@/payload-types'

/**
 * A block as it appears in a document's `layout` array: any block a Page or
 * an Article can hold (src/blocks/layoutBlocks.ts).
 */
export type PageBlock =
  | NonNullable<Page['layout']>[number]
  | NonNullable<TextEditor['layout']>[number]

/**
 * The published artifact (§3). An envelope, never a naked HTML string:
 * `html` is a body fragment, `head` carries what must reach the consumer's
 * <head>, `assets` are the versioned CDN bundles linked once per consumer.
 */
export interface RenderEnvelope {
  /** Body fragment — not a full document. */
  html: string
  assets: {
    css: string
    js: string
  }
  head: {
    title: string | null
    description: string | null
    canonical: string | null
    /** Editor-added name/value pairs from the SEO popup. */
    meta: { name: string; value: string }[]
    jsonLd: Record<string, unknown>[]
  }
  /**
   * The document's tenant theme — structured, not a raw CSS string. Consumers
   * merge `vars` into their own :root. `null` when the tenant has no theme set.
   */
  theme: {
    vars: Record<string, string>
    fontFamily: string | null
    googleFontsUrl: string | null
    /** Stylesheet URLs the consumer must link for the tenant's block fonts. */
    fontStylesheets: string[]
  } | null
  /** Global render-logic hash. Changes on any block/CSS/JS change; invalidates every cached page. */
  renderVersion: string
  renderedAt: string
}

interface SeoGroup {
  title?: string | null
  description?: string | null
  image?: unknown
  custom?: { name?: string | null; value?: string | null }[] | null
}

/** Minimum shape renderBlocks() needs from a document (a Page or an Article). */
export interface RenderableDoc {
  id: number | string
  slug?: string | null
  title?: string | null
  seo?: SeoGroup | null
  layout?: PageBlock[] | null
  /** Folder relationship — id or populated Folder. Used to resolve the render address/tenant. */
  folder?: unknown
  tenant?: unknown
}
