/**
 * The seam between Payload's afterChange/afterDelete hooks and the queue.
 *
 * Imported into the Payload config graph, so it stays light: nothing loads
 * eagerly; BullMQ and the handlers come in via dynamic import so the Next server
 * bundle doesn't carry the worker stack. Fire-and-forget — a publish save must
 * never block on Redis. If enqueue fails (Redis down) the work runs inline so a
 * publish is never silently dropped.
 *
 * No job coalescing here: publishes are deliberate actions today, and each job
 * re-reads current state so redundant jobs are harmless. When autosave lands on
 * the canvas (step 15) add debouncing there, not a fragile fixed jobId.
 */

export function enqueuePublish(collection: string, id: string | number): void {
  void (async () => {
    try {
      const { getQueue } = await import('./queue')
      await getQueue().add('publish-doc', { collection, id })
    } catch (err) {
      console.error('[publish] enqueue publish-doc failed; running inline', err)
      const { publishDoc } = await import('./handlers')
      await publishDoc({ collection, id }).catch((e) =>
        console.error('[publish] inline publishDoc failed', e),
      )
    }
  })()
}

export function enqueueUnpublish(collection: string, slug: string): void {
  void (async () => {
    try {
      const { getQueue } = await import('./queue')
      await getQueue().add('unpublish-doc', { collection, slug })
    } catch (err) {
      console.error('[publish] enqueue unpublish-doc failed; running inline', err)
      const { unpublishDoc } = await import('./handlers')
      await unpublishDoc({ collection, slug }).catch((e) =>
        console.error('[publish] inline unpublishDoc failed', e),
      )
    }
  })()
}
