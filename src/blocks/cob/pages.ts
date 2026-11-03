import type { Block, Field } from 'payload'

import { button, cobPageBlock, image, longText, text } from './shared'

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

export const COB_PAGE_HERO_BLOCKS: Block[] = [
  cobPageBlock({
    slug: 'cobPgHeroLeft',
    group: 'Hero',
    variant: 'Image Left',
    fields: heroFields,
  }),
  cobPageBlock({
    slug: 'cobPgHeroRight',
    group: 'Hero',
    variant: 'Image Right',
    fields: heroFields,
  }),
  cobPageBlock({
    slug: 'cobPgHeroBackground',
    group: 'Hero',
    variant: 'Image Background',
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

const feature3CardFields = [
  text('eyebrow'),
  text('heading'),
  rows('items', 'Feature', 'Features', [
    image('image'),
    text('title', undefined, true),
    longText('text'),
  ]),
]

const featureHints = {
  eyebrow: 'WHY CHOOSE US',
  heading: 'End-to-End Specialised Support',
  'items.title': 'Feature name goes here',
  'items.text': 'Brief description of this feature or benefit',
}

export const COB_PAGE_FEATURE_BLOCKS: Block[] = [
  cobPageBlock({
    slug: 'cobPgFeat4',
    group: 'Features',
    variant: '4 Cards with Icons',
    fields: featureFields,
    hints: featureHints,
  }),
  cobPageBlock({
    slug: 'cobPgFeat3',
    group: 'Features',
    variant: '3 Cards with Images',
    fields: feature3CardFields,
    hints: featureHints,
  }),
  cobPageBlock({
    slug: 'cobPgFeatGrid',
    group: 'Features',
    variant: '2x2 Grid with Icons',
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
  eyebrow: 'ABOUT US',
  heading: 'Dedicated to Excellence in Patient Care',
  text: 'A paragraph describing the approach, the expertise, or what sets the practice apart.',
  'stats.value': '98%',
  'stats.label': 'Satisfaction Rate',
}

const aboutSteps = rows('steps', 'Step', 'Steps', [
  text('number', 'Step Number (e.g. 01, 02)'),
  text('title', undefined, true),
  longText('text'),
])

export const COB_PAGE_ABOUT_BLOCKS: Block[] = [
  cobPageBlock({
    slug: 'cobPgAboutRight',
    group: 'About',
    variant: 'Image Right',
    fields: [...aboutText, image('image')],
    hints: aboutHints,
  }),
  cobPageBlock({
    slug: 'cobPgAboutLeft',
    group: 'About',
    variant: 'Image Left',
    fields: [...aboutText, image('image')],
    hints: aboutHints,
  }),
  cobPageBlock({
    slug: 'cobPgAboutSteps',
    group: 'About',
    variant: 'Dark Steps with Numbers',
    fields: [text('eyebrow'), text('heading'), longText('text'), aboutSteps],
    hints: {
      ...aboutHints,
      'steps.title': 'Step title goes here',
      'steps.text': 'Brief explanation of this step in the process.',
    },
  }),
]

// ---- Testimonials ----

const testimonialItems = rows('testimonials', 'Testimonial', 'Testimonials', [
  longText('quote', 'Quote', true),
  text('author', 'Author Name', true),
  text('role', 'Author Role or Location'),
  image('avatar', 'Author Avatar'),
])

const testimonialHints = {
  eyebrow: 'WHAT OUR CLIENTS SAY',
  heading: 'Trusted by Thousands Worldwide',
  'testimonials.quote': 'The expertise and dedicated service exceeded our expectations at every stage of the journey.',
  'testimonials.author': 'Sarah Jenkins',
  'testimonials.role': 'Director of Operations',
}

export const COB_PAGE_TESTIMONIAL_BLOCKS: Block[] = [
  cobPageBlock({
    slug: 'cobPgTestimonialCards',
    group: 'Testimonial',
    variant: '3 Cards Grid',
    fields: [text('eyebrow'), text('heading'), testimonialItems],
    hints: testimonialHints,
  }),
  cobPageBlock({
    slug: 'cobPgTestimonialColumns',
    group: 'Testimonial',
    variant: '2 Columns with Accent Bar',
    fields: [text('eyebrow'), text('heading'), testimonialItems],
    hints: testimonialHints,
  }),
  cobPageBlock({
    slug: 'cobPgTestimonialBanner',
    group: 'Testimonial',
    variant: 'Centered Banner Dark',
    fields: [
      text('eyebrow'),
      longText('quote', 'Quote', true),
      text('author', 'Author Name', true),
      text('role', 'Author Role or Location'),
      image('avatar', 'Author Avatar'),
    ],
    hints: {
      eyebrow: 'WHAT OUR CLIENTS SAY',
      quote: 'Their attention to detail, professionalism, and consistent outcomes have transformed how we operate.',
      author: 'David Chen',
      role: 'Chief Medical Officer',
    },
  }),
]

// ---- Call to Action (CTA) ----

export const COB_PAGE_CTA_BLOCKS: Block[] = [
  cobPageBlock({
    slug: 'cobPgCtaBanner',
    group: 'Call to Action',
    variant: 'Rounded Blue Banner',
    fields: [
      text('title', undefined, true),
      longText('text'),
      button('primaryButton', 'Primary Button'),
      button('secondaryButton', 'Secondary Button'),
    ],
    hints: {
      title: 'Ready to Experience Exceptional Care?',
      text: 'Schedule your comprehensive consultation with our team of specialists today.',
      'primaryButton.label': 'Book Consultation',
      'primaryButton.href': '/contact',
      'secondaryButton.label': 'Learn More',
      'secondaryButton.href': '/about',
    },
  }),
  cobPageBlock({
    slug: 'cobPgCtaStrip',
    group: 'Call to Action',
    variant: 'Inline Horizontal Strip',
    fields: [
      text('title', undefined, true),
      text('text'),
      button('primaryButton', 'Button'),
    ],
    hints: {
      title: 'Have Questions About Our Programs?',
      text: 'Speak directly with our clinical coordinators for immediate assistance.',
      'primaryButton.label': 'Contact Us',
      'primaryButton.href': '/contact',
    },
  }),
  cobPageBlock({
    slug: 'cobPgCtaBox',
    group: 'Call to Action',
    variant: 'Dark Box Banner',
    fields: [
      text('title', undefined, true),
      longText('text'),
      button('primaryButton', 'Button'),
    ],
    hints: {
      title: 'Begin Your Journey Toward Healthier Living',
      text: 'Discover tailored medical solutions designed around your unique health and lifestyle needs.',
      'primaryButton.label': 'Get Started',
      'primaryButton.href': '/get-started',
    },
  }),
]

// ---- Program / Services Details ----

const programCards = rows('cards', 'Card', 'Cards', [
  text('title', 'Card Title', true),
  text('text', 'Card Description'),
])

const programFeatures = rows('features', 'Feature', 'Features', [
  text('text', 'Feature Item', true),
])

const programFields = [
  text('eyebrow'),
  text('heading', undefined, true),
  longText('text'),
  programCards,
  text('featuresTitle', 'Features Section Title'),
  programFeatures,
  image('image', 'Featured Image'),
]

const programHints = {
  eyebrow: 'SPECIALIZED PROGRAM',
  heading: 'Comprehensive Wellness & Rehabilitation',
  text: 'A structured, multidisciplinary program tailored to restore vitality and achieve long-term clinical outcomes.',
  'cards.title': 'Clinical Precision',
  'cards.text': 'Personalized evidence-based interventions.',
  featuresTitle: 'Key Program Elements',
  'features.text': 'Continuous monitoring and personalized medical guidance',
}

export const COB_PAGE_PROGRAM_BLOCKS: Block[] = [
  cobPageBlock({
    slug: 'cobPgProgramDark',
    group: 'Program',
    variant: 'Dark Navy with Left Image',
    fields: programFields,
    hints: programHints,
  }),
  cobPageBlock({
    slug: 'cobPgProgramLight',
    group: 'Program',
    variant: 'Light with Right Image',
    fields: programFields,
    hints: programHints,
  }),
]

// ---- Location ----

const contactMethods = rows('contactMethods', 'Contact Method', 'Contact Methods', [
  image('icon', 'Icon'),
  text('title', 'Title (e.g. Visit Our Clinic, Call Us)', true),
  text('value', 'Details (e.g. Address or Phone Number)', true),
  text('actionLabel', 'Action Label (e.g. Get Directions, Call Now)'),
  text('actionHref', 'Action Link'),
])

const locationCards = rows('locations', 'Location', 'Locations', [
  image('icon', 'Icon'),
  text('name', 'Clinic / Location Name', true),
  text('address', 'Address', true),
  text('phone', 'Phone Number'),
  button('button', 'Button (e.g. View Details)'),
])

export const COB_PAGE_LOCATION_BLOCKS: Block[] = [
  cobPageBlock({
    slug: 'cobPgLocationDetails',
    group: 'Location',
    variant: 'Details with Map Card',
    fields: [
      text('eyebrow'),
      text('heading', undefined, true),
      longText('text'),
      contactMethods,
      text('mapTitle', 'Map Card Title'),
      text('mapAddress', 'Map Card Address'),
      button('mapButton', 'Map Button'),
    ],
    hints: {
      eyebrow: 'OUR LOCATIONS',
      heading: 'Convenient Access to World-Class Care',
      text: 'Visit our modern healthcare facilities or reach out to coordinate your consultation.',
      'contactMethods.title': 'Main Medical Center',
      'contactMethods.value': '123 Healthcare Blvd, Suite 400',
      'contactMethods.actionLabel': 'Get Directions',
      'contactMethods.actionHref': 'https://maps.google.com',
      mapTitle: 'Main Campus',
      mapAddress: '123 Healthcare Blvd, Suite 400',
      'mapButton.label': 'Open in Maps',
      'mapButton.href': 'https://maps.google.com',
    },
  }),
  cobPageBlock({
    slug: 'cobPgLocationCards',
    group: 'Location',
    variant: '4 Cards Grid',
    fields: [
      text('eyebrow'),
      text('heading', undefined, true),
      longText('text'),
      locationCards,
    ],
    hints: {
      eyebrow: 'LOCATIONS & CLINICS',
      heading: 'Find a Facility Near You',
      text: 'Explore our specialized network of clinics providing comprehensive clinical care.',
      'locations.name': 'Downtown Wellness Clinic',
      'locations.address': '742 Evergreen Terrace, Downtown',
      'locations.phone': '+1 (555) 234-5678',
      'locations.button.label': 'View Clinic',
      'locations.button.href': '/locations/downtown',
    },
  }),
]

// ---- Services ----

const serviceListItems = rows('items', 'Service Item', 'Service Items', [
  text('title', 'Service Title', true),
  text('description', 'Short Description'),
  text('href', 'Link URL'),
])

const serviceCards = rows('cards', 'Service Card', 'Service Cards', [
  image('image', 'Featured Image'),
  text('title', 'Service Title', true),
  longText('text', 'Description'),
  text('linkText', 'Link Label (e.g. Learn More)'),
  text('href', 'Link URL'),
])

export const COB_PAGE_SERVICE_BLOCKS: Block[] = [
  cobPageBlock({
    slug: 'cobPgServicesList',
    group: 'Services',
    variant: 'Interactive Directory List',
    fields: [
      text('heading', undefined, true),
      longText('text'),
      serviceListItems,
    ],
    hints: {
      heading: 'Our Specialized Medical Services',
      text: 'Explore comprehensive clinical specialties delivered by multidisciplinary teams.',
      'items.title': 'Preventative & Diagnostic Medicine',
      'items.description': 'Comprehensive screening protocols and early intervention therapies.',
      'items.href': '/services/preventative',
    },
  }),
  cobPageBlock({
    slug: 'cobPgServicesCards',
    group: 'Services',
    variant: '4 Cards with Header Image',
    fields: [
      text('eyebrow'),
      text('heading', undefined, true),
      longText('text'),
      serviceCards,
    ],
    hints: {
      eyebrow: 'AREAS OF EXPERTISE',
      heading: 'World-Class Healthcare Solutions',
      text: 'Dedicated specialty departments delivering patient-centered medical excellence.',
      'cards.title': 'Orthopedic & Joint Care',
      'cards.text': 'Advanced surgical and non-invasive rehabilitation for musculoskeletal health.',
      'cards.linkText': 'Explore Care',
      'cards.href': '/services/orthopedics',
    },
  }),
]

export const COB_PAGE_BLOCKS: Block[] = [
  ...COB_PAGE_HERO_BLOCKS,
  ...COB_PAGE_FEATURE_BLOCKS,
  ...COB_PAGE_ABOUT_BLOCKS,
  ...COB_PAGE_TESTIMONIAL_BLOCKS,
  ...COB_PAGE_CTA_BLOCKS,
  ...COB_PAGE_PROGRAM_BLOCKS,
  ...COB_PAGE_LOCATION_BLOCKS,
  ...COB_PAGE_SERVICE_BLOCKS,
]






