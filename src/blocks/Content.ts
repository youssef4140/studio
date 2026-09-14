import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { blockStyles } from '@/fields/blockStyles'
import { studioLexicalFeatures } from '@/fields/studioLexical'

// allowedIn: page, layout
// Plain prose — an intro paragraph, explanatory body copy, the kind of
// substantive text search engines actually read. No BlocksFeature here: a block
// embedding blocks would break the brief's no-arbitrary-nesting rule (§6).
export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: {
    singular: 'Content',
    plural: 'Content',
  },
  admin: {
    images: {
      thumbnail: { url: '/block-thumbnails/content.svg', alt: 'Content block preview' },
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
