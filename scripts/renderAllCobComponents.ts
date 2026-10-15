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

  // Media ID 1 corresponds to "Photo from Google Drive.png"
  const mediaId = 1

  // Build the complete layout data containing all COB page component variants
  const layoutData = [
    // 1. HERO - Left Image
    {
      blockType: 'cobPgHeroLeft',
      eyebrow: 'Rehabilitation Services',
      title: 'Restoring Strength, Movement, and Quality of Life',
      subtitle:
        'Comprehensive physical therapy programs tailored to your recovery goals. Expert therapists, modern equipment, and dedicated support every step of the way.',
      primaryButton: { label: 'Book an Appointment', href: '#book' },
      secondaryButton: { label: 'Learn More', href: '#learn' },
      image: mediaId,
    },
    // 2. HERO - Right Image
    {
      blockType: 'cobPgHeroRight',
      eyebrow: 'Specialized Care',
      title: 'Advanced Clinical Solutions Built For You',
      subtitle:
        'Empowering patients through individualized therapies and high-standard evidence-based interventions.',
      primaryButton: { label: 'Explore Programs', href: '#programs' },
      secondaryButton: { label: 'Contact Us', href: '#contact' },
      image: mediaId,
    },
    // 3. HERO - Banner Background Image
    {
      blockType: 'cobPgHeroBackground',
      eyebrow: 'Center of Excellence',
      title: 'Leading the Future of Integrated Healthcare',
      subtitle:
        'Personalized care pathways delivered with uncompromising clinical rigor and warm compassion.',
      primaryButton: { label: 'Get Started', href: '#start' },
      secondaryButton: { label: 'Our Philosophy', href: '#about' },
      image: mediaId,
    },

    // 4. FEATURES - 4 Cards with Icons
    {
      blockType: 'cobPgFeat4',
      eyebrow: 'WHY CHOOSE US',
      heading: 'End-to-End Specialised Support',
      items: [
        {
          icon: mediaId,
          title: 'Financial Relief & Claims',
          text: 'Expert guidance to reduce denials and recover revenue efficiently.',
        },
        {
          icon: mediaId,
          title: 'Front Office Excellence',
          text: 'Smooth appointment scheduling and seamless intake processes.',
        },
        {
          icon: mediaId,
          title: 'Medical Documentation',
          text: 'Compliant clinical records and streamlined workflows.',
        },
        {
          icon: mediaId,
          title: 'Billing & RCM Support',
          text: 'Comprehensive billing management tailored to practice needs.',
        },
      ],
    },
    // 5. FEATURES - 3 Cards with Images
    {
      blockType: 'cobPgFeat3',
      eyebrow: 'OUR PROCESS',
      heading: 'Comprehensive Care Tailored to You',
      items: [
        {
          image: mediaId,
          title: 'Assessment & Diagnosis',
          text: 'Thorough evaluation to identify the root cause of your symptoms.',
        },
        {
          image: mediaId,
          title: 'Personalized Treatment Plan',
          text: 'Targeted therapies designed around your lifestyle and recovery goals.',
        },
        {
          image: mediaId,
          title: 'Ongoing Monitoring & Support',
          text: 'Continuous adjustments to ensure maximum strength and progress.',
        },
      ],
    },
    // 6. FEATURES - 2x2 Grid with Icons
    {
      blockType: 'cobPgFeatGrid',
      eyebrow: 'SERVICES OVERVIEW',
      heading: 'Specialized Capabilities',
      items: [
        {
          icon: mediaId,
          title: 'Revenue Cycle Optimization',
          text: 'Accelerate cash flow with automated charge capture and auditing.',
        },
        {
          icon: mediaId,
          title: 'Provider Credentialing',
          text: 'Complete payer enrollment and maintenance across all networks.',
        },
        {
          icon: mediaId,
          title: 'Denial Management',
          text: 'Rapid appeals and proactive root-cause fixes for unpaid claims.',
        },
        {
          icon: mediaId,
          title: 'Patient Billing & Support',
          text: 'Transparent statements and friendly payment plan assistance.',
        },
      ],
    },

    // 7. ABOUT - Image Right
    {
      blockType: 'cobPgAboutRight',
      eyebrow: 'ABOUT OUR PRACTICE',
      heading: 'Dedicated to Excellence in Patient Care',
      text: 'Our clinic brings together top-tier medical specialists, cutting-edge diagnostic technology, and compassionate support staff to deliver healthcare that makes a genuine difference.',
      stats: [
        { value: '98%', label: 'Patient Satisfaction' },
        { value: '15k+', label: 'Successful Treatments' },
        { value: '25+', label: 'Years Experience' },
      ],
      image: mediaId,
    },
    // 8. ABOUT - Image Left
    {
      blockType: 'cobPgAboutLeft',
      eyebrow: 'WHO WE ARE',
      heading: 'Innovative Therapies, Meaningful Results',
      text: 'We prioritize holistic healing that restores long-term mobility and wellness, taking the time to listen, assess, and develop treatments that align with your lifestyle.',
      stats: [
        { value: '100%', label: 'Certified Therapists' },
        { value: '4.9/5', label: 'Clinical Rating' },
        { value: '24/7', label: 'Care Coordination' },
      ],
      image: mediaId,
    },
    // 9. ABOUT - Dark Steps with Numbers
    {
      blockType: 'cobPgAboutSteps',
      eyebrow: 'HOW IT WORKS',
      heading: 'Your Clear Path to Recovery',
      text: 'A straightforward, guided process from your initial consultation through your return to full activity.',
      steps: [
        {
          number: '01',
          title: 'Initial Consultation',
          text: 'In-depth diagnostic assessment and review of health history.',
        },
        {
          number: '02',
          title: 'Customized Protocol',
          text: 'A tailored plan designed with measurable milestones.',
        },
        {
          number: '03',
          title: 'Active Therapy',
          text: 'One-on-one sessions using modern rehabilitative techniques.',
        },
        {
          number: '04',
          title: 'Sustained Vitality',
          text: 'Post-recovery wellness guidance to prevent reinjury.',
        },
      ],
    },

    // 10. TESTIMONIALS - 3 Cards Grid
    {
      blockType: 'cobPgTestimonialCards',
      eyebrow: 'WHAT OUR CLIENTS SAY',
      heading: 'Trusted by Patients Across the Region',
      testimonials: [
        {
          quote:
            'The level of personalized care and attention to detail gave me complete confidence from day one.',
          author: 'Sarah Jenkins',
          role: 'Patient & Runner',
          avatar: mediaId,
        },
        {
          quote:
            'Outstanding team. They helped me avoid surgery and regain full shoulder mobility in just twelve weeks.',
          author: 'Michael Torres',
          role: 'Post-Rehab Client',
          avatar: mediaId,
        },
        {
          quote:
            'Professional, caring, and deeply knowledgeable. Easily the best clinical experience I have ever had.',
          author: 'Elena Rostova',
          role: 'Executive',
          avatar: mediaId,
        },
      ],
    },
    // 11. TESTIMONIALS - 2 Columns with Accent Bar
    {
      blockType: 'cobPgTestimonialColumns',
      eyebrow: 'PATIENT STORIES',
      heading: 'Real Journeys, Measurable Outcomes',
      testimonials: [
        {
          quote:
            'Their dedicated approach and progressive therapies transformed my daily mobility. I am back to living pain-free.',
          author: 'Dr. James Anderson',
          role: 'Orthopedic Surgeon',
          avatar: mediaId,
        },
        {
          quote:
            'Every session was structured, encouraging, and focused on functional improvement. Truly a top-tier facility.',
          author: 'Claire Campbell',
          role: 'Fitness Instructor',
          avatar: mediaId,
        },
      ],
    },
    // 12. TESTIMONIALS - Centered Dark Banner
    {
      blockType: 'cobPgTestimonialBanner',
      eyebrow: 'PATIENT TESTIMONIAL',
      quote:
        'Their compassionate guidance, expert clinical eye, and state-of-the-art facility helped me achieve complete recovery faster than I ever thought possible.',
      author: 'David Chen',
      role: 'Chief Medical Officer',
      avatar: mediaId,
    },

    // 13. CTA - Rounded Blue Banner
    {
      blockType: 'cobPgCtaBanner',
      title: 'Ready to Experience Exceptional Care?',
      text: 'Schedule your comprehensive consultation with our team of specialists today and begin your recovery.',
      primaryButton: { label: 'Book Consultation', href: '#book' },
      secondaryButton: { label: 'Learn More', href: '#learn' },
    },
    // 14. CTA - Inline Horizontal Strip
    {
      blockType: 'cobPgCtaStrip',
      title: 'Have Questions About Our Specialized Programs?',
      text: 'Speak directly with our clinical coordinators for immediate assistance.',
      primaryButton: { label: 'Contact Us Now', href: '#contact' },
    },
    // 15. CTA - Dark Box Banner
    {
      blockType: 'cobPgCtaBox',
      title: 'Begin Your Journey Toward Healthier Living',
      text: 'Discover tailored medical solutions designed around your unique health and lifestyle needs.',
      primaryButton: { label: 'Get Started Today', href: '#start' },
    },

    // 16. PROGRAM - Dark Navy with Left Image
    {
      blockType: 'cobPgProgramDark',
      eyebrow: 'SPECIALIZED PROGRAM',
      heading: 'Comprehensive Wellness & Rehabilitation',
      text: 'A structured, multidisciplinary program tailored to restore vitality and achieve long-term clinical outcomes.',
      cards: [
        {
          title: 'Clinical Precision',
          text: 'Personalized evidence-based interventions.',
        },
        {
          title: 'Dedicated Specialists',
          text: 'Direct access to experienced rehabilitation practitioners.',
        },
      ],
      featuresTitle: 'Key Program Elements',
      features: [
        { text: 'Continuous monitoring and personalized medical guidance' },
        { text: 'One-on-one therapy sessions with licensed practitioners' },
        { text: 'Advanced diagnostic equipment and progress metrics' },
        { text: 'Personalized home recovery exercises and nutrition guides' },
      ],
      image: mediaId,
    },
    // 17. PROGRAM - Light with Right Image
    {
      blockType: 'cobPgProgramLight',
      eyebrow: 'CLINICAL EXCELLENCE',
      heading: 'Holistic Recovery & Movement Therapy',
      text: 'Targeted physical conditioning designed to restore joint function, relieve nerve compression, and boost overall physical resilience.',
      cards: [
        {
          title: 'Targeted Therapy',
          text: 'Focused muscle activation and joint stabilization.',
        },
        {
          title: 'Long-Term Health',
          text: 'Preventative conditioning to avoid relapse.',
        },
      ],
      featuresTitle: 'Included in This Program',
      features: [
        { text: 'Biomechanical gait and posture analysis' },
        { text: 'Neuromuscular re-education and spinal decompression' },
        { text: 'Functional strength training and flexibility routines' },
        { text: 'Regular physician progress reviews and updates' },
      ],
      image: mediaId,
    },

    // 18. LOCATION - Details with Map Card
    {
      blockType: 'cobPgLocationDetails',
      eyebrow: 'OUR LOCATIONS',
      heading: 'Convenient Access to World-Class Care',
      text: 'Visit our modern healthcare facilities or reach out to coordinate your consultation.',
      contactMethods: [
        {
          icon: mediaId,
          title: 'Main Medical Center',
          value: '123 Healthcare Blvd, Suite 400, New York, NY',
          actionLabel: 'Get Directions',
          actionHref: 'https://maps.google.com',
        },
        {
          icon: mediaId,
          title: 'Call Our Care Team',
          value: '+1 (555) 234-5678 (Mon - Fri: 8am - 6pm)',
          actionLabel: 'Call Now',
          actionHref: 'tel:+15552345678',
        },
        {
          icon: mediaId,
          title: 'Email Inquiries',
          value: 'support@cobpractice.com',
          actionLabel: 'Send Email',
          actionHref: 'mailto:support@cobpractice.com',
        },
      ],
      mapTitle: 'Central Campus Clinic',
      mapAddress: '123 Healthcare Blvd, Suite 400',
      mapButton: { label: 'Open in Google Maps', href: 'https://maps.google.com' },
    },
    // 19. LOCATION - 4 Cards Grid
    {
      blockType: 'cobPgLocationCards',
      eyebrow: 'LOCATIONS & CLINICS',
      heading: 'Find a Facility Near You',
      text: 'Explore our specialized network of clinics providing comprehensive clinical care.',
      locations: [
        {
          icon: mediaId,
          name: 'Downtown Clinic',
          address: '742 Evergreen Terrace, Suite 100',
          phone: '+1 (555) 234-5678',
          button: { label: 'View Clinic', href: '/locations/downtown' },
        },
        {
          icon: mediaId,
          name: 'Uptown Center',
          address: '880 Madison Avenue, 4th Floor',
          phone: '+1 (555) 345-6789',
          button: { label: 'View Clinic', href: '/locations/uptown' },
        },
        {
          icon: mediaId,
          name: 'Westside Rehab',
          address: '412 West End Avenue',
          phone: '+1 (555) 456-7890',
          button: { label: 'View Clinic', href: '/locations/westside' },
        },
        {
          icon: mediaId,
          name: 'Midtown Health',
          address: '350 5th Avenue, Suite 210',
          phone: '+1 (555) 567-8901',
          button: { label: 'View Clinic', href: '/locations/midtown' },
        },
      ],
    },

    // 20. SERVICES - Interactive Directory List
    {
      blockType: 'cobPgServicesList',
      heading: 'Our Specialized Medical Services',
      text: 'Explore comprehensive clinical specialties delivered by multidisciplinary teams.',
      items: [
        {
          title: 'Orthopedic & Joint Rehabilitation',
          description:
            'Advanced post-operative recovery and non-invasive therapy for hip, knee, and shoulder health.',
          href: '/services/orthopedics',
        },
        {
          title: 'Neurological Care & Stroke Recovery',
          description:
            'Evidence-based neuromuscular therapies designed to rebuild motor pathways and independence.',
          href: '/services/neurology',
        },
        {
          title: 'Spine & Posture Optimization',
          description:
            'Decompression and targeted muscular conditioning to relieve acute and chronic back discomfort.',
          href: '/services/spine',
        },
        {
          title: 'Sports Performance & Injury Prevention',
          description:
            'Biomechanics assessment and athletic return-to-play conditioning protocols.',
          href: '/services/sports',
        },
      ],
    },
    // 21. SERVICES - 4 Cards with Header Image
    {
      blockType: 'cobPgServicesCards',
      eyebrow: 'AREAS OF EXPERTISE',
      heading: 'World-Class Healthcare Solutions',
      text: 'Dedicated specialty departments delivering patient-centered medical excellence.',
      cards: [
        {
          image: mediaId,
          title: 'Physical Therapy',
          text: 'Comprehensive movement re-education and rehabilitation for rapid return to daily mobility.',
          linkText: 'Explore Service',
          href: '/services/pt',
        },
        {
          image: mediaId,
          title: 'Occupational Therapy',
          text: 'Helping individuals resume everyday activities and work duties with greater confidence.',
          linkText: 'Explore Service',
          href: '/services/ot',
        },
        {
          image: mediaId,
          title: 'Sports Medicine',
          text: 'Specialized care for athletes of all skill levels, from injury management to peak performance.',
          linkText: 'Explore Service',
          href: '/services/sports-med',
        },
        {
          image: mediaId,
          title: 'Pain Management',
          text: 'Innovative, non-opioid strategies to mitigate chronic pain and improve quality of life.',
          linkText: 'Explore Service',
          href: '/services/pain-mgmt',
        },
      ],
    },
  ]

  // Find or create the test page in Payload
  const { docs: existingPages } = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { folder: { equals: folder.id } },
        { slug: { equals: 'cob-all-components' } },
      ],
    },
    overrideAccess: true,
  })

  let pageDoc: any
  if (existingPages[0]) {
    pageDoc = await payload.update({
      collection: 'pages',
      id: existingPages[0].id,
      data: {
        title: 'COB Website — Full Components Showcase',
        _status: 'published',
        layout: layoutData as any,
      },
      overrideAccess: true,
    })
    console.info('Updated existing showcase test page')
  } else {
    pageDoc = await payload.create({
      collection: 'pages',
      data: {
        title: 'COB Website — Full Components Showcase',
        slug: 'cob-all-components',
        folder: folder.id,
        _status: 'published',
        layout: layoutData as any,
      },
      overrideAccess: true,
    })
    console.info('Created new showcase test page')
  }

  // Populate media relationships by refetching page with depth 2
  const populatedPage = await payload.findByID({
    collection: 'pages',
    id: pageDoc.id,
    depth: 2,
    overrideAccess: true,
  })

  // Render the page envelope
  const theme = await resolveDocTheme(payload, populatedPage.tenant)
  const envelope = await renderBlocks('pages', populatedPage, { theme })

  // Read bundled assets
  const rawAssets = readAssetSources()

  // Build a complete standalone HTML document with embedded CSS & JS
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${envelope.head.title || 'COB Website Components Showcase'}</title>
  ${(envelope.theme?.fontStylesheets ?? []).map((url) => `<link rel="stylesheet" href="${url}">`).join('\n  ')}
  <style>
    /* Reset & page defaults */
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8fafc;
      color: #0f172a;
    }
    .preview-header {
      background: #1f4072;
      color: #fff;
      padding: 1.25rem 2rem;
      font-size: 0.95rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(31, 64, 114, 0.2);
    }
    .preview-header a {
      color: #fff3b4;
      text-decoration: none;
      font-weight: 600;
    }
    .preview-header a:hover {
      text-decoration: underline;
    }
  </style>
  <style>
${rawAssets.css}
  </style>
</head>
<body>
  <div class="preview-header">
    <strong>COB Website — Full Components Showcase</strong>
    <span>Address: <code>cob/services/cob-all-components</code></span>
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

  const outPath = path.join(process.cwd(), 'cob-components-showcase.html')
  fs.writeFileSync(outPath, fullHtml, 'utf8')
  console.info(`Rendered showcase HTML saved to: ${outPath}`)
  console.info('Showcase Stats:', {
    version: envelope.renderVersion,
    totalBlocks: layoutData.length,
    htmlBytes: envelope.html.length,
  })

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

