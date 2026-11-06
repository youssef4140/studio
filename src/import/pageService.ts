import path from 'path'
import type { Block, Field, Payload } from 'payload'

import { COMPONENT_NAME_MAP } from '@/collections/Pages/schemaMap'
import { notTemplate } from '@/fields/template'
import { folderPathsFor } from '@/tenants'
import { getServerSideURL } from '@/utilities/getURL'

import { dataFields, importableBlocksFor } from './importableBlocks'

/**
 * Everything that creates, reads, edits, unpublishes or deletes a Page from
 * import JSON. Two callers share it, so behaviour is identical: the admin's
 * "Import Page JSON" popup (src/collections/Pages/importHandler.ts, session
 * auth) and the keyed API for content teams' AIs (src/app/api/import, scoped
 * keys: src/import/auth.ts).
 */

/** An error with an HTTP status and, for validation, the list of problems. */
export class ImportError extends Error {
  constructor(
    message: string,
    public status = 400,
    public issues: string[] = [],
  ) {
    super(message)
  }
}

interface Issues {
  errors: string[]
  warnings: string[]
  /** Optional fields left empty, as paths like `blocks[0].eyebrow` (grouped for the response). */
  unfilled: string[]
  /** Image fields left empty, as paths; reported separately so the AI can tell the user where images belong. */
  imageSlots: string[]
}

interface Ctx {
  payload: Payload
  folderId: number
  tenantSlug: string
  dryRun: boolean
  issues: Issues
}

/** Keys an imported block may carry that are not content fields. */
const META_KEYS = new Set(['component', 'blockType', 'blockName', 'id', 'hideOn'])

/**
 * Where a tenant's relative image paths (`/images/x.jpg`) are fetched from. A
 * tenant not listed here needs absolute image URLs.
 */
const SITE_ORIGINS: Record<string, string> = {
  cob: 'https://www.cobsolution.com',
}

/**
 * Buttons a tenant's imported pages get when the JSON doesn't set them. Applied
 * to every block that has the field: a block's `button` field (the single
 * button of the light and banner Call to Action) takes the primary default.
 * A label or link the JSON does give is kept; only the missing part is filled.
 */
