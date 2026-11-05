import path from 'path'

import { keyed } from '@/import/http'
import { ImportError, resolveFolder, resolveImageToMediaId } from '@/import/pageService'
import { getServerSideURL } from '@/utilities/getURL'

export const dynamic = 'force-dynamic'

const MAX_FILE_BYTES = 10 * 1024 * 1024

const absolute = (url: string | null | undefined) =>
  url && url.startsWith('/') ? `${getServerSideURL()}${url}` : (url ?? '')

/**
 * POST /api/import/media — adds an image to the Media library and returns its
 * `id`, to use in a block's image field. Either multipart (`file`, optional
 * `alt`, `folder`) or JSON (`{ url, folder }`: fetched from that URL). The
 * image is filed into the tenant's media folder; `folder` may be the tenant
 * (default) or one of its page folders.
 */
export async function POST(request: Request): Promise<Response> {
  return keyed(request, async ({ payload, key }) => {
    const contentType = request.headers.get('content-type') ?? ''
    let folderValue: unknown = key.tenantSlug
    let url: string | undefined
    let file: File | null = null
    let alt = ''

    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData()
      const fileEntry = form.get('file')
      file = fileEntry instanceof File ? fileEntry : null
      alt = String(form.get('alt') ?? '').trim()
      folderValue = form.get('folder') || key.tenantSlug
    } else {
      const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
      url = typeof body.url === 'string' ? body.url.trim() : undefined
      alt = typeof body.alt === 'string' ? body.alt.trim() : ''
      folderValue = body.folder || key.tenantSlug
    }

    // Media goes in the tenant's media folder, or one of the key's own page folders.
    const target = String(folderValue)
    if (target.split('/')[0] !== key.tenantSlug) {
      throw new ImportError(`This key cannot use the folder "${target}".`, 403)
    }
    if (target !== key.tenantSlug) await resolveFolder(payload, target, key)
    const folderDoc = (
      await payload.find({
        collection: 'folders',
        where: { path: { equals: target } },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      })
    ).docs[0]
    if (!folderDoc) throw new ImportError(`Folder "${target}" not found.`, 404)
    const folderId = folderDoc.id as number

    let id: number | null = null
    if (file) {
      if (file.size > MAX_FILE_BYTES) throw new ImportError('The image is too large (10 MB max).', 413)
      if (!file.type.startsWith('image/')) throw new ImportError('Only image files can be uploaded.', 415)
      const name = path.basename(file.name).replace(/[^a-zA-Z0-9._-]/g, '_')
      const buffer = Buffer.from(await file.arrayBuffer())
      const doc = await payload.create({
        collection: 'media',
        data: { alt: alt || name.replace(/\.[^/.]+$/, '').replace(/[_+-]/g, ' '), folder: folderId },
        file: { data: buffer, mimetype: file.type, name, size: buffer.length },
        overrideAccess: true,
      })
      id = doc.id as number
    } else if (url) {
      if (!/^https?:\/\//.test(url)) throw new ImportError('url must start with https://', 400)
      id = await resolveImageToMediaId(payload, url, folderId, key.tenantSlug)
      if (!id) throw new ImportError(`Could not fetch an image from ${url}.`, 422)
    } else {
      throw new ImportError('Send a "file" (multipart) or a JSON body with "url".', 400)
    }

    const media = await payload.findByID({ collection: 'media', id, depth: 0, overrideAccess: true })
    return { ok: true, id, url: absolute(media.url), alt: media.alt }
  })
}
