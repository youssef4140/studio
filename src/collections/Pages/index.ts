import type { CollectionConfig } from 'payload'

import { LAYOUT_BLOCKS } from '@/blocks/layoutBlocks'
import { tenantBlockFilter, validateBlockTenants } from '@/blocks/tenantScope'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { compoundUniqueSlug } from '@/fields/compoundUnique'
import { folderScopeFields, syncTenant } from '@/fields/folderScope'
import { seoField } from '@/fields/seo'
import {
  notOnTemplates,
  requiredUnlessTemplate,
  templateEditComponents,
  templateField,
} from '@/fields/template'
import { resolveDocAddress } from '@/publish/address'
import { enqueuePublish, enqueueUnpublish } from '@/publish/enqueue'
import { autoAssignMediaFolder } from '@/media/autoAssignFolder'
import { fromTemplateEndpoint } from '@/templates/fromTemplate'

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
    // Out of the nav and dashboard (routes stay): reached through the tenant
    // dropdowns instead — src/admin/components/TenantNavLinks.
    group: false,
    components: {
      // Under a subfolder list's heading: Create New, blank or from a template.
      Description: '@/admin/components/TemplatePicker#TemplatePicker',
      edit: templateEditComponents,
    },
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
      index: true,
      // Required on a document; a template has no address, so no slug.
      validate: requiredUnlessTemplate(
        compoundUniqueSlug({ collection: 'pages', scopeField: 'folder' }),
      ),
      admin: {
        position: 'sidebar',
        condition: notOnTemplates,
        description: 'Unique within its folder — two tenants can both use the same slug.',
      },
    },
    ...folderScopeFields('pages'),
    templateField,
    {
      name: 'layout',
      type: 'blocks',
      // Payload builds the button as "Add {singular}", so this reads "Add a component".
      labels: { singular: 'a component', plural: 'Components' },
      blocks: LAYOUT_BLOCKS,
      filterOptions: tenantBlockFilter(LAYOUT_BLOCKS),
      admin: {
        initCollapsed: true,
      },
    },
    seoField,
  ],
  // POST /api/pages/from-template/:id — the Create New chooser's "start from a template".
  endpoints: [fromTemplateEndpoint('pages')],
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
        // Templates are starting points, never published (src/fields/template.ts).
        if (doc?.isTemplate) return doc
        const isPublished = doc?._status === 'published'
        const wasPublished = previousDoc?._status === 'published'
        if (isPublished || wasPublished) enqueuePublish('pages', doc.id)
        return doc
      },
      autoAssignMediaFolder,
    ],
    afterDelete: [
      async ({ doc, req }) => {
        if (doc?.folder && doc?.slug && !doc.isTemplate) {
          const address = await resolveDocAddress(req.payload, doc)
          enqueueUnpublish('pages', address)
        }
        return doc
      },
    ],
  },
}
