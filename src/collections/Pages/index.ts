import type { CollectionConfig } from 'payload'

import { Hero } from '@/blocks/Hero'
import { Faq } from '@/blocks/Faq'
import { EntityList } from '@/blocks/EntityList'

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
}
