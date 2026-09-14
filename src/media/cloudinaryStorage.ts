import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import type { Adapter } from '@payloadcms/plugin-cloud-storage/types'
import type { CollectionBeforeChangeHook, Payload } from 'payload'

/**
 * Opt-in: Media uploads go to Cloudinary only when CLOUDINARY_URL is set (the
 * Node SDK auto-configures cloud_name/api_key/api_secret from that single env
 * var on import). Unset = local disk, unchanged from before this file existed.
 */
export function isCloudinaryConfigured(): boolean {
  return Boolean(process.env.CLOUDINARY_URL)
}

const ROOT = 'studio'
const UNFILED = '_unfiled'

function idOf(value: unknown): number | undefined {
  if (value === null || value === undefined) return undefined
  const id = typeof value === 'object' ? (value as { id?: unknown }).id : value
  return typeof id === 'number' ? id : undefined
}

/**
 * Cloudinary folder for a Media doc's CURRENT `folder` relationship, e.g.
 * `studio/ptofthecity/articles` — mirrors Folders' own `path` field exactly.
 * Falls back to `studio/_unfiled` when the doc has no folder yet (the common
 * case at raw-upload time, before "assign on first use" runs — see
 * src/media/autoAssignFolder.ts).
 */
export async function resolveCloudinaryFolder(payload: Payload, folderValue: unknown): Promise<string> {
  const folderId = idOf(folderValue)
  if (!folderId) return `${ROOT}/${UNFILED}`
  const folder = await payload.findByID({
    collection: 'folders',
    id: folderId,
    depth: 0,
    overrideAccess: true,
  })
  return `${ROOT}/${folder.path}`
}

function basenameWithoutExt(filename: string): string {
  return path.parse(filename).name
}

function publicIdFor(cloudinaryFolder: string, filename: string): string {
  return `${cloudinaryFolder}/${basenameWithoutExt(filename)}`
}

function isImageMime(mimeType: string | null | undefined): boolean {
  return Boolean(mimeType?.startsWith('image/'))
}

/**
 * Physically moves every Cloudinary asset (main file + each generated image
 * size) belonging to `previousDoc` from its old folder to `newCloudinaryFolder`.
 * Called when a Media doc's `folder` field changes after upload — either a
 * superadmin editing it directly, or autoAssignMediaFolder backfilling it on
 * first use. A no-op if the doc was never actually stored on Cloudinary
 * (e.g. uploaded before CLOUDINARY_URL was configured).
 */
export async function moveCloudinaryAssets(
  previousDoc: {
    cloudinaryFolder?: string | null
    filename?: string | null
    mimeType?: string | null
    sizes?: Record<string, { filename?: string | null } | null | undefined> | null
  },
  newCloudinaryFolder: string,
): Promise<void> {
  const oldFolder = previousDoc.cloudinaryFolder
  if (!oldFolder || oldFolder === newCloudinaryFolder) return

  const renames: Array<{ filename: string; resourceType: 'image' | 'raw' }> = []
  if (previousDoc.filename) {
    renames.push({ filename: previousDoc.filename, resourceType: isImageMime(previousDoc.mimeType) ? 'image' : 'raw' })
  }
  for (const size of Object.values(previousDoc.sizes ?? {})) {
    if (size?.filename) renames.push({ filename: size.filename, resourceType: 'image' })
  }

  await Promise.all(
    renames.map(({ filename, resourceType }) =>
      cloudinary.uploader.rename(publicIdFor(oldFolder, filename), publicIdFor(newCloudinaryFolder, filename), {
        resource_type: resourceType,
        overwrite: true,
        invalidate: true,
      }),
    ),
  )
}

/**
 * Reacts to a Media doc's `folder` changing AFTER it's already been uploaded
 * (autoAssignMediaFolder's "first use" backfill, or a superadmin editing the
 * field directly) by physically moving the Cloudinary asset(s) to match —
 * otherwise `cloudinaryFolder` (and therefore every future generateURL call)
 * would disagree with where the file actually lives. No-op when Cloudinary
 * isn't configured, on create (handleUpload already resolves the right
 * folder for a fresh upload), or when `folder` isn't part of this update.
 */
