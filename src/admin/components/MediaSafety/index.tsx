'use client'

import {
  ConfirmationModal,
  FormSubmit,
  Link,
  PopupList,
  toast,
  useConfig,
  useDocumentInfo,
  useForm,
  useFormFields,
  useFormModified,
  useModal,
  useOperation,
} from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { formatAdminURL } from 'payload/shared'
import React, { useEffect, useState } from 'react'

interface Usage {
  collection: string
  id: number
  title: string
}

/** `null` while loading. */
function useMediaUsage(): Usage[] | null {
  const { id } = useDocumentInfo()
  const { config } = useConfig()
  const [usage, setUsage] = useState<Usage[] | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    fetch(`${config.routes.api}/media/${id}/usage`, { credentials: 'include' })
      .then((res) => res.json())
      .then((json: { docs?: Usage[] }) => {
        if (!cancelled) setUsage(json.docs ?? [])
      })
      .catch(() => {
        if (!cancelled) setUsage([])
      })
    return () => {
      cancelled = true
    }
  }, [config.routes.api, id])

  return usage
}

const UsageList: React.FC<{ usage: Usage[] }> = ({ usage }) => {
  const { config } = useConfig()
  return (
    <ul style={{ margin: '0.5rem 0 0', paddingInlineStart: '1.25rem' }}>
      {usage.map((doc) => (
        <li key={`${doc.collection}:${doc.id}`}>
          <Link
            href={formatAdminURL({
              adminRoute: config.routes.admin,
              path: `/collections/${doc.collection}/${doc.id}`,
            })}
          >
            {doc.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const Warning: React.FC<{ consequence: string; usage: Usage[] | null }> = ({ consequence, usage }) => {
  if (usage === null) return <p>Checking where this file is used…</p>
  if (usage.length === 0) return <p>This file is not used on any page.</p>
  return (
    <div>
      <p style={{ margin: 0 }}>
        <strong>
          This file is used on {usage.length} {usage.length === 1 ? 'page' : 'pages'}.
        </strong>{' '}
        {consequence}
      </p>
      <UsageList usage={usage} />
    </div>
  )
}

/** Shown at the top of an existing media file's edit view. */
export const MediaUsageField: React.FC = () => {
  const { id } = useDocumentInfo()
  const usage = useMediaUsage()
  if (!id) return null

  return (
    <div
      style={{
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: 'var(--style-radius-m)',
        marginBlockEnd: '1.5rem',
        padding: '1rem',
      }}
    >
      <Warning consequence="Deleting or replacing it affects all of them." usage={usage} />
    </div>
  )
}

const DELETE_MODAL = 'media-delete-warning'

/** "Delete" in the edit view's ⋯ menu, with the usage warning as its confirmation. */
export const MediaDeleteMenuItem: React.FC = () => {
  const { id } = useDocumentInfo()
  const { config } = useConfig()
  const { openModal } = useModal()
  const { setModified } = useForm()
  const router = useRouter()
  const usage = useMediaUsage()
  if (!id) return null

  const remove = async () => {
    const res = await fetch(`${config.routes.api}/media/${id}/remove`, {
      credentials: 'include',
      method: 'DELETE',
    })
    if (!res.ok) {
      toast.error('Could not delete this file.')
      return
    }
    setModified(false)
    toast.success('File deleted.')
    router.push(formatAdminURL({ adminRoute: config.routes.admin, path: '/collections/media' }))
  }

  return (
    <>
      <PopupList.Button id="action-delete-media" onClick={() => openModal(DELETE_MODAL)}>
        Delete
      </PopupList.Button>
      <ConfirmationModal
        body={<Warning consequence="Deleting it affects all of them:" usage={usage} />}
        confirmLabel="Delete anyway"
        confirmingLabel="Deleting…"
        heading="Delete this file?"
        modalSlug={DELETE_MODAL}
        onConfirm={remove}
      />
    </>
  )
}

const REPLACE_MODAL = 'media-replace-warning'

/** Save button that asks first when the save would swap the file on an existing media item. */
export const MediaSaveButton: React.FC = () => {
  const { uploadStatus } = useDocumentInfo()
  const { submit } = useForm()
  const { openModal } = useModal()
  const modified = useFormModified()
  const operation = useOperation()
  const file = useFormFields(([fields]) => fields.file?.value)
  const usage = useMediaUsage()

  const replacing = operation === 'update' && typeof File !== 'undefined' && file instanceof File
  const disabled = (operation === 'update' && !modified) || uploadStatus === 'uploading'

  return (
    <>
      <FormSubmit
        buttonId="action-save"
        disabled={disabled}
        onClick={() => {
          if (uploadStatus === 'uploading') return
          if (replacing) openModal(REPLACE_MODAL)
          else void submit()
        }}
        size="medium"
        type="button"
      >
        Save
      </FormSubmit>
      <ConfirmationModal
        body={<Warning consequence="Replacing it changes the file on all of them:" usage={usage} />}
        confirmLabel="Replace anyway"
        confirmingLabel="Saving…"
        heading="Replace this file?"
        modalSlug={REPLACE_MODAL}
        onConfirm={async () => {
          await submit()
        }}
      />
    </>
  )
}
