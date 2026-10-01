import React from 'react'

import { getRenderAssets } from '@/render/assets'

/**
 * Preview-only filler styling (src/render/placeholders.ts). Kept out of the
 * published CSS bundle on purpose: none of this exists outside the preview.
 * Hints are dimmed so they don't read as real copy; an image frame with no
 * image says so.
 */
const PLACEHOLDER_CSS = `
.studio-hint { opacity: 0.5; }
:is(.ptoc-media, .tny-media):empty { display: grid; place-items: center; }
:is(.ptoc-media, .tny-media):empty::after {
  content: 'IMAGE HERE';
  color: #fff;
  opacity: 0.7;
  font-weight: 800;
  font-size: 20px;
  line-height: 1.1;
  letter-spacing: 0.08em;
  text-align: center;
}
:is(.ptoc-author__avatar, .tny-author__avatar):empty::after,
:is(.ptoc-related__row .ptoc-related__thumb, .tny-related__row .tny-related__thumb):empty::after {
  font-size: 10px;
}
`

/**
 * Root layout for the live-preview iframe (step 10). Loads ONLY the published
 * block CSS + the vanilla JS bundle — nothing from the admin — so the preview
 * cannot diverge from production, apart from the filler above. Payload's live-preview chrome handles the
 * mobile/tablet/desktop breakpoint resizing around this iframe.
 */
export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  const assets = getRenderAssets()

  return (
    // blocks.js (a defer script) sets data-blocks-runtime on <html> before React
    // hydrates this iframe, so the attribute is always an expected client/server diff.
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <link rel="stylesheet" href={assets.css} />
        {/* eslint-disable-next-line react/no-danger */}
        <style dangerouslySetInnerHTML={{ __html: PLACEHOLDER_CSS }} />
        <script src={assets.js} defer />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
