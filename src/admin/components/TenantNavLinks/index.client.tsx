'use client'

import { Link, NavGroup, useConfig } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'
import { formatAdminURL } from 'payload/shared'
import React from 'react'

const baseClass = 'nav'

export interface TenantNavLink {
  id: number
  name: string
  slug: string
}

/**
 * Mirrors @payloadcms/next's DefaultNavClient link markup exactly (same
 * classes/structure) so these sit visually indistinguishable from the real
 * collection nav links below them — just addressed straight at a folder's
 * edit view instead of a collection list.
 */
export const TenantNavLinksClient: React.FC<{ tenants: TenantNavLink[] }> = ({ tenants }) => {
  const pathname = usePathname()
  const { config } = useConfig()
  const {
    routes: { admin: adminRoute },
  } = config

  if (tenants.length === 0) return null

  return (
    <NavGroup label="Projects">
      {tenants.map((tenant) => {
        const href = formatAdminURL({ adminRoute, path: `/collections/folders/${tenant.id}` })
        const isActive = pathname.startsWith(href) && ['/', undefined].includes(pathname[href.length])

        const label = (
          <>
            {isActive && <div className={`${baseClass}__link-indicator`} />}
            <span className={`${baseClass}__link-label`}>{tenant.name}</span>
          </>
        )

        if (pathname === href) {
          return (
            <div className={`${baseClass}__link`} id={`nav-tenant-${tenant.slug}`} key={tenant.id}>
              {label}
            </div>
          )
        }

        return (
          <Link className={`${baseClass}__link`} href={href} id={`nav-tenant-${tenant.slug}`} key={tenant.id} prefetch={false}>
            {label}
          </Link>
        )
      })}
    </NavGroup>
  )
}
