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
 * The text behind the import modal's "Copy AI prompt" button: how to turn a
 * page's content into the JSON that POST /api/pages/import accepts, listing the
 * blocks of this folder's tenant, built from their configs so it never drifts
 * from the schema.
 */
export function buildAiPrompt({
  tenantSlug,
  tenantName,
  folderName,
}: {
  tenantSlug: string
  tenantName: string
  folderName: string
}): string {
  const blocks = importableBlocksFor(tenantSlug)
  const example = blocks[0]

  return `You are building a page for ${tenantName} (${folderName}) in a headless CMS. Convert the content I give you into the JSON below, using only the components listed. Reply with the JSON object only: no commentary, no markdown fences.

## Output shape

{
  "title": "Page title",
  "slug": "page-slug-lowercase-with-dashes",
  "seo": { "title": "SEO title, max 60 characters", "description": "Meta description, max 160 characters" },
  "blocks": [
    { "component": "${example?.slug ?? 'blockSlug'}", "...": "the component's fields" }
  ]
}

## Rules

- Every item in "blocks" has "component" set to one of the component names below, plus that component's fields. Use only the field names listed. Do not add "id" or any other keys.
- Fields marked (required) must be filled. Leave out optional fields you have no content for; never invent filler, statistics, testimonials or quotes the content doesn't contain.
- "text, one line" fields take a short single line. "plain text" fields take plain text without HTML or markdown.
- "rich text" fields take a string: separate paragraphs with a blank line, start a line with "## " or "### " for a heading, and with "- " for a bullet point.
- "image URL" fields take a full image URL (https://...) taken from the content. If there is no real image URL, leave the field out; never make one up.
- "object" fields take a JSON object with the nested fields listed under them. "list of objects" fields take an array of such objects; match the number of items the component's name suggests (e.g. "4 Cards" means 4 items).
- Pick the components that fit the content best, in the order the page should read, typically starting with a Hero and ending with a Call to Action. Each component can be used more than once.
- The "e.g." values show the kind and length of text each field expects. Do not copy them; write from the content.

## Components

${blocks.map(describeBlock).join('\n\n')}

## Content

(The page content follows.)

`
}
