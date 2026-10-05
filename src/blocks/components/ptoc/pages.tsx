import React from 'react'

import type { PageBlock } from '@/render/types'

import { Background, Button, Media } from './parts'

/**
 * ptofthecity's page blocks (configs in src/blocks/ptoc/pages.ts): the sections
 * its Programs, Conditions and Services pages are built from. One component per
 * Figma component, switching on the variant's slug. Inner content only — the
 * shared <Block> wrapper owns the outer <section>. All styling is in
 * src/render/assets/ptofthecity.css under `ptoc-pg-*`; nothing here is
 * editor-styled.
 */

type PgBlock<T extends PageBlock['blockType']> = Extract<PageBlock, { blockType: T }>

type ButtonData = React.ComponentProps<typeof Button>['button']

function Eyebrow({ text }: { text?: string | null }): React.ReactElement | null {
  return text ? <p className="ptoc-pg-eyebrow">{text}</p> : null
}

/** One or two buttons side by side; `onDark` is the white pair drawn on dark panels. */
function Buttons({
  primary,
  secondary,
  onDark = false,
}: {
  primary?: ButtonData
  secondary?: ButtonData
  onDark?: boolean
}): React.ReactElement | null {
  if (!primary?.label && !secondary?.label) return null
  const tone = onDark ? '-light' : ''
  return (
    <div className="ptoc-pg-buttons">
      <Button button={primary} className={`ptoc-pg-button ptoc-pg-button--solid${tone}`} />
      <Button button={secondary} className={`ptoc-pg-button ptoc-pg-button--outline${tone}`} />
    </div>
  )
}

/** The centred "eyebrow, heading" pair above a set of cards. */
function SectionHead({
  eyebrow,
  heading,
}: {
  eyebrow?: string | null
  heading?: string | null
}): React.ReactElement | null {
  if (!eyebrow && !heading) return null
  return (
    <div className="ptoc-pg-head">
      <Eyebrow text={eyebrow} />
      {heading ? <h2 className="ptoc-pg-heading">{heading}</h2> : null}
    </div>
  )
}

