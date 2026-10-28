'use client'

import { Button, Drawer, Link, useConfig, useModal } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { formatAdminURL } from 'payload/shared'
import React, { useState } from 'react'

const DRAWER_SLUG = 'template-picker'

export interface TemplateSummary {
  id: number
  title: string
  components: number
}

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`

/**
 * The "Create New" button of a subfolder list, and the drawer it opens: start
 * blank, or start from one of the folder's templates. A template is copied into
 * a new draft by POST /api/<collection>/from-template/:id
 * (src/templates/fromTemplate.ts), which then opens for editing.
 */
export const TemplatePickerClient: React.FC<{
  blankURL: string
  collection: string
  folderName: string
  manageURL: string
  noun: string
  templates: TemplateSummary[]
}> = ({ blankURL, collection, folderName, manageURL, noun, templates }) => {
  const { openModal } = useModal()
  const { config } = useConfig()
  const router = useRouter()
  const [busy, setBusy] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const startFrom = async (template: TemplateSummary) => {
    setBusy(template.id)
    setError(null)
    try {
      const res = await fetch(`${config.routes.api}/${collection}/from-template/${template.id}`, {
        method: 'POST',
        credentials: 'include',
      })
      const body = (await res.json()) as { id?: number; error?: string }
      if (!res.ok || !body.id) throw new Error(body.error || 'Could not start from this template.')
      router.push(
        formatAdminURL({
          adminRoute: config.routes.admin,
          path: `/collections/${collection}/${body.id}`,
        }),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setBusy(null)
    }
  }

  return (
    <>
      <Button buttonStyle="pill" margin={false} onClick={() => openModal(DRAWER_SLUG)} size="small">
        Create New
      </Button>
      <Drawer slug={DRAWER_SLUG} title={`New ${noun} in ${folderName}`}>
        <div style={{ display: 'grid', gap: 'calc(var(--base) * 0.75)', maxWidth: '40rem' }}>
          <Link className="template-picker__option" href={blankURL}>
            <strong>Blank {noun}</strong>
            <span>Start with no components.</span>
          </Link>
          {templates.map((template) => (
            <button
              className="template-picker__option"
              disabled={busy !== null}
              key={template.id}
              onClick={() => startFrom(template)}
              type="button"
            >
              <strong>{template.title}</strong>
              <span>
                {busy === template.id
                  ? 'Creating a copy…'
                  : `Template · ${plural(template.components, 'component')}`}
              </span>
            </button>
          ))}
          {templates.length === 0 ? (
            <p style={{ color: 'var(--theme-elevation-500)', margin: 0 }}>
              {folderName} has no templates yet.
            </p>
          ) : null}
          {error ? <p style={{ color: 'var(--theme-error-500)', margin: 0 }}>{error}</p> : null}
          <Link href={manageURL}>Manage {folderName} templates</Link>
        </div>
      </Drawer>
    </>
  )
}

/** Under the heading of a subfolder's templates list. */
export const TemplatesNote: React.FC<{ folderName: string; folderURL: string; noun: string }> = ({
  folderName,
  folderURL,
  noun,
}) => (
  <p style={{ color: 'var(--theme-elevation-500)', margin: 0 }}>
    Starting points for a new {noun} in {folderName}, offered by its Create New button. Templates
    are never published. <Link href={folderURL}>Back to {folderName}</Link>
  </p>
)
