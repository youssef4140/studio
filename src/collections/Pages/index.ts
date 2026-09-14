import type { CollectionConfig } from 'payload'

import { Hero } from '@/blocks/Hero'
import { Faq } from '@/blocks/Faq'
import { FaqTny } from '@/blocks/FaqTny'
import { EntityList } from '@/blocks/EntityList'
import { Content } from '@/blocks/Content'
import { validateBlockTenants } from '@/blocks/tenantScope'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { compoundUniqueSlug } from '@/fields/compoundUnique'
import { folderScopeFields, syncTenant } from '@/fields/folderScope'
import { resolveDocAddress } from '@/publish/address'
import { enqueuePublish, enqueueUnpublish } from '@/publish/enqueue'

// Landing pages (§1.1): freeform, blocks arranged on a canvas.
// This is the minimal shape from build-order step 5 — title, slug, layout, drafts —
// plus an `seo` group (brought forward from step 12) and folder/tenant scoping
// (Phase 3 of the folders/tenants plan). JSON-LD and the canvas field UI
// (step 14+) still layer on later.
export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    read: authenticatedOrPublished,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'folder', 'slug', 'updatedAt'],
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
      index: true,
      validate: compoundUniqueSlug({ collection: 'pages', scopeField: 'folder' }),
      admin: {
        position: 'sidebar',
        description: 'Unique within its folder — two tenants can both use the same slug.',
      },
    },
    ...folderScopeFields,
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Hero, Content, Faq, FaqTny, EntityList],
      admin: {
        initCollapsed: true,
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
  ],
  versions: {
    drafts: true,
  },
  hooks: {
    beforeValidate: [syncTenant, validateBlockTenants],
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
      async ({ doc, req }) => {
        if (doc?.folder && doc?.slug) {
          const address = await resolveDocAddress(req.payload, doc)
          enqueueUnpublish('pages', address)
        }
        return doc
      },
    ],
  },
}
