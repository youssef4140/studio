'use client'

import { Button, Drawer, RenderFields, useFormFields, useModal } from '@payloadcms/ui'
import type { GroupFieldClientComponent } from 'payload'
import React from 'react'

const DRAWER_SLUG = 'seo-popup'

/**
 * The SEO group as one button that opens a drawer, instead of an inline group.
 * The fields inside are the group's normal fields, rendered with the same
 * paths, so they stay part of the document's form and save with it — there is
 * no separate submit.
 *
 * Registered as `admin.components.Field` on the group in src/fields/seo.ts.
 */
export const SeoPopup: GroupFieldClientComponent = ({
  field,
  path,
  permissions,
  readOnly,
  schemaPath,
}) => {
  const { openModal } = useModal()
  const title = useFormFields(([fields]) => fields[`${path}.title`]?.value) as string | undefined
  const customCount = useFormFields(([fields]) => fields[`${path}.custom`]?.value) as
    number | undefined

  const summary = [title, customCount ? `${customCount} custom` : null].filter(Boolean).join(' · ')

  return (
    <div className="field-type" style={{ alignItems: 'center', display: 'flex', gap: '1rem' }}>
      <Button buttonStyle="secondary" onClick={() => openModal(DRAWER_SLUG)} size="medium">
        SEO
      </Button>
      <span style={{ color: 'var(--theme-elevation-500)' }}>{summary || 'Not set'}</span>
      <Drawer slug={DRAWER_SLUG} title="SEO">
        <RenderFields
          fields={field.fields}
          margins="small"
          parentIndexPath=""
          parentPath={path}
          parentSchemaPath={schemaPath ?? path}
          permissions={permissions === true ? permissions : (permissions?.fields ?? true)}
          readOnly={readOnly}
        />
      </Drawer>
    </div>
  )
}
