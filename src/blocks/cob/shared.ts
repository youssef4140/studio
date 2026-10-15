import type { Field } from 'payload'

import { tenantBlock } from '../articleFields'

export { button, image, longText, metaFields, richText, text } from '../articleFields'

/**
 * COB Website's page blocks, tagged to 'cob'.
 * Slugs start `cobPg` to avoid collisions with any article sets.
 */
export const cobPageBlock = (block: {
  slug: string
  group: string
  variant: string
  fields: Field[]
  hints?: Record<string, string>
}) =>
  tenantBlock({
    tenant: 'cob',
    thumbDir: 'cob',
    ...block,
    hints: {
      eyebrow: 'Rehabilitation Services',
      title: 'Restoring Strength, Movement, and Quality of Life',
      subtitle:
        'Comprehensive physical therapy programs tailored to your recovery goals. Expert therapists, modern equipment, and dedicated support every step of the way.',
      'primaryButton.label': 'Book an Appointment',
      'secondaryButton.label': 'Learn More',
      ...block.hints,
    },
  })