function Stats({
  stats,
  className = 'ptoc-pg-stats',
}: {
  stats?: { value: string; label: string; id?: string | null }[] | null
  className?: string
}): React.ReactElement | null {
  if (!stats?.length) return null
  return (
    <dl className={className}>
      {stats.map((stat, index) => (
        <div className="ptoc-pg-stat" key={stat.id ?? index}>
          <dt className="ptoc-pg-stat__label">{stat.label}</dt>
          <dd className="ptoc-pg-stat__value">{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Person({
  avatar,
  name,
  role,
}: {
  avatar: React.ComponentProps<typeof Media>['image']
  name?: string | null
  role?: string | null
}): React.ReactElement {
  return (
    <div className="ptoc-pg-person">
      <Media image={avatar} className="ptoc-pg-avatar" />
      <div className="ptoc-pg-person__info">
        {name ? <p className="ptoc-pg-person__name">{name}</p> : null}
        {role ? <p className="ptoc-pg-person__role">{role}</p> : null}
      </div>
    </div>
  )
}

type HeroBlock = PgBlock<'ptocPgHeroRight' | 'ptocPgHeroLeft' | 'ptocPgHeroCenter'>

function Hero({ block }: { block: HeroBlock }): React.ReactElement {
  const content = (
    <>
      <Eyebrow text={block.eyebrow} />
      <h1 className="ptoc-pg-hero__title">{block.title}</h1>
      {block.subtitle ? <p className="ptoc-pg-hero__subtitle">{block.subtitle}</p> : null}
      <Buttons primary={block.primaryButton} secondary={block.secondaryButton} />
    </>
  )

  if (block.blockType === 'ptocPgHeroCenter') {
    return (
      <div className="ptoc ptoc-pg ptoc-pg-hero ptoc-pg-hero--center">
        <div className="ptoc-wrap ptoc-pg-hero__stack">
          <div className="ptoc-pg-hero__content">{content}</div>
          <Media image={block.image} className="ptoc-pg-media ptoc-pg-hero__media" />
        </div>
      </div>
    )
  }

  const side = block.blockType === 'ptocPgHeroLeft' ? ' ptoc-pg--image-left' : ''
  return (
    <div className={`ptoc ptoc-pg ptoc-pg-hero ptoc-pg-hero--split${side}`}>
      <div className="ptoc-wrap ptoc-pg-split">
        <div className="ptoc-pg-hero__content">{content}</div>
        <Media image={block.image} className="ptoc-pg-media ptoc-pg-hero__media" />
      </div>
    </div>
  )
}

type FeaturesBlock = PgBlock<'ptocPgFeat4' | 'ptocPgFeat3' | 'ptocPgFeatList'>

const FEATURES_VARIANT = {
  ptocPgFeat4: 'four',
  ptocPgFeat3: 'three',
  ptocPgFeatList: 'list',
} as const

function Features({ block }: { block: FeaturesBlock }): React.ReactElement {
  return (
    <div
      className={`ptoc ptoc-pg ptoc-pg-features ptoc-pg-features--${FEATURES_VARIANT[block.blockType]}`}
    >
      <div className="ptoc-wrap ptoc-pg-section">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />
        <ul className="ptoc-pg-features__items">
          {(block.items ?? []).map((item, index) => (
            <li className="ptoc-pg-feature" key={item.id ?? index}>
              <Media image={item.icon} className="ptoc-pg-icon" />
              <div className="ptoc-pg-feature__body">
                <h3 className="ptoc-pg-feature__title">{item.title}</h3>
                {item.text ? <p className="ptoc-pg-feature__text">{item.text}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

type AboutBlock = PgBlock<'ptocPgAboutRight' | 'ptocPgAboutLeft' | 'ptocPgAboutText'>

function About({ block }: { block: AboutBlock }): React.ReactElement {
  const heading = block.heading ? <h2 className="ptoc-pg-heading">{block.heading}</h2> : null
  const text = block.text ? <p className="ptoc-pg-text">{block.text}</p> : null

  if (block.blockType === 'ptocPgAboutText') {
    return (
      <div className="ptoc ptoc-pg ptoc-pg-about ptoc-pg-about--text">
        <div className="ptoc-wrap ptoc-pg-about__stack">
          <div className="ptoc-pg-head">
            <Eyebrow text={block.eyebrow} />
            {heading}
            {text}
          </div>
          <Stats stats={block.stats} />
        </div>
      </div>
    )
  }

  const side = block.blockType === 'ptocPgAboutLeft' ? ' ptoc-pg--image-left' : ''
  return (
    <div className={`ptoc ptoc-pg ptoc-pg-about${side}`}>
      <div className="ptoc-wrap ptoc-pg-split">
        <div className="ptoc-pg-about__content">
          <Eyebrow text={block.eyebrow} />
          {heading}
          {text}
          <Stats stats={block.stats} />
        </div>
        <Media image={block.image} className="ptoc-pg-media ptoc-pg-about__media" />
      </div>
    </div>
  )
}

type TestimonialsBlock = PgBlock<'ptocPgTesti3' | 'ptocPgTesti2' | 'ptocPgTestiOne'>

function Testimonials({ block }: { block: TestimonialsBlock }): React.ReactElement {
  if (block.blockType === 'ptocPgTestiOne') {
    return (
      <div className="ptoc ptoc-pg ptoc-pg-testi ptoc-pg-testi--one">
        <figure className="ptoc-wrap ptoc-pg-testi__stack">
          <Eyebrow text={block.eyebrow} />
          <blockquote className="ptoc-pg-testi__quote">{block.quote}</blockquote>
          <figcaption>
            <Person avatar={block.avatar} name={block.name} role={block.role} />
          </figcaption>
        </figure>
      </div>
    )
  }

  const variant = block.blockType === 'ptocPgTesti2' ? 'two' : 'three'
  return (
    <div className={`ptoc ptoc-pg ptoc-pg-testi ptoc-pg-testi--${variant}`}>
      <div className="ptoc-wrap ptoc-pg-section">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />
        <ul className="ptoc-pg-testi__cards">
          {(block.items ?? []).map((item, index) => (
            <li key={item.id ?? index}>
              <figure className="ptoc-pg-testi__card">
                <blockquote className="ptoc-pg-testi__quote">{item.quote}</blockquote>
                <figcaption>
                  <Person avatar={item.avatar} name={item.name} role={item.role} />
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

type CtaBlock = PgBlock<'ptocPgCtaDark' | 'ptocPgCtaLight' | 'ptocPgCtaBanner'>

function CallToAction({ block }: { block: CtaBlock }): React.ReactElement {
  const heading = <h2 className="ptoc-pg-cta__heading">{block.heading}</h2>
  const text = block.text ? <p className="ptoc-pg-cta__text">{block.text}</p> : null

  if (block.blockType === 'ptocPgCtaLight') {
    return (
      <div className="ptoc ptoc-pg ptoc-pg-cta ptoc-pg-cta--light">
        <div className="ptoc-wrap ptoc-pg-cta__row">
          <div className="ptoc-pg-cta__content">
            {heading}
            {text}
          </div>
          <Buttons primary={block.button} />
        </div>
      </div>
    )
  }

  if (block.blockType === 'ptocPgCtaBanner') {
    return (
      <div className="ptoc ptoc-pg ptoc-pg-cta ptoc-pg-cta--banner">
        <div className="ptoc-wrap">
          <div className="ptoc-pg-cta__panel ptoc-dark">
            <Background image={block.bgImage} />
            {heading}
            {text}
            <Buttons primary={block.button} onDark />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ptoc ptoc-pg ptoc-pg-cta ptoc-pg-cta--dark ptoc-dark">
      <Background image={block.bgImage} />
      <div className="ptoc-wrap ptoc-pg-cta__panel">
        {heading}
        {text}
        <Buttons primary={block.primaryButton} secondary={block.secondaryButton} onDark />
      </div>
    </div>
  )
}

type ProgramBlock = PgBlock<'ptocPgProgDark' | 'ptocPgProgLight'>

function ProgramDetails({ block }: { block: ProgramBlock }): React.ReactElement {
  const dark = block.blockType === 'ptocPgProgDark'
  const items = block.items ?? []
  return (
    <div
      className={
        dark
          ? 'ptoc ptoc-pg ptoc-pg-program ptoc-pg-program--dark ptoc-pg--image-left ptoc-dark'
          : 'ptoc ptoc-pg ptoc-pg-program ptoc-pg-program--light'
      }
    >
      {block.blockType === 'ptocPgProgDark' ? <Background image={block.bgImage} /> : null}
      <div className="ptoc-wrap ptoc-pg-split">
        <div className="ptoc-pg-program__content">
          <Eyebrow text={block.eyebrow} />
          {block.heading ? <h2 className="ptoc-pg-heading">{block.heading}</h2> : null}
          {block.text ? <p className="ptoc-pg-text">{block.text}</p> : null}
          <Stats stats={block.stats} className="ptoc-pg-program__stats" />
          {block.listLabel || items.length > 0 ? (
            <div className="ptoc-pg-program__list">
              <Eyebrow text={block.listLabel} />
              {items.length > 0 ? (
                <ul className="ptoc-pg-program__items">
                  {items.map((item, index) => (
                    <li className="ptoc-pg-program__item" key={item.id ?? index}>
                      {item.text}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>
        <Media image={block.image} className="ptoc-pg-media ptoc-pg-program__media" />
      </div>
    </div>
  )
}

type InfoBlock = PgBlock<'ptocPgInfoList' | 'ptocPgInfoSteps' | 'ptocPgInfoFaq'>

function InfoList({ block }: { block: InfoBlock }): React.ReactElement {
  const heading = block.heading ? <h2 className="ptoc-pg-info__heading">{block.heading}</h2> : null

  if (block.blockType === 'ptocPgInfoSteps') {
    return (
      <div className="ptoc ptoc-pg ptoc-pg-info ptoc-pg-info--steps">
        <div className="ptoc-wrap ptoc-pg-info__stack">
          {heading}
          <ol className="ptoc-pg-info__steps">
            {(block.items ?? []).map((item, index) => (
              <li className="ptoc-pg-info__step" key={item.id ?? index}>
                <h3 className="ptoc-pg-info__title">{item.title}</h3>
                {item.text ? <p className="ptoc-pg-info__text">{item.text}</p> : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

  if (block.blockType === 'ptocPgInfoFaq') {
    return (
      <div className="ptoc ptoc-pg ptoc-pg-info ptoc-pg-info--accordion">
        <div className="ptoc-wrap ptoc-pg-info__columns">
          <div className="ptoc-pg-info__intro">{heading}</div>
          <div className="ptoc-pg-info__questions">
            {(block.items ?? []).map((item, index) => (
              <details className="ptoc-pg-info__question" key={item.id ?? index}>
                <summary>
                  <span>{item.question}</span>
                </summary>
                {item.answer ? <p className="ptoc-pg-info__text">{item.answer}</p> : null}
              </details>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ptoc ptoc-pg ptoc-pg-info ptoc-pg-info--bullets">
      <div className="ptoc-wrap ptoc-pg-info__columns">
        <div className="ptoc-pg-info__intro">
          {heading}
          {block.text ? <p className="ptoc-pg-text">{block.text}</p> : null}
        </div>
        <ul className="ptoc-pg-info__bullets">
          {(block.items ?? []).map((item, index) => (
            <li className="ptoc-pg-info__bullet" key={item.id ?? index}>
              <h3 className="ptoc-pg-info__title">{item.title}</h3>
              {item.text ? <p className="ptoc-pg-info__text">{item.text}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Drawn with every answer showing, so each one starts open. */
function Faq({ block }: { block: PgBlock<'ptocPgFaq'> }): React.ReactElement {
  return (
    <div className="ptoc ptoc-pg ptoc-pg-faq">
      <div className="ptoc-wrap ptoc-pg-faq__stack">
        {block.heading || block.text ? (
          <div className="ptoc-pg-faq__header">
            {block.heading ? <h2 className="ptoc-pg-faq__heading">{block.heading}</h2> : null}
            {block.text ? <p className="ptoc-pg-faq__intro">{block.text}</p> : null}
          </div>
        ) : null}
        <div className="ptoc-pg-faq__list">
          {(block.items ?? []).map((item, index) => (
            <details className="ptoc-pg-faq__item" key={item.id ?? index} open>
              <summary>
                <span>{item.question}</span>
              </summary>
              {item.answer ? <p className="ptoc-pg-faq__answer">{item.answer}</p> : null}
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Renders a ptofthecity page block, or `null` for any other block type. */
export function renderPtocPageBlock(block: PageBlock): React.ReactNode {
  switch (block.blockType) {
    case 'ptocPgHeroRight':
    case 'ptocPgHeroLeft':
    case 'ptocPgHeroCenter':
      return <Hero block={block} />
    case 'ptocPgFeat4':
    case 'ptocPgFeat3':
    case 'ptocPgFeatList':
      return <Features block={block} />
    case 'ptocPgAboutRight':
    case 'ptocPgAboutLeft':
    case 'ptocPgAboutText':
      return <About block={block} />
    case 'ptocPgTesti3':
    case 'ptocPgTesti2':
    case 'ptocPgTestiOne':
      return <Testimonials block={block} />
    case 'ptocPgCtaDark':
    case 'ptocPgCtaLight':
    case 'ptocPgCtaBanner':
      return <CallToAction block={block} />
    case 'ptocPgProgDark':
    case 'ptocPgProgLight':
      return <ProgramDetails block={block} />
    case 'ptocPgInfoList':
    case 'ptocPgInfoSteps':
    case 'ptocPgInfoFaq':
      return <InfoList block={block} />
    case 'ptocPgFaq':
      return <Faq block={block} />
    default:
      return null
  }
}
