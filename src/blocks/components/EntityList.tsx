import React from 'react'

import type { EntityListBlock } from '@/payload-types'

export interface EntityListItem {
  label: string
  description?: string | null
}

/**
 * `items` is not a stored field — renderBlocks() resolves it from the bound
 * entity's `field` array in step 12 and passes it in. Until then a caller may
 * pass `items` explicitly; with none, only the heading + shell render.
 * Inner content only — the shared <Block> wrapper owns the outer <section>.
 */
type EntityListProps = EntityListBlock & { items?: EntityListItem[] }

export const EntityList: React.FC<EntityListProps> = ({ heading, style, items = [] }) => {
  return (
    <div className="entity-list" data-style={style}>
      {heading ? <h2 className="entity-list__heading">{heading}</h2> : null}
      {style === 'cards' ? (
        <div className="entity-list__cards">
          {items.map((item, index) => (
            <article className="entity-list__card" key={index}>
              <h3 className="entity-list__card-title">{item.label}</h3>
              {item.description ? (
                <p className="entity-list__card-body">{item.description}</p>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <ul className="entity-list__bullets">
          {items.map((item, index) => (
            <li className="entity-list__bullet" key={index}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
