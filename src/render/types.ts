import type { Page } from '@/payload-types'

/** A block as it appears in a document's `layout` array. */
export type PageBlock = NonNullable<Page['layout']>[number]

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
    jsonLd: Record<string, unknown>[]
  }
  /** Global render-logic hash. Changes on any block/CSS/JS change; invalidates every cached page. */
  renderVersion: string
  renderedAt: string
}

/** Minimum shape `renderBlocks()` needs from a document. */
export interface RenderableDoc {
  id: number | string
  slug?: string | null
  title?: string | null
  layout?: PageBlock[] | null
}
