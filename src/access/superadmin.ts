import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type IsSuperAdmin = (args: AccessArgs<User>) => boolean

export const superAdmin: IsSuperAdmin = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('superadmin'))
}
