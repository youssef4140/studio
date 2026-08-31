import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import { renderBlocks } from '@/render/renderBlocks'
import { isRenderableCollection } from '@/render/collections'
import type { RenderableDoc } from '@/render/types'
import { getServerSideURL } from '@/utilities/getURL'
import { verifyPreviewToken } from '@/preview/token'
import { PreviewClient } from '@/preview/PreviewClient'

export const dynamic = 'force-dynamic'

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string; id: string }>
  searchParams: Promise<{ token?: string }>
}) {
  const { collection, id } = await params
  const { token } = await searchParams

  if (!isRenderableCollection(collection) || !verifyPreviewToken(token, collection)) {
    notFound()
  }

  const payload = await getPayload({ config: configPromise })

  let doc: RenderableDoc & Record<string, unknown>
  try {
    doc = (await payload.findByID({
      collection,
      id,
      draft: true,
      depth: 2,
      overrideAccess: true,
    })) as unknown as RenderableDoc & Record<string, unknown>
  } catch {
    notFound()
  }

  // Initial paint: same renderBlocks() the publish job uses.
  const envelope = await renderBlocks(collection, doc)

  return (
    <>
      {envelope.head.jsonLd.map((obj, i) => (
        <script
          // eslint-disable-next-line react/no-danger
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
      <div
        data-preview-root
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: envelope.html }}
      />
      <PreviewClient
        collection={collection}
        token={token as string}
        serverURL={getServerSideURL()}
        initialData={doc as Record<string, unknown>}
      />
    </>
  )
}
