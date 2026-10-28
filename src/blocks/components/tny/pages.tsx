import React from 'react'

import type { PageBlock } from '@/render/types'

import { articleParts } from '../articleParts'

/**
 * TNY's page blocks (configs in src/blocks/tny/pages.ts): the sections of a
 * solution page on the TNY website, one component each. Inner content only —
 * the shared <Block> wrapper owns the outer <section>. All styling is in
 * src/render/assets/tny.css under `tny-pg-*`; nothing here is editor-styled.
 */

type PgBlock<T extends PageBlock['blockType']> = Extract<PageBlock, { blockType: T }>

const { Media } = articleParts('tny')

type ButtonData = { label?: string | null; href?: string | null } | null | undefined

/** The site's right arrow after a button's text. */
function Arrow(): React.ReactElement {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path
        d="M2.5 7.5H12.5M12.5 7.5L8.5 3.5M12.5 7.5L8.5 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** A button with the arrow. Renders nothing without a label; a plain span without a link. */
function ArrowButton({
  button,
  className,
}: {
  button: ButtonData
  className: string
}): React.ReactElement | null {
  if (!button?.label) return null
  const content = (
    <>
      <span>{button.label}</span>
      <Arrow />
    </>
  )
  return button.href ? (
    <a className={className} href={button.href}>
      {content}
    </a>
  ) : (
    <span className={className}>{content}</span>
  )
}

function Label({ text }: { text?: string | null }): React.ReactElement | null {
  return text ? <p className="tny-pg-label">{text}</p> : null
}

/** The "label, heading" pair above a set of cards. */
function SectionHead({
  eyebrow,
  heading,
  className = 'tny-pg-head',
}: {
  eyebrow?: string | null
  heading?: string | null
  className?: string
}): React.ReactElement | null {
  if (!eyebrow && !heading) return null
  return (
    <div className={className}>
      <Label text={eyebrow} />
      {heading ? <h2 className="tny-pg-heading">{heading}</h2> : null}
    </div>
  )
}

/** "01", "02", … */
const number = (index: number) => String(index + 1).padStart(2, '0')

function Hero({ block }: { block: PgBlock<'tnyPgHero'> }): React.ReactElement {
  return (
    <div className="tny tny-pg tny-pg-hero">
      <div className="tny-pg-inner tny-pg-hero__inner">
        {block.eyebrow ? (
          <p className="tny-pg-label tny-pg-hero__eyebrow">{block.eyebrow}</p>
        ) : null}
        <h1 className="tny-pg-hero__title">{block.title}</h1>
        {block.intro ? <p className="tny-pg-hero__intro">{block.intro}</p> : null}
        <ArrowButton button={block.button} className="tny-pg-button tny-pg-hero__button" />
      </div>
    </div>
  )
}

type ImageTextBlock = PgBlock<'tnyPgOverview' | 'tnyPgSpotlight'>

/** Overview (image left, several paragraphs) and Spotlight (image right, one). */
function ImageText({ block }: { block: ImageTextBlock }): React.ReactElement {
  const overview = block.blockType === 'tnyPgOverview'
  const paragraphs =
    block.blockType === 'tnyPgOverview'
      ? (block.paragraphs ?? []).map((paragraph) => paragraph.text)
      : [block.text]
  const media = <Media image={block.image} className="tny-pg-split__media" />
  return (
    <div className={`tny tny-pg tny-pg-split tny-pg-split--${overview ? 'overview' : 'spotlight'}`}>
      <div className="tny-pg-inner tny-pg-split__inner">
        {overview ? media : null}
        <div className="tny-pg-split__copy">
          <Label text={block.eyebrow} />
          {block.heading ? (
            <h2 className="tny-pg-heading tny-pg-split__heading">{block.heading}</h2>
          ) : null}
          {paragraphs.map((paragraph, index) =>
            paragraph ? (
              <p className="tny-pg-split__body" key={index}>
                {paragraph}
              </p>
            ) : null,
          )}
        </div>
        {overview ? null : media}
      </div>
    </div>
  )
}

/** Bordered cards: numbered (Roles, three across) or not (Settings, two across). */
function Cards({ block }: { block: PgBlock<'tnyPgRoles' | 'tnyPgSettings'> }): React.ReactElement {
  const roles = block.blockType === 'tnyPgRoles'
  return (
    <div className={`tny tny-pg tny-pg-cards tny-pg-cards--${roles ? 'roles' : 'settings'}`}>
      <div className="tny-pg-inner tny-pg-stack">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />
        <ul className="tny-pg-cards__grid">
          {(block.items ?? []).map((item, index) => (
            <li className="tny-pg-cards__card" key={item.id ?? index}>
              {roles ? <span className="tny-pg-cards__num">{number(index)}</span> : null}
              <h3 className="tny-pg-cards__title">{item.title}</h3>
              {item.text ? <p className="tny-pg-cards__text">{item.text}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Focus({ block }: { block: PgBlock<'tnyPgFocus'> }): React.ReactElement {
  return (
    <div className="tny tny-pg tny-pg-focus">
      <div className="tny-pg-inner tny-pg-stack">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />
        <ul className="tny-pg-focus__list">
          {(block.items ?? []).map((item, index) => (
            <li className="tny-pg-focus__item" key={item.id ?? index}>
              <svg
                className="tny-pg-focus__check"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Why({ block }: { block: PgBlock<'tnyPgWhy'> }): React.ReactElement {
  return (
    <div className="tny tny-pg tny-pg-why">
      <div className="tny-pg-inner tny-pg-stack">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />
        <ol className="tny-pg-why__grid">
          {(block.items ?? []).map((item, index) => (
            <li className="tny-pg-why__item" key={item.id ?? index}>
              <span className="tny-pg-why__num">{number(index)}</span>
              <div className="tny-pg-why__text">
                <h3 className="tny-pg-why__title">{item.title}</h3>
                {item.text ? <p className="tny-pg-cards__text">{item.text}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function CallToAction({ block }: { block: PgBlock<'tnyPgCta'> }): React.ReactElement {
  const hasButtons = block.primaryButton?.label || block.secondaryButton?.label
  return (
    <div className="tny tny-pg tny-pg-cta">
      <div className="tny-pg-inner">
        <div className="tny-pg-cta__content">
          <Label text={block.eyebrow} />
          <h2 className="tny-pg-heading tny-pg-cta__title">{block.heading}</h2>
          {block.text ? <p className="tny-pg-cta__text">{block.text}</p> : null}
          {hasButtons ? (
            <div className="tny-pg-cta__actions">
              <ArrowButton
                button={block.primaryButton}
                className="tny-pg-button tny-pg-cta__button"
              />
              <ArrowButton
                button={block.secondaryButton}
                className="tny-pg-button tny-pg-cta__button tny-pg-cta__button--ghost"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

/** Renders a TNY page block, or `null` for any other block type. */
export function renderTnyPageBlock(block: PageBlock): React.ReactNode {
  switch (block.blockType) {
    case 'tnyPgHero':
      return <Hero block={block} />
    case 'tnyPgOverview':
    case 'tnyPgSpotlight':
      return <ImageText block={block} />
    case 'tnyPgRoles':
    case 'tnyPgSettings':
      return <Cards block={block} />
    case 'tnyPgFocus':
      return <Focus block={block} />
    case 'tnyPgWhy':
      return <Why block={block} />
    case 'tnyPgCta':
      return <CallToAction block={block} />
    default:
      return null
  }
}
