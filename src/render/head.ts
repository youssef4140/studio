import { getServerSideURL } from '@/utilities/getURL'

import type { RenderEnvelope, RenderableDoc } from './types'

/**
 * The `head` half of the envelope — meta that must reach the consumer's <head>
 * (§3). For Articles the `seo` group wins over the base fields; JSON-LD
 * (MedicalWebPage / FAQPage) is generated from structured fields in step 12.
 * `canonical` is derived from slug + this app's URL — provisional until
 * per-tenant consumer domains exist (step 18).
 */
export function buildHead(_collection: string, doc: RenderableDoc): RenderEnvelope['head'] {
  const base = getServerSideURL().replace(/\/$/, '')

  return {
    title: doc.seo?.title || doc.title || null,
    description: doc.seo?.description || doc.excerpt || null,
    canonical: doc.slug ? `${base}/${doc.slug}` : null,
    jsonLd: [],
  }
}
