import type { Payload } from 'payload'

/**
 * The render/storage address for a document: its tenant's full folder path
 * plus its own slug (e.g. `ptofthecity/services/physical-therapy`). This is
 * NOT a public URL — Studio has no public frontend. It's the key the render
 * route and the publish pipeline's object storage use.
 */
export async function resolveDocAddress(
  payload: Payload,
  doc: { folder?: unknown; slug?: string | null },
): Promise<string> {
  const folderValue = doc.folder
  const folderId =
    folderValue && typeof folderValue === 'object' ? (folderValue as { id: unknown }).id : folderValue

  if (!folderId) {
    throw new Error(`Cannot resolve a render address: document has no folder (slug: ${doc.slug})`)
  }

  const folder = await payload.findByID({
    collection: 'folders',
    id: folderId as string | number,
    depth: 0,
    overrideAccess: true,
  })

  return `${folder.path}/${doc.slug}`
}
