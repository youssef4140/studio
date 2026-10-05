import type { Block, Field } from 'payload'

import { button, image, longText, ptocPageBlock, text } from './shared'

/** A repeating set of rows inside a block. */
const rows = (name: string, singular: string, plural: string, fields: Field[]): Field => ({
  name,
  type: 'array',
  labels: { singular, plural },
  fields,
})

// ---- Hero ----

const heroFields = [
  text('eyebrow'),
  text('title', undefined, true),
  longText('subtitle'),
  button('primaryButton', 'Primary button'),
  button('secondaryButton', 'Secondary button'),
  image('image'),
]

const hero: Block[] = [
  ptocPageBlock({
    slug: 'ptocPgHeroRight',
    group: 'Hero',
    variant: 'Image Right',
    fields: heroFields,
  }),
  ptocPageBlock({
    slug: 'ptocPgHeroLeft',
    group: 'Hero',
    variant: 'Image Left',
    fields: heroFields,
  }),
  ptocPageBlock({
    slug: 'ptocPgHeroCenter',
    group: 'Hero',
    variant: 'Centered',
    fields: heroFields,
  }),
]

// ---- Features ----

const featureFields = [
  text('eyebrow'),
  text('heading'),
  rows('items', 'Feature', 'Features', [
    image('icon'),
    text('title', undefined, true),
    longText('text'),
  ]),
]

const featureHints = {
  'items.title': 'Feature name goes here',
  'items.text': 'Brief description of this feature or benefit',
}

const features: Block[] = [
  ptocPageBlock({
    slug: 'ptocPgFeat4',
    group: 'Features',
    variant: '4 Cards',
    fields: featureFields,
    hints: featureHints,
  }),
  ptocPageBlock({
    slug: 'ptocPgFeat3',
    group: 'Features',
    variant: '3 Cards',
    fields: featureFields,
    hints: featureHints,
  }),
  ptocPageBlock({
    slug: 'ptocPgFeatList',
    group: 'Features',
    variant: 'Icon List',
    fields: featureFields,
    hints: featureHints,
  }),
]

// ---- About ----

const stats = rows('stats', 'Stat', 'Stats', [
  text('value', undefined, true),
  text('label', undefined, true),
])

const aboutText = [text('eyebrow'), text('heading'), longText('text'), stats]

const aboutHints = {
  text: 'A paragraph describing the approach, the team or what sets it apart',
}

const about: Block[] = [
  ptocPageBlock({
    slug: 'ptocPgAboutRight',
    group: 'About',
    variant: 'Image Right',
    fields: [...aboutText, image('image')],
    hints: aboutHints,
  }),
  ptocPageBlock({
    slug: 'ptocPgAboutLeft',
    group: 'About',
    variant: 'Image Left',
    fields: [...aboutText, image('image')],
    hints: aboutHints,
  }),
  ptocPageBlock({
    slug: 'ptocPgAboutText',
    group: 'About',
    variant: 'No Image',
    fields: aboutText,
    hints: aboutHints,
  }),
]

// ---- Testimonials ----

const person = [image('avatar'), text('name'), text('role')]

const testimonialCards = [
  text('eyebrow'),
  text('heading'),
  rows('items', 'Testimonial', 'Testimonials', [longText('quote', undefined, true), ...person]),
]

const testimonials: Block[] = [
  ptocPageBlock({
    slug: 'ptocPgTesti3',
    group: 'Testimonials',
    variant: '3 Cards',
    fields: testimonialCards,
  }),
  ptocPageBlock({
    slug: 'ptocPgTesti2',
    group: 'Testimonials',
    variant: '2 Cards',
    fields: testimonialCards,
  }),
  ptocPageBlock({
    slug: 'ptocPgTestiOne',
    group: 'Testimonials',
    variant: 'Single Quote',
    fields: [text('eyebrow'), longText('quote', undefined, true), ...person],
  }),
]

// ---- Call to Action ----

const ctaHints = {
  heading: 'Call to action heading goes here',
  text: 'A sentence or two encouraging the reader to act',
}

const callToAction: Block[] = [
  ptocPageBlock({
    slug: 'ptocPgCtaDark',
    group: 'Call to Action',
    variant: 'Full Width Dark',
    fields: [
      text('heading', undefined, true),
      longText('text'),
      button('primaryButton', 'Primary button'),
      button('secondaryButton', 'Secondary button'),
      image('bgImage', 'Background image'),
    ],
    hints: ctaHints,
  }),
  ptocPageBlock({
    slug: 'ptocPgCtaLight',
    group: 'Call to Action',
    variant: 'Compact Light',
    fields: [text('heading', undefined, true), longText('text'), button('button', 'Button')],
    hints: ctaHints,
  }),
  ptocPageBlock({
    slug: 'ptocPgCtaBanner',
    group: 'Call to Action',
    variant: 'Banner',
    fields: [
      text('heading', undefined, true),
      longText('text'),
      button('button', 'Button'),
      image('bgImage', 'Background image'),
    ],
    hints: ctaHints,
  }),
]

// ---- Program Details ----

const programFields = [
  text('eyebrow'),
  text('heading'),
  longText('text'),
  stats,
  text('listLabel', 'Checklist label'),
  rows('items', 'Item', 'Items', [text('text', undefined, true)]),
  image('image'),
]

const programHints = {
  text: 'A sentence or two about how the program is structured',
  'stats.value': '8 Weeks',
  'stats.label': 'Duration',
  'items.text': 'Something the program includes',
}

const programDetails: Block[] = [
  ptocPageBlock({
    slug: 'ptocPgProgDark',
    group: 'Program Details',
    variant: 'Dark',
    fields: [...programFields, image('bgImage', 'Background image')],
    hints: programHints,
  }),
  ptocPageBlock({
    slug: 'ptocPgProgLight',
    group: 'Program Details',
    variant: 'Light',
    fields: programFields,
    hints: programHints,
  }),
]

// ---- Info List ----

const points = (singular: string, plural: string) =>
  rows('items', singular, plural, [text('title', undefined, true), longText('text')])

const questions = rows('items', 'Question', 'Questions', [
  text('question', undefined, true),
  longText('answer'),
])

const infoList: Block[] = [
  ptocPageBlock({
    slug: 'ptocPgInfoList',
    group: 'Info List',
    variant: 'Bullet List',
    fields: [text('heading'), longText('text'), points('Item', 'Items')],
    hints: {
      text: 'A brief introduction to what this section covers',
      'items.title': 'List item title goes here',
      'items.text': 'A sentence explaining this item',
    },
  }),
  ptocPageBlock({
    slug: 'ptocPgInfoSteps',
    group: 'Info List',
    variant: 'Numbered Steps',
    fields: [text('heading'), points('Step', 'Steps')],
    hints: {
      'items.title': 'Step name goes here',
      'items.text': 'A sentence explaining this step',
    },
  }),
  ptocPageBlock({
    slug: 'ptocPgInfoFaq',
    group: 'Info List',
    variant: 'Accordion',
    fields: [text('heading'), questions],
  }),
]

// ---- FAQ ----

const faq: Block[] = [
  ptocPageBlock({
    slug: 'ptocPgFaq',
    group: 'FAQ',
    variant: 'Cards',
    fields: [text('heading'), longText('text'), questions],
    hints: {
      heading: 'Frequently asked questions',
      text: 'A short line introducing the questions',
    },
  }),
]

/** All 21, in the order the picker lists them. */
export const PTOC_PAGE_BLOCKS: Block[] = [
  ...hero,
  ...features,
  ...about,
  ...testimonials,
  ...callToAction,
  ...programDetails,
  ...infoList,
  ...faq,
]
