import React from 'react'

import type { PageBlock } from '@/render/types'

import { Button, Media } from './parts'

type PgBlock<T extends PageBlock['blockType']> = Extract<PageBlock, { blockType: T }>

type ButtonData = React.ComponentProps<typeof Button>['button']

function Eyebrow({ text, light = false }: { text?: string | null; light?: boolean }): React.ReactElement | null {
  if (!text) return null
  return <p className={`cob-pg-eyebrow${light ? ' cob-pg-eyebrow--light' : ''}`}>{text}</p>
}

function Buttons({
  primary,
  secondary,
  light = false,
}: {
  primary?: ButtonData
  secondary?: ButtonData
  light?: boolean
}): React.ReactElement | null {
  if (!primary?.label && !secondary?.label) return null
  return (
    <div className="cob-pg-buttons">
      <Button button={primary} className="cob-pg-button cob-pg-button--primary" />
      <Button
        button={secondary}
        className={`cob-pg-button cob-pg-button--outline${light ? '-light' : ''}`}
      />
    </div>
  )
}

type HeroBlock = PgBlock<'cobPgHeroLeft' | 'cobPgHeroRight' | 'cobPgHeroBackground'>

function Hero({ block }: { block: HeroBlock }): React.ReactElement {
  if (block.blockType === 'cobPgHeroBackground') {
    return (
      <div className="cob cob-pg cob-pg-hero cob-pg-hero--background">
        <div className="cob-pg-hero__container">
          <div className="cob-pg-hero__content cob-pg-hero__content--center">
            <Eyebrow text={block.eyebrow} light />
            <h1 className="cob-pg-hero__title cob-pg-hero__title--light">{block.title}</h1>
            {block.subtitle ? (
              <p className="cob-pg-hero__subtitle cob-pg-hero__subtitle--light">{block.subtitle}</p>
            ) : null}
            <Buttons primary={block.primaryButton} secondary={block.secondaryButton} light />
          </div>
          <div className="cob-pg-hero__banner-image">
            <Media image={block.image} className="cob-pg-hero__frame-banner" />
          </div>
        </div>
      </div>
    )
  }

  const isImageLeft = block.blockType === 'cobPgHeroLeft'

  const content = (
    <div className="cob-pg-hero__content">
      <Eyebrow text={block.eyebrow} />
      <h1 className="cob-pg-hero__title">{block.title}</h1>
      {block.subtitle ? <p className="cob-pg-hero__subtitle">{block.subtitle}</p> : null}
      <Buttons primary={block.primaryButton} secondary={block.secondaryButton} />
    </div>
  )

  const media = (
    <div className="cob-pg-hero__media">
      <Media image={block.image} className="cob-pg-hero__frame" />
    </div>
  )

  return (
    <div className={`cob cob-pg cob-pg-hero${isImageLeft ? ' cob-pg-hero--image-left' : ''}`}>
      <div className="cob-pg-hero__container">
        {isImageLeft ? (
          <>
            {media}
            {content}
          </>
        ) : (
          <>
            {content}
            {media}
          </>
        )}
      </div>
    </div>
  )
}

// ---- Features ----

type FeaturesBlock = PgBlock<'cobPgFeat4' | 'cobPgFeat3' | 'cobPgFeatGrid'>

function SectionHead({
  eyebrow,
  heading,
}: {
  eyebrow?: string | null
  heading?: string | null
}): React.ReactElement | null {
  if (!eyebrow && !heading) return null
  return (
    <div className="cob-pg-section-head">
      <Eyebrow text={eyebrow} />
      {heading ? <h2 className="cob-pg-heading">{heading}</h2> : null}
    </div>
  )
}

