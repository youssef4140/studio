'use client'

import { toast } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1px solid var(--theme-elevation-200, #3f3f46)',
  background: 'var(--theme-input-bg, #09090b)',
  color: 'inherit',
  fontSize: '0.9rem',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 600,
  marginBottom: '6px',
}

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text)
  const area = document.createElement('textarea')
  area.value = text
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(area)
  if (!ok) throw new Error('Copy failed')
}

export const ImportKeyModalClient: React.FC<{ tenants: { slug: string; name: string }[] }> = ({
  tenants,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [tenant, setTenant] = useState(tenants[0]?.slug ?? '')
  const [days, setDays] = useState(90)
  const [canDelete, setCanDelete] = useState(false)
  const [busy, setBusy] = useState(false)
  const [guide, setGuide] = useState('')
  const [expiresAt, setExpiresAt] = useState('')
  const router = useRouter()

  const close = () => {
    if (busy) return
    setIsOpen(false)
    // The key is only ever shown here; closing forgets it.
    setGuide('')
    setName('')
    router.refresh()
  }

  const create = async () => {
    if (!name.trim()) return toast.error('Give the key a name')
    setBusy(true)
    try {
      const res = await fetch('/api/importKeys/generate', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, tenant, days, canDelete }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not create the key')
      setGuide(data.guide)
      setExpiresAt(data.expiresAt)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not create the key')
    } finally {
      setBusy(false)
    }
  }

  const download = () => {
    const url = URL.createObjectURL(new Blob([guide], { type: 'text/markdown' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `${tenant}-studio-api-guide.md`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn btn--style-primary btn--size-medium"
        style={{ margin: 0 }}
      >
        New key and guide
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={close}
        >
          <div
            style={{
              backgroundColor: 'var(--theme-elevation-50, #18181b)',
              color: 'var(--theme-text, #fafafa)',
              borderRadius: '12px',
              maxWidth: '720px',
              width: '100%',
              padding: '24px 28px',
              border: '1px solid var(--theme-elevation-150, #27272a)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>
              {guide ? 'Key created' : 'New import key'}
            </h3>

            {guide ? (
              <>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>
                  This guide contains the key and <strong>won&apos;t be shown again</strong>. Copy or
                  download it now and send it to the content team privately. It expires{' '}
                  {new Date(expiresAt).toLocaleDateString()}.
                </p>
                <textarea
                  readOnly
                  rows={14}
                  value={guide}
                  style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '0.78rem' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    type="button"
                    className="btn btn--style-secondary btn--size-medium"
                    onClick={() =>
                      copyText(guide).then(
                        () => toast.success('Guide copied'),
                        () => toast.error('Could not copy'),
                      )
                    }
                  >
                    Copy
                  </button>
                  <button type="button" className="btn btn--style-secondary btn--size-medium" onClick={download}>
                    Download .md
                  </button>
                  <button type="button" className="btn btn--style-primary btn--size-medium" onClick={close}>
                    Done
                  </button>
                </div>
              </>
            ) : (
              <>
                <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.75 }}>
                  The key lets a content team&apos;s AI create, edit and publish pages for one tenant
                  only, until it expires. You can switch it off any time from its page.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input
                      style={inputStyle}
                      value={name}
                      placeholder="e.g. PTOC content team"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Tenant *</label>
                    <select style={inputStyle} value={tenant} onChange={(e) => setTenant(e.target.value)}>
                      {tenants.map((item) => (
                        <option key={item.slug} value={item.slug}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Expires after (days)</label>
                    <input
                      style={inputStyle}
                      type="number"
                      min={1}
                      max={365}
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                    />
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', marginTop: '22px' }}>
                    <input type="checkbox" checked={canDelete} onChange={(e) => setCanDelete(e.target.checked)} />
                    Can delete pages (otherwise only unpublish)
                  </label>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button type="button" className="btn btn--style-secondary btn--size-medium" onClick={close} disabled={busy}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn--style-primary btn--size-medium" onClick={create} disabled={busy}>
                    {busy ? 'Creating...' : 'Create key and guide'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
