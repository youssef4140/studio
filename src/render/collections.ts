/**
 * Collections whose documents are rendered to published envelopes (§3):
 * Pages (layout blocks) and Articles (Lexical content). Shared by the render
 * endpoint, the preview route, and the publish pipeline so they can't drift.
 */
export const RENDERABLE_COLLECTIONS = ['pages', 'textEditor'] as const

export type RenderableCollection = (typeof RENDERABLE_COLLECTIONS)[number]

export function isRenderableCollection(value: string): value is RenderableCollection {
  return (RENDERABLE_COLLECTIONS as readonly string[]).includes(value)
}
