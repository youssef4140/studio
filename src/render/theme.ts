import type { Payload } from 'payload'

import { getTenant, type FontFamily, type PaletteToken } from '@/tenants'

/**
 * Maps a tenant's hardcoded theme (src/tenants.ts) onto CSS custom-property
 * overrides — the same named tokens `src/render/assets/blocks.css` defines on
 * `:root` (`--studio-color-*`). Used by renderBlocks()'s three callers to
 * resolve a document's tenant theme before rendering.
 */

export interface ResolvedTheme {
  vars: Record<string, string>
  fontFamily: string | null
  googleFontsUrl: string | null
  /** Stylesheet URLs to link so the tenant's block fonts load. */
  fontStylesheets: string[]
}

const PALETTE_TOKEN_MAP: Record<PaletteToken, string> = {
  surface: '--studio-color-surface',
  muted: '--studio-color-muted',
  brand: '--studio-color-brand',
  onBrand: '--studio-color-on-brand',
  inverse: '--studio-color-inverse',
  onInverse: '--studio-color-on-inverse',
  border: '--studio-color-border',
  text: '--studio-color-text',
}

const GOOGLE_FONT_STACKS: Record<Exclude<FontFamily, 'system-ui'>, string> = {
  Inter: "'Inter', system-ui, sans-serif",
  Merriweather: "'Merriweather', Georgia, serif",
  Poppins: "'Poppins', system-ui, sans-serif",
  Lora: "'Lora', Georgia, serif",
}

/** `null` when the tenant is unknown or its theme changes nothing from the defaults. */
export function resolveTheme(tenantSlug: string | null | undefined): ResolvedTheme | null {
  const theme = getTenant(tenantSlug)?.theme
  if (!theme) return null

  const vars: Record<string, string> = {}
  for (const [token, value] of Object.entries(theme.palette) as [PaletteToken, string][]) {
    if (value) vars[PALETTE_TOKEN_MAP[token]] = value
  }

  const font = theme.fontFamily
  const fontFamily = font === 'system-ui' ? null : GOOGLE_FONT_STACKS[font]
  const googleFontsUrl =
    font === 'system-ui'
      ? null
      : `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;600;700&display=swap`

  const fontStylesheets = [...theme.fontStylesheets]

  if (Object.keys(vars).length === 0 && !fontFamily && fontStylesheets.length === 0) return null

  return { vars, fontFamily, googleFontsUrl, fontStylesheets }
}

/**
 * Resolves a document's theme from its (possibly unpopulated) `tenant` value —
 * shared by all three renderBlocks() callers so none of them hand-roll the
 * lookup differently. The folder row is only read for its slug; the theme
 * itself comes from code.
 */
export async function resolveDocTheme(
  payload: Payload,
  tenantValue: unknown,
): Promise<ResolvedTheme | null> {
  if (tenantValue && typeof tenantValue === 'object' && 'slug' in tenantValue) {
    return resolveTheme((tenantValue as { slug?: string }).slug)
  }

  const tenantId =
    tenantValue && typeof tenantValue === 'object' ? (tenantValue as { id: unknown }).id : tenantValue
  if (!tenantId) return null

  try {
    const tenant = await payload.findByID({
      collection: 'folders',
      id: tenantId as string | number,
      depth: 0,
      overrideAccess: true,
    })
    return resolveTheme(tenant.slug)
  } catch {
    return null
  }
}
