import type { Access } from 'payload'

import { notTemplate } from '@/fields/template'

/** Pages and Articles: everything for a logged-in user, otherwise published documents that aren't templates. */
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    and: [{ _status: { equals: 'published' } }, notTemplate],
  }
}
