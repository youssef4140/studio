/**
 * The single source of truth for tenants, their subfolders, and their theme.
 * None of this is editable in the admin: change it here and restart. On boot
 * the list is mirrored into the Folders collection (src/collections/Folders/
 * sync.ts) so Pages/Articles/Media can keep relating to folders by id.
 *
 * `slug` is part of the render address (`<tenant>/<subfolder>/<page>`) and the
 * Cloudinary path, so renaming one moves every address underneath it.
 */

export const FONT_FAMILIES = ['system-ui', 'Inter', 'Merriweather', 'Poppins', 'Lora'] as const
export type FontFamily = (typeof FONT_FAMILIES)[number]

export const PALETTE_TOKENS = [
  'surface',
  'muted',
  'brand',
  'onBrand',
  'inverse',
  'onInverse',
  'border',
  'text',
] as const
export type PaletteToken = (typeof PALETTE_TOKENS)[number]

export interface TenantTheme {
  fontFamily: FontFamily
  /** Hex colours. A token left out keeps the default from src/render/assets/blocks.css. */
  palette: Partial<Record<PaletteToken, string>>
}

export interface TenantConfig {
  slug: string
  name: string
  subfolders: readonly { slug: string; name: string }[]
  theme: TenantTheme
}

export const TENANTS = [
  {
    slug: 'ptofthecity',
    name: 'PT of the City',
    subfolders: [
      { slug: 'articles', name: 'Articles' },
      { slug: 'conditions', name: 'Conditions' },
      { slug: 'programs', name: 'Programs' },
      { slug: 'services', name: 'Services' },
    ],
    theme: {
      fontFamily: 'system-ui',
      palette: {},
    },
  },
  {
    slug: 'tny',
    name: 'TNY',
    subfolders: [
      { slug: 'articles', name: 'Articles' },
      { slug: 'conditions', name: 'Conditions' },
      { slug: 'programs', name: 'Programs' },
      { slug: 'services', name: 'Services' },
    ],
    theme: {
      fontFamily: 'system-ui',
      palette: {},
    },
  },
] as const satisfies readonly TenantConfig[]

export type TenantSlug = (typeof TENANTS)[number]['slug']

export function getTenant(slug: string | null | undefined): TenantConfig | undefined {
  return TENANTS.find((tenant) => tenant.slug === slug)
}
