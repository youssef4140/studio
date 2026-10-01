import { Queue } from 'bullmq'
import IORedis from 'ioredis'

import { publishConfig } from './config'

export const QUEUE_NAME = 'studio-publish'

export type PublishJobName = 'publish-doc' | 'unpublish-doc' | 'rerender-all'

export interface PublishJobData {
  'publish-doc': { collection: string; id: string | number }
  'unpublish-doc': { collection: string; address: string }
  'rerender-all': { reason: string }
}

let connection: IORedis | null = null

/**
 * BullMQ 6 no longer auto-loads ioredis in ESM — pass a constructed client.
 * One shared connection for the queue and worker in this process.
 * `maxRetriesPerRequest: null` is required by BullMQ.
 */
export function getConnection(): IORedis {
  if (!connection) {
    connection = new IORedis(publishConfig.redisUrl, { maxRetriesPerRequest: null })
    connection.on('error', (err) => console.error('[publish] redis error', err.message))
  }
  return connection
}

const defaultJobOptions = {
  attempts: 5,
  backoff: { type: 'exponential' as const, delay: 2000 },
  removeOnComplete: { count: 200 },
  removeOnFail: { count: 200 },
}

let queue: Queue | null = null

/**
 * The worker process's queue. It shares the worker's connection, which holds
 * commands while Redis is down and sends them once it is back: the worker has
 * nothing better to do than wait.
 */
export function getQueue(): Queue {
  if (!queue) {
    queue = new Queue(QUEUE_NAME, { connection: getConnection(), defaultJobOptions })
  }
  return queue
}

/** How long a publish waits for Redis to answer before it is rendered inline instead. */
const PRODUCER_READY_TIMEOUT_MS = 2000

let producerConnection: IORedis | null = null
let producerQueue: Queue | null = null

function whenReady(redis: IORedis, timeoutMs: number): Promise<void> {
  if (redis.status === 'ready') return Promise.resolve()
  return new Promise((resolve, reject) => {
    const onReady = () => {
      clearTimeout(timer)
      resolve()
    }
    const timer = setTimeout(() => {
      redis.off('ready', onReady)
      reject(new Error(`redis not reachable within ${timeoutMs}ms`))
    }, timeoutMs)
    redis.once('ready', onReady)
  })
}

/**
 * The app's queue, for enqueuing from request hooks (src/publish/enqueue.ts).
 * Unlike the worker's, it fails fast: it rejects when Redis is not connected
 * instead of holding the job in memory, so the caller can render inline and a
 * publish is never left waiting on a Redis that may not return before the app
 * restarts. The connection itself keeps reconnecting in the background, so the
 * queue is used again as soon as Redis is back.
 */
export async function getProducerQueue(): Promise<Queue> {
  if (!producerConnection) {
    producerConnection = new IORedis(publishConfig.redisUrl, {
      maxRetriesPerRequest: null,
      // Reject commands issued while disconnected rather than queueing them.
      enableOfflineQueue: false,
    })
    producerConnection.on('error', (err) => console.error('[publish] redis error', err.message))
  }
  await whenReady(producerConnection, PRODUCER_READY_TIMEOUT_MS)
  // Built only once connected: BullMQ issues commands as soon as a Queue exists.
  if (!producerQueue) {
    producerQueue = new Queue(QUEUE_NAME, { connection: producerConnection, defaultJobOptions })
    producerQueue.on('error', (err) => console.error('[publish] queue error', err.message))
  }
  return producerQueue
}
