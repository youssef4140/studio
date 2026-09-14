import type { Block } from 'payload'

import { blockStyles } from '@/fields/blockStyles'

// allowedIn: page, article, layout
export const Faq: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  admin: {
    images: {
      thumbnail: { url: '/block-thumbnails/faq.svg', alt: 'FAQ block preview' },
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'note',
      type: 'textarea',
      admin: {
        description: 'Optional note shown above the questions.',
      },
    },
    {
      name: 'items',
      type: 'array',
      labels: {
        singular: 'Question',
        plural: 'Questions',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Surface this question above the rest.',
          },
        },
      ],
    },
    ...blockStyles,
  ],
}
