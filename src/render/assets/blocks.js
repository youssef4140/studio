/*
 * Studio block runtime — the vanilla JS bundle (§3).
 * Published HTML ships NO React. Progressive enhancement only; binds on
 * [data-block="..."]. Accordions are native <details>/<summary>, carousels are
 * CSS scroll-snap, so this is intentionally near-empty. It grows at step 17
 * (forms). The same bundle loads in the preview iframe (step 10/14) so behaviour
 * cannot drift between preview and production.
 */
(function () {
  'use strict'

  var RENDER_VERSION = '__RENDER_VERSION__'

  function init() {
    document.documentElement.setAttribute('data-blocks-runtime', RENDER_VERSION)
    // Per-block behaviours register here, e.g.:
    //   document.querySelectorAll('[data-block="carousel"]').forEach(enhanceCarousel)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true })
  } else {
    init()
  }
})()
