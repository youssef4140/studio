import { keyed, readJson } from '@/import/http'
import {
  deletePage,
  ImportError,
  patchPage,
  readPages,
  upsertPage,
} from '@/import/pageService'

export const dynamic = 'force-dynamic'

/** `folder` is the name in the API; `folderPath` is what the admin popup sends. */
const folderOf = (body: Record<string, unknown>) => body.folder ?? body.folderPath

/** GET /api/import/pages?folder=&slug= — one page as import JSON, or the folder's page list. */
export async function GET(request: Request): Promise<Response> {
  return keyed(request, async ({ payload, key }) => {
    const params = new URL(request.url).searchParams
    return { ok: true, ...(await readPages(payload, params.get('folder'), params.get('slug'), key.tenantSlug)) }
  })
}

/** POST /api/import/pages — create or replace a page, published unless `publish` is false; `dryRun` only checks. */
export async function POST(request: Request): Promise<Response> {
  return keyed(request, async ({ payload, key }) => {
    const body = await readJson(request)
    const result = await upsertPage(payload, { ...body, folderPath: folderOf(body) }, key.tenantSlug)
    if (result.ok && !result.dryRun) {
      payload.logger.info(`[import api] "${key.name}" ${result.updated ? 'updated' : 'created'} ${result.folderPath}/${result.slug}`)
    }
    return { ...result }
  })
}

/** PATCH /api/import/pages — edit a page with ops (update, insert, remove, move) and/or title and seo. */
export async function PATCH(request: Request): Promise<Response> {
  return keyed(request, async ({ payload, key }) => {
    const body = await readJson(request)
    const result = await patchPage(payload, { ...body, folderPath: folderOf(body) }, key.tenantSlug)
    if (result.ok && !result.dryRun) {
      payload.logger.info(`[import api] "${key.name}" edited ${result.folderPath}/${result.slug}`)
    }
    return { ...result }
  })
}

/** DELETE /api/import/pages — delete a page; only for a key that was given that permission. */
export async function DELETE(request: Request): Promise<Response> {
  return keyed(request, async ({ payload, key }) => {
    if (!key.canDelete) throw new ImportError('This key cannot delete pages. You can unpublish instead.', 403)
    const body = await readJson(request)
    const result = await deletePage(payload, { ...body, folderPath: folderOf(body) }, key.tenantSlug)
    payload.logger.info(`[import api] "${key.name}" deleted ${result.folderPath}/${result.slug}`)
    return result
  })
}
