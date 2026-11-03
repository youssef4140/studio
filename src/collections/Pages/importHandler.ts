import type { Payload, PayloadRequest } from 'payload'
import { COMPONENT_NAME_MAP } from './schemaMap'
import path from 'path'

/**
 * Downloads a remote image or relative image from www.cobsolution.com,
 * uploads it to Payload Media collection, and returns the Media ID.
 */
async function resolveImageToMediaId(
  payload: Payload,
  imageUrl: string,
  folderId?: number,
): Promise<number | null> {
  if (!imageUrl || typeof imageUrl !== 'string') return null

  // If already a media ID (e.g. integer or numeric string)
  if (/^\d+$/.test(imageUrl)) {
    return parseInt(imageUrl, 10)
  }

  let fullUrl = imageUrl
  if (imageUrl.startsWith('/')) {
    fullUrl = `https://www.cobsolution.com${imageUrl}`
  }

  try {
    // Check if we already imported a media file with this filename
    const urlObj = new URL(fullUrl)
    const baseFilename = path.basename(urlObj.pathname)
    const cleanFilename = decodeURIComponent(baseFilename).replace(/[^a-zA-Z0-9._-]/g, '_')

    const existing = await payload.find({
      collection: 'media',
      where: {
        filename: { equals: cleanFilename },
      },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    if (existing.docs.length > 0) {
      return existing.docs[0].id
    }

    // Fetch the image
    const res = await fetch(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; COBStudioImporter/1.0)',
      },
    })

    if (!res.ok) {
      payload.logger.warn(`Failed to fetch image ${fullUrl}: ${res.statusText}`)
      return null
    }

    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const mimeType = res.headers.get('content-type') || 'image/jpeg'

    const mediaDoc = await payload.create({
      collection: 'media',
      data: {
        alt: cleanFilename.replace(/\.[^/.]+$/, '').replace(/[_+-]/g, ' '),
        ...(folderId ? { folder: folderId } : {}),
      },
      file: {
        data: buffer,
        mimetype: mimeType,
        name: cleanFilename,
        size: buffer.length,
      },
      overrideAccess: true,
    })

    return mediaDoc.id
  } catch (err) {
    payload.logger.error({ err, msg: `Error importing image ${imageUrl}` })
    return null
  }
}

/**
 * Recursively scans an object/array and resolves any "image" or "icon" or "avatar"
 * string URLs into Media collection IDs.
 */
async function resolveMediaFields(payload: Payload, data: any, folderId?: number): Promise<any> {
  if (!data || typeof data !== 'object') return data

  if (Array.isArray(data)) {
    return Promise.all(data.map((item) => resolveMediaFields(payload, item, folderId)))
  }

  const result: any = { ...data }
  const mediaKeys = ['image', 'icon', 'avatar']

  for (const [key, val] of Object.entries(result)) {
    if (mediaKeys.includes(key) && typeof val === 'string' && val.trim().length > 0) {
      const mediaId = await resolveImageToMediaId(payload, val.trim(), folderId)
      if (mediaId) {
        result[key] = mediaId
      }
    } else if (typeof val === 'object' && val !== null) {
      result[key] = await resolveMediaFields(payload, val, folderId)
    }
  }

  return result
}

export interface ImportPagePayload {
  title: string
  slug: string
  folderPath?: string // e.g. "cob/services"
  seo?: {
    title?: string
    description?: string
  }
  blocks: Array<{
    component: string
    [key: string]: any
  }>
}

export async function importPageHandler(req: PayloadRequest): Promise<Response> {
  const { payload, user } = req
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body: ImportPagePayload = await req.json?.() || {}
    const { title, slug, folderPath = 'cob/services', seo, blocks } = body

    if (!title || !slug) {
      return Response.json({ error: 'Missing required fields: title, slug' }, { status: 400 })
    }

    if (!Array.isArray(blocks) || blocks.length === 0) {
      return Response.json({ error: 'Blocks must be a non-empty array' }, { status: 400 })
    }

    // Resolve target folder
    const folderRes = await payload.find({
      collection: 'folders',
      where: {
        path: { equals: folderPath },
      },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    const folderDoc = folderRes.docs[0]
    if (!folderDoc) {
      return Response.json({ error: `Folder "${folderPath}" not found.` }, { status: 404 })
    }

    const folderId = folderDoc.id

    // Transform blocks into Payload layout blocks
    const layoutBlocks = []

    for (const rawBlock of blocks) {
      const { component, ...fields } = rawBlock
      const blockType = COMPONENT_NAME_MAP[component] || component

      // Resolve any remote image URLs to Payload Media IDs
      const resolvedFields = await resolveMediaFields(payload, fields, folderId)

      layoutBlocks.push({
        blockType,
        ...resolvedFields,
      })
    }

    // Check if page already exists with this slug in this folder
    const existingPage = await payload.find({
      collection: 'pages',
      where: {
        and: [
          { slug: { equals: slug } },
          { folder: { equals: folderId } },
        ],
      },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    let pageDoc
    if (existingPage.docs.length > 0) {
      pageDoc = await payload.update({
        collection: 'pages',
        id: existingPage.docs[0].id,
        data: {
          title,
          slug,
          folder: folderId,
          layout: layoutBlocks,
          ...(seo ? { seo } : {}),
        },
        overrideAccess: true,
      })
    } else {
      pageDoc = await payload.create({
        collection: 'pages',
        data: {
          title,
          slug,
          folder: folderId,
          layout: layoutBlocks,
          ...(seo ? { seo } : {}),
        },
        overrideAccess: true,
      })
    }

    return Response.json({
      success: true,
      id: pageDoc.id,
      slug: pageDoc.slug,
      folderPath,
      blocksCount: layoutBlocks.length,
    })
  } catch (err: any) {
    req.payload.logger.error({ err, msg: 'Error in importPageHandler' })
    return Response.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
