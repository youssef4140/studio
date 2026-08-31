import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { renderBlocks } from '@/render/renderBlocks'
import type { RenderableDoc } from '@/render/types'

/**
 * GET /api/render/:collection/:id  (step 7)
 *
 * `:id` accepts a numeric id or a slug — consumers resolve URL paths, not ids.
 * Dev-time handle on renderBlocks() against live, published data. `overrideAccess:
 * false` with no authenticated user means the collection read rule applies, so
 * unpublished docs 404. The publish pipeline (step 9) calls renderBlocks()
 * directly and writes the envelope to object storage — this endpoint never sits
 * on a consumer request path.
 */

const SUPPORTED = new Set(['pages'])

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ collection: string; id: string }> },
): Promise<Response> {
  const { collection, id } = await params

  if (!SUPPORTED.has(collection)) {
    return Response.json({ error: `Unsupported collection: ${collection}` }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })
  const isNumericId = /^\d+$/.test(id)

  let doc: RenderableDoc | undefined
  try {
    if (isNumericId) {
      doc = (await payload.findByID({
        collection: collection as 'pages',
        id,
        depth: 2,
        draft: false,
        overrideAccess: false,
      })) as RenderableDoc
    } else {
      const { docs } = await payload.find({
        collection: collection as 'pages',
        where: { slug: { equals: id } },
        depth: 2,
        draft: false,
        overrideAccess: false,
        limit: 1,
      })
      doc = docs[0] as RenderableDoc | undefined
    }
  } catch {
    doc = undefined
  }

  if (!doc) {
    return Response.json({ error: 'Not found or not published' }, { status: 404 })
  }

  const envelope = await renderBlocks(collection, doc)
  return Response.json(envelope, { headers: { 'cache-control': 'no-store' } })
}
