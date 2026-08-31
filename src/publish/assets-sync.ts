import { readAssetSources } from '@/render/assets'

import { keys } from './config'
import { putAsset, readJson, writeJson } from './storage'

/**
 * Upload the current versioned CSS/JS bundle to object storage. Idempotent —
 * the keys are content-hashed and immutable, so re-uploading the same version is
 * a no-op-ish PUT. Returns whether the renderVersion changed since the last sync
 * (the signal to re-render every page).
 */
export async function syncAssets(): Promise<{ version: string; changed: boolean }> {
  const { version, css, js } = readAssetSources()

  const previous = await readJson<{ renderVersion: string }>(keys.meta)
  const changed = previous?.renderVersion !== version

  await putAsset(`blocks.${version}.css`, css, 'text/css; charset=utf-8')
  await putAsset(`blocks.${version}.js`, js, 'application/javascript; charset=utf-8')

  return { version, changed }
}

export async function recordRenderVersion(version: string): Promise<void> {
  await writeJson(keys.meta, {
    renderVersion: version,
    syncedAt: new Date().toISOString(),
  })
}
