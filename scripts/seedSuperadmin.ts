import 'dotenv/config'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * One-off bootstrap: promote an existing user to superadmin. There's no
 * "first user is special" case in Payload, so this is the deliberate manual
 * step — run once per environment, by hand:
 *
 *   pnpm seed:superadmin someone@example.com
 */
const email = process.argv[2]

if (!email) {
  console.error('Usage: pnpm seed:superadmin <email>')
  process.exit(1)
}

async function main() {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  })

  const user = docs[0]
  if (!user) {
    console.error(`[seed:superadmin] no user found with email ${email}`)
    process.exit(1)
  }

  const roles: Array<'admin' | 'superadmin'> = Array.from(
    new Set([...(user.roles ?? []), 'superadmin' as const]),
  )
  await payload.update({
    collection: 'users',
    id: user.id,
    data: { roles },
    overrideAccess: true,
  })

  console.info(`[seed:superadmin] ${email} is now: ${roles.join(', ')}`)
  process.exit(0)
}

main().catch((err) => {
  console.error('[seed:superadmin] failed', err)
  process.exit(1)
})
