import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { blockStyles } from '@/fields/blockStyles'

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
  fields: [
    {
      name: 'body',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    ...blockStyles,
  ],
}
