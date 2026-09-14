import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { renderBlocks } from '@/render/renderBlocks'
import { isRenderableCollection } from '@/render/collections'
import { resolveDocTheme } from '@/render/theme'
import type { RenderableDoc } from '@/render/types'
import { verifyPreviewToken } from '@/preview/token'

/**
 * POST /api/preview/render   (step 10)
 *
 * Re-renders the live-preview iframe from the sidebar's current (unsaved) form
 * state. Body: { collection, token, data } where `data` is the merged doc from
 * Payload's live-preview postMessage. `data` already carries layout/title/slug —
 * and the SAME renderBlocks() as publish, so what the editor sees is what will
 * publish. One DB lookup was added in Phase 4 (previously none) to resolve the
 * tenant's theme from `data.tenant` — preview should reflect the real tenant
 * palette, not the studio default.
 */
export async function POST(req: Request): Promise<Response> {
  let body: { collection?: string; token?: string; data?: RenderableDoc }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'bad json' }, { status: 400 })
  }

  const { collection, token, data } = body
  if (!collection || !isRenderableCollection(collection) || !verifyPreviewToken(token, collection)) {
    return Response.json({ error: 'unauthorized' }, { status: 403 })
  }
  if (!data || typeof data !== 'object') {
    return Response.json({ error: 'missing data' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })
  const theme = await resolveDocTheme(payload, data.tenant)

  const envelope = await renderBlocks(collection, data, { theme })
  return Response.json(
    { html: envelope.html, head: envelope.head, theme: envelope.theme },
    { headers: { 'cache-control': 'no-store' } },
  )
}
