import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block, Field } from 'payload'

import { blockStyles } from '@/fields/blockStyles'
import { studioLexicalFeatures } from '@/fields/studioLexical'
import type { TenantSlug } from '@/tenants'

/**
 * What the tenant article sets (src/blocks/ptoc, src/blocks/tny) are built
 * from: one block per Figma variant, tagged to its tenant, with text, rich text
 * and upload fields only. Type, colour and spacing are fixed in the tenant's stylesheet
 * under src/render/assets and are not fields.
 *
 * Slugs stay short on purpose: Postgres caps identifiers at 63 characters and
 * the versions table's `hide_on` enum is named after the slug.
 */
export function tenantBlock({
  tenant,
  thumbDir,
  slug,
  group,
  variant,
  fields,
  hints,
}: {
  tenant: TenantSlug
  /** Folder under public/block-thumbnails holding `<slug>.png`. */
  thumbDir: string
  slug: string
  /** Picker category, and the first half of the label. */
  group: string
  variant: string
  fields: Field[]
  /** Placeholder text for this block's fields, where the defaults in HINTS don't fit. */
  hints?: Record<string, string>
}): Block {
  return {
    slug,
    labels: {
      singular: `${group}: ${variant}`,
      plural: `${group}: ${variant}`,
    },
    custom: {
      studioTenant: tenant,
    },
    admin: {
      group,
      images: {
        thumbnail: {
          url: `/block-thumbnails/${thumbDir}/${slug}.png`,
          alt: `${group}, ${variant} layout`,
        },
      },
    },
    fields: [...withHints(fields, { ...HINTS, ...hints }), ...blockStyles],
  }
}

/**
 * What an empty text field says should go in it, mirroring the sample copy in
 * the block's picker thumbnail. Keyed by field name, or by dotted path for a
 * field inside a group or array (`button.label`, `items.title`); the path wins.
 * These are input placeholders only: nothing is saved or rendered.
 */
const HINTS: Record<string, string> = {
  eyebrow: 'Short label above the title',
  title: 'Article title goes here',
  subtitle: 'A brief subtitle that summarizes the article',
  author: 'Author name',
  date: 'Sep 29, 2026',
  readTime: '8 min read',
  quote: 'The quote goes here',
  attribution: 'Who said it',
  caption: 'Image caption goes here',
  heading: 'Section heading goes here',
  subheading: 'A short line that introduces the section',
  label: 'Short label above the heading',
  text: 'Supporting text goes here',
  name: 'Author name goes here',
  bio: 'A short bio of the author',
  href: 'Where it goes, e.g. /contact or https://…',
  'button.label': 'Button text goes here',
  'primaryButton.label': 'Primary button text goes here',
  'secondaryButton.label': 'Secondary button text goes here',
  'link.label': 'Link text goes here',
  'items.text': 'List item goes here',
  'items.category': 'Category of the related article',
  'items.title': 'Related article title goes here',
  'items.excerpt': 'A brief excerpt from the related article',
  'items.description': 'A brief description of the related article',
  'items.readTime': '5 min read',
  'items.href': 'Link to the related article',
  body: 'Body text goes here',
  body2: 'Second column text goes here',
  bodyAfter: 'Body text after the callout goes here',
  lead: 'Lead paragraph goes here: a larger opening that introduces the text',
  calloutLabel: 'Label, e.g. Key takeaway',
  callout: 'The insight to highlight goes here',
  sideLabel: "Label, e.g. Editor's note",
  side: 'A side note that complements the main text goes here',
}

function withHints(fields: Field[], hints: Record<string, string>, prefix = ''): Field[] {
  return fields.map((field) => {
    if (field.type === 'row') {
      return { ...field, fields: withHints(field.fields, hints, prefix) }
    }
    if (field.type === 'group' || field.type === 'array') {
      const path = 'name' in field && field.name ? `${prefix}${field.name}.` : prefix
      return { ...field, fields: withHints(field.fields, hints, path) } as Field
    }
    if (field.type === 'text' || field.type === 'textarea') {
      const placeholder = hints[`${prefix}${field.name}`] ?? hints[field.name]
      if (placeholder) return { ...field, admin: { ...field.admin, placeholder } } as Field
    }
    if (field.type === 'richText') {
      // The editor shows the hint itself; the preview reads it from `custom`
      // (src/render/placeholders.ts), since the editor config is opaque there.
      const placeholder = hints[`${prefix}${field.name}`] ?? hints[field.name]
      if (placeholder) {
        return {
          ...field,
          editor: proseEditor(placeholder),
          custom: { ...field.custom, studioHint: placeholder },
        } as Field
      }
    }
    return field
  })
}

/** The Rich Text Editor's own editor (src/blocks/Content.ts), optionally with a hint. */
const proseEditor = (placeholder?: string) =>
  lexicalEditor({
    ...(placeholder ? { admin: { placeholder } } : {}),
    features: ({ defaultFeatures }) =>
      studioLexicalFeatures({ defaultFeatures, headingSizes: ['h2', 'h3', 'h4'] }),
  })

/** A full rich text editor: formatting, headings, lists, links and inline images. */
export const richText = (name: string, label?: string, required = false): Field => ({
  name,
  type: 'richText',
  ...(label ? { label } : {}),
  required,
  editor: proseEditor(),
})

export const text = (name: string, label?: string, required = false): Field => ({
  name,
  type: 'text',
  ...(label ? { label } : {}),
  required,
})

export const longText = (name: string, label?: string, required = false): Field => ({
  name,
  type: 'textarea',
  ...(label ? { label } : {}),
  required,
})

export const image = (name: string, label?: string): Field => ({
  name,
  type: 'upload',
  relationTo: 'media',
  ...(label ? { label } : {}),
})

/** A button or link: its text and where it goes. */
export const button = (name: string, label: string): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    { name: 'label', type: 'text' },
    { name: 'href', type: 'text', label: 'Link' },
  ],
})

/** The "Author · Date · Read time" line under a hero. Each part is optional. */
export const metaFields: Field[] = [
  {
    type: 'row',
    fields: [
      { name: 'author', type: 'text' },
      {
        name: 'date',
        type: 'text',
        admin: { description: 'As it should read, e.g. Sep 29, 2026.' },
      },
      { name: 'readTime', type: 'text', admin: { description: 'e.g. 8 min read' } },
    ],
  },
]
