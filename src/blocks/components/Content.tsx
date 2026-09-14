import React from 'react'

import type { ContentBlock } from '@/payload-types'
import { RichText } from '@/render/RichText'

/**
 * Plain prose. Inner content only — the shared <Block> wrapper owns the outer
 * <section> + appearance classes. Typography rules live in blocks.css (.content).
 */
export const Content: React.FC<ContentBlock> = ({ body }) => {
  return (
    <div className="content">
      <RichText data={body} />
    </div>
  )
}
