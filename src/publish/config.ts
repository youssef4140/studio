/**
 * Publish-pipeline configuration, read once from the environment.
 * Everything here has a local default (docker-compose) and swaps to real infra
 * (R2, Cloudflare, consumer URLs) purely via env — no code change.
 */

/**
 * How the S3 client authenticates:
 *  - both S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY set: that static key
 *    (local MinIO, R2, or an IAM user);
 *  - neither set: the AWS SDK's own credential chain, i.e. the IAM role
 *    attached to the task/instance Studio runs on.
 * One without the other is a mistake, not a mode.
 */
function s3Credentials(): { accessKeyId: string; secretAccessKey: string } | undefined {
  const accessKeyId = process.env.S3_ACCESS_KEY_ID
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY
  if (accessKeyId && secretAccessKey) return { accessKeyId, secretAccessKey }
  if (accessKeyId || secretAccessKey) {
    throw new Error(
      '[publish] set both S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY, or neither (to use an IAM role)',
    )
  }
  return undefined
}

const credentials = s3Credentials()

export const publishConfig = {
  redisUrl: process.env.REDIS_URL || 'redis://127.0.0.1:6380',

  s3: {
    /** A static key, or `undefined` to use the IAM role Studio runs under. */
    credentials,
    // The MinIO defaults only apply with a static key. Under a role this is
    // AWS itself: the SDK works out the endpoint from the region (S3_REGION, or
    // the AWS_REGION that ECS/EC2 provide) and uses virtual-hosted addressing.
    endpoint: process.env.S3_ENDPOINT || (credentials ? 'http://127.0.0.1:9000' : undefined),
    region: process.env.S3_REGION || (credentials ? 'auto' : process.env.AWS_REGION),
    bucket: process.env.S3_BUCKET || 'studio-render',
    forcePathStyle: (process.env.S3_FORCE_PATH_STYLE ?? (credentials ? 'true' : 'false')) === 'true',
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
