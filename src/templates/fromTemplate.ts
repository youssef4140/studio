import type { Endpoint, PayloadRequest } from 'payload'

/**
 * POST /api/<pages|textEditor>/from-template/:id
 *
 * Starts a new document from a template (src/fields/template.ts): a draft in
 * the template's folder with its title, components and SEO, and a slug made
 * from the title (templates have none), which the admin then opens for
 * editing. The template itself is left as it was. Called by the Create New
 * chooser (src/admin/components/TemplatePicker).
 */
export const fromTemplateEndpoint = (collection: 'pages' | 'textEditor'): Endpoint => ({
  path: '/from-template/:id',
  method: 'post',
  handler: async (req) => {
    if (!req.user) return Response.json({ error: 'Not logged in.' }, { status: 401 })

    const id = req.routeParams?.id
    let template: Record<string, unknown> | null = null
    try {
      template = (await req.payload.findByID({
        collection,
        id: id as string,
        depth: 0,
        draft: true,
        overrideAccess: false,
        req,
      })) as unknown as Record<string, unknown>
    } catch {
      template = null
    }
    if (!template?.isTemplate) {
      return Response.json({ error: 'Template not found.' }, { status: 404 })
    }

    const folder = template.folder as number
    const doc = await req.payload.create({
      collection,
      draft: true,
      overrideAccess: false,
      req,
      data: {
        title: template.title as string,
        slug: await freeSlug(req, collection, folder, slugify(String(template.title ?? ''))),
        folder,
        layout: withoutIds(template.layout),
        seo: withoutIds(template.seo),
        isTemplate: false,
        _status: 'draft',
      } as never,
    })

    return Response.json({ id: doc.id })
  },
})

/**
 * A deep copy without any `id` keys, so every block and list row of the copy
 * is saved as a new row rather than colliding with the template's. Rich text
 * (a Lexical state, `{ root }`) is copied whole: it is stored as JSON, and its
 * nodes' ids are not rows.
 */
function withoutIds<T>(value: T): T {
  if (Array.isArray(value)) return value.map(withoutIds) as T
  if (value && typeof value === 'object' && !('root' in value)) {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => key !== 'id')
        .map(([key, entry]) => [key, withoutIds(entry)]),
    ) as T
  }
  return value
}

/** A slug from the template's title, e.g. "Physical Therapy Staffing" → `physical-therapy-staffing`. */
const slugify = (title: string) =>
  title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'untitled'

/** `base`, or `base-2`, `base-3`… — the first slug not yet used in the folder (see compoundUniqueSlug). */
async function freeSlug(
  req: PayloadRequest,
  collection: 'pages' | 'textEditor',
  folder: number,
  base: string,
): Promise<string> {
  const { docs } = await req.payload.find({
    collection,
    where: { and: [{ folder: { equals: folder } }, { slug: { like: base } }] },
    depth: 0,
    limit: 1000,
    overrideAccess: true,
    select: { slug: true },
  })
  const taken = new Set(docs.map((doc) => doc.slug))
  if (!taken.has(base)) return base
  let n = 2
  while (taken.has(`${base}-${n}`)) n += 1
  return `${base}-${n}`
}
