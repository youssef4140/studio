import React from 'react'

import type { TextEditor } from '@/payload-types'
import { RichText } from '@/render/RichText'

import { articleParts } from '../articleParts'

/**
 * TNY's article blocks (configs in src/blocks/tny). One component per Figma
 * component, switching on the variant's slug. Inner content only — the shared
 * <Block> wrapper owns the outer <section>. All styling is in
 * src/render/assets/tny.css; nothing here is editor-styled.
 */

type ArticleBlock = NonNullable<TextEditor['layout']>[number]

/** The block with this slug, as generated in payload-types. */
type TnyBlock<T extends ArticleBlock['blockType']> = Extract<ArticleBlock, { blockType: T }>

const { Media, Background, Button, Meta } = articleParts('tny')

type BodyBlock = TnyBlock<
  | 'tnyBodySingle'
  | 'tnyBodyLead'
  | 'tnyBodyTwoCol'
  | 'tnyBodyCallout'
  | 'tnyBodySidebar'
  | 'tnyBodyDropCap'
>

/** One rich text field, in the tenant's prose styles. Nothing when it is empty. */
function Prose({ data, className }: { data: unknown; className?: string }): React.ReactNode {
  const content = RichText({ data })
  if (!content) return null
  return <div className={className ? `tny-prose ${className}` : 'tny-prose'}>{content}</div>
}

/** The "Text Editor" blocks (Figma "Body Text"): rich text in a fixed layout. */
function BodyText({ block }: { block: BodyBlock }): React.ReactElement {
  switch (block.blockType) {
    case 'tnyBodyLead':
      return (
        <div className="tny tny-body tny-body--lead">
          <div className="tny-wrap tny-body__stack">
            <Prose data={block.lead} className="tny-body__lead" />
            <Prose data={block.body} />
          </div>
        </div>
      )
    case 'tnyBodyTwoCol':
      return (
        <div className="tny tny-body tny-body--two-col">
          <div className="tny-wrap tny-body__columns">
            <Prose data={block.body} className="tny-body__column" />
            <Prose data={block.body2} className="tny-body__column" />
          </div>
        </div>
      )
    case 'tnyBodyCallout':
      return (
        <div className="tny tny-body tny-body--callout">
          <div className="tny-wrap tny-body__stack">
            <Prose data={block.body} />
            {block.calloutLabel || block.callout ? (
              <aside className="tny-body__callout">
                {block.calloutLabel ? (
                  <p className="tny-body__callout-label">{block.calloutLabel}</p>
                ) : null}
                <Prose data={block.callout} />
              </aside>
            ) : null}
            <Prose data={block.bodyAfter} />
          </div>
        </div>
      )
    case 'tnyBodySidebar':
      return (
        <div className="tny tny-body tny-body--sidebar">
          <div className="tny-wrap tny-body__columns">
            <Prose data={block.body} className="tny-body__main" />
            {block.sideLabel || block.side ? (
              <aside className="tny-body__side">
                {block.sideLabel ? <p className="tny-body__side-label">{block.sideLabel}</p> : null}
                <Prose data={block.side} />
              </aside>
            ) : null}
          </div>
        </div>
      )
    case 'tnyBodyDropCap':
      return (
        <div className="tny tny-body tny-body--drop-cap">
          <div className="tny-wrap">
            <Prose data={block.body} />
          </div>
        </div>
      )
    default:
      return (
        <div className="tny tny-body">
          <div className="tny-wrap">
            <Prose data={block.body} />
          </div>
        </div>
      )
  }
}

type HeroBlock = TnyBlock<'tnyHeroImage' | 'tnyHeroSplit' | 'tnyHeroSplitLeft' | 'tnyHeroText'>

