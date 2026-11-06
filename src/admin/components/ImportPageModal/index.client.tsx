'use client'

import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@payloadcms/ui'

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/**
 * Undoes what copying from a chat window does to JSON: a code fence around it,
 * HTML-escaped spaces (`&#x20;`, `&nbsp;`) and a lone backslash at the end of
 * each line. None of these can be valid JSON, so removing them never changes a
 * valid paste (a real `\n` escape is a backslash followed by "n", not a line break).
 */
export function cleanPastedJson(text: string): string {
  const cleaned = text
    .replace(/&#x0*20;|&#0*32;|&nbsp;|\u00a0/gi, ' ')
    .replace(/\\[ \t]*\r?\n/g, '\n')
    .replace(/^\s*```(?:json)?\s*\n/i, '')
    .replace(/\n\s*```\s*$/, '')
    .trim()
  // An AI that adds a sentence before or after the JSON: keep from the first
  // "{" to the last "}" (an array of blocks, "[", is left as it is).
  if (cleaned && !/^[{[]/.test(cleaned)) {
    const start = cleaned.indexOf('{')
    const end = cleaned.lastIndexOf('}')
    if (start >= 0 && end > start) return cleaned.slice(start, end + 1)
  }
  return cleaned
}

/** What the pasted text is, for the line under the box. */
function describeJson(text: string): { ok: boolean; message: string } | null {
  if (!text.trim()) return null
  try {
    const parsed = JSON.parse(text)
    const blocks = Array.isArray(parsed) ? parsed : parsed?.blocks
    if (!Array.isArray(blocks)) return { ok: false, message: 'Valid JSON, but it has no "blocks" list.' }
    return { ok: true, message: `Valid JSON: ${blocks.length} component${blocks.length === 1 ? '' : 's'}.` }
  } catch (e) {
    return { ok: false, message: `Not valid JSON yet: ${e instanceof Error ? e.message : String(e)}` }
  }
}

/** navigator.clipboard needs a secure context; fall back to execCommand on plain http. */
async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }
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

export const ImportPageModalClient: React.FC<{
  aiPrompt: string
  folderLabel: string
  folderPath: string
}> = ({ aiPrompt, folderLabel, folderPath }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [jsonText, setJsonText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const fromJson = useRef({ title: '', slug: '' })
  const router = useRouter()

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!slug) setSlug(toSlug(val))
  }

  /**
   * The JSON's title and slug fill the fields whenever they differ from the ones
   * last read from the JSON (a new paste or upload), replacing what is there.
   * Edits made in the fields afterwards stay, until the JSON's own values change.
   * With no slug in the JSON, the slug comes from its title.
   */
  const handleJsonChange = (raw: string) => {
    const text = cleanPastedJson(raw)
    setJsonText(text)
    try {
      const parsed = JSON.parse(text)
      if (!parsed || Array.isArray(parsed)) return
      const jsonTitle = typeof parsed.title === 'string' ? parsed.title.trim() : ''
      const jsonSlug =
        typeof parsed.slug === 'string' && parsed.slug.trim()
          ? toSlug(parsed.slug)
          : jsonTitle
            ? toSlug(jsonTitle)
            : ''
      if (jsonTitle && jsonTitle !== fromJson.current.title) setTitle(jsonTitle)
      if (jsonSlug && jsonSlug !== fromJson.current.slug) setSlug(jsonSlug)
      fromJson.current = { title: jsonTitle, slug: jsonSlug }
    } catch {
      // Not valid (yet); checked again on import.
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => handleJsonChange((evt.target?.result as string) ?? '')
    reader.readAsText(file)
  }

  const handleCopyPrompt = async () => {
    try {
      await copyText(aiPrompt)
      toast.success('AI prompt copied. Paste it into the AI, then add the page content after it.')
    } catch {
      toast.error('Could not copy to the clipboard')
    }
  }

  const handleImport = async () => {
    if (!jsonText.trim()) {
      toast.error('Please paste or upload JSON')
      return
    }

    let parsedBlocks: unknown[] = []
    let seo = undefined
    try {
      const parsed = JSON.parse(jsonText)
      if (Array.isArray(parsed)) {
        parsedBlocks = parsed
      } else if (parsed && Array.isArray(parsed.blocks)) {
        parsedBlocks = parsed.blocks
        if (parsed.seo) seo = parsed.seo
      } else {
        toast.error('JSON must be an array of blocks or an object with a "blocks" array')
        return
      }
    } catch (e) {
      toast.error(`JSON Syntax Error: ${e instanceof Error ? e.message : String(e)}`)
      return
    }

    if (!title.trim()) {
      toast.error('Please enter a Page Title')
      return
    }
    if (!slug.trim()) {
      toast.error('Please enter a Page Slug')
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
          folderPath,
          seo,
          blocks: parsedBlocks,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Import failed')

      toast.success(
        `${data.updated ? 'Updated' : 'Imported'} and published "${title}" with ${data.blocksCount} components!`,
      )
      setIsOpen(false)
      setTitle('')
      setSlug('')
      setJsonText('')
      fromJson.current = { title: '', slug: '' }
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Import failed')
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
                  Into <strong>{folderLabel}</strong>. A page with the same slug here is updated. The page is published right away.
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

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px dashed var(--theme-elevation-200, #3f3f46)',
              }}
            >
              <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8 }}>
                Copy the prompt into an AI chat, add your page content after it, and paste the JSON
                it returns below. It lists this folder&apos;s components.
              </p>
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="btn btn--style-secondary btn--size-small"
                style={{ margin: 0, whiteSpace: 'nowrap' }}
              >
                Copy AI prompt
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={labelStyle}>Page Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Medical Billing & Claims Recovery"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  disabled={isLoading}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Slug *</label>
                <input
                  type="text"
                  placeholder="e.g. advanced-medical-billing"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  disabled={isLoading}
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Or upload a .json file</label>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                disabled={isLoading}
                style={{ width: '100%', padding: '6px 0', fontSize: '0.85rem', color: 'inherit' }}
              />
            </div>

            <div>
              <label style={labelStyle}>
                JSON (&#123; title, slug, seo, blocks: [...] &#125; or an array of blocks)
              </label>
              <textarea
                rows={10}
                placeholder='{&#10;  "title": "...",&#10;  "slug": "...",&#10;  "blocks": [ { "component": "...", ... } ]&#10;}'
                value={jsonText}
                onChange={(e) => handleJsonChange(e.target.value)}
                disabled={isLoading}
                style={{
                  ...inputStyle,
                  fontFamily: 'monospace',
                  fontSize: '0.82rem',
                  padding: '10px 12px',
                  resize: 'vertical',
                }}
              />
              {(() => {
                const status = describeJson(jsonText)
                return status ? (
                  <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: status.ok ? 'var(--theme-success-500, #22c55e)' : 'var(--theme-error-500, #ef4444)' }}>
                    {status.message}
                  </p>
                ) : null
              })()}
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
