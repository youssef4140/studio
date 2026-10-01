import { getServerSideURL } from '@/utilities/getURL'

import type { RenderEnvelope, RenderableDoc } from './types'

/**
 * The `head` half of the envelope — meta that must reach the consumer's <head>
 * (§3). The `seo` group wins over the base fields; JSON-LD
 * (MedicalWebPage / FAQPage) is generated from structured fields in step 12.
 * `canonical` is derived from slug + this app's URL — provisional until
 * per-tenant consumer domains exist (step 18).
 */
export function buildHead(_collection: string, doc: RenderableDoc): RenderEnvelope['head'] {
  const base = getServerSideURL().replace(/\/$/, '')

  return {
    title: doc.seo?.title || doc.title || null,
    description: doc.seo?.description || null,
    canonical: doc.slug ? `${base}/${doc.slug}` : null,
    // Editor-added name/value pairs from the SEO popup, for the consumer to
    // turn into <meta> tags.
    meta: (doc.seo?.custom ?? [])
      .filter((entry) => entry.name && entry.value)
      .map((entry) => ({ name: entry.name as string, value: entry.value as string })),
    jsonLd: [],
  }
}
