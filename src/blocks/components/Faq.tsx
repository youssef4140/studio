import React from 'react'

import type { FaqBlock } from '@/payload-types'
import { RichText } from '@/render/RichText'

/**
 * Zero JS: native <details>/<summary>. Inner content only — the shared <Block>
 * wrapper owns the outer <section> + appearance classes.
 */
export const Faq: React.FC<FaqBlock> = ({ heading, items }) => {
  const rows = items ?? []

  return (
    <div className="faq">
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
    </div>
  )
}
