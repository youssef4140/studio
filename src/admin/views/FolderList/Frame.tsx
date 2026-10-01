'use client'

import { ConfigProvider, useConfig, useStepNav } from '@payloadcms/ui'
import React, { useEffect, useMemo } from 'react'

const Breadcrumb: React.FC<{ crumbs: string[] }> = ({ crumbs }) => {
  const { setStepNav } = useStepNav()
  const key = crumbs.join('/')
  useEffect(() => {
    setStepNav(crumbs.map((label) => ({ label })))
    // `key` stands in for `crumbs`, which is a new array on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, setStepNav])
  return null
}

/**
 * Makes the stock list view present itself as the folder rather than the
 * collection. The list takes its heading (and "No … found" text) from the
 * collection's plural label in the admin config, so within this subtree that
 * one label is replaced by the folder's name. `Breadcrumb` comes after the
 * list so its effect runs after the list's own, which would otherwise set the
 * breadcrumb back to the collection name.
 */
export const FolderListFrame: React.FC<{
  children: React.ReactNode
  collection: string
  crumbs: string[]
  title: string
}> = ({ children, collection, crumbs, title }) => {
  const { config } = useConfig()

  const scopedConfig = useMemo(
    () => ({
      ...config,
      collections: config.collections.map((entry) =>
        entry.slug === collection ? { ...entry, labels: { ...entry.labels, plural: title } } : entry,
      ),
    }),
    [collection, config, title],
  )

  return (
    <ConfigProvider config={scopedConfig}>
      {children}
      <Breadcrumb crumbs={crumbs} />
    </ConfigProvider>
  )
}
