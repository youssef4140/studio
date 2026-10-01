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
  /**
   * Font stylesheets the tenant's blocks need (the families its tokens in
   * src/render/assets/<tenant>.css name). Linked by the preview and passed to
   * consumers on the envelope's `theme`.
   */
  fontStylesheets: readonly string[]
}

/** What a subfolder holds: Pages (block layouts) or Articles (long-form text). */
export type SubfolderContent = 'pages' | 'articles'

export interface SubfolderConfig {
  slug: string
  name: string
  contains: SubfolderContent
}

export interface TenantConfig {
  slug: string
  name: string
  /** Listed in the order they appear in the admin nav. */
  subfolders: readonly SubfolderConfig[]
  theme: TenantTheme
}

export const TENANTS = [
  {
    slug: 'ptofthecity',
    name: 'PT of the City',
    subfolders: [
      { slug: 'articles', name: 'Articles', contains: 'articles' },
      { slug: 'programs', name: 'Programs', contains: 'pages' },
      { slug: 'conditions', name: 'Conditions', contains: 'pages' },
      { slug: 'services', name: 'Services', contains: 'pages' },
    ],
    theme: {
      fontFamily: 'system-ui',
      palette: {},
      fontStylesheets: [
        // Switzer (headings) — Fontshare, as the ptofthecity site loads it.
        'https://api.fontshare.com/v2/css?f[]=switzer@600,700,800&display=swap',
        // Poppins (body and UI) — Google Fonts, the weights the site loads.
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap',
      ],
    },
  },
  {
    slug: 'tny',
    name: 'TNY',
    subfolders: [{ slug: 'articles', name: 'Articles', contains: 'articles' }],
    theme: {
      fontFamily: 'system-ui',
      palette: {},
      fontStylesheets: [
        // Montserrat (headings, buttons), DM Sans (labels), Poppins (body) and
        // Inter (meta lines) — Google Fonts, only the weights the Figma blocks use.
        'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,700&family=Inter:wght@400;500;700&family=Montserrat:wght@600;700&family=Poppins:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap',
      ],
    },
  },
] as const satisfies readonly TenantConfig[]

export type TenantSlug = (typeof TENANTS)[number]['slug']

export function getTenant(slug: string | null | undefined): TenantConfig | undefined {
  return TENANTS.find((tenant) => tenant.slug === slug)
}

/** Folder paths (`<tenant>/<subfolder>`) that hold the given kind of content. */
export function folderPathsFor(content: SubfolderContent): string[] {
  return TENANTS.flatMap((tenant) =>
    tenant.subfolders
      .filter((subfolder) => subfolder.contains === content)
      .map((subfolder) => `${tenant.slug}/${subfolder.slug}`),
  )
}
