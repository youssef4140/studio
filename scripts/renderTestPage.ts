import 'dotenv/config'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import fs from 'node:fs'
import path from 'node:path'
import { renderBlocks } from '../src/render/renderBlocks'
import { resolveDocTheme } from '../src/render/theme'
import { getRenderAssets, readAssetSources } from '../src/render/assets'

async function main() {
  const payload = await getPayload({ config: configPromise })

  // Find the cob/services folder
  const { docs: folders } = await payload.find({
    collection: 'folders',
    where: { path: { equals: 'cob/services' } },
    depth: 0,
    overrideAccess: true,
  })

  if (!folders[0]) {
    console.error('cob/services folder not found!')
    process.exit(1)
  }

  const folder = folders[0]

  // Find or create a test page under cob/services with all 3 hero blocks
  const { docs: existingPages } = await payload.find({
    collection: 'pages',
    where: {
      and: [{ folder: { equals: folder.id } }, { slug: { equals: 'test-hero' } }],
    },
    overrideAccess: true,
  })

  const layoutData = [
    {
      blockType: 'cobPgHeroLeft',
      eyebrow: 'Rehabilitation Services',
      title: 'Restoring Strength, Movement, and Quality of Life',
      subtitle:
        'Comprehensive physical therapy programs tailored to your recovery goals. Expert therapists, modern equipment, and dedicated support every step of the way.',
      primaryButton: {
        label: 'Book an Appointment',
        href: '#book',
      },
      secondaryButton: {
        label: 'Learn More',
        href: '#learn',
      },
    },
    {
      blockType: 'cobPgHeroRight',
      eyebrow: 'Rehabilitation Services',
      title: 'Restoring Strength, Movement, and Quality of Life',
      subtitle:
        'Comprehensive physical therapy programs tailored to your recovery goals. Expert therapists, modern equipment, and dedicated support every step of the way.',
      primaryButton: {
        label: 'Book an Appointment',
        href: '#book',
      },
      secondaryButton: {
        label: 'Learn More',
        href: '#learn',
      },
    },
    {
      blockType: 'cobPgHeroBackground',
      eyebrow: 'Rehabilitation Services',
      title: 'Restoring Strength, Movement, and Quality of Life',
      subtitle:
        'Comprehensive physical therapy programs tailored to your recovery goals. Expert therapists, modern equipment, and dedicated support every step of the way.',
      primaryButton: {
        label: 'Book an Appointment',
        href: '#book',
      },
      secondaryButton: {
        label: 'Learn More',
        href: '#learn',
      },
    },
    {
      blockType: 'cobPgFeat4',
      eyebrow: 'WHY CHOOSE US',
      heading: 'End-to-End Specialised Support',
      items: [
        {
          title: 'Financial Relief / Claims',
          text: 'Expert guidance to reduce claim denials and recover outstanding revenue.',
        },
        {
          title: 'Front Office Management',
          text: 'Smooth appointment scheduling and seamless patient intake.',
        },
        {
          title: 'Medical Documentation',
          text: 'Compliant and accurate clinical records and coding workflows.',
        },
        {
          title: 'Billing & RCM Support',
          text: 'Comprehensive billing management tailored to your practice size.',
        },
      ],
    },
    {
      blockType: 'cobPgFeat3',
      eyebrow: 'OUR PROCESS',
      heading: 'Comprehensive Care Tailored to You',
      items: [
        {
          title: 'Assessment & Diagnosis',
          text: 'Thorough evaluation to identify the root cause of your symptoms.',
        },
        {
          title: 'Personalized Treatment Plan',
          text: 'Targeted therapies designed around your lifestyle and recovery goals.',
        },
        {
          title: 'Ongoing Monitoring & Support',
          text: 'Continuous adjustments to ensure maximum strength and progress.',
        },
      ],
    },
    {
      blockType: 'cobPgFeatGrid',
      eyebrow: 'SERVICES OVERVIEW',
      heading: 'Specialized Capabilities',
      items: [
        {
          title: 'Revenue Cycle Optimization',
          text: 'Accelerate cash flow with automated charge capture and auditing.',
        },
        {
          title: 'Provider Credentialing',
          text: 'Complete payer enrollment and maintenance across all networks.',
        },
        {
          title: 'Denial Management',
          text: 'Rapid appeals and proactive root-cause fixes for unpaid claims.',
        },
        {
          title: 'Patient Billing & Support',
          text: 'Transparent statements and friendly payment plan assistance.',
        },
      ],
    },
  ]

  let pageDoc: any
  if (existingPages[0]) {
    pageDoc = await payload.update({
      collection: 'pages',
      id: existingPages[0].id,
      data: {
        title: 'COB Test Page - Hero & Features',
        _status: 'published',
        layout: layoutData as any,
      },
      overrideAccess: true,
    })
    console.info('Updated existing test page')
  } else {
    pageDoc = await payload.create({
      collection: 'pages',
      data: {
        title: 'COB Test Page - Hero & Features',
        slug: 'test-hero',
        folder: folder.id,
        _status: 'published',
        layout: layoutData as any,
      },
      overrideAccess: true,
    })
    console.info('Created new test page')
  }

  // Render the page envelope
  const theme = await resolveDocTheme(payload, pageDoc.tenant)
  const envelope = await renderBlocks('pages', pageDoc, { theme })

  // Read bundled assets
  const assets = getRenderAssets()
  const rawAssets = readAssetSources()

  // Build a complete standalone HTML document with embedded CSS & JS so it opens directly in any browser
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${envelope.head.title || 'COB Hero Test Page'}</title>
  ${(envelope.theme?.fontStylesheets ?? []).map((url) => `<link rel="stylesheet" href="${url}">`).join('\n  ')}
  <style>
    /* Reset & page defaults */
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f1f5f9;
      color: #0f172a;
    }
    .preview-header {
      background: #0f172a;
      color: #fff;
      padding: 1rem 2rem;
      font-size: 0.9rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .preview-section-title {
      background: #e2e8f0;
      padding: 0.5rem 2rem;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #475569;
      border-top: 2px dashed #cbd5e1;
    }
  </style>
  <style>
${rawAssets.css}
  </style>
</head>
<body>
  <div class="preview-header">
    <strong>COB Website — Hero Components Preview</strong>
    <span>Address: <code>cob/services/test-hero</code></span>
  </div>

  <main>
    ${envelope.html}
  </main>

  <script>
${rawAssets.js}
  </script>
</body>
</html>
`

  const outPath = path.join(process.cwd(), 'cob-hero-test.html')
  fs.writeFileSync(outPath, fullHtml, 'utf8')
  console.info(`Rendered test page saved to: ${outPath}`)
  console.info('Envelope Overview:', {
    version: envelope.renderVersion,
    cssAsset: envelope.assets.css,
    jsAsset: envelope.assets.js,
    htmlBytes: envelope.html.length,
  })

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
