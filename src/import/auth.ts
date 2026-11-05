import { createHash, randomBytes } from 'crypto'
import type { Payload } from 'payload'

import { ImportError } from './pageService'

/**
 * Scoped, expiring keys for the import API (src/app/api/import). A key belongs
 * to one tenant and only opens those endpoints; it is not a Payload user and
 * cannot reach any other route. Only a hash is stored (collection
 * src/collections/ImportKeys); the plaintext is shown once, when generated.
 */

export const KEY_PREFIX = 'stk_'

export const hashKey = (key: string) => createHash('sha256').update(key).digest('hex')

/** A new random key and what to store for it. */
export function generateKey() {
  const key = `${KEY_PREFIX}${randomBytes(24).toString('base64url')}`
  return { key, keyHash: hashKey(key), keyPrefix: key.slice(0, KEY_PREFIX.length + 6) }
}

export interface AuthedKey {
  id: number
  name: string
  tenantSlug: string
  canDelete: boolean
}

/** Last-used is written at most this often, so a busy key doesn't write on every call. */
const TOUCH_EVERY_MS = 60_000

/** The key behind `Authorization: Bearer stk_...`, or a 401. */
export async function authenticateKey(payload: Payload, request: Request): Promise<AuthedKey> {
  const header = request.headers.get('authorization') ?? ''
  const match = /^Bearer\s+(\S+)$/i.exec(header)
  if (!match || !match[1].startsWith(KEY_PREFIX)) {
    throw new ImportError('Missing key. Send "Authorization: Bearer <your key>".', 401)
  }

  const found = await payload.find({
    collection: 'importKeys',
    where: { keyHash: { equals: hashKey(match[1]) } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const doc = found.docs[0]
  // One message for unknown, revoked and expired, so a guess learns nothing.
  const invalid = () => new ImportError('This key is not valid. Ask an admin for a new one.', 401)
  if (!doc) throw invalid()
  if (doc.revokedAt) throw invalid()
  if (new Date(doc.expiresAt).getTime() <= Date.now()) {
    throw new ImportError('This key has expired. Ask an admin for a new one.', 401)
  }

  const last = doc.lastUsedAt ? new Date(doc.lastUsedAt).getTime() : 0
  if (Date.now() - last > TOUCH_EVERY_MS) {
    await payload
      .update({
        collection: 'importKeys',
        id: doc.id,
        data: { lastUsedAt: new Date().toISOString() },
        overrideAccess: true,
      })
      .catch(() => undefined)
  }

  return {
    id: doc.id as number,
    name: doc.name,
    tenantSlug: doc.tenant,
    canDelete: Boolean(doc.canDelete),
  }
}

// ------------------------------------------------------------- rate limit

const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 60
const hits = new Map<number, { start: number; count: number }>()

/** A light per-key limit (this process only): 60 calls a minute. */
export function checkRateLimit(keyId: number) {
  const now = Date.now()
  const entry = hits.get(keyId)
  if (!entry || now - entry.start >= WINDOW_MS) {
    hits.set(keyId, { start: now, count: 1 })
    return
  }
  entry.count += 1
  if (entry.count > MAX_PER_WINDOW) {
    throw new ImportError('Too many requests. Wait a minute and try again.', 429)
  }
}
