import { getServerSideURL } from '@/utilities/getURL'

import type { RenderEnvelope, RenderableDoc } from './types'

/**
 * The `head` half of the envelope — meta that must reach the consumer's <head>
 * (§3). Kept deliberately thin for now:
 *  - description: the SEO fields land in step 12
 *  - canonical: derived from slug + this app's URL; provisional until per-tenant
 *    consumer domains exist (step 18)
 *  - jsonLd: MedicalWebPage / FAQPage are generated from structured fields in
 *    step 12
 */
export function buildHead(_collection: string, doc: RenderableDoc): RenderEnvelope['head'] {
  const base = getServerSideURL().replace(/\/$/, '')

  return {
    title: doc.title ?? null,
    description: null,
    canonical: doc.slug ? `${base}/${doc.slug}` : null,
    jsonLd: [],
  }
}
