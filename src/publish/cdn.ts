import { publishConfig } from './config'

/**
 * CDN cache purge. `none` (default) logs the paths it *would* purge — enough for
 * local dev where MinIO isn't fronted by a CDN. `cloudflare` calls the zone
 * purge API. Adding a provider = one more branch here, nothing else changes.
 */
export async function purge(urls: string[]): Promise<void> {
  const targets = urls.filter(Boolean)
  if (targets.length === 0) return

  const { provider } = publishConfig.cdn

  if (provider === 'none') {
    console.info(`[publish] cdn purge (noop): ${targets.length} url(s)`, targets)
    return
  }

  if (provider === 'cloudflare') {
    const { cloudflareZoneId, cloudflareApiToken } = publishConfig.cdn
    if (!cloudflareZoneId || !cloudflareApiToken) {
      throw new Error('[publish] CDN_PURGE_PROVIDER=cloudflare needs CLOUDFLARE_ZONE_ID + CLOUDFLARE_API_TOKEN')
    }
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/purge_cache`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cloudflareApiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ files: targets }),
      },
    )
    if (!res.ok) {
      throw new Error(`[publish] cloudflare purge failed: ${res.status} ${await res.text()}`)
    }
    return
  }

  throw new Error(`[publish] unknown CDN_PURGE_PROVIDER: ${provider}`)
}

/** Purge everything — used by the renderVersion re-render-all job. */
export async function purgeEverything(): Promise<void> {
  const { provider } = publishConfig.cdn
  if (provider === 'none') {
    console.info('[publish] cdn purge-everything (noop)')
    return
  }
  if (provider === 'cloudflare') {
    const { cloudflareZoneId, cloudflareApiToken } = publishConfig.cdn
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/purge_cache`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cloudflareApiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ purge_everything: true }),
      },
    )
    if (!res.ok) {
      throw new Error(`[publish] cloudflare purge-everything failed: ${res.status} ${await res.text()}`)
    }
    return
  }
  throw new Error(`[publish] unknown CDN_PURGE_PROVIDER: ${provider}`)
}
