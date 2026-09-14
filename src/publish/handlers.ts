import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { renderBlocks } from '@/render/renderBlocks'
import { getRenderVersion } from '@/render/assets'
import { RENDERABLE_COLLECTIONS, type RenderableCollection } from '@/render/collections'
import type { RenderableDoc } from '@/render/types'

import { keys, publishConfig } from './config'
import { purge, purgeEverything } from './cdn'
import { deleteEnvelope, putEnvelope } from './storage'
import { recordRenderVersion, syncAssets } from './assets-sync'
import { notifyConsumers } from './webhooks'
import { resolveDocAddress } from './address'

const envelopePublicUrl = (collection: string, address: string) =>
  `${publishConfig.s3.publicUrl}/${keys.envelope(collection, address)}`

/**
 * Render one document and publish its artifact: envelope -> object storage ->
 * CDN purge -> consumer webhook (§3). If the doc is no longer published, the
 * artifact is removed instead. This runs in the worker, off every request path.
 */
export async function publishDoc({
  collection,
  id,
}: {
  collection: RenderableCollection
  id: string | number
}): Promise<{ status: 'published' | 'unpublished' | 'missing'; address?: string }> {
  const payload = await getPayload({ config: configPromise })

  let doc: (RenderableDoc & { _status?: string | null }) | null = null
  try {
    doc = (await payload.findByID({
      collection,
      id,
      depth: 2,
      draft: false,
      overrideAccess: true,
    })) as RenderableDoc & { _status?: string | null }
  } catch {
    doc = null
  }

  if (!doc) return { status: 'missing' }

  if (doc._status !== 'published') {
    if (doc.slug && doc.folder) {
      const address = await resolveDocAddress(payload, doc)
      await deleteEnvelope(collection, address)
      await purge([envelopePublicUrl(collection, address)])
      await notifyConsumers({
        type: 'page.unpublished',
        collection,
        slug: doc.slug,
        address,
        renderVersion: getRenderVersion(),
      })
      return { status: 'unpublished', address }
    }
    return { status: 'unpublished' }
  }

  const address = await resolveDocAddress(payload, doc)
  const envelope = await renderBlocks(collection, doc)
  const envelopeUrl = await putEnvelope(collection, address, envelope)
  await purge([envelopeUrl])
  await notifyConsumers({
    type: 'page.published',
    collection,
    slug: doc.slug ?? undefined,
    address,
    renderVersion: envelope.renderVersion,
    renderedAt: envelope.renderedAt,
    envelopeUrl,
  })

  return { status: 'published', address }
}

/** Hard delete — drop the artifact and tell consumers. `address` is already
 *  resolved by the caller (the doc no longer exists to resolve it from). */
export async function unpublishDoc({
  collection,
  address,
}: {
  collection: RenderableCollection
  address: string
}): Promise<void> {
  await deleteEnvelope(collection, address)
  await purge([envelopePublicUrl(collection, address)])
  await notifyConsumers({
    type: 'page.unpublished',
    collection,
    address,
    renderVersion: getRenderVersion(),
  })
}

/**
 * Re-render every published document across all renderable collections. Triggered
 * when the global renderVersion changes (a block/CSS/JS deploy) so no cached page
 * is left on stale markup. Renders inline in a paged loop — for very large sites
 * this would fan out into per-doc jobs, but the shape is the same.
 */
export async function rerenderAll({
  reason,
}: {
  reason: string
}): Promise<{ count: number; renderVersion: string }> {
  const payload = await getPayload({ config: configPromise })
  const { version } = await syncAssets()

  let count = 0
  for (const collection of RENDERABLE_COLLECTIONS) {
    let page = 1
    for (;;) {
      const res = await payload.find({
        collection,
        where: { _status: { equals: 'published' } },
        depth: 2,
        draft: false,
        overrideAccess: true,
        limit: 50,
        page,
      })
      for (const doc of res.docs) {
        const renderableDoc = doc as RenderableDoc
        if (!renderableDoc.folder) continue // no folder yet — nothing to address, skip
        const address = await resolveDocAddress(payload, renderableDoc)
        const envelope = await renderBlocks(collection, renderableDoc)
        await putEnvelope(collection, address, envelope)
        count++
      }
      if (!res.hasNextPage) break
      page++
    }
  }

  await purgeEverything()
  await recordRenderVersion(version)
  await notifyConsumers({ type: 'rerender.completed', collection: '*', renderVersion: version })

  console.info(`[publish] rerenderAll(${reason}): ${count} doc(s) @ renderVersion ${version}`)
  return { count, renderVersion: version }
}
