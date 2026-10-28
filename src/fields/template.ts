import type { CollectionAdminOptions, Field, PayloadRequest, Validate, Where } from 'payload'

import { adminRefererSegments } from './adminReferer'

/** The last segment of a subfolder's templates list: /admin/<tenant>/<subfolder>/templates. */
export const TEMPLATES_SEGMENT = 'templates'

/**
 * Marks a Page or Article as a template: a starting point that editors copy
 * from "Create New" (src/templates/fromTemplate.ts) instead of a document of
 * its own. Templates live in a subfolder like any document and use the same
 * blocks, but never publish or render (see the collections' hooks, the publish
 * handlers and authenticatedOrPublished).
 *
 * Set once, when the document is created from a templates list, and read-only
 * after: a live page can't be turned into a template, or back.
 */
export const templateField: Field = {
  name: 'isTemplate',
  type: 'checkbox',
  label: 'Template',
  defaultValue: ({ req }: { req: PayloadRequest }) =>
    adminRefererSegments(req)[2] === TEMPLATES_SEGMENT,
  admin: {
    position: 'sidebar',
    readOnly: true,
    description: 'A starting point for new documents in this folder. Never published.',
  },
}

/** Only real documents, not templates. `not_equals` also matches rows saved before the field existed. */
export const notTemplate: Where = { isTemplate: { not_equals: true } }

/** The edit view's save controls: a single "Save" on a template (src/admin/components/TemplateControls). */
export const templateEditComponents: NonNullable<
  NonNullable<CollectionAdminOptions['components']>['edit']
> = {
  PublishButton: '@/admin/components/TemplateControls#TemplatePublishButton',
  SaveDraftButton: '@/admin/components/TemplateControls#TemplateSaveDraftButton',
  UnpublishButton: '@/admin/components/TemplateControls#TemplateUnpublishButton',
}

const isTemplate = (data: unknown) =>
  Boolean((data as { isTemplate?: boolean } | undefined)?.isTemplate)

/** Hides a field on templates: `admin.condition`. */
export const notOnTemplates = (data: unknown) => !isTemplate(data)

/**
 * For a field that a document needs but a template has no use for (the slug:
 * a template has no address). Required on a real document, skipped on a
 * template; otherwise `validate` decides.
 */
export const requiredUnlessTemplate =
  (validate: Validate<string>): Validate<string> =>
  (value, args) => {
    if (!value) return isTemplate(args.data) || 'This field is required.'
    return validate(value, args)
  }
