import type { Block } from 'payload'

import { button, image, longText, metaFields, ptocBlock, richText, text } from './shared'

// ---- Text Editor (Figma "Body Text") ----

const textEditor: Block[] = [
  ptocBlock({
    slug: 'ptocBodySingle',
    group: 'Text Editor',
    variant: 'Single Column',
    fields: [richText('body', 'Text', true)],
  }),
  ptocBlock({
    slug: 'ptocBodyLead',
    group: 'Text Editor',
    variant: 'Lead Paragraph',
    fields: [richText('lead', 'Lead paragraph'), richText('body', 'Text')],
  }),
  ptocBlock({
    slug: 'ptocBodyTwoCol',
    group: 'Text Editor',
    variant: 'Two Columns',
    fields: [richText('body', 'Left column'), richText('body2', 'Right column')],
    hints: { body: 'First column text goes here' },
  }),
  ptocBlock({
    slug: 'ptocBodyCallout',
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
  ptocBlock({
    slug: 'ptocBodySidebar',
    group: 'Text Editor',
    variant: 'With Sidebar',
    fields: [
      richText('body', 'Text'),
      text('sideLabel', 'Sidebar label'),
      richText('side', 'Sidebar'),
    ],
  }),
  ptocBlock({
    slug: 'ptocBodyDropCap',
    group: 'Text Editor',
    variant: 'Drop Cap',
    fields: [richText('body', 'Text', true)],
    hints: { body: 'Body text goes here; its first letter is drawn large' },
  }),
]

// ---- Hero ----

const heroText = [text('eyebrow'), text('title', undefined, true), longText('subtitle')]

const heroSplitFields = [...heroText, button('button', 'Button'), image('image'), ...metaFields]

const hero: Block[] = [
  ptocBlock({
    slug: 'ptocHeroImage',
    group: 'Hero',
    variant: 'Image Background',
    fields: [...heroText, image('bgImage', 'Background image'), ...metaFields],
  }),
  ptocBlock({
    slug: 'ptocHeroSplit',
    group: 'Hero',
    variant: 'Split, Image Right',
    fields: heroSplitFields,
  }),
  ptocBlock({
    slug: 'ptocHeroSplitLeft',
    group: 'Hero',
    variant: 'Split, Image Left',
    fields: heroSplitFields,
  }),
  ptocBlock({
    slug: 'ptocHeroText',
    group: 'Hero',
    variant: 'Text Only',
    fields: [...heroText, ...metaFields],
  }),
]

// ---- Blockquote ----

const quoteFields = [longText('quote', undefined, true), text('attribution')]

const blockquote: Block[] = [
  ptocBlock({
    slug: 'ptocQuoteSimple',
    group: 'Blockquote',
    variant: 'Simple',
    fields: quoteFields,
  }),
  ptocBlock({
    slug: 'ptocQuotePull',
    group: 'Blockquote',
    variant: 'Pull Quote',
    fields: [...quoteFields, image('bgImage', 'Background image')],
  }),
  ptocBlock({
    slug: 'ptocQuoteBox',
    group: 'Blockquote',
    variant: 'Highlighted',
    fields: quoteFields,
  }),
]

// ---- Image Block ----

const imageWithText = [image('image'), text('heading'), longText('text')]

const imageBlock: Block[] = [
  ptocBlock({
    slug: 'ptocImageFull',
    group: 'Image Block',
    variant: 'Full Width',
    fields: [image('image'), text('caption')],
  }),
  ptocBlock({
    slug: 'ptocImageTwoUp',
    group: 'Image Block',
    variant: 'Two Up',
    fields: [image('image', 'First image'), image('image2', 'Second image'), text('caption')],
  }),
  ptocBlock({
    slug: 'ptocImageText',
    group: 'Image Block',
    variant: 'With Text, Image Left',
    fields: imageWithText,
    hints: {
      heading: 'Heading goes here',
      text: 'Text that sits beside the image',
    },
  }),
  ptocBlock({
    slug: 'ptocTextImage',
    group: 'Image Block',
    variant: 'With Text, Image Right',
    fields: imageWithText,
    hints: {
      heading: 'Heading goes here',
      text: 'Text that sits beside the image',
    },
  }),
]

// ---- Section Header ----

const sectionHeader: Block[] = [
  ptocBlock({
    slug: 'ptocHeaderLarge',
    group: 'Section Header',
    variant: 'Large',
    fields: [text('heading', undefined, true), longText('subheading')],
  }),
  ptocBlock({
    slug: 'ptocHeaderMedium',
    group: 'Section Header',
    variant: 'Medium',
    fields: [text('heading', undefined, true), longText('subheading')],
  }),
  ptocBlock({
    slug: 'ptocHeaderSmall',
    group: 'Section Header',
    variant: 'Small',
    fields: [text('heading', undefined, true)],
  }),
  ptocBlock({
    slug: 'ptocHeaderLabel',
    group: 'Section Header',
    variant: 'With Label',
    fields: [text('label'), text('heading', undefined, true)],
  }),
]

// ---- Call to Action ----

const callToAction: Block[] = [
  ptocBlock({
    slug: 'ptocCtaBanner',
    group: 'Call to Action',
    variant: 'Banner',
    fields: [
      text('heading', undefined, true),
      longText('text'),
      button('primaryButton', 'Primary button'),
      button('secondaryButton', 'Secondary button'),
      image('bgImage', 'Background image'),
    ],
    hints: {
      heading: 'Call to action heading goes here',
      text: 'A sentence or two encouraging the reader to act',
    },
  }),
  ptocBlock({
    slug: 'ptocCtaInline',
    group: 'Call to Action',
    variant: 'Inline',
    fields: [text('heading', undefined, true), longText('text'), button('button', 'Button')],
    hints: {
      heading: 'Call to action heading goes here',
      text: 'A sentence or two encouraging the reader to act',
    },
  }),
  ptocBlock({
    slug: 'ptocCtaMinimal',
    group: 'Call to Action',
    variant: 'Minimal',
    fields: [text('label'), button('link', 'Link')],
    hints: {
      label: 'Short line of text before the link',
    },
  }),
]

// ---- List ----

const listFields = [
  {
    name: 'items',
    type: 'array' as const,
    labels: { singular: 'Item', plural: 'Items' },
    fields: [text('text', undefined, true)],
  },
]

const list: Block[] = [
  ptocBlock({ slug: 'ptocListBullets', group: 'List', variant: 'Bullets', fields: listFields }),
  ptocBlock({ slug: 'ptocListNumbered', group: 'List', variant: 'Numbered', fields: listFields }),
  ptocBlock({ slug: 'ptocListChecklist', group: 'List', variant: 'Checklist', fields: listFields }),
]

// ---- Divider ----

const divider: Block[] = [
  ptocBlock({ slug: 'ptocDividerLine', group: 'Divider', variant: 'Line', fields: [] }),
  ptocBlock({ slug: 'ptocDividerAccent', group: 'Divider', variant: 'Accent', fields: [] }),
  ptocBlock({ slug: 'ptocDividerBand', group: 'Divider', variant: 'Brand Band', fields: [] }),
  ptocBlock({ slug: 'ptocDividerSpace', group: 'Divider', variant: 'Space', fields: [] }),
]

// ---- Author Card ----

const authorCard: Block[] = [
  ptocBlock({
    slug: 'ptocAuthorRow',
    group: 'Author Card',
    variant: 'Horizontal',
    fields: [image('avatar'), text('label'), text('name', undefined, true), longText('bio')],
    hints: {
      label: 'Label above the name, e.g. Written by',
    },
  }),
  ptocBlock({
    slug: 'ptocAuthorCard',
    group: 'Author Card',
    variant: 'Card',
    fields: [
      image('avatar'),
      text('name', undefined, true),
      longText('bio'),
      image('bgImage', 'Background image'),
    ],
  }),
]

// ---- Related Articles ----

const relatedArticles: Block[] = [
  ptocBlock({
    slug: 'ptocRelGrid',
    group: 'Related Articles',
    variant: 'Grid',
    fields: [
      text('eyebrow'),
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
    hints: {
      eyebrow: 'Short label above the heading',
      heading: 'Heading for the related articles',
    },
  }),
  ptocBlock({
    slug: 'ptocRelList',
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
    hints: {
      heading: 'Heading for the related articles',
    },
  }),
]

/** All 35, in the order the picker lists them. */
export const PTOC_ARTICLE_BLOCKS: Block[] = [
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
