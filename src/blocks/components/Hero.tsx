import React from 'react'

import type { BlockStyleValues } from '@/fields/blockStyles'

/**
 * Render-ready stub. Props mirror src/blocks/Hero.ts; after step 6 these become
 * the generated `HeroBlock` interface from @/payload-types. Appearance tokens
 * (background/paddingY/hideOn) are mapped to classes by renderBlocks() in step 7,
 * not here. Logical CSS properties only — the stylesheet lives in the step-7 bundle.
 */
export interface HeroProps extends BlockStyleValues {
  heading: string
  subheading?: string | null
  image?: HeroImage | number | null
  cta?: { label?: string | null; href?: string | null } | null
}

interface HeroImage {
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
}

const isImage = (value: HeroProps['image']): value is HeroImage =>
  Boolean(value) && typeof value === 'object'

export const Hero: React.FC<HeroProps> = ({ heading, subheading, image, cta }) => {
  return (
    <section className="hero" data-block="hero">
      <div className="hero__body">
        <h1 className="hero__heading">{heading}</h1>
        {subheading ? <p className="hero__subheading">{subheading}</p> : null}
        {cta?.href ? (
          <a className="hero__cta" href={cta.href}>
            {cta.label || cta.href}
          </a>
        ) : null}
      </div>
      {isImage(image) && image.url ? (
        <img
          className="hero__image"
          src={image.url}
          alt={image.alt ?? ''}
          width={image.width ?? undefined}
          height={image.height ?? undefined}
        />
      ) : null}
    </section>
  )
}
