import { getServerSideURL } from '@/utilities/getURL'
import type { Media } from '@/payload-types'

export interface ResolvedImage {
  src: string
  srcSet?: string
  width?: number
  height?: number
  alt: string
}

const abs = (url: string): string =>
  /^https?:\/\//.test(url) ? url : `${getServerSideURL().replace(/\/$/, '')}${url}`

// Widest-first so the browser's srcset math still works; these are Payload's
// generated sizes (see Media.imageSizes). Real re-encode + CDN push is step 9.
const SIZE_ORDER = ['xlarge', 'large', 'medium', 'small'] as const

/**
 * Turn a populated upload into `<img>` attributes with an explicit width/height
 * (so consumers don't inherit CLS, §3) and a srcset when sized variants exist.
 * Accepts the id form (depth 0) and returns null — callers must query depth >= 1.
 */
export function resolveImage(value: number | Media | null | undefined): ResolvedImage | null {
  if (!value || typeof value !== 'object' || !value.url) return null

  const sizes = value.sizes ?? {}
  const srcSet = SIZE_ORDER.map((key) => sizes[key])
    .filter((s): s is NonNullable<typeof s> => Boolean(s?.url && s?.width))
    .map((s) => `${abs(s.url as string)} ${s.width}w`)
    .join(', ')

  return {
    src: abs(value.url),
    srcSet: srcSet || undefined,
    width: value.width ?? undefined,
    height: value.height ?? undefined,
    alt: value.alt ?? '',
  }
}
