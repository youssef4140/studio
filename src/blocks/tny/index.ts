import type { Block, Field } from 'payload'

import {
  button,
  image,
  longText,
  metaFields,
  richText,
  tenantBlock,
  text,
} from '../articleFields'

/**
 * TNY's article blocks, built from the "TNY articles" section of the Figma
 * `components` file. One block per Figma variant, so the picker shows exactly
 * what the editor gets. Styling is in src/render/assets/tny.css.
 */
const tnyBlock = (block: {
  slug: string
  group: string
  variant: string
  fields: Field[]
  hints?: Record<string, string>
}) => tenantBlock({ tenant: 'tny', thumbDir: 'tny', ...block })

// ---- Text Editor (Figma "Body Text") ----

const textEditor: Block[] = [
  tnyBlock({
    slug: 'tnyBodySingle',
    group: 'Text Editor',
    variant: 'Single Column',
    fields: [richText('body', 'Text', true)],
  }),
  tnyBlock({
    slug: 'tnyBodyLead',
    group: 'Text Editor',
    variant: 'Lead Paragraph',
    fields: [richText('lead', 'Lead paragraph'), richText('body', 'Text')],
  }),
  tnyBlock({
    slug: 'tnyBodyTwoCol',
    group: 'Text Editor',
    variant: 'Two Columns',
    fields: [richText('body', 'Left column'), richText('body2', 'Right column')],
    hints: { body: 'First column text goes here' },
  }),
  tnyBlock({
    slug: 'tnyBodyCallout',
    group: 'Text Editor',
    variant: 'With Callout',
    fields: [
      richText('body', 'Text before the callout'),
      text('calloutLabel', 'Callout label'),
      richText('callout', 'Callout'),
      richText('bodyAfter', 'Text after the callout'),
    ],
    hints: { body: 'Body text before the callout goes here' },
  }),
  tnyBlock({
    slug: 'tnyBodySidebar',
    group: 'Text Editor',
    variant: 'With Sidebar',
    fields: [
      richText('body', 'Text'),
      text('sideLabel', 'Sidebar label'),
      richText('side', 'Sidebar'),
    ],
  }),
  tnyBlock({
    slug: 'tnyBodyDropCap',
    group: 'Text Editor',
    variant: 'Drop Cap',
    fields: [richText('body', 'Text', true)],
    hints: { body: 'Body text goes here; its first letter is drawn large' },
  }),
]

// ---- Hero ----

const heroText = [text('eyebrow'), text('title', undefined, true), longText('subtitle')]

const heroSplitFields = [...heroText, image('image'), ...metaFields]

const hero: Block[] = [
  tnyBlock({
    slug: 'tnyHeroImage',
    group: 'Hero',
    variant: 'Image Background',
    fields: [...heroText, image('bgImage', 'Background image'), ...metaFields],
  }),
  tnyBlock({
    slug: 'tnyHeroSplit',
    group: 'Hero',
    variant: 'Split, Image Right',
    fields: heroSplitFields,
  }),
  tnyBlock({
    slug: 'tnyHeroSplitLeft',
    group: 'Hero',
    variant: 'Split, Image Left',
    fields: heroSplitFields,
  }),
  tnyBlock({
    slug: 'tnyHeroText',
    group: 'Hero',
    variant: 'Text Only',
    fields: [...heroText, ...metaFields],
  }),
]

// ---- Blockquote ----

const quoteFields = [longText('quote', undefined, true), text('attribution')]

const blockquote: Block[] = [
  tnyBlock({ slug: 'tnyQuoteSimple', group: 'Blockquote', variant: 'Simple', fields: quoteFields }),
  tnyBlock({
    slug: 'tnyQuotePull',
    group: 'Blockquote',
    variant: 'Pull Quote',
    fields: quoteFields,
  }),
  tnyBlock({
    slug: 'tnyQuoteBox',
    group: 'Blockquote',
    variant: 'Highlighted',
    fields: quoteFields,
  }),
]

// ---- Image Block ----

const imageWithText = [image('image'), text('heading'), longText('text')]

const imageTextHints = {
  heading: 'Supporting headline goes here',
  text: 'Text that gives context for the image',
}

const imageBlock: Block[] = [
  tnyBlock({
    slug: 'tnyImageFull',
    group: 'Image Block',
    variant: 'Full Width',
    fields: [image('image'), text('caption')],
  }),
  tnyBlock({
    slug: 'tnyImageTwoUp',
    group: 'Image Block',
    variant: 'Two Up',
    fields: [image('image', 'First image'), image('image2', 'Second image'), text('caption')],
  }),
  tnyBlock({
    slug: 'tnyImageText',
    group: 'Image Block',
    variant: 'With Text, Image Left',
    fields: imageWithText,
    hints: imageTextHints,
  }),
  tnyBlock({
    slug: 'tnyTextImage',
    group: 'Image Block',
    variant: 'With Text, Image Right',
    fields: imageWithText,
    hints: imageTextHints,
  }),
]

// ---- Section Header ----

