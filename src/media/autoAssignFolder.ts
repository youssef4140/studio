import type { CollectionAfterChangeHook } from 'payload'

function idOf(value: unknown): number | undefined {
  if (value === null || value === undefined) return undefined
  const id = typeof value === 'object' ? (value as { id?: unknown }).id : value
  return typeof id === 'number' ? id : undefined
}

/**
 * Recursively walks a Lexical editor-state tree collecting inline uploads
 * (UploadFeature) — the Rich Text Editor block's body. Walks
 * only the known node shape, deliberately NOT a generic structural search,
 * since that would risk picking up unrelated relationship ids (e.g.
 * `folder`/`tenant`) that happen to collide with a media id in another table.
 */
function collectUploadsFromLexical(node: unknown, acc: Set<number>): void {
  if (!node || typeof node !== 'object') return
  const n = node as {
    type?: string
    value?: unknown
    children?: unknown[]
    root?: unknown
  }

  if (n.type === 'upload') {
    const id = idOf(n.value)
    if (id !== undefined) acc.add(id)
  }

  if (Array.isArray(n.children))
    for (const child of n.children) collectUploadsFromLexical(child, acc)
  if (n.root) collectUploadsFromLexical(n.root, acc)
}

/** Same block-shape knowledge as above, for a document's flat `layout` array. */
function collectUploadsFromLayout(layout: unknown, acc: Set<number>): void {
  if (!Array.isArray(layout)) return
  for (const block of layout) {
    if (!block || typeof block !== 'object') continue
    const b = block as {
      blockType?: string
      image?: unknown
      image2?: unknown
      bgImage?: unknown
      avatar?: unknown
      body?: unknown
      body2?: unknown
      bodyAfter?: unknown
      lead?: unknown
      callout?: unknown
      side?: unknown
      items?: Array<{ image?: unknown; icon?: unknown; avatar?: unknown }>
    }
    // The tenant sets (src/blocks/ptoc, src/blocks/tny): every upload field they use.
    if (b.blockType?.startsWith('ptoc') || b.blockType?.startsWith('tny')) {
      for (const value of [b.image, b.image2, b.bgImage, b.avatar]) {
        const id = idOf(value)
        if (id !== undefined) acc.add(id)
      }
      if (Array.isArray(b.items)) {
        for (const item of b.items) {
          for (const value of [item?.image, item?.icon, item?.avatar]) {
            const id = idOf(value)
            if (id !== undefined) acc.add(id)
          }
        }
      }
      // Images placed inside their "Text Editor" blocks' rich text.
      for (const value of [b.body, b.body2, b.bodyAfter, b.lead, b.callout, b.side]) {
        collectUploadsFromLexical(value, acc)
      }
    }
    if (b.blockType === 'content') collectUploadsFromLexical(b.body, acc)
  }
}

/** Known upload-bearing locations on a Page or Article doc. */
export function collectDocMediaIds(doc: { seo?: { image?: unknown }; layout?: unknown }): number[] {
  const acc = new Set<number>()

  const seoId = idOf(doc.seo?.image)
  if (seoId !== undefined) acc.add(seoId)

  collectUploadsFromLayout(doc.layout, acc)

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
