import type { PayloadRequest } from 'payload'

/**
 * The admin page a request came from, as path segments after the admin route:
 * `/admin/ptofthecity/programs/templates` gives `['ptofthecity', 'programs',
 * 'templates']`. Field defaults use it to fill in a new document from the page
 * its "Create New" was clicked on. Empty when there is no admin referer.
 */
export function adminRefererSegments(req: PayloadRequest | undefined): string[] {
  const referer = req?.headers?.get('referer')
  if (!req || !referer) return []

  let pathname: string
  try {
    pathname = new URL(referer).pathname
  } catch {
    return []
  }

  const adminRoute = req.payload.config.routes.admin
  if (!pathname.startsWith(`${adminRoute}/`)) return []
  return pathname
    .slice(adminRoute.length + 1)
    .split('/')
    .filter(Boolean)
}
