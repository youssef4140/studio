import React from 'react'

import type { HeroBlock } from '@/payload-types'
import { resolveImage } from '@/render/media'

/**
 * Written once, used by the canvas, the preview iframe and the published HTML
 * (§2). Renders inner content only — the shared <Block> wrapper (src/render)
 * owns the outer <section>, `data-block` and the appearance classes.
 * Logical CSS only; rules live in src/render/assets/blocks.css.
 */
export const Hero: React.FC<HeroBlock> = ({ heading, subheading, image, cta }) => {
  const img = resolveImage(image)

  return (
    <div className="hero">
      <div className="hero__body">
        <h1 className="hero__heading">{heading}</h1>
        {subheading ? <p className="hero__subheading">{subheading}</p> : null}
        {cta?.href ? (
          <a className="hero__cta" href={cta.href}>
            {cta.label || cta.href}
          </a>
        ) : null}
      </div>
      {img ? (
        <img
          className="hero__image"
          src={img.src}
          srcSet={img.srcSet}
          alt={img.alt}
          width={img.width}
          height={img.height}
          loading="lazy"
          decoding="async"
        />
      ) : null}
    </div>
  )
}