function Features({ block }: { block: FeaturesBlock }): React.ReactElement {
  if (block.blockType === 'cobPgFeat3') {
    return (
      <div className="cob cob-pg cob-pg-features cob-pg-features--three">
        <div className="cob-pg-container">
          <SectionHead eyebrow={block.eyebrow} heading={block.heading} />
          <div className="cob-pg-features__grid-three">
            {(block.items ?? []).map((item, index) => (
              <div className="cob-pg-feature-card-image" key={item.id ?? index}>
                <div className="cob-pg-feature-card-image__media">
                  <Media image={item.image} className="cob-pg-feature-card-image__frame" />
                </div>
                <div className="cob-pg-feature-card-image__body">
                  <h3 className="cob-pg-feature-card__title">{item.title}</h3>
                  {item.text ? (
                    <p className="cob-pg-feature-card__text">{item.text}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (block.blockType === 'cobPgFeatGrid') {
    return (
      <div className="cob cob-pg cob-pg-features cob-pg-features--grid">
        <div className="cob-pg-container">
          <SectionHead eyebrow={block.eyebrow} heading={block.heading} />
          <div className="cob-pg-features__grid-two">
            {(block.items ?? []).map((item, index) => (
              <div className="cob-pg-feature-row" key={item.id ?? index}>
                <div className="cob-pg-feature-icon-wrapper">
                  <Media image={item.icon} className="cob-pg-feature-icon" />
                </div>
                <div className="cob-pg-feature-row__body">
                  <h3 className="cob-pg-feature-card__title">{item.title}</h3>
                  {item.text ? (
                    <p className="cob-pg-feature-card__text">{item.text}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // cobPgFeat4
  return (
    <div className="cob cob-pg cob-pg-features cob-pg-features--four">
      <div className="cob-pg-container">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} />
        <div className="cob-pg-features__grid-four">
          {(block.items ?? []).map((item, index) => (
            <div className="cob-pg-feature-card" key={item.id ?? index}>
              <div className="cob-pg-feature-icon-wrapper">
                <Media image={item.icon} className="cob-pg-feature-icon" />
              </div>
              <h3 className="cob-pg-feature-card__title">{item.title}</h3>
              {item.text ? (
                <p className="cob-pg-feature-card__text">{item.text}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---- About ----

type AboutBlock = PgBlock<'cobPgAboutRight' | 'cobPgAboutLeft' | 'cobPgAboutSteps'>

function Stats({
  stats,
}: {
  stats?: { value: string; label: string; id?: string | null }[] | null
}): React.ReactElement | null {
  if (!stats?.length) return null
  return (
    <div className="cob-pg-stats">
      {stats.map((stat, index) => (
        <div className="cob-pg-stat" key={stat.id ?? index}>
          <div className="cob-pg-stat__value">{stat.value}</div>
          <div className="cob-pg-stat__label">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

function About({ block }: { block: AboutBlock }): React.ReactElement {
  if (block.blockType === 'cobPgAboutSteps') {
    return (
      <div className="cob cob-pg cob-pg-about cob-pg-about--steps">
        <div className="cob-pg-container">
          <div className="cob-pg-about__steps-head">
            <Eyebrow text={block.eyebrow} light />
            {block.heading ? <h2 className="cob-pg-heading cob-pg-heading--light">{block.heading}</h2> : null}
            {block.text ? <p className="cob-pg-about__subtitle-light">{block.text}</p> : null}
          </div>
          <div className="cob-pg-about__steps-grid">
            {(block.steps ?? []).map((step, index) => (
              <div className="cob-pg-step-card" key={step.id ?? index}>
                <div className="cob-pg-step-circle">
                  <span>{step.number || `0${index + 1}`}</span>
                </div>
                <h3 className="cob-pg-step-card__title">{step.title}</h3>
                {step.text ? <p className="cob-pg-step-card__text">{step.text}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const isImageLeft = block.blockType === 'cobPgAboutLeft'

  const content = (
    <div className="cob-pg-about__content">
      <Eyebrow text={block.eyebrow} />
      {block.heading ? <h2 className="cob-pg-heading">{block.heading}</h2> : null}
      {block.text ? <p className="cob-pg-about__text">{block.text}</p> : null}
      <Stats stats={block.stats} />
    </div>
  )

  const media = (
    <div className="cob-pg-about__media">
      <Media image={block.image} className="cob-pg-about__frame" />
    </div>
  )

  return (
    <div className={`cob cob-pg cob-pg-about${isImageLeft ? ' cob-pg-about--image-left' : ''}`}>
      <div className="cob-pg-container cob-pg-about__container">
        {isImageLeft ? (
          <>
            {media}
            {content}
          </>
        ) : (
          <>
            {content}
            {media}
          </>
        )}
      </div>
    </div>
  )
}

// ---- Testimonials ----

type TestimonialBlock = PgBlock<
  'cobPgTestimonialCards' | 'cobPgTestimonialColumns' | 'cobPgTestimonialBanner'
>

function Avatar({
  image,
  name,
}: {
  image?: React.ComponentProps<typeof Media>['image']
  name?: string | null
}): React.ReactElement {

  if (image) {
    return <Media image={image} className="cob-pg-testimonial-avatar" />
  }
  const initials = (name || 'C')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  return (
    <div className="cob-pg-testimonial-avatar cob-pg-testimonial-avatar--placeholder">
      <span>{initials}</span>
    </div>
  )
}

function Testimonials({ block }: { block: TestimonialBlock }): React.ReactElement {
  if (block.blockType === 'cobPgTestimonialBanner') {
    return (
      <div className="cob cob-pg cob-pg-testimonial cob-pg-testimonial--banner">
        <div className="cob-pg-container cob-pg-testimonial__banner-container">
          <Eyebrow text={block.eyebrow} light />
          {block.quote ? (
            <blockquote className="cob-pg-testimonial__banner-quote">
              “{block.quote}”
            </blockquote>
          ) : null}
          <div className="cob-pg-testimonial__author-row">
            <Avatar image={block.avatar} name={block.author} />
            <div className="cob-pg-testimonial__author-info">
              {block.author ? (
                <div className="cob-pg-testimonial__author-name cob-pg-testimonial__author-name--light">
                  {block.author}
                </div>
              ) : null}
              {block.role ? (
                <div className="cob-pg-testimonial__author-role cob-pg-testimonial__author-role--light">
                  {block.role}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const isColumns = block.blockType === 'cobPgTestimonialColumns'

  return (
    <div
      className={`cob cob-pg cob-pg-testimonial${
        isColumns ? ' cob-pg-testimonial--columns' : ' cob-pg-testimonial--cards'
      }`}
    >
      <div className="cob-pg-container">
        <div className="cob-pg-section-head">
          <Eyebrow text={block.eyebrow} />
          {block.heading ? <h2 className="cob-pg-heading">{block.heading}</h2> : null}
        </div>
        <div
          className={
            isColumns
              ? 'cob-pg-testimonial__grid-columns'
              : 'cob-pg-testimonial__grid-cards'
          }
        >
          {(block.testimonials ?? []).map((t, index) => (
            <div
              className={`cob-pg-testimonial-card${
                isColumns ? ' cob-pg-testimonial-card--column' : ''
              }`}
              key={t.id ?? index}
            >
              {isColumns ? <div className="cob-pg-testimonial-accent-bar" /> : null}
              {t.quote ? (
                <p className="cob-pg-testimonial-card__quote">“{t.quote}”</p>
              ) : null}
              <div className="cob-pg-testimonial__author-row">
                <Avatar image={t.avatar} name={t.author} />
                <div className="cob-pg-testimonial__author-info">
                  {t.author ? (
                    <div className="cob-pg-testimonial__author-name">{t.author}</div>
                  ) : null}
                  {t.role ? (
                    <div className="cob-pg-testimonial__author-role">{t.role}</div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---- Call to Action (CTA) ----

type CtaBlock = PgBlock<'cobPgCtaBanner' | 'cobPgCtaStrip' | 'cobPgCtaBox'>

function CallToAction({ block }: { block: CtaBlock }): React.ReactElement {
  if (block.blockType === 'cobPgCtaStrip') {
    return (
      <div className="cob cob-pg cob-pg-cta cob-pg-cta--strip">
        <div className="cob-pg-container cob-pg-cta__strip-container">
          <div className="cob-pg-cta__strip-content">
            {block.title ? <h3 className="cob-pg-cta__strip-title">{block.title}</h3> : null}
            {block.text ? <p className="cob-pg-cta__strip-text">{block.text}</p> : null}
          </div>
          <div className="cob-pg-cta__strip-actions">
            <Button
              button={block.primaryButton}
              className="cob-pg-button cob-pg-button--accent"
            />
          </div>
        </div>
      </div>
    )
  }

  if (block.blockType === 'cobPgCtaBox') {
    return (
      <div className="cob cob-pg cob-pg-cta cob-pg-cta--box">
        <div className="cob-pg-container">
          <div className="cob-pg-cta__box-container">
            {block.title ? <h2 className="cob-pg-cta__box-title">{block.title}</h2> : null}
            {block.text ? <p className="cob-pg-cta__box-text">{block.text}</p> : null}
            <div className="cob-pg-cta__box-actions">
              <Button
                button={block.primaryButton}
                className="cob-pg-button cob-pg-button--accent"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // cobPgCtaBanner
  return (
    <div className="cob cob-pg cob-pg-cta cob-pg-cta--banner">
      <div className="cob-pg-container cob-pg-cta__banner-container">
        {block.title ? <h2 className="cob-pg-cta__banner-title">{block.title}</h2> : null}
        {block.text ? <p className="cob-pg-cta__banner-text">{block.text}</p> : null}
        <div className="cob-pg-cta__banner-actions">
          <Button
            button={block.primaryButton}
            className="cob-pg-button cob-pg-button--accent"
          />
          <Button
            button={block.secondaryButton}
            className="cob-pg-button cob-pg-button--outline-light"
          />
        </div>
      </div>
    </div>
  )
}

/** Renders a COB Website page block, or `null` for any other block type. */
// ---- Program / Services Details ----

type ProgramBlock = PgBlock<'cobPgProgramDark' | 'cobPgProgramLight'>

function CheckIcon({ dark = false }: { dark?: boolean }): React.ReactElement {
  return (
    <div
      className={`cob-pg-program-check-icon${
        dark ? ' cob-pg-program-check-icon--dark' : ''
      }`}
    >
      <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
        <path
          d="M1 5.5L4.8 9.5L13 1.5"
          stroke={dark ? '#1F4072' : '#246FB1'}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function Program({ block }: { block: ProgramBlock }): React.ReactElement {
  const isDark = block.blockType === 'cobPgProgramDark'

  const content = (
    <div className="cob-pg-program__content">
      <Eyebrow text={block.eyebrow} light={isDark} />
      {block.heading ? (
        <h2 className={`cob-pg-heading${isDark ? ' cob-pg-heading--light' : ''}`}>
          {block.heading}
        </h2>
      ) : null}
      {block.text ? (
        <p
          className={`cob-pg-program__text${
            isDark ? ' cob-pg-program__text--light' : ''
          }`}
        >
          {block.text}
        </p>
      ) : null}

      {block.cards?.length ? (
        <div className="cob-pg-program__cards">
          {block.cards.map((card, idx) => (
            <div
              className={`cob-pg-program-card${
                isDark ? ' cob-pg-program-card--dark' : ''
              }`}
              key={card.id ?? idx}
            >
              <h4 className="cob-pg-program-card__title">{card.title}</h4>
              {card.text ? (
                <p className="cob-pg-program-card__text">{card.text}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {block.features?.length ? (
        <div className="cob-pg-program__features-section">
          {block.featuresTitle ? (
            <h4
              className={`cob-pg-program__features-title${
                isDark ? ' cob-pg-program__features-title--light' : ''
              }`}
            >
              {block.featuresTitle}
            </h4>
          ) : null}
          <div className="cob-pg-program__features-list">
            {block.features.map((feature, idx) => (
              <div className="cob-pg-program-feature-item" key={feature.id ?? idx}>
                <CheckIcon dark={isDark} />
                <span
                  className={`cob-pg-program-feature-item__text${
                    isDark ? ' cob-pg-program-feature-item__text--light' : ''
                  }`}
                >
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )

  const media = (
    <div className="cob-pg-program__media">
      <Media image={block.image} className="cob-pg-program__frame" />
    </div>
  )

  return (
    <div
      className={`cob cob-pg cob-pg-program${
        isDark ? ' cob-pg-program--dark' : ' cob-pg-program--light'
      }`}
    >
      <div className="cob-pg-container cob-pg-program__container">
        {isDark ? (
          <>
            {media}
            {content}
          </>
        ) : (
          <>
            {content}
            {media}
          </>
        )}
      </div>
    </div>
  )
}

// ---- Location ----

type LocationBlock = PgBlock<'cobPgLocationDetails' | 'cobPgLocationCards'>

function MapPinIcon(): React.ReactElement {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C8.134 2 5 5.134 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.134 15.866 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
        fill="#246FB1"
      />
    </svg>
  )
}

function Location({ block }: { block: LocationBlock }): React.ReactElement {
  if (block.blockType === 'cobPgLocationDetails') {
    return (
      <div className="cob cob-pg cob-pg-location cob-pg-location--details">
        <div className="cob-pg-container cob-pg-location__details-container">
          <div className="cob-pg-location__details-left">
            <Eyebrow text={block.eyebrow} />
            {block.heading ? (
              <h2 className="cob-pg-heading">{block.heading}</h2>
            ) : null}
            {block.text ? (
              <p className="cob-pg-location__text">{block.text}</p>
            ) : null}

            <div className="cob-pg-location__methods">
              {(block.contactMethods ?? []).map((method, idx) => (
                <div className="cob-pg-location-method" key={method.id ?? idx}>
                  <div className="cob-pg-location-method__icon-wrapper">
                    {method.icon ? (
                      <Media
                        image={method.icon}
                        className="cob-pg-location-method__icon"
                      />
                    ) : (
                      <MapPinIcon />
                    )}
                  </div>
                  <div className="cob-pg-location-method__body">
                    <h4 className="cob-pg-location-method__title">
                      {method.title}
                    </h4>
                    <p className="cob-pg-location-method__value">
                      {method.value}
                    </p>
                    {method.actionLabel ? (
                      <a
                        className="cob-pg-location-method__link"
                        href={method.actionHref || '#'}
                      >
                        {method.actionLabel} &rarr;
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cob-pg-location__map-card">
            <div className="cob-pg-location__map-pin-circle">
              <MapPinIcon />
            </div>
            {block.mapTitle ? (
              <h3 className="cob-pg-location__map-title">{block.mapTitle}</h3>
            ) : null}
            {block.mapAddress ? (
              <p className="cob-pg-location__map-address">{block.mapAddress}</p>
            ) : null}
            {block.mapButton?.label ? (
              <Button
                button={block.mapButton}
                className="cob-pg-button cob-pg-button--accent"
              />
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  // cobPgLocationCards
  return (
    <div className="cob cob-pg cob-pg-location cob-pg-location--cards">
      <div className="cob-pg-container">
        <div className="cob-pg-section-head">
          <Eyebrow text={block.eyebrow} />
          {block.heading ? (
            <h2 className="cob-pg-heading">{block.heading}</h2>
          ) : null}
          {block.text ? (
            <p className="cob-pg-location__section-subtitle">{block.text}</p>
          ) : null}
        </div>

        <div className="cob-pg-location__grid-four">
          {(block.locations ?? []).map((loc, idx) => (
            <div className="cob-pg-location-card" key={loc.id ?? idx}>
              <div className="cob-pg-location-card__icon-wrapper">
                {loc.icon ? (
                  <Media image={loc.icon} className="cob-pg-location-card__icon" />
                ) : (
                  <MapPinIcon />
                )}
              </div>
              <h3 className="cob-pg-location-card__name">{loc.name}</h3>
              <p className="cob-pg-location-card__address">{loc.address}</p>
              {loc.phone ? (
                <p className="cob-pg-location-card__phone">{loc.phone}</p>
              ) : null}
              {loc.button?.label ? (
                <Button
                  button={loc.button}
                  className="cob-pg-button cob-pg-button--accent cob-pg-location-card__button"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---- Services ----

type ServicesBlock = PgBlock<'cobPgServicesList' | 'cobPgServicesCards'>

function ArrowRightIcon(): React.ReactElement {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M4.166 10H15.833M15.833 10L10 4.167M15.833 10L10 15.833"
        stroke="#246FB1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Services({ block }: { block: ServicesBlock }): React.ReactElement {
  if (block.blockType === 'cobPgServicesList') {
    return (
      <div className="cob cob-pg cob-pg-services cob-pg-services--list">
        <div className="cob-pg-container">
          <div className="cob-pg-section-head">
            {block.heading ? (
              <h2 className="cob-pg-heading">{block.heading}</h2>
            ) : null}
            {block.text ? (
              <p className="cob-pg-services__subtitle">{block.text}</p>
            ) : null}
          </div>

          <div className="cob-pg-services__list-group">
            {(block.items ?? []).map((item, idx) => {
              const content = (
                <div className="cob-pg-services-item" key={item.id ?? idx}>
                  <div className="cob-pg-services-item__left">
                    <h3 className="cob-pg-services-item__title">{item.title}</h3>
                    {item.description ? (
                      <p className="cob-pg-services-item__desc">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                  <div className="cob-pg-services-item__arrow">
                    <ArrowRightIcon />
                  </div>
                </div>
              )

              return item.href ? (
                <a
                  key={item.id ?? idx}
                  href={item.href}
                  className="cob-pg-services-item-link"
                >
                  {content}
                </a>
              ) : (
                content
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // cobPgServicesCards
  return (
    <div className="cob cob-pg cob-pg-services cob-pg-services--cards">
      <div className="cob-pg-container">
        <div className="cob-pg-section-head">
          <Eyebrow text={block.eyebrow} />
          {block.heading ? (
            <h2 className="cob-pg-heading">{block.heading}</h2>
          ) : null}
          {block.text ? (
            <p className="cob-pg-services__subtitle">{block.text}</p>
          ) : null}
        </div>

        <div className="cob-pg-services__cards-grid">
          {(block.cards ?? []).map((card, idx) => (
            <div className="cob-pg-service-card" key={card.id ?? idx}>
              <div className="cob-pg-service-card__image-box">
                <Media image={card.image} className="cob-pg-service-card__frame" />
              </div>
              <div className="cob-pg-service-card__body">
                <h3 className="cob-pg-service-card__title">{card.title}</h3>
                {card.text ? (
                  <p className="cob-pg-service-card__text">{card.text}</p>
                ) : null}
                {card.linkText ? (
                  <a
                    className="cob-pg-service-card__link"
                    href={card.href || '#'}
                  >
                    {card.linkText} &rarr;
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Renders a COB Website page block, or `null` for any other block type. */
export function renderCobPageBlock(block: PageBlock): React.ReactElement | null {
  switch (block.blockType) {
    case 'cobPgHeroLeft':
    case 'cobPgHeroRight':
    case 'cobPgHeroBackground':
      return <Hero block={block} />
    case 'cobPgFeat4':
    case 'cobPgFeat3':
    case 'cobPgFeatGrid':
      return <Features block={block} />
    case 'cobPgAboutRight':
    case 'cobPgAboutLeft':
    case 'cobPgAboutSteps':
      return <About block={block} />
    case 'cobPgTestimonialCards':
    case 'cobPgTestimonialColumns':
    case 'cobPgTestimonialBanner':
      return <Testimonials block={block} />
    case 'cobPgCtaBanner':
    case 'cobPgCtaStrip':
    case 'cobPgCtaBox':
      return <CallToAction block={block} />
    case 'cobPgProgramDark':
    case 'cobPgProgramLight':
      return <Program block={block} />
    case 'cobPgLocationDetails':
    case 'cobPgLocationCards':
      return <Location block={block} />
    case 'cobPgServicesList':
    case 'cobPgServicesCards':
      return <Services block={block} />
    default:
      return null
  }
}






