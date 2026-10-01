import React from 'react'

import { resolveImage } from '@/render/media'

type Upload = Parameters<typeof resolveImage>[0]

/**
 * The pieces every tenant article set shares (src/blocks/components/ptoc,
 * src/blocks/components/tny), bound to that set's class prefix so each tenant's
 * stylesheet styles its own `<ns>-media`, `<ns>-bg`, `<ns>-button`, `<ns>-meta`.
 */
export function articleParts(ns: string) {
  /**
   * An editor-uploaded image in a fixed-shape frame. The frame keeps the Figma
   * placeholder colour and proportions, so an empty one still holds the layout.
   */
  function Media({ image, className }: { image: Upload; className: string }): React.ReactElement {
    const img = resolveImage(image)
    return (
      <div className={`${ns}-media ${className}`}>
        {img ? (
          <img
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

  /** A background image behind a dark panel, washed out as in the Figma file. */
  function Background({ image }: { image: Upload }): React.ReactElement | null {
    const img = resolveImage(image)
    if (!img) return null
    return (
      <div className={`${ns}-bg`} aria-hidden="true">
        <img src={img.src} srcSet={img.srcSet} alt="" loading="lazy" decoding="async" />
      </div>
    )
  }

  /** A button. Renders nothing without a label; a plain span without a link. */
  function Button({
    button,
    className = `${ns}-button`,
  }: {
    button?: { label?: string | null; href?: string | null } | null
    className?: string
  }): React.ReactElement | null {
    if (!button?.label) return null
    return button.href ? (
      <a className={className} href={button.href}>
        {button.label}
      </a>
    ) : (
      <span className={className}>{button.label}</span>
    )
  }

  /** "Author · Date · Read time", showing only the parts that were filled in. */
  function Meta({
    author,
    date,
    readTime,
  }: {
    author?: string | null
    date?: string | null
    readTime?: string | null
  }): React.ReactElement | null {
    const parts = [
      author ? { key: 'author', text: author, className: `${ns}-meta__author` } : null,
      date ? { key: 'date', text: date, className: undefined } : null,
      readTime ? { key: 'readTime', text: readTime, className: undefined } : null,
    ].filter((part): part is NonNullable<typeof part> => part !== null)

    if (parts.length === 0) return null

    return (
      <p className={`${ns}-meta`}>
        {parts.map((part, index) => (
          <React.Fragment key={part.key}>
            {index > 0 ? <span aria-hidden="true">·</span> : null}
            <span className={part.className}>{part.text}</span>
          </React.Fragment>
        ))}
      </p>
    )
  }

  return { Media, Background, Button, Meta }
}