interface ButtonValue {
  label: string
  href: string
}
const BUTTON_DEFAULTS: Record<string, { primary: ButtonValue; secondary: ButtonValue }> = {
  ptofthecity: {
    primary: { label: 'Book an Appointment', href: '/booking' },
    secondary: { label: 'Check Eligibility', href: '/insurances' },
  },
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const adminPageURL = (id: number | string) =>
  `${getServerSideURL()}/admin/collections/pages/${id}`

// ---------------------------------------------------------------- folders

export interface ResolvedFolder {
  id: number
  tenantSlug: string
  path: string
}

/** What a scoped key may reach: exactly these page folders. */
export interface KeyScope {
  folders: string[]
}

/**
 * The page folder for `folderPath` (e.g. "ptofthecity/programs"). With a
 * `scope` (a key's), any other folder is refused.
 */
export async function resolveFolder(
  payload: Payload,
  folderPath: unknown,
  scope?: KeyScope,
): Promise<ResolvedFolder> {
  if (typeof folderPath !== 'string' || !folderPathsFor('pages').includes(folderPath)) {
    throw new ImportError(`"${String(folderPath ?? '')}" is not a folder that holds pages.`, 400)
  }
  const tenantSlug = folderPath.split('/')[0]
  if (scope && !scope.folders.includes(folderPath)) {
    throw new ImportError(
      `This key cannot use the folder "${folderPath}". It can use: ${scope.folders.join(', ')}.`,
      403,
    )
  }
  const res = await payload.find({
    collection: 'folders',
    where: { path: { equals: folderPath } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const folder = res.docs[0]
  if (!folder) throw new ImportError(`Folder "${folderPath}" not found.`, 404)
  return { id: folder.id as number, tenantSlug, path: folderPath }
}

// ----------------------------------------------------------------- images

/**
 * Downloads an image URL into the Media collection and returns its id. A file
 * already imported under the same name is reused.
 */
export async function resolveImageToMediaId(
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
    if (existing.docs.length > 0) return existing.docs[0].id as number

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
    return mediaDoc.id as number
  } catch (err) {
    payload.logger.error({ err, msg: `Error importing image ${imageUrl}` })
    return null
  }
}

// -------------------------------------------------------------- rich text

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
export function stringToLexical(value: string) {
  const children: unknown[] = []
  for (const chunk of value.replace(/\r\n/g, '\n').split(/\n\s*\n/)) {
    const lines = chunk
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
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

type LexicalNode = { type?: string; tag?: string; text?: string; format?: number; children?: LexicalNode[] }

const plainText = (nodes: LexicalNode[] | undefined): string | null => {
  let out = ''
  for (const node of nodes ?? []) {
    if (node.type !== 'text' || node.format) return null
    out += node.text ?? ''
  }
  return out
}

/**
 * Rich text as the plain string `stringToLexical` reads, when it is only
 * paragraphs, headings and bullets of unformatted text. Anything richer
 * (bold, links, images, numbered lists) returns null: the caller keeps the raw
 * Lexical object, which an import passes through untouched, so an edit never
 * flattens formatting.
 */
export function lexicalToString(value: unknown): string | null {
  const root = (value as { root?: LexicalNode } | null)?.root
  if (!root?.children) return null
  const parts: string[] = []
  for (const node of root.children) {
    if (node.type === 'paragraph') {
      const text = plainText(node.children)
      if (text === null) return null
      if (text.trim()) parts.push(text)
    } else if (node.type === 'heading' && /^h[2-4]$/.test(node.tag ?? '')) {
      const text = plainText(node.children)
      if (text === null) return null
      parts.push(`${'#'.repeat(Number(node.tag?.[1]))} ${text}`)
    } else if (node.type === 'list' && (node as { listType?: string }).listType === 'bullet') {
      const items: string[] = []
      for (const item of node.children ?? []) {
        const text = plainText(item.children)
        if (text === null) return null
        items.push(`- ${text}`)
      }
      parts.push(items.join('\n'))
    } else {
      return null
    }
  }
  return parts.join('\n\n')
}

// ------------------------------------------------------------- normalizing

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isEmpty = (value: unknown) =>
  value === undefined || value === null || (typeof value === 'string' && !value.trim())

/**
 * Keeps only the fields the block config defines, shaped the way Payload
 * stores them: image URLs become Media ids, rich text strings become Lexical,
 * groups and arrays are walked. Problems are collected in `ctx.issues`: a
 * missing required field (unless `partial`, an edit that sets only some
 * fields) is an error, an unknown key a warning and is dropped.
 */
async function normalizeFields(
  fields: Field[],
  input: Record<string, unknown>,
  ctx: Ctx,
  where: string,
  partial = false,
): Promise<Record<string, unknown>> {
  const out: Record<string, unknown> = {}
  const known = new Set<string>()

  for (const field of dataFields(fields)) {
    if (!('name' in field) || !field.name) continue
    known.add(field.name)
    const value = input[field.name]
    const at = `${where}${field.name}`

    if (isEmpty(value) && !(field.type === 'array' && Array.isArray(value))) {
      if (field.type === 'upload') {
        if (!partial) ctx.issues.imageSlots.push(at)
      } else if (!partial && 'required' in field && field.required) {
        ctx.issues.errors.push(`${at} is required`)
      } else if (!partial && !META_KEYS.has(field.name) && !hasDefault(ctx.tenantSlug, field)) {
        ctx.issues.unfilled.push(at)
      }
      continue
    }

    switch (field.type) {
      case 'upload': {
        const ref =
          typeof value === 'string' || typeof value === 'number'
            ? String(value).trim()
            : isObject(value) && (typeof value.id === 'number' || typeof value.id === 'string')
              ? String(value.id)
              : isObject(value) && typeof value.url === 'string'
                ? value.url.trim()
                : ''
        if (!ref) {
          ctx.issues.errors.push(`${at} must be an image URL or a media id`)
          break
        }
        if (ctx.dryRun) {
          if (!/^(\d+|https?:\/\/.+|\/.+)$/.test(ref)) {
            ctx.issues.errors.push(`${at} must be an image URL (https://...) or a media id`)
          }
          out[field.name] = ref
          break
        }
        const id = await resolveImageToMediaId(ctx.payload, ref, ctx.folderId, ctx.tenantSlug)
        if (id) out[field.name] = id
        else ctx.issues.warnings.push(`${at}: the image "${ref}" could not be fetched and was left empty`)
        break
      }
      case 'richText':
        if (typeof value === 'string') out[field.name] = stringToLexical(value)
        else if (isObject(value) && 'root' in value) out[field.name] = value
        else ctx.issues.errors.push(`${at} must be text (or a Lexical object read from this page)`)
        break
      case 'group':
        if (isObject(value)) {
          out[field.name] = await normalizeFields(field.fields, value, ctx, `${at}.`, partial)
        } else {
          ctx.issues.errors.push(`${at} must be an object`)
        }
        break
      case 'array':
        if (Array.isArray(value)) {
          const rows: Record<string, unknown>[] = []
          for (const [index, row] of value.entries()) {
            if (!isObject(row)) {
              ctx.issues.errors.push(`${at}[${index}] must be an object`)
              continue
            }
            rows.push(await normalizeFields(field.fields, row, ctx, `${at}[${index}].`, false))
          }
          out[field.name] = rows
        } else {
          ctx.issues.errors.push(`${at} must be a list`)
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

  for (const key of Object.keys(input)) {
    if (!known.has(key) && !META_KEYS.has(key)) {
      ctx.issues.warnings.push(`${where}${key} is not a field here and was ignored`)
    }
  }
  return out
}

/** A button group the tenant's defaults fill in, so leaving it out is not a gap. */
const hasDefault = (tenantSlug: string, field: Field) =>
  field.type === 'group' &&
  'name' in field &&
  ['primaryButton', 'secondaryButton', 'button'].includes(field.name) &&
  Boolean(BUTTON_DEFAULTS[tenantSlug])

/**
 * `blocks[0].eyebrow`, `blocks[0].items[1].text`... as one line per block:
 * `blocks[0] (ptocPgHeroRight): eyebrow, subtitle, image`. What a dry run hands
 * back so the AI sees the optional fields it left empty and can fill the ones
 * the content supports (and, for images, tell the user where they belong).
 */
function summarizeUnfilled(paths: string[], blockTypes: string[]): string[] {
  const byBlock = new Map<string, string[]>()
  for (const full of paths) {
    const match = /^(blocks\[(\d+)\])\.(.+)$/.exec(full)
    if (!match) continue
    const list = byBlock.get(match[1]) ?? []
    // Rows repeat the same fields; name each field once, as `items.text`.
    const field = match[3].replace(/\[\d+\]/g, '')
    if (!list.includes(field)) list.push(field)
    byBlock.set(match[1], list)
  }
  return [...byBlock.entries()].map(([block, fields]) => {
    const type = blockTypes[Number(/\d+/.exec(block)?.[0])]
    return `${block}${type ? ` (${type})` : ''}: ${fields.join(', ')}`
  })
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

const allowedBlocks = (tenantSlug: string) =>
  new Map<string, Block>(importableBlocksFor(tenantSlug).map((block) => [block.slug, block]))

type StoredBlock = { blockType: string; id?: string } & Record<string, unknown>

/** A new block from import JSON (`component` plus fields), or null with an issue noted. */
async function buildBlock(
  raw: unknown,
  ctx: Ctx,
  allowed: Map<string, Block>,
  where: string,
): Promise<StoredBlock | null> {
  if (!isObject(raw)) {
    ctx.issues.errors.push(`${where} must be an object with a "component"`)
    return null
  }
  const component = String(raw.component ?? '')
  const blockType = COMPONENT_NAME_MAP[component] || component
  const config = allowed.get(blockType)
  if (!config) {
    ctx.issues.errors.push(
      `${where}: "${component}" is not a component you can use here. Read the guide for the list.`,
    )
    return null
  }
  const fields = await normalizeFields(config.fields, raw, ctx, `${where}.`)
  return { blockType, ...withDefaultButtons(ctx.tenantSlug, config.fields, fields) }
}

async function buildLayout(blocks: unknown, ctx: Ctx): Promise<StoredBlock[]> {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    ctx.issues.errors.push('blocks must be a non-empty list')
    return []
  }
  const allowed = allowedBlocks(ctx.tenantSlug)
  const layout: StoredBlock[] = []
  for (const [index, raw] of blocks.entries()) {
    const block = await buildBlock(raw, ctx, allowed, `blocks[${index}]`)
    if (block) layout.push(block)
  }
  return layout
}

const newCtx = (
  payload: Payload,
  folder: ResolvedFolder,
  dryRun: boolean,
): Ctx => ({
  payload,
  folderId: folder.id,
  tenantSlug: folder.tenantSlug,
  dryRun,
  issues: { errors: [], warnings: [], unfilled: [], imageSlots: [] },
})

const seoData = (seo: unknown) =>
  isObject(seo)
    ? {
        seo: {
          ...(typeof seo.title === 'string' ? { title: seo.title } : {}),
          ...(typeof seo.description === 'string' ? { description: seo.description } : {}),
        },
      }
    : {}

// -------------------------------------------------------------------- pages

interface PageDoc {
  id: number
  title?: string
  slug?: string
  _status?: string | null
  updatedAt?: string
  seo?: { title?: string | null; description?: string | null } | null
  layout?: StoredBlock[] | null
}

async function findPage(payload: Payload, folderId: number, slug: string) {
  const res = await payload.find({
    collection: 'pages',
    where: { and: [{ slug: { equals: slug } }, { folder: { equals: folderId } }, notTemplate] },
    limit: 1,
    depth: 0,
    draft: true,
    overrideAccess: true,
  })
  return (res.docs[0] as unknown as PageDoc | undefined) ?? null
}

const requirePage = async (payload: Payload, folder: ResolvedFolder, slug: unknown) => {
  if (typeof slug !== 'string' || !slug) throw new ImportError('slug is required', 400)
  const page = await findPage(payload, folder.id, slug)
  if (!page) throw new ImportError(`No page "${slug}" in ${folder.path}.`, 404)
  return page
}

export interface SaveResult {
  ok: boolean
  dryRun: boolean
  updated?: boolean
  id?: number
  slug?: string
  folderPath: string
  status?: string
  blocksCount?: number
  adminUrl?: string
  errors: string[]
  warnings: string[]
  /** Optional text fields left empty, per block. Fill the ones the content has something for. */
  unfilled?: string[]
  /** Image fields left empty, per block. Not to be filled; tell the user an image belongs there. */
  imagesNeeded?: string[]
}

async function save(
  payload: Payload,
  folder: ResolvedFolder,
  existing: PageDoc | null,
  data: Record<string, unknown>,
  publish: boolean,
): Promise<PageDoc> {
  const body = { ...data, folder: folder.id, _status: publish ? 'published' : 'draft' }
  // A draft save writes a version only, so a live page keeps serving until it is published.
  const draft = !publish
  return (existing
    ? await payload.update({
        collection: 'pages',
        id: existing.id,
        data: body as never,
        draft,
        overrideAccess: true,
      })
    : await payload.create({
        collection: 'pages',
        data: body as never,
        draft,
        overrideAccess: true,
      })) as unknown as PageDoc
}

export interface UpsertInput {
  title?: unknown
  slug?: unknown
  folderPath?: unknown
  seo?: unknown
  blocks?: unknown
  publish?: boolean
  dryRun?: boolean
}

/**
 * Creates a page in `folderPath`, or replaces the layout of the page there
 * with the same slug. Published unless `publish` is false; with `dryRun`,
 * validates and reports without writing or downloading images.
 */
export async function upsertPage(
  payload: Payload,
  input: UpsertInput,
  scope?: KeyScope,
): Promise<SaveResult> {
  const folder = await resolveFolder(payload, input.folderPath, scope)
  const dryRun = input.dryRun === true
  const ctx = newCtx(payload, folder, dryRun)

  const title = typeof input.title === 'string' ? input.title.trim() : ''
  const slug = typeof input.slug === 'string' ? input.slug.trim() : ''
  if (!title) ctx.issues.errors.push('title is required')
  if (!slug) ctx.issues.errors.push('slug is required')
  else if (!SLUG_PATTERN.test(slug)) {
    ctx.issues.errors.push('slug must be lowercase letters, numbers and dashes, e.g. "pelvic-floor-therapy"')
  }

  const layout = await buildLayout(input.blocks, ctx)
  const { errors, warnings } = ctx.issues
  const blockTypes = (Array.isArray(input.blocks) ? input.blocks : []).map((raw) =>
    isObject(raw) ? (COMPONENT_NAME_MAP[String(raw.component)] ?? String(raw.component)) : '',
  )
  const unfilled = summarizeUnfilled(ctx.issues.unfilled, blockTypes)
  const imagesNeeded = summarizeUnfilled(ctx.issues.imageSlots, blockTypes)
  const base = { dryRun, folderPath: folder.path, errors, warnings, unfilled, imagesNeeded, slug }

  if (ctx.issues.errors.length > 0) return { ok: false, ...base }

  const existing = await findPage(payload, folder.id, slug)
  if (dryRun) {
    return { ok: true, ...base, updated: Boolean(existing), blocksCount: layout.length }
  }

  const page = await save(
    payload,
    folder,
    existing,
    { title, slug, layout, ...seoData(input.seo) },
    input.publish !== false,
  )
  return {
    ok: true,
    ...base,
    updated: Boolean(existing),
    id: page.id,
    status: page._status ?? undefined,
    blocksCount: layout.length,
    adminUrl: adminPageURL(page.id),
  }
}

// ------------------------------------------------------------------ reading

type Json = Record<string, unknown>

/** One stored block's fields as import JSON (the inverse of normalizeFields). */
function exportFields(fields: Field[], stored: Json): Json {
  const out: Json = {}
  for (const field of dataFields(fields)) {
    if (!('name' in field) || !field.name) continue
    const value = stored[field.name]
    if (value === undefined || value === null) continue
    if (field.type === 'richText') {
      out[field.name] = lexicalToString(value) ?? value
    } else if (field.type === 'upload') {
      out[field.name] = isObject(value) ? value.id : value
    } else if (field.type === 'group' && isObject(value)) {
      out[field.name] = exportFields(field.fields, value)
    } else if (field.type === 'array' && Array.isArray(value)) {
      out[field.name] = value.map((row) => exportFields(field.fields, row as Json))
    } else {
      out[field.name] = value
    }
  }
  return out
}

function exportBlock(block: StoredBlock, allowed: Map<string, Block>): Json {
  const config = allowed.get(block.blockType)
  const { blockType, id, blockName, ...rest } = block
  return {
    id,
    component: blockType,
    ...(typeof blockName === 'string' && blockName ? { blockName } : {}),
    ...(config ? exportFields(config.fields, rest) : rest),
  }
}

/** Ids used by upload fields anywhere in an exported block, to look their URLs up. */
function mediaIdsIn(fields: Field[], data: Json, into: Set<number>) {
  for (const field of dataFields(fields)) {
    if (!('name' in field) || !field.name) continue
    const value = data[field.name]
    if (field.type === 'upload' && typeof value === 'number') into.add(value)
    else if (field.type === 'group' && isObject(value)) mediaIdsIn(field.fields, value, into)
    else if (field.type === 'array' && Array.isArray(value)) {
      for (const row of value) if (isObject(row)) mediaIdsIn(field.fields, row, into)
    }
  }
}

/** One page as import JSON (blocks carry their `id`), or the folder's page list. */
export async function readPages(
  payload: Payload,
  folderPath: unknown,
  slug: unknown,
  scope?: KeyScope,
) {
  const folder = await resolveFolder(payload, folderPath, scope)

  if (!slug) {
    const res = await payload.find({
      collection: 'pages',
      where: { and: [{ folder: { equals: folder.id } }, notTemplate] },
      limit: 200,
      depth: 0,
      draft: true,
      sort: 'title',
      overrideAccess: true,
    })
    return {
      folder: folder.path,
      pages: (res.docs as unknown as PageDoc[]).map((doc) => ({
        slug: doc.slug,
        title: doc.title,
        status: doc._status,
        updatedAt: doc.updatedAt,
        blocks: doc.layout?.length ?? 0,
      })),
    }
  }

  const page = await requirePage(payload, folder, slug)
  const allowed = allowedBlocks(folder.tenantSlug)
  const layout = page.layout ?? []

  const mediaIds = new Set<number>()
  for (const block of layout) {
    const config = allowed.get(block.blockType)
    if (config) mediaIdsIn(config.fields, block, mediaIds)
  }
  const media: Record<string, { url: string; alt?: string }> = {}
  if (mediaIds.size > 0) {
    const found = await payload.find({
      collection: 'media',
      where: { id: { in: [...mediaIds] } },
      limit: mediaIds.size,
      depth: 0,
      overrideAccess: true,
    })
    for (const doc of found.docs as unknown as { id: number; url?: string; alt?: string }[]) {
      const url = doc.url ?? ''
      media[String(doc.id)] = {
        url: url.startsWith('/') ? `${getServerSideURL()}${url}` : url,
        ...(doc.alt ? { alt: doc.alt } : {}),
      }
    }
  }

  return {
    folder: folder.path,
    title: page.title,
    slug: page.slug,
    status: page._status,
    adminUrl: adminPageURL(page.id),
    seo: { title: page.seo?.title ?? undefined, description: page.seo?.description ?? undefined },
    blocks: layout.map((block) => exportBlock(block, allowed)),
    // An image field holds a media id; this says what each one is.
    media,
  }
}

// ------------------------------------------------------------------ editing

export type PatchOp =
  | { op: 'update'; id?: string; index?: number; fields: Json }
  | { op: 'insert'; index?: number; block: Json }
  | { op: 'remove'; id?: string; index?: number }
  | { op: 'move'; id?: string; index?: number; to: number }

export interface PatchInput {
  folderPath?: unknown
  slug?: unknown
  title?: unknown
  seo?: unknown
  ops?: unknown
  publish?: boolean
  dryRun?: boolean
}

/** Group values merge into what is stored; lists, rich text and plain values replace it. */
function mergeStored(existing: Json, patch: Json): Json {
  const out = { ...existing }
  for (const [key, value] of Object.entries(patch)) {
    const current = existing[key]
    out[key] =
      isObject(value) && isObject(current) && !('root' in value) ? mergeStored(current, value) : value
  }
  return out
}

/**
 * Edits a page in place with small operations, so "change this heading" or
 * "add an image to that component" does not mean regenerating the page.
 * Blocks are addressed by `id` (from a read) or `index`. A failed op fails the
 * whole edit; nothing is saved unless every op is valid.
 */
export async function patchPage(
  payload: Payload,
  input: PatchInput,
  scope?: KeyScope,
): Promise<SaveResult> {
  const folder = await resolveFolder(payload, input.folderPath, scope)
  const dryRun = input.dryRun === true
  const ctx = newCtx(payload, folder, dryRun)
  const page = await requirePage(payload, folder, input.slug)
  const allowed = allowedBlocks(folder.tenantSlug)

  const layout: StoredBlock[] = [...(page.layout ?? [])]
  const ops = Array.isArray(input.ops) ? (input.ops as PatchOp[]) : []
  if (!Array.isArray(input.ops)) ctx.issues.errors.push('ops must be a list')
  if (ops.length === 0 && !input.title && !input.seo && Array.isArray(input.ops)) {
    ctx.issues.errors.push('nothing to change: give ops, title or seo')
  }

  const locate = (op: { id?: string; index?: number }, where: string): number => {
    const at =
      typeof op.id === 'string'
        ? layout.findIndex((block) => block.id === op.id)
        : typeof op.index === 'number'
          ? op.index
          : -1
    if (at < 0 || at >= layout.length) {
      ctx.issues.errors.push(`${where}: no such block (give the block's id or a valid index)`)
      return -1
    }
    return at
  }

  for (const [n, op] of ops.entries()) {
    const where = `ops[${n}]`
    if (!isObject(op)) {
      ctx.issues.errors.push(`${where} must be an object`)
      continue
    }
    switch (op.op) {
      case 'update': {
        const at = locate(op, where)
        if (at < 0) break
        const block = layout[at]
        const config = allowed.get(block.blockType)
        if (!config || !isObject(op.fields)) {
          ctx.issues.errors.push(`${where}: fields must be an object of this component's fields`)
          break
        }
        const patch = await normalizeFields(config.fields, op.fields, ctx, `${where}.fields.`, true)
        layout[at] = mergeStored(block, patch) as StoredBlock
        break
      }
      case 'insert': {
        const built = await buildBlock(op.block, ctx, allowed, `${where}.block`)
        if (!built) break
        const index = typeof op.index === 'number' ? Math.min(Math.max(op.index, 0), layout.length) : layout.length
        layout.splice(index, 0, built)
        break
      }
      case 'remove': {
        const at = locate(op, where)
        if (at >= 0) layout.splice(at, 1)
        break
      }
      case 'move': {
        const at = locate(op, where)
        if (at < 0) break
        if (typeof op.to !== 'number' || op.to < 0 || op.to >= layout.length) {
          ctx.issues.errors.push(`${where}: "to" must be a position from 0 to ${layout.length - 1}`)
          break
        }
        layout.splice(op.to, 0, ...layout.splice(at, 1))
        break
      }
      default:
        ctx.issues.errors.push(`${where}: op must be update, insert, remove or move`)
    }
  }
  if (layout.length === 0) ctx.issues.errors.push('a page needs at least one block')

  const base = {
    dryRun,
    folderPath: folder.path,
    slug: page.slug,
    errors: ctx.issues.errors,
    warnings: ctx.issues.warnings,
  }
  if (ctx.issues.errors.length > 0) return { ok: false, ...base }
  if (dryRun) return { ok: true, ...base, updated: true, blocksCount: layout.length }

  const title = typeof input.title === 'string' && input.title.trim() ? input.title.trim() : page.title
  const saved = await save(
    payload,
    folder,
    page,
    {
      title,
      slug: page.slug,
      layout,
      ...(input.seo ? seoData({ ...page.seo, ...(input.seo as Json) }) : {}),
    },
    input.publish !== false,
  )
  return {
    ok: true,
    ...base,
    updated: true,
    id: saved.id,
    status: saved._status ?? undefined,
    blocksCount: layout.length,
    adminUrl: adminPageURL(saved.id),
  }
}

// ------------------------------------------------------- unpublish / delete

/** Takes a page offline: it goes back to a draft and the publish worker pulls its artifact. */
export async function unpublishPage(
  payload: Payload,
  input: { folderPath?: unknown; slug?: unknown },
  scope?: KeyScope,
) {
  const folder = await resolveFolder(payload, input.folderPath, scope)
  const page = await requirePage(payload, folder, input.slug)
  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { _status: 'draft' } as never,
    overrideAccess: true,
  })
  return { ok: true, folderPath: folder.path, slug: page.slug, status: 'draft', id: page.id }
}

/** Deletes a page and its versions; the collection's hook removes its published artifact. */
export async function deletePage(
  payload: Payload,
  input: { folderPath?: unknown; slug?: unknown },
  scope?: KeyScope,
) {
  const folder = await resolveFolder(payload, input.folderPath, scope)
  const page = await requirePage(payload, folder, input.slug)
  await payload.delete({ collection: 'pages', id: page.id, overrideAccess: true })
  return { ok: true, folderPath: folder.path, slug: page.slug, deleted: true }
}
