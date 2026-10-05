import React from 'react'

import { Content } from '@/blocks/components/Content'
import { renderPtocBlock } from '@/blocks/components/ptoc'
import { renderPtocPageBlock } from '@/blocks/components/ptoc/pages'
import { renderTnyBlock } from '@/blocks/components/tny'

import { appearanceClasses } from './appearance'
import type { PageBlock } from './types'

/**
 * The single block-rendering implementation (§3). renderBlocks() runs it through
 * renderToStaticMarkup for the preview iframe and the publish job; the canvas
 * (step 14) mounts the same tree into its iframe via createPortal. One component
 * set, three callers — "what I see is what publishes" by construction.
 */

function inner(block: PageBlock): React.ReactNode {
  switch (block.blockType) {
    case 'content':
      return <Content {...block} />
    default:
      // Tenant sets render themselves; null for anything unknown.
      return renderPtocBlock(block) ?? renderPtocPageBlock(block) ?? renderTnyBlock(block)
  }
}

export function Block({ block }: { block: PageBlock }): React.ReactElement {
  return (
    <section
      data-block={block.blockType}
      data-block-name={block.blockName || undefined}
      className={appearanceClasses(block.blockType, block.hideOn)}
    >
      {inner(block)}
    </section>
  )
}

export function BlockList({ blocks }: { blocks: PageBlock[] }): React.ReactElement {
  return (
    <>
      {blocks.map((block, index) => (
        <Block key={block.id ?? String(index)} block={block} />
      ))}
    </>
  )
}
