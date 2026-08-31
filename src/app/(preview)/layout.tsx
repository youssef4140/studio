import React from 'react'

import { getRenderAssets } from '@/render/assets'

/**
 * Root layout for the live-preview iframe (step 10). Loads ONLY the published
 * block CSS + the vanilla JS bundle — nothing from the admin — so the preview
 * cannot diverge from production. Payload's live-preview chrome handles the
 * mobile/tablet/desktop breakpoint resizing around this iframe.
 */
export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  const assets = getRenderAssets()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <link rel="stylesheet" href={assets.css} />
        <script src={assets.js} defer />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
