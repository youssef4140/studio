/**
 * Publish-pipeline configuration, read once from the environment.
 * Everything here has a local default (docker-compose) and swaps to real infra
 * (R2, Cloudflare, consumer URLs) purely via env — no code change.
 */

const required = (name: string, value: string | undefined): string => {
  if (!value) throw new Error(`[publish] missing required env: ${name}`)
  return value
}

export const publishConfig = {
  redisUrl: process.env.REDIS_URL || 'redis://127.0.0.1:6380',

  s3: {
    endpoint: process.env.S3_ENDPOINT || 'http://127.0.0.1:9000',
    region: process.env.S3_REGION || 'auto',
    accessKeyId: required('S3_ACCESS_KEY_ID', process.env.S3_ACCESS_KEY_ID),
    secretAccessKey: required('S3_SECRET_ACCESS_KEY', process.env.S3_SECRET_ACCESS_KEY),
    bucket: process.env.S3_BUCKET || 'studio-render',
    forcePathStyle: (process.env.S3_FORCE_PATH_STYLE ?? 'true') === 'true',
    /** Public origin the bucket/CDN is served from, no trailing slash. */
    publicUrl: (process.env.S3_PUBLIC_URL || 'http://127.0.0.1:9000/studio-render').replace(
      /\/$/,
      '',
    ),
  },

  cdn: {
    provider: (process.env.CDN_PURGE_PROVIDER || 'none') as 'none' | 'cloudflare',
    cloudflareZoneId: process.env.CLOUDFLARE_ZONE_ID || '',
    cloudflareApiToken: process.env.CLOUDFLARE_API_TOKEN || '',
  },

  webhooks: {
    urls: (process.env.CONSUMER_WEBHOOK_URLS || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    secret: process.env.CONSUMER_WEBHOOK_SECRET || '',
  },
}

/** Key layout inside the bucket. */
export const keys = {
  // `address` is the compound tenant/folder/.../slug path (src/publish/address.ts)
  // — slashes just nest as further S3 key segments, no format change needed.
  envelope: (collection: string, address: string) => `render/${collection}/${address}.json`,
  assetPrefix: '_render',
  /** Marker holding the renderVersion of the last full asset sync. */
  meta: 'render/_meta.json',
}
