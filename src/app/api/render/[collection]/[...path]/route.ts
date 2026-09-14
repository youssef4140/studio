import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { renderBlocks } from '@/render/renderBlocks'
import { isRenderableCollection } from '@/render/collections'
import type { RenderableDoc } from '@/render/types'

/**
 * GET /api/render/:collection/:...path   (step 7, folder-scoped in Phase 3)
 *
 * `:path` is either a single numeric id (back-compat/dev tooling — unchanged),
 * or a compound render address: everything but the last segment is a Folder's
 * `path` (e.g. `ptofthecity/services`), the last segment is the doc's `slug`.
 * This is NOT a public route consumers browse — it's the address the publish
 * pipeline and consumer apps fetch by by (§3).
 *
 * `overrideAccess: false` with no authenticated user means the collection read
 * rule applies, so unpublished docs 404. The publish pipeline calls
 * renderBlocks() directly and writes to object storage — this endpoint never
 * sits on a consumer request path.
 */

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ collection: string; path: string[] }> },
): Promise<Response> {
  const { collection, path } = await params

  if (!isRenderableCollection(collection)) {
    return Response.json({ error: `Unsupported collection: ${collection}` }, { status: 400 })
  }
  if (!path || path.length === 0) {
    return Response.json({ error: 'Missing address' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })
  const isNumericId = path.length === 1 && /^\d+$/.test(path[0])

  let doc: RenderableDoc | undefined
  try {
    if (isNumericId) {
      doc = (await payload.findByID({
        collection,
        id: path[0],
        depth: 2,
        draft: false,
        overrideAccess: false,
      })) as RenderableDoc
    } else {
      const slug = path[path.length - 1]
      const folderPath = path.slice(0, -1).join('/')

      const { docs: folders } = await payload.find({
        collection: 'folders',
        where: { path: { equals: folderPath } },
        depth: 0,
        overrideAccess: true,
        limit: 1,
      })
      const folder = folders[0]
      if (!folder) {
        return Response.json({ error: 'Not found or not published' }, { status: 404 })
      }

      const { docs } = await payload.find({
        collection,
        where: { and: [{ folder: { equals: folder.id } }, { slug: { equals: slug } }] },
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
