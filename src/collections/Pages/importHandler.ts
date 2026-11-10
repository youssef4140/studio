import type { PayloadRequest } from 'payload'

import type { ImportContent } from '@/import/importableBlocks'
import { ImportError, upsertPage } from '@/import/pageService'

/**
 * POST /api/pages/import and POST /api/textEditor/import: the admin's "Import
 * Page JSON" / "Import Article JSON" popups. Creates a page (or article) in
 * `folderPath` from the JSON it sends (or updates the one there with the same
 * slug) and publishes it. Requires a logged-in admin session; the logic is
 * shared with the keyed API (src/import/pageService.ts).
 */
function importHandler(content: ImportContent) {
  return async (req: PayloadRequest): Promise<Response> => {
    const { payload, user } = req
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    try {
      const body = ((await req.json?.()) || {}) as Record<string, unknown>
      const result = await upsertPage(payload, body, undefined, content)
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
      req.payload.logger.error({ err, msg: `Error in import handler (${content})` })
      const message = err instanceof Error ? err.message : 'Internal server error'
      return Response.json({ error: message }, { status: 500 })
    }
  }
}

export const importPageHandler = importHandler('pages')
export const importArticleHandler = importHandler('articles')
