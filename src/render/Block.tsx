import React from 'react'

import { Hero } from '@/blocks/components/Hero'
import { Faq } from '@/blocks/components/Faq'
import { FaqTny } from '@/blocks/components/FaqTny'
import { EntityList } from '@/blocks/components/EntityList'
import { Content } from '@/blocks/components/Content'

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
    case 'hero':
      return <Hero {...block} />
    case 'faq':
      return <Faq {...block} />
    case 'faqTny':
      return <FaqTny {...block} />
    case 'entityList':
      return <EntityList {...block} />
    case 'content':
      return <Content {...block} />
    default:
      return null
  }
}

export function Block({ block }: { block: PageBlock }): React.ReactElement {
  return (
    <section
      data-block={block.blockType}
      data-block-name={block.blockName || undefined}
      className={appearanceClasses(block)}
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
