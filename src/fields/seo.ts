import type { Field } from 'payload'

/**
 * Per-document SEO, shared by Pages and Articles. Shown in the edit form as a
 * single "SEO" button that opens a popup (src/admin/components/SeoPopup)
 * instead of an inline group; the fields are ordinary form fields, so they
 * save with the document.
 *
 * `custom` is an editor-added list of name/value pairs. They reach consumers
 * as `head.meta` on the envelope (src/render/head.ts) to be turned into
 * <meta> tags however the consumer likes.
 */
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  admin: {
    components: {
      Field: '@/admin/components/SeoPopup#SeoPopup',
    },
  },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'OG image' },
    {
      name: 'custom',
      type: 'array',
      label: 'Custom fields',
      labels: { singular: 'Field', plural: 'Fields' },
      admin: {
        description: 'Extra name/value pairs passed to the site, e.g. robots = noindex.',
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
  ],
}
