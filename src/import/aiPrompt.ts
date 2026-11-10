import type { Block, Field } from 'payload'

import { dataFields, importableBlocksFor } from './importableBlocks'

const labelOf = (block: Block): string =>
  typeof block.labels?.singular === 'string' ? block.labels.singular : block.slug

const placeholderOf = (field: Field): string | undefined => {
  if (field.type === 'richText') return (field.custom as { studioHint?: string })?.studioHint
  const placeholder = (field.admin as { placeholder?: unknown } | undefined)?.placeholder
  return typeof placeholder === 'string' ? placeholder : undefined
}

function typeOf(field: Field): string {
  switch (field.type) {
    case 'text':
      return 'text, one line'
    case 'textarea':
      return 'plain text, may use \\n line breaks'
    case 'richText':
      return 'rich text, see rules'
    case 'upload':
      return 'image URL'
    case 'number':
      return 'number'
    case 'checkbox':
      return 'true/false'
    case 'select': {
      const values = field.options.map((option) =>
        typeof option === 'string' ? option : option.value,
      )
      return `${field.hasMany ? 'list of' : 'one of'}: ${values.map((v) => `"${v}"`).join(', ')}`
    }
    case 'group':
      return 'object'
    case 'array':
      return 'list of objects'
    default:
      return field.type
  }
}

/** One line per field, nested fields indented under their group or list. */
function describeFields(fields: Field[], depth = 1): string[] {
  const indent = '  '.repeat(depth)
  return dataFields(fields).flatMap((field) => {
    if (!('name' in field) || !field.name) return []
    const required = 'required' in field && field.required ? ' (required)' : ''
    const example = placeholderOf(field)
    const line = `${indent}- \`${field.name}\`${required}: ${typeOf(field)}${example ? `. e.g. "${example}"` : ''}`
    if (field.type === 'group' || field.type === 'array') {
      return [line, ...describeFields(field.fields, depth + 1)]
    }
    return [line]
  })
}

function describeBlock(block: Block): string {
  return [
    `### \`${block.slug}\` (${labelOf(block)})`,
    ...describeFields(block.fields),
  ].join('\n')
}

/**
 * What kind of page each folder holds and how its content should read, for the
 * folders whose pages differ in character. Keyed by folder path. Written from
 * the Figma page "Sports Rehabilitation" (a service) in PTOC-2026; a folder
 * with no entry gets no section.
 */
const FOLDER_GUIDES: Record<string, string> = {
  'ptofthecity/services': `## What this page is: a SERVICE page

A service is a single type of treatment someone searches for (e.g. "Sports Rehabilitation in NYC"). Write it as an informational, plain-spoken page for people deciding whether this service is for them, and for search engines: name the service and "NYC" naturally in the hero and headings, explain what the treatment is, who it helps and what happens, and keep the tone reassuring and practical. No hype, no program branding, no stats or testimonials unless the content contains them.

How it is built, in this order (drop a section only when the content has nothing for it):
1. Hero: \`ptocPgHeroRight\` or \`ptocPgHeroLeft\`. No eyebrow needed. The title is the service name and the subtitle is a full descriptive paragraph (who it is for, where, and what it achieves).
2. "What is [the service]?": a short explanation, as a \`ptocBodySingle\` or \`ptocPgAboutText\` block.
3. "What to expect": the stages of a visit or treatment: \`ptocPgInfoSteps\` (or \`ptocBodySingle\` if it is prose).
4. "Common [conditions or injuries] we treat": \`ptocPgInfoList\`, one bullet per item.
5. "Benefits of [the service]": \`ptocPgInfoList\` or \`ptocPgFeat4\`.
6. Questions people ask: \`ptocPgInfoFaq\` ONLY if the content has real questions and answers.
7. Closing call to action: \`ptocPgCtaLight\` with a heading such as "Start Your Recovery Today!", one line of encouragement and a booking button (the importer fills it when you leave it out).

Do not build a clinic finder or locations list, an "Other services" list, or any header, footer or navigation: the CMS has no components for them, so leave that content out.`,
}

/**
 * The text behind the import modal's "Copy AI prompt" button: how to turn a
 * page's content into the JSON that POST /api/pages/import accepts, listing the
 * blocks of this folder's tenant, built from their configs so it never drifts
 * from the schema.
 */
