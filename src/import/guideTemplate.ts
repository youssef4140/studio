/**
 * The markdown file a content team gives its AI: where the API is, the key, and
 * how to use it. It stays short on purpose: the component list and tone of each
 * folder come live from GET /api/import/guide, so this never goes stale.
 */
export function buildTeamGuide({
  serverURL,
  key,
  tenantSlug,
  tenantName,
  folders,
  expiresAt,
  canDelete,
}: {
  serverURL: string
  key: string
  tenantSlug: string
  tenantName: string
  /** The page folders this key is limited to, with a readable name each. */
  folders: { path: string; label: string }[]
  expiresAt: Date
  canDelete: boolean
}): string {
  const base = `${serverURL.replace(/\/$/, '')}/api/import`
  const example = folders[0].path
  const only = folders.length === 1
  const scopeName = folders.map((folder) => folder.label).join(', ')

  return `# Publish pages: ${scopeName} (Studio API)

You can create, edit and publish pages on the ${tenantName} website, in ${only ? 'one folder' : 'the folders listed below'}, through an HTTP API. When the user gives you page content (or asks you to change a page), do the work yourself with \`curl\` and report back. Don't ask the user to copy or paste JSON.

- **API:** \`${base}\`
- **Key:** \`${key}\` (send it as \`Authorization: Bearer <key>\`; keep it private, never put it in the page content)
- **Expires:** ${expiresAt.toISOString().slice(0, 10)}. If calls return 401, tell the user to ask an admin for a new key.
- **${only ? 'Folder' : 'Folders'}** (this key works ${only ? 'in this folder only' : 'in these folders only'}; anything else returns 403):
${folders.map((folder) => `  - \`${folder.path}\` (${folder.label})`).join('\n')}

Set once in your shell: \`KEY='${key}'\` and \`API='${base}'\`.

## How to work

1. **Read the guide for the folder first**, every time${only ? '' : ' (use the folder the page belongs in)'}. It lists the exact components and fields, and what kind of page that folder holds (e.g. program vs service) and how it should read:
   \`curl -s -H "Authorization: Bearer $KEY" "$API/guide?folder=${example}"\`
2. **Write the page JSON to a file** (e.g. \`page.json\`), then send it with \`--data @page.json\`. Don't paste JSON inline in the shell; quotes and apostrophes break it.
3. **Dry run first.** It checks everything and writes nothing. Fix every error it lists, then send it for real:
   \`curl -s -X POST -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" --data @page.json "$API/pages"\`
   (add \`"dryRun": true\` to the JSON for the check). A real call publishes the page right away unless the JSON has \`"publish": false\` (saves a draft). An existing page with the same slug in that folder is replaced.
4. **Tell the user** the result: the page link (\`adminUrl\`), whether it was created or updated, and any \`warnings\`.

## The page JSON

\`\`\`json
{
  "folder": "${example}",
  "title": "Page title",
  "slug": "page-slug",
  "seo": { "title": "SEO title (max 60 chars)", "description": "Meta description (max 160 chars)" },
  "blocks": [ { "component": "<component name from the guide>", "...": "its fields" } ]
}
\`\`\`

Use only the components and fields in the guide. Never invent facts, statistics, testimonials or images: leave a field out when you don't have real content for it.

## Changing an existing page

Don't rebuild a page to change part of it.

- **See what's there:** \`curl -s -H "Authorization: Bearer $KEY" "$API/pages?folder=${example}"\` lists a folder's pages; add \`&slug=<slug>\` for one page with each block's \`id\`.
- **Edit with small operations** (write them to \`patch.json\`):
  \`\`\`json
  {
    "folder": "${example}",
    "slug": "page-slug",
    "ops": [
      { "op": "update", "id": "<block id>", "fields": { "title": "New heading" } },
      { "op": "insert", "index": 2, "block": { "component": "...", "...": "..." } },
      { "op": "move", "id": "<block id>", "to": 0 },
      { "op": "remove", "id": "<block id>" }
    ]
  }
  \`\`\`
  \`curl -s -X PATCH -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" --data @patch.json "$API/pages"\`
  An \`update\` changes only the fields you give (a button group merges; a list is replaced whole, so send all its items). \`"dryRun": true\` and \`"publish": false\` work here too.
- **Add or change an image:** upload it, then use the returned \`id\` (or any image URL) in the block's image field:
  \`curl -s -X POST -H "Authorization: Bearer $KEY" -F "folder=${tenantSlug}" -F "file=@photo.jpg" -F "alt=Short description" "$API/media"\`
  or send \`{ "folder": "${tenantSlug}", "url": "https://..." }\` as JSON to the same endpoint.

## Taking a page offline

- **Unpublish** (back to a draft, removed from the site; ask the user to confirm first):
  \`curl -s -X POST -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" -d '{"folder":"${example}","slug":"page-slug"}' "$API/pages/unpublish"\`
${
  canDelete
    ? `- **Delete** (permanent; only on the user's explicit request): \`curl -s -X DELETE -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" -d '{"folder":"${example}","slug":"page-slug"}' "$API/pages"\``
    : '- This key cannot delete pages.'
}

## Responses

Every response is JSON. \`"ok": false\` or a 4xx means nothing was saved: read \`error\` and \`errors\`, fix the JSON and try again. 401 = bad or expired key, 403 = folder not allowed for this key, 404 = page not found, 422 = the JSON is invalid, 429 = slow down (60 calls a minute).
`
}
