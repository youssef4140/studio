'use client'

import { Link, NavGroup, useConfig, usePreferences } from '@payloadcms/ui'
import { ChevronIcon } from '@payloadcms/ui/icons/Chevron'
import { formatAdminURL } from 'payload/shared'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

import { TENANT_NAV_PREFERENCE } from './preference'

const baseClass = 'nav'

export interface NavTenant {
  slug: string
  name: string
  links: {
    key: string
    label: string
    /** Admin path of the folder's own list page, e.g. `/ptofthecity/services`. */
    path: string
    count: number
  }[]
}

const TenantDropdown: React.FC<{
  adminRoute: string
  onToggle: () => void
  open: boolean
  tenant: NavTenant
}> = ({ adminRoute, onToggle, open, tenant }) => {
  const pathname = usePathname()

  return (
    <div>
      <button
        aria-expanded={open}
        id={`nav-tenant-${tenant.slug}`}
        onClick={onToggle}
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
          {tenant.links.map((link) => {
            const href = formatAdminURL({ adminRoute, path: link.path as `/${string}` })
            const active = pathname === href
            return (
              <Link
                aria-current={active ? 'page' : undefined}
                className={`${baseClass}__link`}
                href={href}
                id={`nav-tenant-${tenant.slug}-${link.key}`}
                key={link.key}
                prefetch={false}
                style={active ? { fontWeight: 600 } : undefined}
              >
                {active && <div className={`${baseClass}__link-indicator`} />}
                <span className={`${baseClass}__link-label`}>
                  {link.count > 0 ? `${link.label} (${link.count})` : link.label}
                </span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export const TenantNavLinksClient: React.FC<{
  initiallyOpen: Record<string, boolean>
  tenants: NavTenant[]
}> = ({ initiallyOpen, tenants }) => {
  const { config } = useConfig()
  const { setPreference } = usePreferences()
  const [open, setOpen] = useState(initiallyOpen)
  const adminRoute = config.routes.admin

  const toggle = (slug: string) => {
    const next = { ...open, [slug]: !open[slug] }
    setOpen(next)
    void setPreference(TENANT_NAV_PREFERENCE, { open: next })
  }

  if (tenants.length === 0) return null

  return (
    <NavGroup label="Projects">
      {tenants.map((tenant) => (
        <TenantDropdown
          adminRoute={adminRoute}
          key={tenant.slug}
          onToggle={() => toggle(tenant.slug)}
          open={Boolean(open[tenant.slug])}
          tenant={tenant}
        />
      ))}
    </NavGroup>
  )
}
