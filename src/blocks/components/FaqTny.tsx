import React from 'react'

import type { FaqTnyBlock } from '@/payload-types'
import { RichText } from '@/render/RichText'

/**
 * TNY's FAQ variant: numbered questions instead of a plain accordion list —
 * a real, visible divergence from Faq, not just a re-theme. Still zero JS
 * (native <details>/<summary>). Inner content only — the shared <Block>
 * wrapper owns the outer <section> + appearance classes.
 */
export const FaqTny: React.FC<FaqTnyBlock> = ({ heading, items }) => {
  const rows = items ?? []

  return (
    <div className="faq-tny">
      {heading ? <h2 className="faq-tny__heading">{heading}</h2> : null}
      <ol className="faq-tny__items">
        {rows.map((item, index) => (
          <li className="faq-tny__item" key={item.id ?? index}>
            <details>
              <summary className="faq-tny__question">
                <span className="faq-tny__number">{String(index + 1).padStart(2, '0')}</span>
                {item.question}
              </summary>
              {item.answer ? (
                <div className="faq-tny__answer">
                  <RichText data={item.answer} />
                </div>
              ) : null}
            </details>
          </li>
        ))}
      </ol>
    </div>
  )
}
