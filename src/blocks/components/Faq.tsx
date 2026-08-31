import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import type { BlockStyleValues } from '@/fields/blockStyles'

/**
 * Render-ready stub. Props mirror src/blocks/Faq.ts; after step 6 these become the
 * generated `FaqBlock` interface. Zero JS: native <details>/<summary>. Appearance
 * tokens are applied by renderBlocks() (step 7).
 */
export interface FaqProps extends BlockStyleValues {
  heading?: string | null
  items?: FaqItem[] | null
}

interface FaqItem {
  id?: string | null
  question: string
  answer?: SerializedEditorState | null
}

export const Faq: React.FC<FaqProps> = ({ heading, items }) => {
  const rows = items ?? []

  return (
    <section className="faq" data-block="faq">
      {heading ? <h2 className="faq__heading">{heading}</h2> : null}
      <div className="faq__items">
        {rows.map((item, index) => (
          <details className="faq__item" key={item.id ?? index}>
            <summary className="faq__question">{item.question}</summary>
            {item.answer ? (
              <div className="faq__answer">
                <RichText data={item.answer} />
              </div>
            ) : null}
          </details>
        ))}
      </div>
    </section>
  )
}
