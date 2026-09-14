'use client'

import { Link, useConfig, useDocumentInfo } from '@payloadcms/ui'
import { formatAdminURL } from 'payload/shared'
import React, { useEffect, useState } from 'react'

interface DocSummary {
  id: number
  title: string
}

interface SubfolderGroup {
  folder: { id: number; name: string; slug: string }
  pages: DocSummary[]
  articles: DocSummary[]
  media: DocSummary[]
}

const fetchDocs = async (collection: string, folderId: number, titleField: string): Promise<DocSummary[]> => {
  const res = await fetch(
    `/api/${collection}?where[folder][equals]=${folderId}&limit=100&depth=0&sort=${titleField}`,
    { credentials: 'include' },
  )
  if (!res.ok) return []
  const { docs } = (await res.json()) as { docs: Record<string, unknown>[] }
  return docs.map((doc) => ({
    id: doc.id as number,
    title: (doc[titleField] as string) || `#${doc.id}`,
  }))
}

const BUCKETS = [
  { label: 'Pages', collection: 'pages', key: 'pages' as const },
  { label: 'Articles', collection: 'textEditor', key: 'articles' as const },
  { label: 'Media', collection: 'media', key: 'media' as const },
]

/**
 * A tenant's own `pages`/`articles` join fields are always empty (docs live
 * in a SUBFOLDER, never directly in the tenant root — see folderScopeFields).
 * This fetches one level down instead: each subfolder (services, programs,
 * ...) plus what it holds, grouped by content type — "under Pages, the
 * subfolders (services, programs, ...), and under each, its pages."
 */
export const TenantContentTree: React.FC = () => {
  const { id } = useDocumentInfo()
  const { config } = useConfig()
  const {
    routes: { admin: adminRoute },
  } = config

  const [groups, setGroups] = useState<SubfolderGroup[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false

    const load = async () => {
      try {
        const subfoldersRes = await fetch(`/api/folders?where[parent][equals]=${id}&limit=100&depth=0&sort=name`, {
          credentials: 'include',
        })
        const { docs: subfolders } = (await subfoldersRes.json()) as {
          docs: { id: number; name: string; slug: string }[]
        }

        const enriched = await Promise.all(
          subfolders.map(async (folder) => {
            const [pages, articles, media] = await Promise.all([
              fetchDocs('pages', folder.id, 'title'),
              fetchDocs('textEditor', folder.id, 'title'),
              fetchDocs('media', folder.id, 'filename'),
            ])
            return { folder, pages, articles, media }
          }),
        )

        if (!cancelled) setGroups(enriched)
      } catch {
        if (!cancelled) setError("Could not load this project's content.")
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [id])

  if (error) return <div style={{ color: 'var(--theme-error-500)' }}>{error}</div>
  if (!groups) return <div style={{ color: 'var(--theme-elevation-400)' }}>Loading content…</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBlockEnd: '1rem' }}>
      {BUCKETS.map(({ label, collection, key }) => {
        const nonEmpty = groups.filter((group) => group[key].length > 0)
        return (
          <div key={key}>
            <h4 style={{ marginBlockEnd: '0.5rem' }}>{label}</h4>
            {nonEmpty.length === 0 ? (
              <p style={{ color: 'var(--theme-elevation-400)', margin: 0 }}>None yet.</p>
            ) : (
              nonEmpty.map(({ folder, [key]: docs }) => (
                <div key={folder.id} style={{ marginBlockEnd: '0.75rem' }}>
                  <div style={{ fontWeight: 600 }}>{folder.name}</div>
                  <ul style={{ margin: '0.25rem 0 0', paddingInlineStart: '1.25rem' }}>
                    {docs.map((doc) => (
                      <li key={doc.id}>
                        <Link href={formatAdminURL({ adminRoute, path: `/collections/${collection}/${doc.id}` })}>
                          {doc.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        )
      })}
    </div>
  )
}
