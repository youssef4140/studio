/*
 * Studio block runtime — the vanilla JS bundle (§3).
 * Published HTML ships NO React. Progressive enhancement only; binds on
 * [data-block="..."]. Accordions are native <details>/<summary>, carousels are
 * CSS scroll-snap, so this is intentionally near-empty. It grows at step 17
 * (forms). The same bundle loads in the live-preview iframe (step 10) so
 * behaviour cannot drift between preview and production.
 *
 * `window.__studioBlocks.init()` is idempotent — the preview calls it again
 * after swapping in freshly rendered markup.
 */
(function () {
  'use strict'

  var RENDER_VERSION = '__RENDER_VERSION__'

  function init() {
    document.documentElement.setAttribute('data-blocks-runtime', RENDER_VERSION)
    // Per-block behaviours register here (idempotently), e.g.:
    //   document.querySelectorAll('[data-block="carousel"]:not([data-enhanced])')
    //     .forEach(function (el) { el.setAttribute('data-enhanced', ''); enhanceCarousel(el) })
  }

  window.__studioBlocks = { init: init, version: RENDER_VERSION }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true })
  } else {
    init()
  }
})()
