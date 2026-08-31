import 'dotenv/config'

import { Worker } from 'bullmq'

import { publishDoc, rerenderAll, unpublishDoc } from './handlers'
import { getConnection, getQueue, QUEUE_NAME } from './queue'
import { recordRenderVersion, syncAssets } from './assets-sync'

/**
 * The publish worker. Run alongside the app: `pnpm worker`.
 *
 * On boot it syncs the versioned asset bundle to object storage; if the global
 * renderVersion changed since the last sync it enqueues a full re-render so no
 * cached page is left on stale markup (§3).
 */
async function bootstrap(): Promise<void> {
  try {
    const { version, changed } = await syncAssets()
    if (changed) {
      console.info(`[worker] renderVersion changed -> ${version}; enqueuing rerender-all`)
      await getQueue().add('rerender-all', { reason: `renderVersion:${version}` })
    } else {
      await recordRenderVersion(version)
      console.info(`[worker] assets in sync @ renderVersion ${version}`)
    }
  } catch (err) {
    console.error('[worker] bootstrap failed (continuing to process jobs)', err)
  }
}

const worker = new Worker(
  QUEUE_NAME,
  async (job) => {
    switch (job.name) {
      case 'publish-doc':
        return publishDoc(job.data)
      case 'unpublish-doc':
        return unpublishDoc(job.data)
      case 'rerender-all':
        return rerenderAll(job.data)
      default:
        throw new Error(`[worker] unknown job: ${job.name}`)
    }
  },
  { connection: getConnection(), concurrency: 4 },
)

worker.on('ready', () => console.info('[worker] ready'))
worker.on('completed', (job) =>
  console.info(`[worker] ${job.name} #${job.id} ok`, job.returnvalue),
)
worker.on('failed', (job, err) =>
  console.error(`[worker] ${job?.name} #${job?.id} failed:`, err?.message),
)

void bootstrap()

const shutdown = async () => {
  console.info('[worker] shutting down')
  await worker.close()
  process.exit(0)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
