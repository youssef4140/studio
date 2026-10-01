import type { Block, Field } from 'payload'

import { ALL_LAYOUT_BLOCKS } from '@/blocks/layoutBlocks'

import type { PageBlock } from './types'

/**
 * Preview-only filler. An empty text or rich text field renders as its admin
 * placeholder (the hint the editor also sees in the form), so a freshly added
 * block looks like its picker thumbnail instead of collapsing to nothing. Never
 * used by the publish job: an empty field publishes empty.
 *
 * The hint travels through the block components as an ordinary string wrapped
 * in two private-use characters, which markPlaceholders() turns into a
 * `.studio-hint` span once the markup exists. That keeps the components unaware
 * of any of this.
 */

const OPEN = '\uE000'
const CLOSE = '\uE001'

/** How many sample rows an empty list or card set shows. */
const SAMPLE_ROWS = 3

const BLOCKS_BY_SLUG = new Map<string, Block>(
  ALL_LAYOUT_BLOCKS.map((block) => [block.slug, block]),
)

type Data = Record<string, unknown>

const isEmpty = (value: unknown): boolean =>
  value === undefined || value === null || (typeof value === 'string' && value.trim() === '')

interface LexicalNode {
  type?: string
  text?: string
  children?: LexicalNode[]
}

/** True when an editor state holds no text and nothing else worth showing (an image, a rule). */
function isEmptyRichText(value: unknown): boolean {
  const root = (value as { root?: LexicalNode } | null | undefined)?.root
  if (!root) return true
  const hasContent = (node: LexicalNode): boolean =>
    node.type === 'text'
      ? Boolean(node.text?.trim())
      : node.type === 'upload' ||
        node.type === 'horizontalrule' ||
        (node.children ?? []).some(hasContent)
  return !hasContent(root)
}

/** A one-paragraph editor state holding the hint, for the same converters to render. */
const hintRichText = (hint: string) => ({
  root: {
    type: 'root',
    version: 1,
    format: '',
    indent: 0,
    direction: 'ltr',
    children: [
      {
        type: 'paragraph',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        textFormat: 0,
        children: [
          {
            type: 'text',
            version: 1,
            text: `${OPEN}${hint}${CLOSE}`,
            format: 0,
            detail: 0,
            mode: 'normal',
            style: '',
          },
        ],
      },
    ],
  },
})

function fill(fields: Field[], data: Data): Data {
  const filled: Data = { ...data }

  for (const field of fields) {
    if (field.type === 'row') {
      Object.assign(filled, fill(field.fields, filled))
      continue
    }

    if (field.type === 'group') {
      if (!('name' in field) || !field.name) {
        Object.assign(filled, fill(field.fields, filled))
        continue
      }
      filled[field.name] = fill(field.fields, (filled[field.name] as Data | null) ?? {})
      continue
    }

    if (field.type === 'array') {
      const rows = Array.isArray(filled[field.name]) ? (filled[field.name] as Data[]) : []
      const shown =
        rows.length > 0
          ? rows
          : Array.from({ length: SAMPLE_ROWS }, (_, index) => ({ id: `hint-${index}` }))
      filled[field.name] = shown.map((row) => fill(field.fields, row))
      continue
    }

    // A link's hint describes the field; it is not somewhere a reader could go.
    if ((field.type === 'text' || field.type === 'textarea') && field.name !== 'href') {
      const hint = field.admin?.placeholder
      if (typeof hint === 'string' && isEmpty(filled[field.name])) {
        filled[field.name] = `${OPEN}${hint}${CLOSE}`
      }
    }

    // The editor's own placeholder lives inside its config; the hint is mirrored
    // on `custom.studioHint` by src/blocks/articleFields.ts.
    if (field.type === 'richText') {
      const hint = (field.custom as { studioHint?: unknown } | undefined)?.studioHint
      if (typeof hint === 'string' && isEmptyRichText(filled[field.name])) {
        filled[field.name] = hintRichText(hint)
      }
    }
  }

  return filled
}

/** The blocks, with every empty text field holding its hint. */
export function fillPlaceholders(blocks: PageBlock[]): PageBlock[] {
  return blocks.map((block) => {
    const config = BLOCKS_BY_SLUG.get(block.blockType)
    if (!config) return block
    return fill(config.fields, block as unknown as Data) as unknown as PageBlock
  })
}

const MARKED = new RegExp(`${OPEN}([^${CLOSE}]*)${CLOSE}`, 'g')

/** Wraps each hint in the rendered markup so the preview can style it apart from real copy. */
export function markPlaceholders(html: string): string {
  return html.replace(MARKED, '<span class="studio-hint">$1</span>')
}
