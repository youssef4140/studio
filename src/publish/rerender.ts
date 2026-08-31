import 'dotenv/config'

import { rerenderAll } from './handlers'

/**
 * One-shot full re-render. Run post-deploy (CI) or by hand:
 *   pnpm publish:rerender
 * Renders inline — no worker required.
 */
rerenderAll({ reason: 'cli' })
  .then((result) => {
    console.info('[rerender] done', result)
    process.exit(0)
  })
  .catch((err) => {
    console.error('[rerender] failed', err)
    process.exit(1)
  })
