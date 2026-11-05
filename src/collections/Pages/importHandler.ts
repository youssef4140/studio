import path from 'path'
import type { Block, Field, Payload, PayloadRequest } from 'payload'

import { notTemplate } from '@/fields/template'
import { dataFields, importableBlocksFor } from '@/import/importableBlocks'
import { folderPathsFor } from '@/tenants'

import { COMPONENT_NAME_MAP } from './schemaMap'

/**
 * Where a tenant's relative image paths (`/images/x.jpg`) are fetched from. A
 * tenant not listed here needs absolute image URLs.
 */
const SITE_ORIGINS: Record<string, string> = {
  cob: 'https://www.cobsolution.com',
}

/**
 * Downloads an image URL into the Media collection and returns its id. A file
 * already imported under the same name is reused.
 */
async function resolveImageToMediaId(
  payload: Payload,
  imageUrl: string,
  folderId: number,
  tenantSlug: string,
): Promise<number | null> {
  if (/^\d+$/.test(imageUrl)) return parseInt(imageUrl, 10)

  let fullUrl = imageUrl
  if (imageUrl.startsWith('/')) {
    const origin = SITE_ORIGINS[tenantSlug]
    if (!origin) {
      payload.logger.warn(`Skipping relative image ${imageUrl}: no site origin for "${tenantSlug}"`)
      return null
    }
    fullUrl = `${origin}${imageUrl}`
  }

  try {
    const urlObj = new URL(fullUrl)
    const baseFilename = path.basename(urlObj.pathname)
    const cleanFilename = decodeURIComponent(baseFilename).replace(/[^a-zA-Z0-9._-]/g, '_')

    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: cleanFilename } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    if (existing.docs.length > 0) return existing.docs[0].id

    const res = await fetch(fullUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; StudioImporter/1.0)' },
    })
    if (!res.ok) {
      payload.logger.warn(`Failed to fetch image ${fullUrl}: ${res.statusText}`)
      return null
    }

    const buffer = Buffer.from(await res.arrayBuffer())
    const mediaDoc = await payload.create({
      collection: 'media',
      data: {
        alt: cleanFilename.replace(/\.[^/.]+$/, '').replace(/[_+-]/g, ' '),
        folder: folderId,
      },
      file: {
        data: buffer,
        mimetype: res.headers.get('content-type') || 'image/jpeg',
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

interface ButtonValue {
  label: string
  href: string
}

/**
 * Buttons a tenant's imported pages get when the JSON doesn't set them. Applied
 * to every block that has the field: a block's `button` field (the single
 * button of the light and banner Call to Action) takes the primary default.
 * A label or link the JSON does give is kept; only the missing part is filled.
 */
const BUTTON_DEFAULTS: Record<string, { primary: ButtonValue; secondary: ButtonValue }> = {
  ptofthecity: {
    primary: { label: 'Book an Appointment', href: '/booking' },
    secondary: { label: 'Check Eligibility', href: '/insurances' },
  },
}

function withDefaultButtons(
  tenantSlug: string,
  fields: Field[],
  data: Record<string, unknown>,
): Record<string, unknown> {
  const defaults = BUTTON_DEFAULTS[tenantSlug]
  if (!defaults) return data
  const slots: Record<string, ButtonValue> = {
    primaryButton: defaults.primary,
    secondaryButton: defaults.secondary,
    button: defaults.primary,
  }
  const out = { ...data }
  for (const field of dataFields(fields)) {
    if (field.type !== 'group' || !('name' in field) || !(field.name in slots)) continue
    const given = (out[field.name] ?? {}) as Partial<ButtonValue>
    out[field.name] = {
      label: given.label?.trim() ? given.label : slots[field.name].label,
      href: given.href?.trim() ? given.href : slots[field.name].href,
    }
  }
  return out
}

const textNode = (text: string) => ({
  type: 'text',
  text,
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const elementBase = { direction: 'ltr', format: '', indent: 0, version: 1 }

/**
 * A plain string as Lexical rich text: blank-line-separated paragraphs,
 * `## `/`### `/`#### ` headings and `- ` bullet lists (the rules the AI prompt
 * gives).
 */
function stringToLexical(value: string) {
  const children: unknown[] = []
  for (const chunk of value.replace(/\r\n/g, '\n').split(/\n\s*\n/)) {
    const lines = chunk.split('\n').map((line) => line.trim()).filter(Boolean)
    if (lines.length === 0) continue

    const heading = lines.length === 1 && /^(#{2,4})\s+(.*)$/.exec(lines[0])
    if (heading) {
      children.push({
        ...elementBase,
        type: 'heading',
        tag: `h${heading[1].length}`,
        children: [textNode(heading[2])],
      })
    } else if (lines.every((line) => /^[-*]\s+/.test(line))) {
      children.push({
        ...elementBase,
        type: 'list',
        listType: 'bullet',
        tag: 'ul',
        start: 1,
        children: lines.map((line, index) => ({
          ...elementBase,
          type: 'listitem',
          value: index + 1,
          children: [textNode(line.replace(/^[-*]\s+/, ''))],
        })),
      })
    } else {
      children.push({
        ...elementBase,
        type: 'paragraph',
        textFormat: 0,
        children: [textNode(lines.join(' '))],
      })
    }
  }
  return { root: { ...elementBase, type: 'root', children } }
}

interface NormalizeContext {
  payload: Payload
  folderId: number
  tenantSlug: string
}

/**
 * Keeps only the fields the block config defines, shaped the way Payload
 * stores them: image URLs become Media ids, rich text strings become Lexical,
 * groups and arrays are walked. Unknown keys (and any `id`) are dropped.
 */
async function normalizeFields(
  fields: Field[],
  input: Record<string, unknown>,
  ctx: NormalizeContext,
): Promise<Record<string, unknown>> {
  const out: Record<string, unknown> = {}
  for (const field of dataFields(fields)) {
    if (!('name' in field) || !field.name) continue
    const value = input[field.name]
    if (value === undefined || value === null) continue

    switch (field.type) {
      case 'upload': {
        const ref =
          typeof value === 'string' || typeof value === 'number'
            ? String(value).trim()
            : typeof value === 'object' && typeof (value as { url?: unknown }).url === 'string'
              ? (value as { url: string }).url.trim()
              : ''
        if (!ref) break
        const id = await resolveImageToMediaId(ctx.payload, ref, ctx.folderId, ctx.tenantSlug)
        if (id) out[field.name] = id
        break
      }
      case 'richText':
        if (typeof value === 'string') out[field.name] = stringToLexical(value)
        else if (typeof value === 'object' && 'root' in value) out[field.name] = value
        break
      case 'group':
        if (typeof value === 'object' && !Array.isArray(value)) {
          out[field.name] = await normalizeFields(
            field.fields,
            value as Record<string, unknown>,
            ctx,
          )
        }
        break
      case 'array':
        if (Array.isArray(value)) {
          out[field.name] = await Promise.all(
            value
              .filter((row) => row && typeof row === 'object')
              .map((row) => normalizeFields(field.fields, row as Record<string, unknown>, ctx)),
          )
        }
        break
      case 'text':
      case 'textarea':
        out[field.name] = typeof value === 'string' ? value : String(value)
        break
      default:
        out[field.name] = value
    }
  }
  return out
}

export interface ImportPagePayload {
  title: string
  slug: string
  /** The subfolder the page goes in, e.g. "cob/services". */
  folderPath: string
  seo?: {
    title?: string
    description?: string
  }
  blocks: Array<{
    component: string
    [key: string]: unknown
  }>
}

/**
 * POST /api/pages/import: creates a page in `folderPath` from the JSON the
 * import modal sends (or updates the page there with the same slug). The
 * accepted components are the folder's tenant's blocks (importableBlocksFor),
 * the same list the modal's "Copy AI prompt" describes.
 */
export async function importPageHandler(req: PayloadRequest): Promise<Response> {
  const { payload, user } = req
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = ((await req.json?.()) || {}) as Partial<ImportPagePayload>
    const { title, slug, folderPath, seo, blocks } = body

    if (!title || !slug) {
      return Response.json({ error: 'Missing required fields: title, slug' }, { status: 400 })
    }
    if (!folderPath || !folderPathsFor('pages').includes(folderPath)) {
      return Response.json(
        { error: `"${folderPath ?? ''}" is not a folder that holds pages.` },
        { status: 400 },
      )
    }
    if (!Array.isArray(blocks) || blocks.length === 0) {
      return Response.json({ error: 'Blocks must be a non-empty array' }, { status: 400 })
    }

    const folderRes = await payload.find({
      collection: 'folders',
      where: { path: { equals: folderPath } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    const folderDoc = folderRes.docs[0]
    if (!folderDoc) {
      return Response.json({ error: `Folder "${folderPath}" not found.` }, { status: 404 })
    }
    const folderId = folderDoc.id
    const tenantSlug = folderPath.split('/')[0]

    const allowed = new Map<string, Block>(
      importableBlocksFor(tenantSlug).map((block) => [block.slug, block]),
    )

    const ctx: NormalizeContext = { payload, folderId, tenantSlug }
    const layoutBlocks = []
    for (const [index, rawBlock] of blocks.entries()) {
      const component = String(rawBlock?.component ?? '')
      const blockType = COMPONENT_NAME_MAP[component] || component
      const config = allowed.get(blockType)
      if (!config) {
        return Response.json(
          {
            error: `Block ${index + 1}: "${component}" is not a component of ${folderPath}. Copy the AI prompt from this folder to see the ones that are.`,
          },
          { status: 400 },
        )
      }
      layoutBlocks.push({
        blockType,
        ...withDefaultButtons(
          tenantSlug,
          config.fields,
          await normalizeFields(config.fields, rawBlock, ctx),
        ),
      })
    }

    const existingPage = await payload.find({
      collection: 'pages',
      where: {
        and: [{ slug: { equals: slug } }, { folder: { equals: folderId } }, notTemplate],
      },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    const data = {
      title,
      slug,
      folder: folderId,
      layout: layoutBlocks,
      // Imported pages go live straight away; the collection's afterChange hook
      // then queues the publish.
      _status: 'published',
      ...(seo ? { seo: { title: seo.title, description: seo.description } } : {}),
    }

    const pageDoc =
      existingPage.docs.length > 0
        ? await payload.update({
            collection: 'pages',
            id: existingPage.docs[0].id,
            data: data as never,
            overrideAccess: true,
          })
        : await payload.create({
            collection: 'pages',
            data: data as never,
            overrideAccess: true,
          })

    return Response.json({
      success: true,
      id: pageDoc.id,
      slug: pageDoc.slug,
      folderPath,
      blocksCount: layoutBlocks.length,
      updated: existingPage.docs.length > 0,
    })
  } catch (err) {
    req.payload.logger.error({ err, msg: 'Error in importPageHandler' })
    const message = err instanceof Error ? err.message : 'Internal server error'
    return Response.json({ error: message }, { status: 500 })
  }
}
