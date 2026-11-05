import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

import { authenticateKey, checkRateLimit, type AuthedKey } from './auth'
import { ImportError } from './pageService'

/** Largest JSON body an import call accepts. */
const MAX_JSON_BYTES = 2 * 1024 * 1024

export interface KeyedContext {
  payload: Payload
  key: AuthedKey
  request: Request
}

/**
 * Wraps a keyed import route: authenticates the key, applies the rate limit,
 * and turns thrown ImportErrors into JSON error responses. A handler returns
 * a Response, or a plain object (sent as 200 JSON, or 422 when `ok` is false).
 */
export async function keyed(
  request: Request,
  handler: (ctx: KeyedContext) => Promise<Response | Record<string, unknown>>,
): Promise<Response> {
  try {
    const payload = await getPayload({ config })
    const key = await authenticateKey(payload, request)
    checkRateLimit(key.id)

    const result = await handler({ payload, key, request })
    if (result instanceof Response) return result
    return Response.json(result, { status: result.ok === false ? 422 : 200 })
  } catch (err) {
    if (err instanceof ImportError) {
      return Response.json(
        { ok: false, error: err.message, ...(err.issues.length ? { errors: err.issues } : {}) },
        { status: err.status },
      )
    }
    console.error('[import api]', err)
    return Response.json({ ok: false, error: 'Something went wrong on the server.' }, { status: 500 })
  }
}

/** The request's JSON body, size-capped. */
export async function readJson(request: Request): Promise<Record<string, unknown>> {
  const length = Number(request.headers.get('content-length') ?? 0)
  if (length > MAX_JSON_BYTES) throw new ImportError('The body is too large (2 MB max).', 413)
  try {
    const body = await request.json()
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('not an object')
    return body as Record<string, unknown>
  } catch {
    throw new ImportError('The body must be a JSON object.', 400)
  }
}
