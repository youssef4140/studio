import { getQueue } from '@/publish/queue'

/**
 * POST /api/publish/rerender   (step 9)
 *
 * Ops hook to enqueue a full re-render (e.g. from CI after a block/CSS deploy).
 * Auth: `Authorization: Bearer <CRON_SECRET>`. The worker's own boot check also
 * enqueues this automatically when the renderVersion changes; this is the manual
 * lever. Requires a running worker to actually process the job.
 */
export async function POST(req: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET
  const auth = req.headers.get('authorization')
  if (!secret || auth !== `Bearer ${secret}`) {
    return Response.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const job = await getQueue().add('rerender-all', { reason: 'api' })
    return Response.json({ enqueued: true, jobId: job.id })
  } catch (err) {
    return Response.json(
      { error: 'failed to enqueue', detail: err instanceof Error ? err.message : String(err) },
      { status: 502 },
    )
  }
}
