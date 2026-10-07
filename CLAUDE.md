# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

"Studio": a headless content studio on Payload CMS 3 + Next.js 16 + Postgres. It has **no public website frontend**. The website-template frontend was removed (Posts, the search plugin and the public pages are gone). Studio renders documents into JSON "envelopes" and publishes them to S3/R2 behind a CDN. Separate consumer apps fetch those envelopes. Code comments cite a build plan (`§3`, `step 9`, `Phase 5`) that isn't in the repo; read those comments as design intent.

## Commands

```bash
docker compose up -d          # Postgres 16 (5432), Redis (host 6380), MinIO (9000, console 9001) + bucket setup
cp .env.example .env          # then fill the secrets
pnpm dev                      # Next + Payload admin at http://localhost:3000/admin
pnpm worker                   # BullMQ publish worker (separate process; run alongside dev to publish)
pnpm lint / pnpm lint:fix
pnpm generate:types           # regenerate src/payload-types.ts after any schema change
pnpm generate:importmap       # regenerate admin importMap after adding/renaming admin components
pnpm seed:superadmin <email>  # promote an existing user to superadmin (run once per environment)
pnpm publish:rerender         # re-render every published doc
pnpm test:int                 # vitest, tests/int/**/*.int.spec.ts (needs DB running)
pnpm test:e2e                 # playwright, tests/e2e (boots/reuses `pnpm dev`)
pnpm exec vitest run --config ./vitest.config.mts tests/int/api.int.spec.ts -t "fetches users"   # single int test
pnpm exec playwright test --config=playwright.config.ts tests/e2e/admin.e2e.spec.ts               # single e2e file
```

**Schema changes:** `pnpm dev` auto-pushes schema to the dev DB, but production (`NODE_ENV=production`) never pushes: it only gets schema from [src/migrations/](src/migrations/). After changing any collection/block/field, run `pnpm payload migrate:create <name>` (works offline, no DB needed) and commit the generated files. Run it with `CLOUDINARY_URL` set (any dummy value works). The Cloudinary plugin only adds its `cloudinary_folder` columns when that var is set, and without them the migration would drop those columns. Never run `payload migrate` against the push-built dev DB; Payload will prompt about data loss.

### Docker
```bash
docker compose up -d                            # infra only (for pnpm dev)
docker compose --profile app up -d --build      # + db-setup, migrate, app (:3000), worker
```
The Dockerfile has two targets: `app`, a Next standalone server (`output: 'standalone'`), and `tools`, full source plus deps, which runs the worker by default and `payload migrate` in the `migrate` service. `NEXT_PUBLIC_SERVER_URL` is a build arg because Next inlines it. The `app` profile reads secrets from `.env`, but it deliberately uses its own DB (`studio_app`), Redis index (`/1`), and bucket (`studio-render-app`) so it never collides with the dev stack.

## Architecture

### One render path: `renderBlocks()`
[src/render/renderBlocks.tsx](src/render/renderBlocks.tsx) turns a doc into a `RenderEnvelope` ([src/render/types.ts](src/render/types.ts)). The envelope holds a body HTML fragment (never a full document), versioned CSS/JS asset URLs, a `head` payload, the tenant `theme` and a `renderVersion`. Three callers use it, and none of them should reimplement it:
- `/api/render/[collection]/[...path]`: fetch-by-address for published docs
- `/preview/[collection]/[id]`: the admin's live-preview iframe, rendering draft data behind a signed token ([src/preview/token.ts](src/preview/token.ts))
- the publish worker

Pages and **Articles** (collection slug `textEditor`) have the same shape: title, a `layout` blocks array, and an `seo` group. On Pages, prose is the "Rich Text Editor" block (slug `content`; only its label was renamed), alongside ptofthecity's page section blocks; on Articles it is the tenant's "Text Editor" blocks. Every doc renders through the `<Block>` switch in [src/render/Block.tsx](src/render/Block.tsx); [src/render/richTextConverters.tsx](src/render/richTextConverters.tsx) is only for the rich text inside blocks. `seo` ([src/fields/seo.ts](src/fields/seo.ts)) shows as a button that opens a drawer ([SeoPopup](src/admin/components/SeoPopup/)); its `custom` name/value pairs reach consumers as `head.meta` on the envelope. `RENDERABLE_COLLECTIONS` in [src/render/collections.ts](src/render/collections.ts) is the shared list of collections that get rendered.

