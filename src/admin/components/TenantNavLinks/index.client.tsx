'use client'

import { Link, NavGroup, useConfig } from '@payloadcms/ui'
import { ChevronIcon } from '@payloadcms/ui/icons/Chevron'
import { formatAdminURL } from 'payload/shared'
import React, { useState } from 'react'

const baseClass = 'nav'

export interface NavTenant {
  slug: string
  name: string
  links: {
    key: string
    label: string
    /** Collection slug whose list view the link opens. */
    collection: string
    /** Query string that filters that list to this folder. */
    query: string
    count: number
  }[]
}

const TenantDropdown: React.FC<{ adminRoute: string; tenant: NavTenant }> = ({ adminRoute, tenant }) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        aria-expanded={open}
        id={`nav-tenant-${tenant.slug}`}
        onClick={() => setOpen((prev) => !prev)}
        style={{
          alignItems: 'center',
          background: 'transparent',
          border: 0,
          color: 'inherit',
          cursor: 'pointer',
          display: 'flex',
          gap: '0.4rem',
          padding: 0,
          textAlign: 'start',
          width: '100%',
        }}
        type="button"
      >
        <ChevronIcon direction={open ? 'up' : 'down'} size="small" />
        <span className={`${baseClass}__link-label`}>{tenant.name}</span>
      </button>
      {open && (
        <div style={{ paddingInlineStart: '1.5rem' }}>
          {tenant.links.map((link) => (
            <Link
              className={`${baseClass}__link`}
              href={`${formatAdminURL({ adminRoute, path: `/collections/${link.collection}` })}?${link.query}`}
              id={`nav-tenant-${tenant.slug}-${link.key}`}
              key={link.key}
              prefetch={false}
            >
              <span className={`${baseClass}__link-label`}>
                {link.count > 0 ? `${link.label} (${link.count})` : link.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export const TenantNavLinksClient: React.FC<{ tenants: NavTenant[] }> = ({ tenants }) => {
  const { config } = useConfig()
  const adminRoute = config.routes.admin

  if (tenants.length === 0) return null

  return (
    <NavGroup label="Projects">
      {tenants.map((tenant) => (
        <TenantDropdown adminRoute={adminRoute} key={tenant.slug} tenant={tenant} />
      ))}
    </NavGroup>
  )
}