export const syncCloudinaryFolderOnMove: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  operation,
  req,
}) => {
  if (!isCloudinaryConfigured()) return data
  if (operation !== 'update' || !originalDoc?.cloudinaryFolder) return data
  if (!('folder' in data)) return data

  if (idOf(originalDoc.folder) === idOf(data.folder)) return data

  const newCloudinaryFolder = await resolveCloudinaryFolder(req.payload, data.folder)
  if (newCloudinaryFolder === originalDoc.cloudinaryFolder) return data

  await moveCloudinaryAssets(originalDoc, newCloudinaryFolder)
  data.cloudinaryFolder = newCloudinaryFolder
  return data
}

/**
 * Payload's plugin-cloud-storage Adapter contract (see the official S3/GCS/
 * Azure adapters for the reference shape — s3's handleUpload just `return
 * data` and relies entirely on a deterministic generateURL; we follow the
 * same pattern, substituting our own `cloudinaryFolder` field for their
 * static per-collection `prefix`).
 *
 * Deliberately does NOT store a per-file `url`/public-id in nested `sizes.*`
 * custom fields: handleUpload runs once per file (main + each image size) via
 * Promise.all, and the plugin merges all the returned metadata with a
 * shallow object spread — a nested `{ sizes: { x: {...} } }` return from one
 * size would clobber another's in that merge. Keeping the only custom field
 * (`cloudinaryFolder`) at the top level sidesteps that entirely: every call
 * returns the same value, and generateURL/handleDelete reconstruct each
 * file's public_id from that shared folder + that file's own (already
 *-existing) `filename`.
 */
export const cloudinaryAdapter: Adapter = () => ({
  name: 'cloudinary',
  fields: [
    {
      name: 'cloudinaryFolder',
      type: 'text',
      admin: { hidden: true, readOnly: true },
    },
  ],
  generateURL: ({ data, filename }) => {
    const cloudinaryFolder: string = data?.cloudinaryFolder || `${ROOT}/${UNFILED}`
    const publicId = publicIdFor(cloudinaryFolder, filename)
    const isImage = isImageMime(data?.mimeType) || filename !== data?.filename // sizes are always images
    return cloudinary.url(publicId, {
      secure: true,
      resource_type: isImage ? 'image' : 'raw',
      format: isImage ? 'webp' : undefined,
      analytics: false,
    })
  },
  handleUpload: async ({ data, file, req }) => {
    const cloudinaryFolder = await resolveCloudinaryFolder(req.payload, data?.folder)
    const publicId = publicIdFor(cloudinaryFolder, file.filename)
    const isImage = isImageMime(file.mimeType)

    await new Promise<void>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          public_id: publicId,
          resource_type: isImage ? 'image' : 'raw',
          overwrite: true,
          invalidate: true,
          // Incoming transformation — applied before storage, so the stored
          // master asset itself is webp + auto quality, not just a delivery
          // URL param. https://cloudinary.com/documentation/upload_parameters
          ...(isImage ? { transformation: [{ quality: 'auto', format: 'webp' }] } : {}),
        },
        (error) => (error ? reject(error) : resolve()),
      )
      stream.end(file.buffer)
    })

    // Cast: `cloudinaryFolder` is a custom field this adapter injects (see
    // `fields` above) — not part of Payload's generic FileData type, but
    // handleUpload's return is merged into the doc at runtime regardless.
    return { cloudinaryFolder } as unknown as Partial<import('payload').FileData & import('payload').TypeWithID>
  },
  handleDelete: async ({ doc, filename }) => {
    const cloudinaryFolder = (doc as { cloudinaryFolder?: string }).cloudinaryFolder
    if (!cloudinaryFolder) return
    const isMainFile = filename === doc.filename
    const isImage = isMainFile ? isImageMime((doc as { mimeType?: string }).mimeType) : true
    try {
      await cloudinary.uploader.destroy(publicIdFor(cloudinaryFolder, filename), {
        resource_type: isImage ? 'image' : 'raw',
        invalidate: true,
      })
    } catch {
      // Best-effort — a missing remote asset shouldn't block deleting the Payload doc.
    }
  },
  // disablePayloadAccessControl (set where this adapter is registered) means
  // Payload never routes requests through this — url always points straight
  // at the Cloudinary CDN. Required by the Adapter type regardless.
  staticHandler: () => new Response('Not found', { status: 404 }),
})