const sectionHeader: Block[] = [
  tnyBlock({
    slug: 'tnyHeaderLarge',
    group: 'Section Header',
    variant: 'Large',
    fields: [text('heading', undefined, true), longText('subheading')],
  }),
  tnyBlock({
    slug: 'tnyHeaderMedium',
    group: 'Section Header',
    variant: 'Medium',
    fields: [text('heading', undefined, true), longText('subheading')],
    hints: {
      heading: 'Subsection heading goes here',
      subheading: 'Optional supporting text for this subsection',
    },
  }),
  tnyBlock({
    slug: 'tnyHeaderSmall',
    group: 'Section Header',
    variant: 'Small',
    fields: [text('heading', undefined, true)],
    hints: { heading: 'Minor heading goes here' },
  }),
  tnyBlock({
    slug: 'tnyHeaderLabel',
    group: 'Section Header',
    variant: 'With Label',
    fields: [text('label'), text('heading', undefined, true)],
  }),
]

// ---- Call to Action ----

const ctaHints = {
  heading: 'Call to action heading goes here',
  text: 'A sentence or two encouraging the reader to act',
}

const callToAction: Block[] = [
  tnyBlock({
    slug: 'tnyCtaBanner',
    group: 'Call to Action',
    variant: 'Banner',
    fields: [
      text('heading', undefined, true),
      longText('text'),
      button('primaryButton', 'Primary button'),
      button('secondaryButton', 'Secondary button'),
    ],
    hints: ctaHints,
  }),
  tnyBlock({
    slug: 'tnyCtaInline',
    group: 'Call to Action',
    variant: 'Inline',
    fields: [text('heading', undefined, true), longText('text'), button('button', 'Button')],
    hints: ctaHints,
  }),
  tnyBlock({
    slug: 'tnyCtaMinimal',
    group: 'Call to Action',
    variant: 'Minimal',
    fields: [text('label'), button('link', 'Link')],
    hints: { label: 'Short line of text before the link' },
  }),
]

// ---- List ----

const listFields: Field[] = [
  {
    name: 'items',
    type: 'array',
    labels: { singular: 'Item', plural: 'Items' },
    fields: [text('text', undefined, true)],
  },
]

const list: Block[] = [
  tnyBlock({ slug: 'tnyListBullets', group: 'List', variant: 'Bullets', fields: listFields }),
  tnyBlock({ slug: 'tnyListNumbered', group: 'List', variant: 'Numbered', fields: listFields }),
  tnyBlock({ slug: 'tnyListChecklist', group: 'List', variant: 'Checklist', fields: listFields }),
]

// ---- Divider ----

const divider: Block[] = [
  tnyBlock({ slug: 'tnyDividerLine', group: 'Divider', variant: 'Line', fields: [] }),
  tnyBlock({ slug: 'tnyDividerAccent', group: 'Divider', variant: 'Accent', fields: [] }),
  tnyBlock({ slug: 'tnyDividerBand', group: 'Divider', variant: 'Brand Band', fields: [] }),
  tnyBlock({ slug: 'tnyDividerSpace', group: 'Divider', variant: 'Space', fields: [] }),
]

// ---- Author Card ----

const authorCard: Block[] = [
  tnyBlock({
    slug: 'tnyAuthorRow',
    group: 'Author Card',
    variant: 'Horizontal',
    fields: [image('avatar'), text('label'), text('name', undefined, true), longText('bio')],
    hints: { label: 'Label above the name, e.g. Written by' },
  }),
  tnyBlock({
    slug: 'tnyAuthorCard',
    group: 'Author Card',
    variant: 'Card',
    fields: [image('avatar'), text('name', undefined, true), longText('bio')],
  }),
]

// ---- Related Articles ----

const relatedHints = { heading: 'Heading for the related articles' }

const relatedArticles: Block[] = [
  tnyBlock({
    slug: 'tnyRelGrid',
    group: 'Related Articles',
    variant: 'Grid',
    fields: [
      text('heading'),
      {
        name: 'items',
        type: 'array',
        labels: { singular: 'Article', plural: 'Articles' },
        fields: [
          image('image'),
          text('category'),
          text('title', undefined, true),
          longText('excerpt'),
          text('readTime', 'Read time'),
          text('href', 'Link'),
        ],
      },
    ],
    hints: relatedHints,
  }),
  tnyBlock({
    slug: 'tnyRelList',
    group: 'Related Articles',
    variant: 'List',
    fields: [
      text('heading'),
      {
        name: 'items',
        type: 'array',
        labels: { singular: 'Article', plural: 'Articles' },
        fields: [
          image('image'),
          text('title', undefined, true),
          longText('description'),
          text('readTime', 'Read time'),
          text('href', 'Link'),
        ],
      },
    ],
    hints: relatedHints,
  }),
]

/** All 35, in the order the picker lists them. */
export const TNY_ARTICLE_BLOCKS: Block[] = [
  ...textEditor,
  ...hero,
  ...blockquote,
  ...imageBlock,
  ...sectionHeader,
  ...callToAction,
  ...list,
  ...divider,
  ...authorCard,
  ...relatedArticles,
]
