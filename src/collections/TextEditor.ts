import type { CollectionConfig } from 'payload'

import { ARTICLE_LAYOUT_BLOCKS } from '@/blocks/layoutBlocks'
import { tenantBlockFilter, validateBlockTenants } from '@/blocks/tenantScope'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { compoundUniqueSlug } from '@/fields/compoundUnique'
import { folderScopeFields, syncTenant } from '@/fields/folderScope'
import { resolveDocAddress } from '@/publish/address'
import { enqueuePublish, enqueueUnpublish } from '@/publish/enqueue'
import { seoField } from '@/fields/seo'
import { autoAssignMediaFolder } from '@/media/autoAssignFolder'

/**
 * Articles (§1.3): the same shape as Pages — title, a `layout` blocks array,
 * SEO. Long-form prose is the Rich Text Editor block (src/blocks/Content.ts),
 * so renderBlocks() has a single code path (see src/render/renderBlocks.tsx).
 */
export const TextEditor: CollectionConfig<'textEditor'> = {
  slug: 'textEditor',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  access: {
    read: authenticatedOrPublished,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'folder', 'slug', 'publishedAt', 'updatedAt'],
    // Out of the nav and dashboard (routes stay): reached through the tenant
    // dropdowns instead — src/admin/components/TenantNavLinks.
    group: false,
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
      validate: compoundUniqueSlug({ collection: 'textEditor', scopeField: 'folder' }),
      admin: {
        position: 'sidebar',
        description: 'Unique within its folder — two tenants can both use the same slug.',
      },
    },
    ...folderScopeFields('articles'),
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      // Payload builds the button as "Add {singular}", so this reads "Add a component".
      labels: { singular: 'a component', plural: 'Components' },
      blocks: ARTICLE_LAYOUT_BLOCKS,
      filterOptions: tenantBlockFilter(ARTICLE_LAYOUT_BLOCKS),
      admin: {
        initCollapsed: true,
      },
    },
    seoField,
  ],
  versions: {
    drafts: true,
  },
  hooks: {
    beforeValidate: [syncTenant, validateBlockTenants],
    afterChange: [
      ({ doc, previousDoc }) => {
        const isPublished = doc?._status === 'published'
        const wasPublished = previousDoc?._status === 'published'
        if (isPublished || wasPublished) enqueuePublish('textEditor', doc.id)
        return doc
      },
      autoAssignMediaFolder,
    ],
    afterDelete: [
      async ({ doc, req }) => {
        if (doc?.folder && doc?.slug) {
          const address = await resolveDocAddress(req.payload, doc)
          enqueueUnpublish('textEditor', address)
        }
        return doc
      },
    ],
  },
}