function Hero({ block }: { block: HeroBlock }): React.ReactElement {
  const eyebrow = block.eyebrow ? <p className="tny-eyebrow">{block.eyebrow}</p> : null
  const title = <h1 className="tny-hero__title">{block.title}</h1>
  const subtitle = block.subtitle ? <p className="tny-hero__subtitle">{block.subtitle}</p> : null
  const meta = <Meta author={block.author} date={block.date} readTime={block.readTime} />

  if (block.blockType === 'tnyHeroSplit' || block.blockType === 'tnyHeroSplitLeft') {
    const side = block.blockType === 'tnyHeroSplitLeft' ? ' tny-hero--image-left' : ''
    return (
      <div className={`tny tny-hero tny-hero--split${side}`}>
        <div className="tny-wrap tny-hero__columns">
          <div className="tny-hero__content">
            {eyebrow}
            {title}
            {subtitle}
            {meta}
          </div>
          <Media image={block.image} className="tny-hero__media" />
        </div>
      </div>
    )
  }

  if (block.blockType === 'tnyHeroImage') {
    return (
      <div className="tny tny-hero tny-hero--image tny-dark">
        <Background image={block.bgImage} />
        <div className="tny-wrap tny-hero__stack">
          {eyebrow}
          {title}
          {subtitle}
          {meta}
        </div>
      </div>
    )
  }

  return (
    <div className="tny tny-hero tny-hero--text">
      <div className="tny-wrap tny-hero__stack">
        {eyebrow}
        {title}
        {subtitle}
        <span className="tny-rule tny-rule--hero" aria-hidden="true" />
        {meta}
      </div>
    </div>
  )
}

type QuoteBlock = TnyBlock<'tnyQuoteSimple' | 'tnyQuotePull' | 'tnyQuoteBox'>

function Blockquote({ block }: { block: QuoteBlock }): React.ReactElement {
  if (block.blockType === 'tnyQuotePull') {
    return (
      <div className="tny tny-quote tny-quote--pull tny-dark">
        <figure className="tny-wrap tny-quote__stack">
          <span className="tny-quote__mark" aria-hidden="true">
            &quot;
          </span>
          <blockquote className="tny-quote__text">{block.quote}</blockquote>
          <span className="tny-rule tny-rule--quote" aria-hidden="true" />
          {block.attribution ? (
            <figcaption className="tny-quote__attribution">{block.attribution}</figcaption>
          ) : null}
        </figure>
      </div>
    )
  }

  const variant = block.blockType === 'tnyQuoteBox' ? 'box' : 'simple'
  return (
    <div className={`tny tny-quote tny-quote--${variant}`}>
      <div className="tny-wrap">
        <figure className="tny-quote__body">
          <blockquote className="tny-quote__text">{block.quote}</blockquote>
          {block.attribution ? (
            <figcaption className="tny-quote__attribution">{block.attribution}</figcaption>
          ) : null}
        </figure>
      </div>
    </div>
  )
}

type ImageBlockData = TnyBlock<'tnyImageFull' | 'tnyImageTwoUp' | 'tnyImageText' | 'tnyTextImage'>

