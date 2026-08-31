import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Signed token for the live-preview route (step 10). Grants read of *draft* data
 * for one collection, short-lived. Generated server-side in
 * `admin.livePreview.url`, verified by the preview page and the preview render
 * API. Not a session — just proof the request came from our admin.
 */

const SECRET = () => process.env.PREVIEW_SECRET || ''
const TTL_MS = 60 * 60 * 1000 // 1h; the admin regenerates the URL on every edit-view render

const b64url = (buf: Buffer) => buf.toString('base64url')

export function signPreviewToken(collection: string): string {
  const exp = Date.now() + TTL_MS
  const payload = `${collection}:${exp}`
  const sig = createHmac('sha256', SECRET()).update(payload).digest()
  return `${b64url(Buffer.from(payload))}.${b64url(sig)}`
}

export function verifyPreviewToken(token: string | null | undefined, collection: string): boolean {
  if (!token || !SECRET()) return false
  const [payloadB64, sigB64] = token.split('.')
  if (!payloadB64 || !sigB64) return false

  let payload: string
  try {
    payload = Buffer.from(payloadB64, 'base64url').toString('utf8')
  } catch {
    return false
  }

  const [tokenCollection, expStr] = payload.split(':')
  if (tokenCollection !== collection) return false
  const exp = Number(expStr)
  if (!Number.isFinite(exp) || Date.now() > exp) return false

  const expected = createHmac('sha256', SECRET()).update(payload).digest()
  let given: Buffer
  try {
    given = Buffer.from(sigB64, 'base64url')
  } catch {
    return false
  }
  return expected.length === given.length && timingSafeEqual(expected, given)
}
