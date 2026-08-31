import type { CollectionConfig } from 'payload'

import { Hero } from '@/blocks/Hero'
import { Faq } from '@/blocks/Faq'
import { EntityList } from '@/blocks/EntityList'
import { enqueuePublish, enqueueUnpublish } from '@/publish/enqueue'

// Landing pages (§1.1): freeform, blocks arranged on a canvas.
// This is the minimal shape from build-order step 5 — title, slug, layout, drafts.
// SEO / JSON-LD (step 12) and the canvas field UI (step 14+) layer on later.
export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    read: ({ req }) => Boolean(req.user) || { _status: { equals: 'published' } },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  defaultPopulate: {
    title: true,
    slug: true,
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
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Hero, Faq, EntityList],
      admin: {
        initCollapsed: true,
      },
    },
  ],
  versions: {
    drafts: true,
  },
  hooks: {
    // Publish pipeline (step 9). Fire-and-forget onto the BullMQ queue; the
    // worker renders the envelope and writes it to object storage. Enqueue on
    // any change to a published doc AND on the published->draft transition (so
    // the artifact gets pulled).
    afterChange: [
      ({ doc, previousDoc }) => {
        const isPublished = doc?._status === 'published'
        const wasPublished = previousDoc?._status === 'published'
        if (isPublished || wasPublished) enqueuePublish('pages', doc.id)
        return doc
      },
    ],
    afterDelete: [
      ({ doc }) => {
        if (doc?.slug) enqueueUnpublish('pages', doc.slug)
        return doc
      },
    ],
  },
}
