import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'

import { keys, publishConfig } from './config'
import type { RenderEnvelope } from '@/render/types'

let client: S3Client | null = null
function s3(): S3Client {
  if (!client) {
    const { endpoint, region, accessKeyId, secretAccessKey, forcePathStyle } = publishConfig.s3
    client = new S3Client({
      endpoint,
      region,
      forcePathStyle,
      credentials: { accessKeyId, secretAccessKey },
    })
  }
  return client
}

const { bucket, publicUrl } = publishConfig.s3

async function bodyToString(body: unknown): Promise<string> {
  if (!body) return ''
  // Node stream from the AWS SDK
  if (typeof (body as { transformToString?: unknown }).transformToString === 'function') {
    return (body as { transformToString: () => Promise<string> }).transformToString()
  }
  const chunks: Buffer[] = []
  for await (const chunk of body as AsyncIterable<Buffer>) chunks.push(Buffer.from(chunk))
  return Buffer.concat(chunks).toString('utf8')
}

/** Write the published envelope. Returns its public URL. */
export async function putEnvelope(
  collection: string,
  address: string,
  envelope: RenderEnvelope,
): Promise<string> {
  const key = keys.envelope(collection, address)
  await s3().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(envelope),
      ContentType: 'application/json; charset=utf-8',
      CacheControl: 'public, max-age=60',
    }),
  )
  return `${publicUrl}/${key}`
}

export async function deleteEnvelope(collection: string, address: string): Promise<void> {
  await s3().send(
    new DeleteObjectCommand({ Bucket: bucket, Key: keys.envelope(collection, address) }),
  )
}

/** Upload one immutable, long-cached asset (the versioned CSS/JS bundle). */
export async function putAsset(
  filename: string,
  body: string | Uint8Array,
  contentType: string,
): Promise<string> {
  const key = `${keys.assetPrefix}/${filename}`
  await s3().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  )
  return `${publicUrl}/${key}`
}

export async function readJson<T>(key: string): Promise<T | null> {
  try {
    const res = await s3().send(new GetObjectCommand({ Bucket: bucket, Key: key }))
    const text = await bodyToString(res.Body)
    return text ? (JSON.parse(text) as T) : null
  } catch {
    return null
  }
}

export async function writeJson(key: string, value: unknown): Promise<void> {
  await s3().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(value),
      ContentType: 'application/json; charset=utf-8',
      CacheControl: 'no-store',
    }),
  )
}
