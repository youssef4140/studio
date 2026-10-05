import React from 'react'

import { RichText } from '@/render/RichText'
import type { PageBlock } from '@/render/types'

import { Background, Button, Media, Meta, type PtocBlock } from './parts'

/**
 * ptofthecity's article blocks (configs in src/blocks/ptoc). One component per
 * Figma component, switching on the variant's slug. Inner content only — the
 * shared <Block> wrapper owns the outer <section>. All styling is in
 * src/render/assets/ptofthecity.css; nothing here is editor-styled.
 */

type BodyBlock = PtocBlock<
  | 'ptocBodySingle'
  | 'ptocBodyLead'
  | 'ptocBodyTwoCol'
  | 'ptocBodyCallout'
  | 'ptocBodySidebar'
  | 'ptocBodyDropCap'
>

/** One rich text field, in the tenant's prose styles. Nothing when it is empty. */
function Prose({ data, className }: { data: unknown; className?: string }): React.ReactNode {
  const content = RichText({ data })
  if (!content) return null
  return <div className={className ? `ptoc-prose ${className}` : 'ptoc-prose'}>{content}</div>
}

/** The "Text Editor" blocks (Figma "Body Text"): rich text in a fixed layout. */
function BodyText({ block }: { block: BodyBlock }): React.ReactElement {
  switch (block.blockType) {
    case 'ptocBodyLead':
      return (
        <div className="ptoc ptoc-body ptoc-body--lead">
          <div className="ptoc-wrap ptoc-body__stack">
            <Prose data={block.lead} className="ptoc-body__lead" />
            <Prose data={block.body} />
          </div>
        </div>
      )
    case 'ptocBodyTwoCol':
      return (
        <div className="ptoc ptoc-body ptoc-body--two-col">
          <div className="ptoc-wrap ptoc-body__columns">
            <Prose data={block.body} className="ptoc-body__column" />
            <Prose data={block.body2} className="ptoc-body__column" />
          </div>
        </div>
      )
    case 'ptocBodyCallout':
      return (
        <div className="ptoc ptoc-body ptoc-body--callout">
          <div className="ptoc-wrap ptoc-body__stack">
            <Prose data={block.body} />
            {block.calloutLabel || block.callout ? (
              <aside className="ptoc-body__callout">
                {block.calloutLabel ? (
                  <p className="ptoc-body__callout-label">{block.calloutLabel}</p>
                ) : null}
                <Prose data={block.callout} />
              </aside>
            ) : null}
            <Prose data={block.bodyAfter} />
          </div>
        </div>
      )
    case 'ptocBodySidebar':
      return (
        <div className="ptoc ptoc-body ptoc-body--sidebar">
          <div className="ptoc-wrap ptoc-body__columns">
            <Prose data={block.body} className="ptoc-body__main" />
            {block.sideLabel || block.side ? (
              <aside className="ptoc-body__side">
                {block.sideLabel ? <p className="ptoc-body__side-label">{block.sideLabel}</p> : null}
                <Prose data={block.side} />
              </aside>
            ) : null}
          </div>
        </div>
      )
    case 'ptocBodyDropCap':
      return (
        <div className="ptoc ptoc-body ptoc-body--drop-cap">
          <div className="ptoc-wrap">
            <Prose data={block.body} />
          </div>
        </div>
      )
    default:
      return (
        <div className="ptoc ptoc-body">
          <div className="ptoc-wrap">
            <Prose data={block.body} />
          </div>
        </div>
      )
  }
}

type HeroBlock = PtocBlock<'ptocHeroImage' | 'ptocHeroSplit' | 'ptocHeroSplitLeft' | 'ptocHeroText'>

function Hero({ block }: { block: HeroBlock }): React.ReactElement {
  const eyebrow = block.eyebrow ? <p className="ptoc-eyebrow">{block.eyebrow}</p> : null
  const title = <h1 className="ptoc-hero__title">{block.title}</h1>
  const subtitle = block.subtitle ? <p className="ptoc-hero__subtitle">{block.subtitle}</p> : null
  const meta = <Meta author={block.author} date={block.date} readTime={block.readTime} />

  if (block.blockType === 'ptocHeroSplit' || block.blockType === 'ptocHeroSplitLeft') {
    const side = block.blockType === 'ptocHeroSplitLeft' ? ' ptoc-hero--image-left' : ''
    return (
      <div className={`ptoc ptoc-hero ptoc-hero--split${side}`}>
        <div className="ptoc-wrap ptoc-hero__columns">
          <div className="ptoc-hero__content">
            {eyebrow}
            {title}
            {subtitle}
            <Button button={block.button} />
            {meta}
          </div>
          <Media image={block.image} className="ptoc-hero__media" />
        </div>
      </div>
    )
  }

  if (block.blockType === 'ptocHeroImage') {
    return (
      <div className="ptoc ptoc-hero ptoc-hero--image ptoc-dark">
        <Background image={block.bgImage} />
        <div className="ptoc-wrap ptoc-hero__stack">
          {eyebrow}
          {title}
          {subtitle}
          {meta}
        </div>
      </div>
    )
  }

  return (
    <div className="ptoc ptoc-hero ptoc-hero--text">
      <div className="ptoc-wrap ptoc-hero__stack">
        {eyebrow}
        {title}
        {subtitle}
        <span className="ptoc-rule ptoc-rule--hero" aria-hidden="true" />
        {meta}
      </div>
    </div>
  )
}