function ImageBlock({ block }: { block: ImageBlockData }): React.ReactElement {
  if (block.blockType === 'tnyImageText' || block.blockType === 'tnyTextImage') {
    const side = block.blockType === 'tnyTextImage' ? ' tny-image--image-right' : ''
    return (
      <div className={`tny tny-image tny-image--text${side}`}>
        <div className="tny-wrap tny-image__columns">
          <Media image={block.image} className="tny-image__media" />
          <div className="tny-image__content">
            {block.heading ? <h3 className="tny-image__heading">{block.heading}</h3> : null}
            {block.text ? <p className="tny-image__text">{block.text}</p> : null}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="tny tny-image">
      <figure className="tny-wrap tny-image__figure">
        {block.blockType === 'tnyImageTwoUp' ? (
          <div className="tny-image__pair">
            <Media image={block.image} className="tny-image__half" />
            <Media image={block.image2} className="tny-image__half" />
          </div>
        ) : (
          <Media image={block.image} className="tny-image__full" />
        )}
        {block.caption ? (
          <figcaption className="tny-image__caption">{block.caption}</figcaption>
        ) : null}
      </figure>
    </div>
  )
}

type HeaderBlock = TnyBlock<
  'tnyHeaderLarge' | 'tnyHeaderMedium' | 'tnyHeaderSmall' | 'tnyHeaderLabel'
>

function SectionHeader({ block }: { block: HeaderBlock }): React.ReactElement {
  switch (block.blockType) {
    case 'tnyHeaderMedium':
      return (
        <div className="tny tny-header tny-header--medium">
          <div className="tny-wrap">
            <h3 className="tny-header__heading">{block.heading}</h3>
            {block.subheading ? <p className="tny-header__sub">{block.subheading}</p> : null}
          </div>
        </div>
      )
    case 'tnyHeaderSmall':
      return (
        <div className="tny tny-header tny-header--small">
          <div className="tny-wrap">
            <h4 className="tny-header__heading">{block.heading}</h4>
          </div>
        </div>
      )
    case 'tnyHeaderLabel':
      return (
        <div className="tny tny-header tny-header--label">
          <div className="tny-wrap">
            {block.label ? <p className="tny-header__label">{block.label}</p> : null}
            <h2 className="tny-header__heading">{block.heading}</h2>
            <span className="tny-header__rule" aria-hidden="true" />
          </div>
        </div>
      )
    default:
      return (
        <div className="tny tny-header tny-header--large">
          <div className="tny-wrap">
            <h2 className="tny-header__heading">{block.heading}</h2>
            {block.subheading ? <p className="tny-header__sub">{block.subheading}</p> : null}
          </div>
        </div>
      )
  }
}

type CtaBlock = TnyBlock<'tnyCtaBanner' | 'tnyCtaInline' | 'tnyCtaMinimal'>

function CallToAction({ block }: { block: CtaBlock }): React.ReactElement {
  if (block.blockType === 'tnyCtaBanner') {
    return (
      <div className="tny tny-cta tny-cta--banner">
        <div className="tny-wrap">
          <div className="tny-cta__box tny-dark">
            <h2 className="tny-cta__heading">{block.heading}</h2>
            {block.text ? <p className="tny-cta__text">{block.text}</p> : null}
            {block.primaryButton?.label || block.secondaryButton?.label ? (
              <div className="tny-cta__buttons">
                <Button button={block.primaryButton} />
                <Button button={block.secondaryButton} className="tny-button tny-button--outline" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  if (block.blockType === 'tnyCtaInline') {
    return (
      <div className="tny tny-cta tny-cta--inline">
        <div className="tny-wrap tny-cta__row">
          <div className="tny-cta__content">
            <h2 className="tny-cta__heading">{block.heading}</h2>
            {block.text ? <p className="tny-cta__text">{block.text}</p> : null}
          </div>
          <Button button={block.button} />
        </div>
      </div>
    )
  }

  return (
    <div className="tny tny-cta tny-cta--minimal">
      <div className="tny-wrap tny-cta__stack">
        <span className="tny-rule tny-rule--cta" aria-hidden="true" />
        {block.label ? <p className="tny-cta__label">{block.label}</p> : null}
        <Button button={block.link} className="tny-cta__link" />
      </div>
    </div>
  )
}

type ListBlock = TnyBlock<'tnyListBullets' | 'tnyListNumbered' | 'tnyListChecklist'>

const LIST_VARIANT = {
  tnyListBullets: 'bullets',
  tnyListNumbered: 'numbered',
  tnyListChecklist: 'checklist',
} as const

function List({ block }: { block: ListBlock }): React.ReactElement {
  const Tag = block.blockType === 'tnyListNumbered' ? 'ol' : 'ul'
  return (
    <div className={`tny tny-list tny-list--${LIST_VARIANT[block.blockType]}`}>
      <div className="tny-wrap">
        <Tag className="tny-list__items">
          {(block.items ?? []).map((item, index) => (
            <li className="tny-list__item" key={item.id ?? index}>
              <span className="tny-list__text">{item.text}</span>
            </li>
          ))}
        </Tag>
      </div>
    </div>
  )
}

type DividerBlock = TnyBlock<
  'tnyDividerLine' | 'tnyDividerAccent' | 'tnyDividerBand' | 'tnyDividerSpace'
>

const DIVIDER_VARIANT = {
  tnyDividerLine: 'line',
  tnyDividerAccent: 'accent',
  tnyDividerBand: 'band',
  tnyDividerSpace: 'space',
} as const

function Divider({ block }: { block: DividerBlock }): React.ReactElement {
  const variant = DIVIDER_VARIANT[block.blockType]
  if (variant === 'space') return <div className="tny tny-divider tny-divider--space" />

  return (
    <div className={`tny tny-divider tny-divider--${variant}`} role="separator">
      {variant === 'accent' ? (
        <div className="tny-divider__accent">
          <span className="tny-divider__line" />
          <span className="tny-divider__mark" />
          <span className="tny-divider__line" />
        </div>
      ) : (
        <div className="tny-wrap">
          <span className="tny-divider__line" />
        </div>
      )}
    </div>
  )
}

type AuthorBlock = TnyBlock<'tnyAuthorRow' | 'tnyAuthorCard'>

function AuthorCard({ block }: { block: AuthorBlock }): React.ReactElement {
  if (block.blockType === 'tnyAuthorCard') {
    return (
      <div className="tny tny-author tny-author--card">
        <div className="tny-wrap">
          <div className="tny-author__box tny-dark">
            <Media image={block.avatar} className="tny-author__avatar" />
            <p className="tny-author__name">{block.name}</p>
            {block.bio ? <p className="tny-author__bio">{block.bio}</p> : null}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="tny tny-author tny-author--row">
      <div className="tny-wrap tny-author__row">
        <Media image={block.avatar} className="tny-author__avatar" />
        <div className="tny-author__info">
          {block.label ? <p className="tny-author__label">{block.label}</p> : null}
          <p className="tny-author__name">{block.name}</p>
          {block.bio ? <p className="tny-author__bio">{block.bio}</p> : null}
        </div>
      </div>
    </div>
  )
}

type RelatedBlock = TnyBlock<'tnyRelGrid' | 'tnyRelList'>

/** The title, linked when the editor gave a link. */
function RelatedTitle({
  title,
  href,
}: {
  title: string
  href?: string | null
}): React.ReactElement {
  return <h3 className="tny-related__title">{href ? <a href={href}>{title}</a> : title}</h3>
}

function RelatedArticles({ block }: { block: RelatedBlock }): React.ReactElement {
  if (block.blockType === 'tnyRelList') {
    return (
      <div className="tny tny-related tny-related--list">
        <div className="tny-wrap">
          {block.heading ? <h2 className="tny-related__heading">{block.heading}</h2> : null}
          <ul className="tny-related__rows">
            {(block.items ?? []).map((item, index) => (
              <li className="tny-related__row" key={item.id ?? index}>
                <Media image={item.image} className="tny-related__thumb" />
                <div className="tny-related__info">
                  <RelatedTitle title={item.title} href={item.href} />
                  {item.description ? (
                    <p className="tny-related__excerpt">{item.description}</p>
                  ) : null}
                  {item.readTime ? <p className="tny-related__read">{item.readTime}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="tny tny-related tny-related--grid">
      <div className="tny-wrap">
        {block.heading ? <h2 className="tny-related__heading">{block.heading}</h2> : null}
        <ul className="tny-related__cards">
          {(block.items ?? []).map((item, index) => (
            <li className="tny-related__card" key={item.id ?? index}>
              <Media image={item.image} className="tny-related__thumb" />
              {item.category ? <p className="tny-related__category">{item.category}</p> : null}
              <RelatedTitle title={item.title} href={item.href} />
              {item.excerpt ? <p className="tny-related__excerpt">{item.excerpt}</p> : null}
              {item.readTime ? <p className="tny-related__read">{item.readTime}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Renders a TNY article block, or `null` for any other block type. */
export function renderTnyBlock(block: ArticleBlock): React.ReactNode {
  switch (block.blockType) {
    case 'tnyBodySingle':
    case 'tnyBodyLead':
    case 'tnyBodyTwoCol':
    case 'tnyBodyCallout':
    case 'tnyBodySidebar':
    case 'tnyBodyDropCap':
      return <BodyText block={block} />
    case 'tnyHeroImage':
    case 'tnyHeroSplit':
    case 'tnyHeroSplitLeft':
    case 'tnyHeroText':
      return <Hero block={block} />
    case 'tnyQuoteSimple':
    case 'tnyQuotePull':
    case 'tnyQuoteBox':
      return <Blockquote block={block} />
    case 'tnyImageFull':
    case 'tnyImageTwoUp':
    case 'tnyImageText':
    case 'tnyTextImage':
      return <ImageBlock block={block} />
    case 'tnyHeaderLarge':
    case 'tnyHeaderMedium':
    case 'tnyHeaderSmall':
    case 'tnyHeaderLabel':
      return <SectionHeader block={block} />
    case 'tnyCtaBanner':
    case 'tnyCtaInline':
    case 'tnyCtaMinimal':
      return <CallToAction block={block} />
    case 'tnyListBullets':
    case 'tnyListNumbered':
    case 'tnyListChecklist':
      return <List block={block} />
    case 'tnyDividerLine':
    case 'tnyDividerAccent':
    case 'tnyDividerBand':
    case 'tnyDividerSpace':
      return <Divider block={block} />
    case 'tnyAuthorRow':
    case 'tnyAuthorCard':
      return <AuthorCard block={block} />
    case 'tnyRelGrid':
    case 'tnyRelList':
      return <RelatedArticles block={block} />
    default:
      return null
  }
}
