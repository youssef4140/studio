# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

"Studio": a headless content studio on Payload CMS 3 + Next.js 16 + Postgres. It has **no public website frontend**. The website-template frontend was removed, and `README.md` is still the stock Payload template README, so don't rely on it: Posts, the search plugin and the public pages it describes are gone. Studio renders documents into JSON "envelopes" and publishes them to S3/R2 behind a CDN. Separate consumer apps fetch those envelopes. Code comments cite a build plan (`§3`, `step 9`, `Phase 5`) that isn't in the repo; read those comments as design intent.

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

It supports two doc shapes. **Pages** have a `layout` blocks array. **Articles** (collection slug `textEditor`) have a `content` Lexical field with blocks embedded through `BlocksFeature`. Both go through the same `<Block>` switch in [src/render/Block.tsx](src/render/Block.tsx): Lexical block nodes reach it via [src/render/richTextConverters.tsx](src/render/richTextConverters.tsx). `RENDERABLE_COLLECTIONS` in [src/render/collections.ts](src/render/collections.ts) is the shared list of collections that get rendered.

### Adding or changing a block
A block has a config in `src/blocks/<Name>.ts`, which holds its fields, `...blockStyles` appearance tokens, a picker thumbnail under `public/block-thumbnails/` and an optional `custom.studioTenant`. Its React component lives in `src/blocks/components/<Name>.tsx` and must be static-markup-safe. A new block has to be registered in every one of these places:
- the `layout` blocks list in `collections/Pages/index.ts` and/or the `BlocksFeature` list in `collections/TextEditor.ts`
- the switch in `src/render/Block.tsx`
- `BLOCK_TENANT_TAGS` in `src/blocks/tenantScope.ts`

Then run `pnpm generate:types`. Shared block CSS/JS lives in [src/render/assets/](src/render/assets/). `renderVersion` is a hash of those files, so any edit there changes the version. When the worker boots and sees a new version, it re-renders every published doc.

### Folders = tenants
[src/collections/Folders/](src/collections/Folders/) is a tree built with nestedDocsPlugin. A **root folder is a tenant**; there is no separate Tenants collection. Tenants carry a `theme` (palette and font). Subfolders exist only for organisation. A few things follow from this:
- Pages and Articles must live in a **non-root** folder (`folderScopeFields` in [src/fields/folderScope.ts](src/fields/folderScope.ts)).
- The `tenant` field is denormalized by the `syncTenant` beforeValidate hook.
- A folder's `path` (e.g. `ptofthecity/services`) is computed by a hook.
- A doc's **address** is `folder.path/slug` ([src/publish/address.ts](src/publish/address.ts)). It is a storage and render key, not a public URL.
- Slugs are unique only within their scope (`compoundUniqueSlug`), so don't put `unique: true` on slug fields.
- A block with `custom.studioTenant` can only be saved on docs of that tenant. `validateBlockTenants` enforces this and must run **after** `syncTenant` in `beforeValidate`.

Access: `users.roles` includes `superadmin` ([src/access/superadmin.ts](src/access/superadmin.ts)). Only superadmins can create or modify folders and users.

### Publish pipeline ([src/publish/](src/publish/))
1. A collection `afterChange`/`afterDelete` hook calls `enqueuePublish`/`enqueueUnpublish`.
2. These are fire-and-forget BullMQ jobs, with BullMQ loaded via dynamic import to keep it out of the Next bundle. If Redis is down, the job runs inline instead.
3. The worker (`pnpm worker`, [src/publish/worker.ts](src/publish/worker.ts)) re-reads the doc, renders it, and writes the envelope to S3 (MinIO locally). It then purges the CDN (`CDN_PURGE_PROVIDER`) and sends HMAC-signed consumer webhooks (`CONSUMER_WEBHOOK_URLS`).

Without the worker running, publishes only take the inline fallback if enqueue fails. Otherwise jobs just sit in Redis.

### Admin customisation
Custom admin components live in [src/admin/components/](src/admin/components/). They are referenced by string path (e.g. `'@/admin/components/TenantNavLinks#TenantNavLinks'`) in the Payload config, and those references need `pnpm generate:importmap`. Examples are the tenant nav accordion and the tenant content tree on root-folder edit views. Unused plugin collections (Forms, Redirects, Categories, Header/Footer globals) are **hidden, not removed**, because they are slated for later steps.

### Media
`media` is folder-scoped. `autoAssignMediaFolder` files media into the folder of the doc that uses it. When `CLOUDINARY_URL` is set, uploads go to Cloudinary through the cloud-storage plugin ([src/media/cloudinaryStorage.ts](src/media/cloudinaryStorage.ts)); otherwise they go to local disk.

## Conventions
- Commits use conventional style with a scope: `feat(blocks): ...`, `fix(admin): ...`.
- Import alias `@/*` points to `src/*`, and `@payload-config` points to `src/payload.config.ts`.
- `src/payload-types.ts` and `src/app/(payload)/admin/importMap.js` are generated, so don't hand-edit them.
