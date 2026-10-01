import type { Payload, PayloadHandler } from 'payload'

import { collectDocMediaIds } from './autoAssignFolder'

export interface MediaUsage {
  collection: 'pages' | 'textEditor'
  id: number
  title: string
}

/**
 * Every Page/Article that references a media file — in its saved content or
 * in a newer unpublished draft. Scans documents rather than querying, because
 * images embedded in rich text live inside JSON that can't be filtered on.
 */
export async function findMediaUsage(payload: Payload, mediaId: number): Promise<MediaUsage[]> {
  const found = new Map<string, MediaUsage>()

  for (const collection of ['pages', 'textEditor'] as const) {
    for (const draft of [false, true]) {
      const { docs } = await payload.find({
        collection,
        depth: 0,
        draft,
        limit: 1000,
        overrideAccess: true,
      })
      for (const doc of docs) {
        if (!collectDocMediaIds(doc).includes(mediaId)) continue
        found.set(`${collection}:${doc.id}`, {
          collection,
          id: doc.id,
          title: doc.title || `Untitled (#${doc.id})`,
        })
      }
    }
  }

  return [...found.values()]
}

const unauthorized = () => Response.json({ errors: [{ message: 'Unauthorized' }] }, { status: 401 })

/** GET /api/media/:id/usage */
export const mediaUsageHandler: PayloadHandler = async (req) => {
  if (!req.user) return unauthorized()
  const docs = await findMediaUsage(req.payload, Number(req.routeParams?.id))
  return Response.json({ docs })
}

/**
 * DELETE /api/media/:id/remove — the only way to delete media. The stock
 * delete is switched off (see Media's access) so the admin can't offer a
 * delete that skips the "this affects N pages" confirmation.
 */
export const mediaRemoveHandler: PayloadHandler = async (req) => {
  if (!req.user) return unauthorized()
  const id = Number(req.routeParams?.id)
  try {
    await req.payload.delete({ collection: 'media', id, overrideAccess: true, req })
  } catch {
    return Response.json({ errors: [{ message: 'Could not delete this file.' }] }, { status: 400 })
  }
  return Response.json({ message: 'Deleted successfully.' })
}
