import type { Block, Field } from 'payload'

import { button, image, longText, tenantBlock, text } from '../articleFields'

/**
 * TNY's page blocks (Services), built from the sections of a solution page on
 * the TNY website (tnystaffing.com/solutions/physical-therapy). One block per
 * section, in the order the site stacks them. Slugs start `tnyPg` to stay clear
 * of the article set's. Styling is in src/render/assets/tny.css under `tny-pg-*`.
 */
const tnyPageBlock = ({
  hints,
  ...block
}: {
  slug: string
  group: string
  variant: string
  fields: Field[]
  hints?: Record<string, string>
}) => tenantBlock({ tenant: 'tny', thumbDir: 'tny', ...block, hints: { ...PAGE_HINTS, ...hints } })

/**
 * Hints for the page blocks' fields, where the article defaults talk about
 * articles. Most are the site's own copy for the physical therapy page, or
 * the default it shows when a solution leaves a section's label unset.
 */
const PAGE_HINTS: Record<string, string> = {
  eyebrow: 'Short label, e.g. Staffing Solutions',
  title: 'Physical Therapy Staffing',
  heading: 'Section heading goes here',
  text: 'A paragraph or two about this part of the service',
  'items.title': 'Card title goes here',
  'items.text': 'A sentence or two describing this card',
}

/** A repeating set of rows inside a block. */
const rows = (name: string, singular: string, plural: string, fields: Field[]): Field => ({
  name,
  type: 'array',
  labels: { singular, plural },
  fields,
})

const cards = (singular: string, plural: string) =>
  rows('items', singular, plural, [text('title', undefined, true), longText('text')])

const hero = tnyPageBlock({
  slug: 'tnyPgHero',
  group: 'Hero',
  variant: 'Gradient',
  fields: [
    text('eyebrow'),
    text('title', undefined, true),
    longText('intro'),
    button('button', 'Button'),
  ],
  hints: {
    eyebrow: 'Staffing Solutions',
    intro: 'Who you place and how they help, in a sentence or two',
    'button.label': 'Request This Staffing',
    'button.href': '/requestService',
  },
})

const overview = tnyPageBlock({
  slug: 'tnyPgOverview',
  group: 'Overview',
  variant: 'Image Left',
  fields: [
    image('image'),
    text('eyebrow'),
    text('heading'),
    rows('paragraphs', 'Paragraph', 'Paragraphs', [longText('text', undefined, true)]),
  ],
  hints: {
    eyebrow: 'Overview',
    heading: 'What TNY delivers with Physical Therapy Staffing',
    'paragraphs.text': 'A paragraph describing the service',
  },
})

const roles = tnyPageBlock({
  slug: 'tnyPgRoles',
  group: 'Roles',
  variant: 'Numbered Cards',
  fields: [text('eyebrow'), text('heading'), cards('Role', 'Roles')],
  hints: {
    eyebrow: 'Roles We Staff',
    heading: 'The credentials behind this service',
    'items.title': 'Role name goes here',
    'items.text': 'What this role covers, in a sentence',
  },
})

const spotlight = tnyPageBlock({
  slug: 'tnyPgSpotlight',
  group: 'Spotlight',
  variant: 'Image Right',
  fields: [text('eyebrow'), text('heading'), longText('text'), image('image')],
  hints: {
    eyebrow: 'Why it matters',
    heading: 'How TNY supports Physical Therapy teams',
    text: 'The detail that sets this service apart: the outcomes clients can expect and the standards your talent is held to',
  },
})

const focus = tnyPageBlock({
  slug: 'tnyPgFocus',
  group: 'Focus',
  variant: 'Checklist',
  fields: [
    text('eyebrow'),
    text('heading'),
    rows('items', 'Item', 'Items', [text('text', undefined, true)]),
  ],
  hints: {
    eyebrow: 'Clinical Focus',
    heading: 'What our clinicians treat',
    'items.text': 'Something the clinicians treat or do',
  },
})

const settings = tnyPageBlock({
  slug: 'tnyPgSettings',
  group: 'Settings',
  variant: 'Cards',
  fields: [text('eyebrow'), text('heading'), cards('Setting', 'Settings')],
  hints: {
    eyebrow: 'Where They Work',
    heading: 'Settings we place into',
    'items.title': 'Setting name goes here',
    'items.text': 'What the clinicians do in this setting',
  },
})

const why = tnyPageBlock({
  slug: 'tnyPgWhy',
  group: 'Why TNY',
  variant: 'Numbered List',
  fields: [text('eyebrow'), text('heading'), cards('Reason', 'Reasons')],
  hints: {
    eyebrow: 'Why TNY',
    heading: 'Why facilities partner with us',
    'items.title': 'Reason to choose TNY goes here',
    'items.text': 'A sentence or two backing it up',
  },
})

const callToAction = tnyPageBlock({
  slug: 'tnyPgCta',
  group: 'Call to Action',
  variant: 'Dark',
  fields: [
    text('eyebrow'),
    text('heading', undefined, true),
    longText('text'),
    button('primaryButton', 'Primary button'),
    button('secondaryButton', 'Secondary button'),
  ],
  hints: {
    eyebrow: 'Next Steps',
    heading: 'Bring Physical Therapy talent to your team',
    text: 'Tell us about the caseload, setting, and schedule you need to cover.',
    'primaryButton.label': 'Request Staffing',
    'primaryButton.href': '/requestService',
    'secondaryButton.label': 'I’m a Clinician — Apply',
    'secondaryButton.href': '/apply',
  },
})

/** All 8, in the order the site stacks them. */
export const TNY_PAGE_BLOCKS: Block[] = [
  hero,
  overview,
  roles,
  spotlight,
  focus,
  settings,
  why,
  callToAction,
]
