import type { Folder } from '@/payload-types'

/**
 * Maps a tenant (root) Folder's `theme` onto CSS custom-property overrides —
 * the same named tokens `src/render/assets/blocks.css` defines on `:root`
 * (`--studio-color-*`). Mirrors how `src/render/appearance.ts` maps block-style
 * tokens to classes. Used by renderBlocks()'s three callers (Phase 4) to
 * resolve a document's tenant theme before rendering.
 */

export interface ResolvedTheme {
  vars: Record<string, string>
  fontFamily: string | null
  googleFontsUrl: string | null
}

const PALETTE_TOKEN_MAP: Record<string, string> = {
  surface: '--studio-color-surface',
  muted: '--studio-color-muted',
  brand: '--studio-color-brand',
  onBrand: '--studio-color-on-brand',
  inverse: '--studio-color-inverse',
  onInverse: '--studio-color-on-inverse',
  border: '--studio-color-border',
  text: '--studio-color-text',
}

const GOOGLE_FONT_STACKS: Record<string, string> = {
  Inter: "'Inter', system-ui, sans-serif",
  Merriweather: "'Merriweather', Georgia, serif",
  Poppins: "'Poppins', system-ui, sans-serif",
  Lora: "'Lora', Georgia, serif",
}

export function resolveTheme(tenant: Folder | null | undefined): ResolvedTheme | null {
  if (!tenant?.theme) return null

  const vars: Record<string, string> = {}
  for (const [key, cssVar] of Object.entries(PALETTE_TOKEN_MAP)) {
    const value = tenant.theme.palette?.[key as keyof typeof tenant.theme.palette]
    if (value) vars[cssVar] = value
  }

  const fontKey = tenant.theme.typography?.fontFamily
  const fontFamily = fontKey && fontKey !== 'system-ui' ? (GOOGLE_FONT_STACKS[fontKey] ?? null) : null
  const googleFontsUrl = fontKey && fontKey !== 'system-ui'
    ? `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontKey)}:wght@400;600;700&display=swap`
    : null

  if (Object.keys(vars).length === 0 && !fontFamily) return null

  return { vars, fontFamily, googleFontsUrl }
}
