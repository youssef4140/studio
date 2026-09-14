import type { CollectionConfig } from 'payload'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { Hero } from '@/blocks/Hero'
import { Faq } from '@/blocks/Faq'
import { EntityList } from '@/blocks/EntityList'
import { enqueuePublish, enqueueUnpublish } from '@/publish/enqueue'
import { studioLexicalFeatures } from '@/fields/studioLexical'

/**
 * Articles (§1.3): long-form prose with blocks embedded in the flow.
 *
 * Unlike Pages (a `layout` blocks array), the body here is one `content` Lexical
 * field. Hero / Faq / EntityList are embeddable inline via BlocksFeature and
 * render through the exact same React components as layout blocks — renderBlocks()
 * has a single code path (see src/render/renderBlocks.tsx).
 */
export const TextEditor: CollectionConfig<'textEditor'> = {
  slug: 'textEditor',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  access: {
    read: ({ req }) => Boolean(req.user) || { _status: { equals: 'published' } },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'publishedAt', 'updatedAt'],
  },
  defaultPopulate: {
    title: true,
    slug: true,
    excerpt: true,
    featuredImage: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...studioLexicalFeatures({ defaultFeatures, headingSizes: ['h2', 'h3', 'h4'] }),
          // Same Block configs as Pages.layout — one definition, both surfaces.
          BlocksFeature({ blocks: [Hero, Faq, EntityList] }),
        ],
      }),
    },
  ],
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [
      ({ doc, previousDoc }) => {
        const isPublished = doc?._status === 'published'
        const wasPublished = previousDoc?._status === 'published'
        if (isPublished || wasPublished) enqueuePublish('textEditor', doc.id)
        return doc
      },
    ],
    afterDelete: [
      ({ doc }) => {
        if (doc?.slug) enqueueUnpublish('textEditor', doc.slug)
        return doc
      },
    ],
  },
}