The two preview callers pass `placeholders: true`: an empty text or rich text field then renders as its hint (`admin.placeholder`; for rich text, `custom.studioHint`), and an empty list as three sample rows ([src/render/placeholders.ts](src/render/placeholders.ts)). The hint styling and the "IMAGE HERE" filler for empty image frames are preview-only CSS in [src/app/(preview)/layout.tsx](src/app/(preview)/layout.tsx). The publish worker never sets the option, so empty fields publish empty. To give a field a hint, set its `admin.placeholder` (for the tenant article blocks, `HINTS` in `src/blocks/articleFields.ts`).

### Adding or changing a block
A block has a config in `src/blocks/<Name>.ts`, which holds its fields, `...blockStyles` (a per-block "Visibility" control only), a picker thumbnail under `public/block-thumbnails/` and an optional `custom.studioTenant`. Its React component lives in `src/blocks/components/<Name>.tsx` and must be static-markup-safe. A new block has to be registered in every one of these places:
- `LAYOUT_BLOCKS` in `src/blocks/layoutBlocks.ts` (Pages: the Rich Text Editor and ptofthecity's page blocks), or `ARTICLE_LAYOUT_BLOCKS` for an Articles block. `ALL_LAYOUT_BLOCKS` joins the two for lookups by slug. `BLOCK_TENANT_TAGS` in `src/blocks/tenantScope.ts` is built from these, and `tenantBlockFilter` there hides other tenants' blocks from the picker.
- the switch in `src/render/Block.tsx`
- `BLOCK_APPEARANCE` in `src/render/appearance.ts` (the block's fixed background and padding; not editable in the admin)

Then run `pnpm generate:types`. Shared block CSS/JS lives in [src/render/assets/](src/render/assets/). `renderVersion` is a hash of those files, so any edit there changes the version. When the worker boots and sees a new version, it re-renders every published doc.

### Tenant article blocks (ptofthecity, TNY)
Each tenant has 35 Articles-only blocks built from its section of the Figma `components` file ("PTOC articles", "TNY articles"): one block per Figma variant, grouped in the picker by `admin.group`, each with its Figma image as thumbnail (`public/block-thumbnails/<ptoc|tny>/<slug>.png`). Editors supply text and images only; type, colour and spacing are fixed in the tenant stylesheet, which also holds that tenant's design tokens and is appended to the CSS bundle in `src/render/assets.ts`.

| | ptofthecity | TNY |
|---|---|---|
| Configs | [src/blocks/ptoc/](src/blocks/ptoc/) | [src/blocks/tny/](src/blocks/tny/) |
| Markup | [src/blocks/components/ptoc/](src/blocks/components/ptoc/) | [src/blocks/components/tny/](src/blocks/components/tny/) |
| Stylesheet | [ptofthecity.css](src/render/assets/ptofthecity.css) (`--ptoc-*`, tokens copied from the PtOfTheCity-V2 site) | [tny.css](src/render/assets/tny.css) (`--tny-*`, raw Figma values) |

The first picker group, "Text Editor" (Figma "Body Text": Single Column, Lead Paragraph, Two Columns, With Callout, With Sidebar, Drop Cap), is where article prose goes: its fields are rich text (`richText()` in `articleFields.ts`, the same Lexical setup as the plain Rich Text Editor), rendered inside a `<ns>-prose` wrapper that styles headings, lists, links and quotes in the tenant's type. Articles no longer have the plain `content` block; only Pages do. ptofthecity's six Text Editor blocks are also offered on its Pages (`PTOC_TEXT_EDITOR_BLOCKS` in `LAYOUT_BLOCKS`).

Both sets are built from the shared helpers in [src/blocks/articleFields.ts](src/blocks/articleFields.ts) (`tenantBlock`, field helpers, placeholder `HINTS`) and [src/blocks/components/articleParts.tsx](src/blocks/components/articleParts.tsx) (`Media`, `Background`, `Button`, `Meta`, bound to a class prefix). Markup is reached from the `default` case in `Block.tsx`; any slug starting `ptoc` or `tny` skips `BLOCK_APPEARANCE`. Keep slugs and field names short: Postgres caps identifiers at 63 characters and Payload derives table, enum and foreign-key names from them. A new upload field name must be added to the tenant-set branch in `src/media/autoAssignFolder.ts`.

### ptofthecity page blocks
Pages in ptofthecity's Programs, Conditions and Services folders get 21 section blocks built from the Figma section "PTOC programs and services" (Hero, Features, About, Testimonials, Call to Action, Program Details, Info List, FAQ; the Locations and Related Services components were left out on request). They follow the same rules as the article blocks and use the same helpers, with these differences: configs are in [src/blocks/ptoc/pages.ts](src/blocks/ptoc/pages.ts) (`ptocPageBlock`, registered in `LAYOUT_BLOCKS`), markup in [src/blocks/components/ptoc/pages.tsx](src/blocks/components/ptoc/pages.tsx), slugs start `ptocPg`, and classes and tokens are `ptoc-pg-*` at the end of ptofthecity.css. The two accordions are native `<details>`. An SVG the stylesheet uses as a background image goes in `ICONS` in `src/render/assets.ts`.

When a migration both removes and adds blocks, `payload migrate:create` stops on an interactive "created or renamed?" question. Generate it as two migrations instead: the removal first (with the new blocks temporarily unregistered), then the addition.

### Tenants and folders are hardcoded
[src/tenants.ts](src/tenants.ts) is the source of truth for tenants, their subfolders (each marked `contains: 'pages' | 'articles'`) and each tenant's theme (font and palette). Nothing here is editable in the admin. On boot, `onInit` runs [src/collections/Folders/sync.ts](src/collections/Folders/sync.ts), which mirrors the list into the read-only `folders` collection (create/update/delete are denied for everyone). The sync adds and renames but never deletes. A few things follow from this:
- A **root folder is a tenant**; subfolders hold the documents. Adding or changing either means editing `src/tenants.ts` and restarting.
- Pages and Articles must live in a subfolder of the matching kind (`folderScopeFields('pages' | 'articles')` in [src/fields/folderScope.ts](src/fields/folderScope.ts)). A new document's folder defaults to the folder page it was created from ([src/fields/folderFromReferer.ts](src/fields/folderFromReferer.ts)).
- The `tenant` field is denormalized by the `syncTenant` beforeValidate hook.
- A folder's `path` (e.g. `ptofthecity/services`) is computed by a hook.
- A doc's **address** is `folder.path/slug` ([src/publish/address.ts](src/publish/address.ts)). It is a storage and render key, not a public URL.
- Slugs are unique only within their scope (`compoundUniqueSlug`), so don't put `unique: true` on slug fields.
- The envelope's `theme` is resolved from `src/tenants.ts` by tenant slug ([src/render/theme.ts](src/render/theme.ts)).
- A block with `custom.studioTenant` can only be saved on docs of that tenant. `validateBlockTenants` enforces this and must run **after** `syncTenant` in `beforeValidate`.

Access: `users.roles` includes `superadmin` ([src/access/superadmin.ts](src/access/superadmin.ts)). Only superadmins can create or modify users.

### Publish pipeline ([src/publish/](src/publish/))
1. A collection `afterChange`/`afterDelete` hook calls `enqueuePublish`/`enqueueUnpublish`.
2. These are fire-and-forget BullMQ jobs, with BullMQ loaded via dynamic import to keep it out of the Next bundle. If Redis is down, the job runs inline instead.
3. The worker (`pnpm worker`, [src/publish/worker.ts](src/publish/worker.ts)) re-reads the doc, renders it, and writes the envelope to S3 (MinIO locally). It then purges the CDN (`CDN_PURGE_PROVIDER`) and sends HMAC-signed consumer webhooks (`CONSUMER_WEBHOOK_URLS`).

Without the worker running, publishes only take the inline fallback if enqueue fails. Otherwise jobs just sit in Redis.

### Admin customisation
Custom admin components live in [src/admin/components/](src/admin/components/). They are referenced by string path (e.g. `'@/admin/components/TenantNavLinks#TenantNavLinks'`) in the Payload config, and those references need `pnpm generate:importmap`. The nav has one dropdown per tenant ([TenantNavLinks](src/admin/components/TenantNavLinks/)); its entries open `/admin/<tenant>/<subfolder>` and `/admin/<tenant>/media`, custom views registered from `src/tenants.ts` that render the stock list locked to one folder ([src/admin/views/FolderList/](src/admin/views/FolderList/)). Payload branding is replaced by an S mark ([graphics](src/admin/components/graphics/)). Unused plugin collections (Forms, Redirects, Categories, Header/Footer globals) are **hidden, not removed**, because they are slated for later steps.

### Media
`media` is folder-scoped. `autoAssignMediaFolder` files media into the folder of the doc that uses it. When `CLOUDINARY_URL` is set, uploads go to Cloudinary through the cloud-storage plugin ([src/media/cloudinaryStorage.ts](src/media/cloudinaryStorage.ts)); otherwise they go to local disk. The stock delete is disabled for media (`access.delete` is false): the admin deletes through `DELETE /api/media/:id/remove` after showing which pages use the file ([src/media/usage.ts](src/media/usage.ts), [MediaSafety](src/admin/components/MediaSafety/)).

## Conventions
- Commits use conventional style with a scope: `feat(blocks): ...`, `fix(admin): ...`.
- Import alias `@/*` points to `src/*`, and `@payload-config` points to `src/payload.config.ts`.
- `src/payload-types.ts` and `src/app/(payload)/admin/importMap.js` are generated, so don't hand-edit them.
