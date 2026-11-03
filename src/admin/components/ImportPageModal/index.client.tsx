'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@payloadcms/ui'

export const ImportPageModalClient: React.FC<{ folderPath?: string }> = ({ folderPath = 'cob/services' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [targetFolder, setTargetFolder] = useState(folderPath)
  const [jsonText, setJsonText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      )
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string
        setJsonText(text)
        const parsed = JSON.parse(text)
        if (parsed.title) setTitle(parsed.title)
        if (parsed.slug) setSlug(parsed.slug)
      } catch (err) {
        toast.error('Invalid JSON file format')
      }
    }
    reader.readAsText(file)
  }

  const handleImport = async () => {
    if (!title.trim()) {
      toast.error('Please enter a Page Title')
      return
    }
    if (!slug.trim()) {
      toast.error('Please enter a Page Slug')
      return
    }
    if (!jsonText.trim()) {
      toast.error('Please paste or upload JSON')
      return
    }

    let parsedBlocks = []
    let seo = undefined
    try {
      const parsed = JSON.parse(jsonText)
      if (Array.isArray(parsed)) {
        parsedBlocks = parsed
      } else if (parsed.blocks && Array.isArray(parsed.blocks)) {
        parsedBlocks = parsed.blocks
        if (parsed.seo) seo = parsed.seo
        if (!title && parsed.title) setTitle(parsed.title)
        if (!slug && parsed.slug) setSlug(parsed.slug)
      } else {
        toast.error('JSON must be an array of blocks or an object with a "blocks" array')
        return
      }
    } catch (e: any) {
      toast.error(`JSON Syntax Error: ${e.message}`)
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/pages/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
          folderPath: targetFolder.trim(),
          seo,
          blocks: parsedBlocks,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Import failed')
      }

      toast.success(`Successfully imported page "${title}" with ${data.blocksCount} components!`)
      setIsOpen(false)
      setTitle('')
      setSlug('')
      setJsonText('')
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || 'Import failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn btn--style-secondary btn--size-medium"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Import Page JSON
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
            backdropFilter: 'blur(2px)',
          }}
          onClick={() => !isLoading && setIsOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--theme-elevation-50, #18181b)',
              color: 'var(--theme-text, #fafafa)',
              borderRadius: '12px',
              maxWidth: '680px',
              width: '100%',
              padding: '24px 28px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '1px solid var(--theme-elevation-150, #27272a)',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>
                  Import Page from JSON
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '0.875rem', opacity: 0.7 }}>
                  Create or update a page with pre-structured component blocks
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  opacity: 0.7,
                  padding: '4px 8px',
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                  Page Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Medical Billing & Claims Recovery"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--theme-elevation-200, #3f3f46)',
                    background: 'var(--theme-input-bg, #09090b)',
                    color: 'inherit',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                  Slug *
                </label>
                <input
                  type="text"
                  placeholder="e.g. advanced-medical-billing"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--theme-elevation-200, #3f3f46)',
                    background: 'var(--theme-input-bg, #09090b)',
                    color: 'inherit',
                    fontSize: '0.9rem',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                  Target Folder Path
                </label>
                <input
                  type="text"
                  value={targetFolder}
                  onChange={(e) => setTargetFolder(e.target.value)}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--theme-elevation-200, #3f3f46)',
                    background: 'var(--theme-input-bg, #09090b)',
                    color: 'inherit',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                  Or Upload .json file
                </label>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '6px 0',
                    fontSize: '0.85rem',
                    color: 'inherit',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                JSON Payload (Array of blocks or &#123; blocks: [...] &#125;)
              </label>
              <textarea
                rows={10}
                placeholder='[&#10;  {&#10;    "component": "cobPgHeroRight",&#10;    "title": "Medical Billing",&#10;    "image": "https://..."&#10;  }&#10;]'
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                disabled={isLoading}
                style={{
                  width: '100%',
                  fontFamily: 'monospace',
                  fontSize: '0.82rem',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--theme-elevation-200, #3f3f46)',
                  background: 'var(--theme-input-bg, #09090b)',
                  color: 'inherit',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
                className="btn btn--style-secondary btn--size-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImport}
                disabled={isLoading}
                className="btn btn--style-primary btn--size-medium"
                style={{ minWidth: '120px' }}
              >
                {isLoading ? 'Importing...' : 'Start Import'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
