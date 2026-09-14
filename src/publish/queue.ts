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

let queue: Queue | null = null

export function getQueue(): Queue {
  if (!queue) {
    queue = new Queue(QUEUE_NAME, {
      connection: getConnection(),
      defaultJobOptions: {
        attempts: 5,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: { count: 200 },
        removeOnFail: { count: 200 },
      },
    })
  }
  return queue
}
