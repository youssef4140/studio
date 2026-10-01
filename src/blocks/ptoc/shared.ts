import type { Field } from 'payload'

import { tenantBlock } from '../articleFields'

export { button, image, longText, metaFields, richText, text } from '../articleFields'

/**
 * ptofthecity's article blocks, built from the "PTOC articles" section of the
 * Figma `components` file. One block per Figma variant, so the picker shows
 * exactly what the editor gets. Styling is in src/render/assets/ptofthecity.css.
 */
export const ptocBlock = (block: {
  slug: string
  group: string
  variant: string
  fields: Field[]
  hints?: Record<string, string>
}) => tenantBlock({ tenant: 'ptofthecity', thumbDir: 'ptoc', ...block })
