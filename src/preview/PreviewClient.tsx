'use client'

import { useEffect, useRef } from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'

/**
 * One-way live preview transport (step 10). Renders nothing — the blocks live in
 * the server-rendered `[data-preview-root]`. On each sidebar edit, Payload posts
 * the merged doc via postMessage; `useLivePreview` hands it here, we re-render
 * through the SAME renderBlocks() (via /api/preview/render) and swap innerHTML,
 * then re-run the vanilla block bundle. No React hydration of blocks — preview
 * behaves exactly like the published page.
 */
export function PreviewClient({
  collection,
  token,
  serverURL,
  initialData,
}: {
  collection: string
  token: string
  serverURL: string
  initialData: Record<string, unknown>
}) {
  const { data } = useLivePreview<Record<string, unknown>>({
    initialData,
    serverURL,
    depth: 2,
  })

  // The server already rendered initialData; skip the first callback.
  const primed = useRef(false)

  useEffect(() => {
    if (!primed.current) {
      primed.current = true
      return
    }

    let cancelled = false
    void (async () => {
      try {
        const res = await fetch('/api/preview/render', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ collection, token, data }),
        })
        if (!res.ok || cancelled) return
        const { html } = (await res.json()) as { html: string }
        const root = document.querySelector('[data-preview-root]')
        if (root && !cancelled) {
          root.innerHTML = html
          ;(window as unknown as { __studioBlocks?: { init?: () => void } }).__studioBlocks?.init?.()
        }
      } catch {
        /* transient; next edit will retry */
      }
    })()

    return () => {
      cancelled = true
    }
  }, [data, collection, token])

  return null
}
