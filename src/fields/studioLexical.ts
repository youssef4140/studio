import {
  FixedToolbarFeature,
  HeadingFeature,
  TextStateFeature,
  UploadFeature,
  type HeadingFeatureProps,
} from '@payloadcms/richtext-lexical'

/**
 * The prose editor shared by Articles (TextEditor.content) and the Content
 * block (Content.body) — one feature set, so both surfaces behave the same way.
 *
 * `...defaultFeatures` already ships bold/italic/underline/strikethrough,
 * links, lists, alignment, blockquote, and a floating (inline) toolbar — those
 * just weren't discoverable without a persistent toolbar. This adds:
 *   - FixedToolbarFeature: an always-visible bar, so link/list/upload/etc. are
 *     obvious rather than keyboard-shortcut-only.
 *   - UploadFeature, reconfigured: adds `size` / `align` fields (edited via a
 *     modal on the inserted image) instead of the bare default, so images get
 *     real dimension control instead of rendering at native pixel size.
 *   - TextStateFeature: a small, token-driven set of inline text treatments —
 *     not a free colour/size picker (§6: tokens, not raw values).
 *
 * Usage — called from inside the `features` callback so `defaultFeatures` comes
 * from Payload's own contextual typing:
 *
 *   editor: lexicalEditor({
 *     features: ({ defaultFeatures }) =>
 *       studioLexicalFeatures({ defaultFeatures, headingSizes: ['h2', 'h3', 'h4'] }),
 *   })
 */

// @payloadcms/richtext-lexical doesn't export a public "any feature" element
// type (each Feature*() call returns a differently-generic FeatureProviderServer),
// so the array element type here is intentionally loose.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LexicalFeature = any

export const editorImageSizes = ['small', 'medium', 'large', 'full'] as const
export type EditorImageSize = (typeof editorImageSizes)[number]

export const editorImageAligns = ['left', 'center', 'right'] as const
export type EditorImageAlign = (typeof editorImageAligns)[number]

export const textColorStates = {
  brand: { css: { color: 'var(--studio-color-brand)' }, label: 'Brand' },
  muted: { css: { opacity: '0.7' }, label: 'Muted' },
}

export const textEmphasisStates = {
  small: { css: { 'font-size': '0.85em' }, label: 'Small' },
  lead: { css: { 'font-size': '1.2em', 'font-weight': '600' }, label: 'Lead' },
}

export function studioLexicalFeatures({
  defaultFeatures,
  headingSizes,
}: {
  defaultFeatures: LexicalFeature[]
  headingSizes: HeadingFeatureProps['enabledHeadingSizes']
}): LexicalFeature[] {
  return [
    ...defaultFeatures,
    HeadingFeature({ enabledHeadingSizes: headingSizes }),
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'size',
              type: 'select',
              defaultValue: 'medium',
              options: editorImageSizes.map((value) => ({
                label: value.charAt(0).toUpperCase() + value.slice(1),
                value,
              })),
              admin: {
                description: 'Caps the image width; it never exceeds the column on any screen.',
              },
            },
            {
              name: 'align',
              type: 'select',
              defaultValue: 'center',
              options: editorImageAligns.map((value) => ({
                label: value.charAt(0).toUpperCase() + value.slice(1),
                value,
              })),
            },
          ],
        },
      },
    }),
    TextStateFeature({
      state: {
        color: textColorStates,
        emphasis: textEmphasisStates,
      },
    }),
    FixedToolbarFeature(),
  ]
}
