'use client'

import { Link, NavGroup, useConfig } from '@payloadcms/ui'
import { ChevronIcon } from '@payloadcms/ui/icons/Chevron'
import { formatAdminURL } from 'payload/shared'
import React, { useState } from 'react'

const baseClass = 'nav'

export interface TreeDoc {
  id: number
  title: string
}

export interface TreeSubfolderEntry {
  folder: { id: number; name: string; slug: string }
  docs: TreeDoc[]
}

export interface TreeBucket {
  label: string
  collection: string
  subfolders: TreeSubfolderEntry[]
}

export interface TreeTenant {
  id: number
  name: string
  slug: string
  buckets: TreeBucket[]
}

/**
 * One row of the accordion. A row with children toggles open/closed on
 * click (chevron + label both trigger it, matching @payloadcms/ui's own
 * NavGroup) rather than navigating — there's nowhere for "Pages" itself to
 * go, it's a virtual grouping, not a real folder. A leaf row (no children)
 * is a plain link instead.
 */
const AccordionRow: React.FC<{
  children?: React.ReactNode
  depth: number
  href?: string
  id?: string
  label: string
}> = ({ children, depth, href, id, label }) => {
  const [open, setOpen] = useState(false)
  const hasChildren = Boolean(children)

  const row = (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        gap: '0.4rem',
        paddingInlineStart: `${depth * 0.9}rem`,
      }}
    >
      {hasChildren ? (
        <button
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          style={{
            background: 'transparent',
            border: 0,
            color: 'inherit',
            cursor: 'pointer',
            display: 'flex',
            flexShrink: 0,
            padding: 0,
          }}
          type="button"
        >
          <ChevronIcon direction={open ? 'up' : 'down'} size="small" />
        </button>
      ) : (
        <span style={{ display: 'inline-block', flexShrink: 0, width: '0.8rem' }} />
      )}
      {href && !hasChildren ? (
        <Link className={`${baseClass}__link`} href={href} id={id} prefetch={false} style={{ paddingInlineStart: 0 }}>
          <span className={`${baseClass}__link-label`}>{label}</span>
        </Link>
      ) : (
        <span
          className={`${baseClass}__link-label`}
          onClick={hasChildren ? () => setOpen((prev) => !prev) : undefined}
          style={{ cursor: hasChildren ? 'pointer' : 'default' }}
        >
          {label}
        </span>
      )}
    </div>
  )

  return (
    <div>
      {row}
      {hasChildren && open && <div>{children}</div>}
    </div>
  )
}

export const TenantNavLinksClient: React.FC<{ tenants: TreeTenant[] }> = ({ tenants }) => {
  const { config } = useConfig()
  const {
    routes: { admin: adminRoute },
  } = config

  if (tenants.length === 0) return null

  return (
    <NavGroup label="Projects">
      {tenants.map((tenant) => (
        <AccordionRow depth={0} id={`nav-tenant-${tenant.slug}`} key={tenant.id} label={tenant.name}>
          {tenant.buckets.map((bucket) => (
            <AccordionRow depth={1} key={bucket.label} label={bucket.label}>
              {bucket.subfolders.length === 0 ? (
                <div
                  style={{
                    color: 'var(--theme-elevation-400)',
                    fontSize: '0.8rem',
                    paddingBlock: '0.15rem',
                    paddingInlineStart: `${2 * 0.9}rem`,
                  }}
                >
                  None yet
                </div>
              ) : (
                bucket.subfolders.map(({ docs, folder }) => (
                  <AccordionRow
                    depth={2}
                    href={`${formatAdminURL({ adminRoute, path: `/collections/${bucket.collection}` })}?where[folder][equals]=${folder.id}`}
                    id={`nav-tenant-${tenant.slug}-${bucket.label.toLowerCase()}-${folder.slug}`}
                    key={folder.id}
                    label={docs.length > 0 ? `${folder.name} (${docs.length})` : folder.name}
                  />
                ))
              )}
            </AccordionRow>
          ))}
        </AccordionRow>
      ))}
    </NavGroup>
  )
}
