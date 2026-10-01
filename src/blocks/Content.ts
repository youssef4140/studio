import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { blockStyles } from '@/fields/blockStyles'
import { studioLexicalFeatures } from '@/fields/studioLexical'

// allowedIn: page, layout
// The rich text editor, as a block — an intro paragraph, explanatory body copy,
// the kind of substantive text search engines actually read. Used in Pages and
// Articles alike. No BlocksFeature here: a block embedding blocks would break
// the brief's no-arbitrary-nesting rule (§6).
//
// Only the label is "Rich Text Editor". The slug stays `content`: it is stored
// in the database and keyed on in Block.tsx, BLOCK_APPEARANCE and the tenant
// tags, so renaming it would need a data migration for no gain.
export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: {
    singular: 'Rich Text Editor',
    plural: 'Rich Text Editors',
  },
  admin: {
    images: {
      thumbnail: { url: '/block-thumbnails/content.svg', alt: 'Rich Text Editor block preview' },
    },
  },
  fields: [
    {
      name: 'body',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) =>
          studioLexicalFeatures({ defaultFeatures, headingSizes: ['h2', 'h3', 'h4'] }),
      }),
    },
    ...blockStyles,
  ],
}
