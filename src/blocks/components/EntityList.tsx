import React from 'react'

import type { BlockStyleValues } from '@/fields/blockStyles'

/**
 * Render-ready stub. Props mirror src/blocks/EntityList.ts; after step 6 these
 * become the generated `EntityListBlock` interface.
 *
 * The actual item data comes from the bound entity's array field (`field`), which
 * renderBlocks() resolves via interpolation in step 12. Until entities exist this
 * renders `items` if a caller passes them, otherwise just the heading + shell.
 * Appearance tokens are applied by renderBlocks() (step 7).
 */
export interface EntityListItem {
  label: string
  description?: string | null
}

export interface EntityListProps extends BlockStyleValues {
  heading?: string | null
  field: 'symptoms' | 'treatments'
  style: 'bullets' | 'cards'
  items?: EntityListItem[]
}

export const EntityList: React.FC<EntityListProps> = ({ heading, style, items = [] }) => {
  return (
    <section className="entity-list" data-block="entity-list" data-style={style}>
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
    </section>
  )
}
