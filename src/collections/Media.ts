import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { syncCloudinaryFolderOnMove } from '@/media/cloudinaryStorage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  // Not Payload's native `folders: true` browsing system — that's a separate,
  // polymorphic admin-UX feature with no path/theme concept (see Folders'
  // own doc comment). Media is scoped into the SAME tenant/subfolder tree as
  // Pages/Articles via this relationship, so a folder's edit view (its `media`
  // join field) can list everything that belongs to it.
  admin: {
    defaultColumns: ['filename', 'folder', 'alt', 'updatedAt'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'folder',
      type: 'relationship',
      relationTo: 'folders',
      admin: {
        position: 'sidebar',
        description:
          'Which project/subfolder this belongs to. Left blank on upload — auto-filled the first time this image is used on a page or article.',
      },
    },
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  hooks: {
    // Only ever does anything when CLOUDINARY_URL is set AND this update
    // actually changes `folder` on an already-uploaded doc — see the doc
    // comment on the hook itself for why this can't just live in
    // autoAssignMediaFolder (it also has to catch a superadmin manually
    // re-filing a Media doc, not just the first-use backfill).
    beforeChange: [syncCloudinaryFolderOnMove],
  },
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
