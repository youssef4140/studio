import { createHmac } from 'node:crypto'

import { publishConfig } from './config'

export interface ConsumerEvent {
  type: 'page.published' | 'page.unpublished' | 'rerender.completed'
  collection: string
  slug?: string
  /** The full tenant/folder/.../slug render address — see src/publish/address.ts. */
  address?: string
  renderVersion: string
  renderedAt?: string
  envelopeUrl?: string
}

/**
 * Tell consumers to drop their cache for a page (§3). Fire-and-forget per URL;
 * one failing consumer never blocks the others or the publish. Body is signed
 * with HMAC-SHA256 in `x-studio-signature: sha256=<hex>` so consumers can verify.
 */
export async function notifyConsumers(event: ConsumerEvent): Promise<void> {
  const { urls, secret } = publishConfig.webhooks
  if (urls.length === 0) {
    console.info('[publish] no CONSUMER_WEBHOOK_URLS configured; skipping notify', event)
    return
  }

  const body = JSON.stringify({ ...event, sentAt: new Date().toISOString() })
  const signature = secret ? `sha256=${createHmac('sha256', secret).update(body).digest('hex')}` : ''

  await Promise.all(
    urls.map(async (url) => {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(signature ? { 'x-studio-signature': signature } : {}),
          },
          body,
        })
        if (!res.ok) {
          console.warn(`[publish] webhook ${url} -> ${res.status}`)
        }
      } catch (err) {
        console.warn(`[publish] webhook ${url} failed`, err)
      }
    }),
  )
}
