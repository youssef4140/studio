import type { Block } from 'payload'

import { blockStyles } from '@/fields/blockStyles'

// allowedIn: page, article, layout
// TNY's own FAQ variant — a genuinely separate config (not Faq re-themed), per
// Phase 5 of the folders/tenants plan. Tagged to a tenant via `custom` (server
// only — no live canvas yet to filter the picker client-side); enforced by
// src/blocks/tenantScope.ts's beforeValidate hook, not by hiding it from anyone
// else's picker.
export const FaqTny: Block = {
  slug: 'faqTny',
  interfaceName: 'FaqTnyBlock',
  labels: {
    singular: 'FAQ (TNY)',
    plural: 'FAQs (TNY)',
  },
  custom: {
    studioTenant: 'tny',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
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
      ],
    },
    ...blockStyles,
  ],
}