type QuoteBlock = PtocBlock<'ptocQuoteSimple' | 'ptocQuotePull' | 'ptocQuoteBox'>

function Blockquote({ block }: { block: QuoteBlock }): React.ReactElement {
  if (block.blockType === 'ptocQuotePull') {
    return (
      <div className="ptoc ptoc-quote ptoc-quote--pull ptoc-dark">
        <Background image={block.bgImage} />
        <figure className="ptoc-wrap ptoc-quote__stack">
          <span className="ptoc-quote__mark" aria-hidden="true">
            &quot;
          </span>
          <blockquote className="ptoc-quote__text">{block.quote}</blockquote>
          <span className="ptoc-rule ptoc-rule--quote" aria-hidden="true" />
          {block.attribution ? (
            <figcaption className="ptoc-quote__attribution">{block.attribution}</figcaption>
          ) : null}
        </figure>
      </div>
    )
  }

  const variant = block.blockType === 'ptocQuoteBox' ? 'box' : 'simple'
  return (
    <div className={`ptoc ptoc-quote ptoc-quote--${variant}`}>
      <div className="ptoc-wrap">
        <figure className="ptoc-quote__body">
          <blockquote className="ptoc-quote__text">{block.quote}</blockquote>
          {block.attribution ? (
            <figcaption className="ptoc-quote__attribution">{block.attribution}</figcaption>
          ) : null}
        </figure>
      </div>
    </div>
  )
}

type ImageBlockData = PtocBlock<
  'ptocImageFull' | 'ptocImageTwoUp' | 'ptocImageText' | 'ptocTextImage'
>

