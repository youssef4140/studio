import type { PayloadRequest } from 'payload'

import { ImportError, upsertPage } from '@/import/pageService'

/**
 * POST /api/pages/import: the admin's "Import Page JSON" popup. Creates a page
 * in `folderPath` from the JSON it sends (or updates the page there with the
 * same slug) and publishes it. Requires a logged-in admin session; the logic
 * is shared with the keyed API (src/import/pageService.ts).
 */
export async function importPageHandler(req: PayloadRequest): Promise<Response> {
  const { payload, user } = req
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = ((await req.json?.()) || {}) as Record<string, unknown>
    const result = await upsertPage(payload, body)
    if (!result.ok) {
      return Response.json(
        { error: result.errors.join('. '), errors: result.errors, warnings: result.warnings },
        { status: 422 },
      )
    }
    return Response.json({ success: true, ...result })
  } catch (err) {
    if (err instanceof ImportError) {
      return Response.json({ error: err.message, errors: err.issues }, { status: err.status })
    }
    req.payload.logger.error({ err, msg: 'Error in importPageHandler' })
    const message = err instanceof Error ? err.message : 'Internal server error'
    return Response.json({ error: message }, { status: 500 })
  }
}
