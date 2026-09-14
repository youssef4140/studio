import type { CollectionAfterChangeHook } from 'payload'

function idOf(value: unknown): number | undefined {
  if (value === null || value === undefined) return undefined
  const id = typeof value === 'object' ? (value as { id?: unknown }).id : value
  return typeof id === 'number' ? id : undefined
}

/**
 * Recursively walks a Lexical editor-state tree collecting referenced media
 * ids — both direct inline uploads (UploadFeature) and uploads nested inside
 * embedded blocks (Hero's `image`, Faq items' `answer` richText). Mirrors the
 * same known-shape-walking approach as src/blocks/tenantScope.ts's
 * collectFromLexical — deliberately NOT a generic structural walk, since that
 * would risk picking up unrelated relationship ids (e.g. `folder`/`tenant`)
 * that happen to collide with a media id in another table.
 */
function collectUploadsFromLexical(node: unknown, acc: Set<number>): void {
  if (!node || typeof node !== 'object') return
  const n = node as {
    type?: string
    value?: unknown
    fields?: { blockType?: string; image?: unknown; items?: Array<{ answer?: unknown }> }
    children?: unknown[]
    root?: unknown
  }

  if (n.type === 'upload') {
    const id = idOf(n.value)
    if (id !== undefined) acc.add(id)
  }

  if (n.type === 'block' && n.fields) {
    if (n.fields.blockType === 'hero') {
      const id = idOf(n.fields.image)
      if (id !== undefined) acc.add(id)
    }
    if (n.fields.blockType === 'faq' && Array.isArray(n.fields.items)) {
      for (const item of n.fields.items) collectUploadsFromLexical(item?.answer, acc)
    }
  }

  if (Array.isArray(n.children)) for (const child of n.children) collectUploadsFromLexical(child, acc)
  if (n.root) collectUploadsFromLexical(n.root, acc)
}

/** Same block-shape knowledge as above, for Pages' flat `layout` array. */
function collectUploadsFromLayout(layout: unknown, acc: Set<number>): void {
  if (!Array.isArray(layout)) return
  for (const block of layout) {
    if (!block || typeof block !== 'object') continue
    const b = block as {
      blockType?: string
      image?: unknown
      body?: unknown
      items?: Array<{ answer?: unknown }>
    }
    if (b.blockType === 'hero') {
      const id = idOf(b.image)
      if (id !== undefined) acc.add(id)
    }
    if (b.blockType === 'content') collectUploadsFromLexical(b.body, acc)
    if (b.blockType === 'faq' && Array.isArray(b.items)) {
      for (const item of b.items) collectUploadsFromLexical(item?.answer, acc)
    }
  }
}

/** Known upload-bearing locations on a Page or Article doc. */
export function collectDocMediaIds(doc: {
  seo?: { image?: unknown }
  featuredImage?: unknown
  layout?: unknown
  content?: unknown
}): number[] {
  const acc = new Set<number>()

  const seoId = idOf(doc.seo?.image)
  if (seoId !== undefined) acc.add(seoId)

  const featuredId = idOf(doc.featuredImage)
  if (featuredId !== undefined) acc.add(featuredId)

  collectUploadsFromLayout(doc.layout, acc)
  if (doc.content) collectUploadsFromLexical(doc.content, acc)

  return [...acc]
}

/**
 * "Assign on first use": when a Page/Article with a folder is saved, any
 * Media it references gets that folder backfilled — but ONLY if the media
 * doc doesn't already have one. This deliberately doesn't overwrite an
 * existing assignment, so reusing one image across multiple folders/tenants
 * doesn't fight itself on every save (last-saved-page-wins would be a worse
 * default than "first use wins").
 */
export const autoAssignMediaFolder: CollectionAfterChangeHook = async ({ doc, req }) => {
  const folderId = idOf(doc?.folder)
  if (!folderId) return doc

  const mediaIds = collectDocMediaIds(doc)
  if (mediaIds.length === 0) return doc

  for (const mediaId of mediaIds) {
    const media = await req.payload.findByID({
      collection: 'media',
      id: mediaId,
      depth: 0,
      overrideAccess: true,
    })
    if (!media?.folder) {
      await req.payload.update({
        collection: 'media',
        id: mediaId,
        data: { folder: folderId },
        overrideAccess: true,
        depth: 0,
      })
    }
  }

  return doc
}