export function buildAiPrompt({
  tenantSlug,
  tenantName,
  folderName,
  folderSlug,
  forApi = false,
}: {
  tenantSlug: string
  tenantName: string
  folderName: string
  folderSlug: string
  /** For an AI that calls the import API itself (GET /api/import/guide), not one pasting JSON. */
  forApi?: boolean
}): string {
  const blocks = importableBlocksFor(tenantSlug)
  const example = blocks[0]
  const guide = FOLDER_GUIDES[`${tenantSlug}/${folderSlug}`]

  const intro = forApi
    ? `You are building a page for ${tenantName} (${folderName}) in a headless CMS. Turn the content you are given into the JSON below, using only the components listed, and send it to the API as your setup file describes. The JSON is the request body: there is no need to show it to the user.`
    : `You are building a page for ${tenantName} (${folderName}) in a headless CMS. Convert the content I give you into the JSON below, using only the components listed.

**Your whole reply must be exactly one \`\`\`json code block containing the JSON object, and nothing else**: no text before or after it, no explanation, no notes, no questions. A code block keeps the JSON exactly as written when it is copied. The "title" and "slug" in the JSON are read automatically.`

  return `${intro}

## Output shape

{
${forApi ? '  "folder": "' + tenantSlug + '/' + folderSlug + '",\n' : ''}  "title": "Page title",
  "slug": "page-slug-lowercase-with-dashes",
  "seo": { "title": "SEO title, max 60 characters", "description": "Meta description, max 160 characters" },
  "blocks": [
    { "component": "${example?.slug ?? 'blockSlug'}", "...": "the component's fields" }
  ]
}

## Rules

- The "slug" is the **name of the page only**, made from the title with any location removed: lowercase, words joined with dashes, no other punctuation. Drop location phrases such as "in NYC", "in New York" and "near me" (e.g. "Orthopedic Rehabilitation in NYC" becomes "orthopedic-rehabilitation", "Sports Rehabilitation in NYC" becomes "sports-rehabilitation"). Keep every other word ("Lymphedema Treatment" becomes "lymphedema-treatment"). The title keeps its full wording; only the slug is shortened. Use the slug the user gives you if there is one.${forApi ? " The slug must match the page's cms_slug in its dashboard." : ''}
- Every item in "blocks" has "component" set to one of the component names below, plus that component's fields. Use only the field names listed. Do not add "id" or any other keys.
- Fields marked (required) must be filled. **Fill the optional text fields too**: for every component, go through its field list and fill each text field the content can support (eyebrow, subtitle, button text, stats, list items, and so on). A component with empty optional fields looks unfinished. Leave a field out only when the content truly has nothing for it, and never invent filler, statistics, testimonials or quotes the content doesn't contain.${forApi ? ' The dry run lists the optional fields you left empty (`unfilled`): fill the ones the content covers, then check again.' : ''}
- **Images are the exception: leave image fields empty** unless you were given a real image for that spot.${forApi ? ' But always tell the user where an image belongs (which component and which field) so they can add it: the response lists these under `imagesNeeded`. An icon left empty shows a check mark until one is added, so say that instead of calling the card broken.' : ' Do not mention images or add any note about them: the reply is the JSON only.'}
- "text, one line" fields take a short single line. "plain text" fields take plain text without HTML or markdown.
- "rich text" fields take a string: separate paragraphs with a blank line, start a line with "## " or "### " for a heading, and with "- " for a bullet point.
- "image URL" fields take a full image URL (https://...) taken from the content${forApi ? ', or the media id returned by an upload to the API' : ''}. If there is no real image, leave the field out; never make one up.
- "object" fields take a JSON object with the nested fields listed under them. "list of objects" fields take an array of such objects; match the number of items the component's name suggests (e.g. "4 Cards" means 4 items).
- Pick the components that fit the content best, in the order the page should read, typically starting with a Hero and ending with a Call to Action. Each component can be used more than once.
- The "e.g." values show the kind and length of text each field expects. Do not copy them; write from the content.

${guide ? `${guide}\n\n` : ''}## Components

${blocks.map(describeBlock).join('\n\n')}

${forApi ? '' : '## Content\n\n(The page content follows.)\n\n'}`
}
