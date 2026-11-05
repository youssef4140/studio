import { keyed, readJson } from '@/import/http'
import { unpublishPage } from '@/import/pageService'

export const dynamic = 'force-dynamic'

/** POST /api/import/pages/unpublish — `{ folder, slug }` takes the page offline (back to a draft). */
export async function POST(request: Request): Promise<Response> {
  return keyed(request, async ({ payload, key }) => {
    const body = await readJson(request)
    const result = await unpublishPage(
      payload,
      { folderPath: body.folder ?? body.folderPath, slug: body.slug },
      key.tenantSlug,
    )
    payload.logger.info(`[import api] "${key.name}" unpublished ${result.folderPath}/${result.slug}`)
    return result
  })
}
