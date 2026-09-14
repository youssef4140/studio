import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { Page } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

// Note: form-builder and SEO are introduced properly per the build order
// (§8: forms at step 17, JSON-LD at step 12). They are left wired here because
// they are already in the schema; the search plugin was website-template-only
// and has been removed along with the Posts collection.

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Studio` : 'Studio'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages'],
    overrides: {
      // Not used yet — hidden from the admin nav rather than removed, so the
      // plugin/schema stay intact for when redirects are actually wired up.
      admin: {
        hidden: true,
      },
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    // Not built yet (step 17) — hidden from the admin nav rather than removed.
    formOverrides: {
      admin: {
        hidden: true,
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      admin: {
        hidden: true,
      },
    },
  }),
]
