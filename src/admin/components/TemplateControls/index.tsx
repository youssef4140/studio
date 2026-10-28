'use client'

import {
  FormSubmit,
  PublishButton,
  SaveDraftButton,
  UnpublishButton,
  useConfig,
  useDocumentInfo,
  useEditDepth,
  useForm,
  useFormFields,
  useFormModified,
  useHotkey,
  useLocale,
  useOperation,
} from '@payloadcms/ui'
import { formatAdminURL } from 'payload/shared'
import React, { useCallback, useRef } from 'react'

/**
 * The edit view's save controls for Pages and Articles, registered under
 * `admin.components.edit`. A real document gets Payload's own controls. A
 * template (src/fields/template.ts) is never published and may leave any field
 * empty, so it gets a single "Save" (a draft save, which skips required-field
 * validation) and no Publish, Save Draft, Unpublish or status.
 */

const useIsTemplate = () => useFormFields(([fields]) => Boolean(fields.isTemplate?.value))

/**
 * Payload's SaveDraftButton under the label "Save", in the primary spot. Its
 * own label can't be changed, so this does the same request: a draft save,
 * unvalidated, also on Cmd/Ctrl+S.
 */
function TemplateSaveButton(): React.ReactElement {
  const {
    config: {
      routes: { api },
    },
  } = useConfig()
  const { id, collectionSlug, setUnpublishedVersionCount, uploadStatus } = useDocumentInfo()
  const modified = useFormModified()
  const { code: locale } = useLocale()
  const { submit } = useForm()
  const operation = useOperation()
  const editDepth = useEditDepth()
  const ref = useRef<HTMLButtonElement>(null)

  const disabled = (operation === 'update' && !modified) || uploadStatus === 'uploading'

  const save = useCallback(async () => {
    if (disabled || !collectionSlug) return
    await submit({
      action: formatAdminURL({
        apiRoute: api,
        path: `/${collectionSlug}${id ? `/${id}` : ''}?locale=${locale}&depth=0&fallback-locale=null&draft=true`,
      }),
      method: id ? 'PATCH' : 'POST',
      overrides: { _status: 'draft' },
      skipValidation: true,
    })
    setUnpublishedVersionCount((count) => count + 1)
  }, [api, collectionSlug, disabled, id, locale, setUnpublishedVersionCount, submit])

  useHotkey({ cmdCtrlKey: true, editDepth, keyCodes: ['s'] }, (event) => {
    event.preventDefault()
    event.stopPropagation()
    ref.current?.click()
  })

  return (
    <FormSubmit
      buttonId="action-save"
      disabled={disabled}
      onClick={() => void save()}
      ref={ref}
      size="medium"
      type="button"
    >
      Save
    </FormSubmit>
  )
}

export const TemplatePublishButton: React.FC = () =>
  useIsTemplate() ? <TemplateSaveButton /> : <PublishButton />

/**
 * On a template, also hides the Published/Draft status next to these buttons.
 * Payload's `Status` can't be rendered from a custom Status slot: it is only
 * exported from a separate copy of @payloadcms/ui whose providers the admin
 * doesn't use, so it can't read the admin's config. This slot sits in the same
 * controls bar on every edit view, and the rule goes away with the template.
 */
export const TemplateSaveDraftButton: React.FC = () =>
  useIsTemplate() ? (
    <style>{'.doc-controls__status { display: none; }'}</style>
  ) : (
    <SaveDraftButton />
  )

export const TemplateUnpublishButton: React.FC = () =>
  useIsTemplate() ? null : <UnpublishButton />
