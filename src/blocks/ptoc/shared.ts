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

/** Hints for the page blocks' fields, where the article defaults talk about articles. */
const PAGE_HINTS: Record<string, string> = {
  title: 'Page title goes here',
  subtitle: 'A compelling description of the service or program',
  heading: 'Section title goes here',
  quote: '"What the patient said goes here"',
  name: 'Patient name',
  role: 'Patient',
  listLabel: "Label, e.g. What's included",
  'stats.value': '94%',
  'stats.label': 'Success Rate',
  'items.quote': '"What the patient said goes here"',
  'items.name': 'Patient name',
  'items.role': 'Patient',
  'items.question': 'Question goes here',
  'items.answer': 'Answer goes here',
}

/**
 * ptofthecity's page blocks (Programs, Conditions, Services), built from the
 * "PTOC programs and services" section of the same Figma file. Their slugs
 * start `ptocPg` to stay clear of the article set's.
 */
export const ptocPageBlock = ({
  hints,
  ...block
}: {
  slug: string
  group: string
  variant: string
  fields: Field[]
  hints?: Record<string, string>
}) => ptocBlock({ ...block, hints: { ...PAGE_HINTS, ...hints } })