function ImageBlock({ block }: { block: ImageBlockData }): React.ReactElement {
  if (block.blockType === 'ptocImageText' || block.blockType === 'ptocTextImage') {
    const side = block.blockType === 'ptocTextImage' ? ' ptoc-image--image-right' : ''
    return (
      <div className={`ptoc ptoc-image ptoc-image--text${side}`}>
        <div className="ptoc-wrap ptoc-image__columns">
          <Media image={block.image} className="ptoc-image__media" />
          <div className="ptoc-image__content">
            {block.heading ? <h3 className="ptoc-image__heading">{block.heading}</h3> : null}
            {block.text ? <p className="ptoc-image__text">{block.text}</p> : null}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ptoc ptoc-image">
      <figure className="ptoc-wrap ptoc-image__figure">
        {block.blockType === 'ptocImageTwoUp' ? (
          <div className="ptoc-image__pair">
            <Media image={block.image} className="ptoc-image__half" />
            <Media image={block.image2} className="ptoc-image__half" />
          </div>
        ) : (
          <Media image={block.image} className="ptoc-image__full" />
        )}
        {block.caption ? (
          <figcaption className="ptoc-image__caption">{block.caption}</figcaption>
        ) : null}
      </figure>
    </div>
  )
}

type HeaderBlock = PtocBlock<
  'ptocHeaderLarge' | 'ptocHeaderMedium' | 'ptocHeaderSmall' | 'ptocHeaderLabel'
>

function SectionHeader({ block }: { block: HeaderBlock }): React.ReactElement {
  switch (block.blockType) {
    case 'ptocHeaderMedium':
      return (
        <div className="ptoc ptoc-header ptoc-header--medium">
          <div className="ptoc-wrap">
            <h3 className="ptoc-header__heading">{block.heading}</h3>
            {block.subheading ? <p className="ptoc-header__sub">{block.subheading}</p> : null}
          </div>
        </div>
      )
    case 'ptocHeaderSmall':
      return (
        <div className="ptoc ptoc-header ptoc-header--small">
          <div className="ptoc-wrap">
            <h4 className="ptoc-header__heading">{block.heading}</h4>
          </div>
        </div>
      )
    case 'ptocHeaderLabel':
      return (
        <div className="ptoc ptoc-header ptoc-header--label">
          <div className="ptoc-wrap">
            {block.label ? <p className="ptoc-eyebrow">{block.label}</p> : null}
            <h2 className="ptoc-header__heading">{block.heading}</h2>
            <span className="ptoc-header__rule" aria-hidden="true" />
          </div>
        </div>
      )
    default:
      return (
        <div className="ptoc ptoc-header ptoc-header--large">
          <div className="ptoc-wrap">
            <h2 className="ptoc-header__heading">{block.heading}</h2>
            {block.subheading ? <p className="ptoc-header__sub">{block.subheading}</p> : null}
          </div>
        </div>
      )
  }
}

type CtaBlock = PtocBlock<'ptocCtaBanner' | 'ptocCtaInline' | 'ptocCtaMinimal'>

function CallToAction({ block }: { block: CtaBlock }): React.ReactElement {
  if (block.blockType === 'ptocCtaBanner') {
    return (
      <div className="ptoc ptoc-cta ptoc-cta--banner">
        <div className="ptoc-wrap">
          <div className="ptoc-cta__box ptoc-dark">
            <Background image={block.bgImage} />
            <h2 className="ptoc-cta__heading">{block.heading}</h2>
            {block.text ? <p className="ptoc-cta__text">{block.text}</p> : null}
            {block.primaryButton?.label || block.secondaryButton?.label ? (
              <div className="ptoc-cta__buttons">
                <Button button={block.primaryButton} />
                <Button
                  button={block.secondaryButton}
                  className="ptoc-button ptoc-button--outline"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  if (block.blockType === 'ptocCtaInline') {
    return (
      <div className="ptoc ptoc-cta ptoc-cta--inline">
        <div className="ptoc-wrap ptoc-cta__row">
          <div className="ptoc-cta__content">
            <h2 className="ptoc-cta__heading">{block.heading}</h2>
            {block.text ? <p className="ptoc-cta__text">{block.text}</p> : null}
          </div>
          <Button button={block.button} />
        </div>
      </div>
    )
  }

  return (
    <div className="ptoc ptoc-cta ptoc-cta--minimal">
      <div className="ptoc-wrap ptoc-cta__stack">
        <span className="ptoc-rule ptoc-rule--cta" aria-hidden="true" />
        {block.label ? <p className="ptoc-cta__label">{block.label}</p> : null}
        <Button button={block.link} className="ptoc-cta__link" />
      </div>
    </div>
  )
}

type ListBlock = PtocBlock<'ptocListBullets' | 'ptocListNumbered' | 'ptocListChecklist'>

const LIST_VARIANT = {
  ptocListBullets: 'bullets',
  ptocListNumbered: 'numbered',
  ptocListChecklist: 'checklist',
} as const

function List({ block }: { block: ListBlock }): React.ReactElement {
  const Tag = block.blockType === 'ptocListNumbered' ? 'ol' : 'ul'
  return (
    <div className={`ptoc ptoc-list ptoc-list--${LIST_VARIANT[block.blockType]}`}>
      <div className="ptoc-wrap">
        <Tag className="ptoc-list__items">
          {(block.items ?? []).map((item, index) => (
            <li className="ptoc-list__item" key={item.id ?? index}>
              <span className="ptoc-list__text">{item.text}</span>
            </li>
          ))}
        </Tag>
      </div>
    </div>
  )
}

type DividerBlock = PtocBlock<
  'ptocDividerLine' | 'ptocDividerAccent' | 'ptocDividerBand' | 'ptocDividerSpace'
>

const DIVIDER_VARIANT = {
  ptocDividerLine: 'line',
  ptocDividerAccent: 'accent',
  ptocDividerBand: 'band',
  ptocDividerSpace: 'space',
} as const

function Divider({ block }: { block: DividerBlock }): React.ReactElement {
  const variant = DIVIDER_VARIANT[block.blockType]
  if (variant === 'space') return <div className="ptoc ptoc-divider ptoc-divider--space" />

  return (
    <div className={`ptoc ptoc-divider ptoc-divider--${variant}`} role="separator">
      {variant === 'accent' ? (
        <div className="ptoc-divider__accent">
          <span className="ptoc-divider__line" />
          <span className="ptoc-divider__mark" />
          <span className="ptoc-divider__line" />
        </div>
      ) : (
        <div className="ptoc-wrap">
          <span className="ptoc-divider__line" />
        </div>
      )}
    </div>
  )
}

type AuthorBlock = PtocBlock<'ptocAuthorRow' | 'ptocAuthorCard'>

function AuthorCard({ block }: { block: AuthorBlock }): React.ReactElement {
  if (block.blockType === 'ptocAuthorCard') {
    return (
      <div className="ptoc ptoc-author ptoc-author--card">
        <div className="ptoc-wrap">
          <div className="ptoc-author__box ptoc-dark">
            <Background image={block.bgImage} />
            <Media image={block.avatar} className="ptoc-author__avatar" />
            <p className="ptoc-author__name">{block.name}</p>
            {block.bio ? <p className="ptoc-author__bio">{block.bio}</p> : null}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ptoc ptoc-author ptoc-author--row">
      <div className="ptoc-wrap ptoc-author__row">
        <Media image={block.avatar} className="ptoc-author__avatar" />
        <div className="ptoc-author__info">
          {block.label ? <p className="ptoc-author__label">{block.label}</p> : null}
          <p className="ptoc-author__name">{block.name}</p>
          {block.bio ? <p className="ptoc-author__bio">{block.bio}</p> : null}
        </div>
      </div>
    </div>
  )
}

type RelatedBlock = PtocBlock<'ptocRelGrid' | 'ptocRelList'>

/** The title, linked when the editor gave a link. */
function RelatedTitle({
  title,
  href,
}: {
  title: string
  href?: string | null
}): React.ReactElement {
  return <h3 className="ptoc-related__title">{href ? <a href={href}>{title}</a> : title}</h3>
}

function RelatedArticles({ block }: { block: RelatedBlock }): React.ReactElement {
  if (block.blockType === 'ptocRelList') {
    return (
      <div className="ptoc ptoc-related ptoc-related--list">
        <div className="ptoc-wrap">
          {block.heading ? <h2 className="ptoc-related__heading">{block.heading}</h2> : null}
          <ul className="ptoc-related__rows">
            {(block.items ?? []).map((item, index) => (
              <li className="ptoc-related__row" key={item.id ?? index}>
                <Media image={item.image} className="ptoc-related__thumb" />
                <div className="ptoc-related__info">
                  <RelatedTitle title={item.title} href={item.href} />
                  {item.description ? (
                    <p className="ptoc-related__excerpt">{item.description}</p>
                  ) : null}
                  {item.readTime ? <p className="ptoc-related__read">{item.readTime}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="ptoc ptoc-related ptoc-related--grid">
      <div className="ptoc-wrap">
        {block.eyebrow ? <p className="ptoc-eyebrow">{block.eyebrow}</p> : null}
        {block.heading ? <h2 className="ptoc-related__heading">{block.heading}</h2> : null}
        <ul className="ptoc-related__cards">
          {(block.items ?? []).map((item, index) => (
            <li className="ptoc-related__card" key={item.id ?? index}>
              <Media image={item.image} className="ptoc-related__thumb" />
              {item.category ? <p className="ptoc-related__category">{item.category}</p> : null}
              <RelatedTitle title={item.title} href={item.href} />
              {item.excerpt ? <p className="ptoc-related__excerpt">{item.excerpt}</p> : null}
              {item.readTime ? <p className="ptoc-related__read">{item.readTime}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Renders a ptofthecity article block, or `null` for any other block type. */
export function renderPtocBlock(block: PageBlock): React.ReactNode {
  switch (block.blockType) {
    case 'ptocBodySingle':
    case 'ptocBodyLead':
    case 'ptocBodyTwoCol':
    case 'ptocBodyCallout':
    case 'ptocBodySidebar':
    case 'ptocBodyDropCap':
      return <BodyText block={block} />
    case 'ptocHeroImage':
    case 'ptocHeroSplit':
    case 'ptocHeroSplitLeft':
    case 'ptocHeroText':
      return <Hero block={block} />
    case 'ptocQuoteSimple':
    case 'ptocQuotePull':
    case 'ptocQuoteBox':
      return <Blockquote block={block} />
    case 'ptocImageFull':
    case 'ptocImageTwoUp':
    case 'ptocImageText':
    case 'ptocTextImage':
      return <ImageBlock block={block} />
    case 'ptocHeaderLarge':
    case 'ptocHeaderMedium':
    case 'ptocHeaderSmall':
    case 'ptocHeaderLabel':
      return <SectionHeader block={block} />
    case 'ptocCtaBanner':
    case 'ptocCtaInline':
    case 'ptocCtaMinimal':
      return <CallToAction block={block} />
    case 'ptocListBullets':
    case 'ptocListNumbered':
    case 'ptocListChecklist':
      return <List block={block} />
    case 'ptocDividerLine':
    case 'ptocDividerAccent':
    case 'ptocDividerBand':
    case 'ptocDividerSpace':
      return <Divider block={block} />
    case 'ptocAuthorRow':
    case 'ptocAuthorCard':
      return <AuthorCard block={block} />
    case 'ptocRelGrid':
    case 'ptocRelList':
      return <RelatedArticles block={block} />
    default:
      return null
  }
}
