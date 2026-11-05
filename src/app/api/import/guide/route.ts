import { buildAiPrompt } from '@/import/aiPrompt'
import { keyed } from '@/import/http'
import { resolveFolder } from '@/import/pageService'
import { getTenant } from '@/tenants'

export const dynamic = 'force-dynamic'

/**
 * GET /api/import/guide?folder=<tenant>/<subfolder>
 *
 * The live guide for one folder, as markdown: what its pages are, how they
 * should read, and every component with its fields, built from the block
 * configs (src/import/aiPrompt.ts). Without `folder`, lists the folders the key
 * can use.
 */
export async function GET(request: Request): Promise<Response> {
  return keyed(request, async ({ payload, key }) => {
    const folderPath = new URL(request.url).searchParams.get('folder')
    const tenant = getTenant(key.tenantSlug)

    if (!folderPath) {
      const folders = key.folders
      return new Response(
        `# Folders you can use\n\n${folders.map((path) => `- ${path}`).join('\n')}\n\nGet a folder's guide with GET /api/import/guide?folder=<folder>.\n`,
        { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } },
      )
    }

    const folder = await resolveFolder(payload, folderPath, key)
    const subSlug = folder.path.split('/')[1]
    const sub = tenant?.subfolders.find((entry) => entry.slug === subSlug)
    return new Response(
      buildAiPrompt({
        tenantSlug: folder.tenantSlug,
        tenantName: tenant?.name ?? folder.tenantSlug,
        folderName: sub?.name ?? subSlug,
        folderSlug: subSlug,
        forApi: true,
      }),
      { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } },
    )
  })
}
