# Content Studio

Content Studio is a self-hosted, multi-tenant Payload CMS backend for a family of physical-therapy client sites (e.g. `ptofthecity`, `tny`). Editors write Pages and Articles here; each consumer site is a **separate** app (Nuxt, Laravel, whatever) that fetches pre-rendered HTML from this backend at its own render address. Studio itself has no public frontend — nothing renders on a consumer request path.

- Postgres, not Mongo. Self-hosted, no vendor lock-in.
- Rendering happens **at publish time**, in a background worker — never while a consumer is waiting on a request.
- Design tokens, not freeform values: typography/color choices, block spacing, and text styling all come from a fixed set of options, not raw CSS/hex input, except where a tenant deliberately overrides its palette.

## A) Stack, install, and run

### Stack

| Concern | Technology |
|---|---|
| App framework | Next.js 16 (App Router, Turbopack) |
| CMS / admin panel | Payload CMS 3.88 |
| Database | Postgres 16 (`@payloadcms/db-postgres`) |
| Rich text | Lexical (`@payloadcms/richtext-lexical`) |
| Publish queue | BullMQ + Redis |
| Published output storage | S3-compatible object storage — MinIO locally, swap for Cloudflare R2 or real S3 in production |
| Media storage | Local disk by default; Cloudinary (optional, opt-in via env var) |
| Package manager | pnpm |
| Local infra | Docker Compose (Postgres, Redis, MinIO) |

### Prerequisites

- Node.js `^18.20.2` or `>=20.9.0`
- pnpm `^9`, `^10`, or `^11`
- Docker + Docker Compose

### Install & run

```bash
# 1. Clone and enter the project
git clone https://github.com/youssef4140/studio.git && cd studio

# 2. Environment
cp .env.example .env
# Fill in PAYLOAD_SECRET / CRON_SECRET / PREVIEW_SECRET / CONSUMER_WEBHOOK_SECRET —
# generate each with: openssl rand -hex 24

# 3. Local infra: Postgres (5432), Redis (6380 -> 6379 in-container), MinIO (9000 API / 9001 console)
docker compose up -d

# 4. Install dependencies
pnpm install

# 5. Start the app
pnpm dev
# -> http://localhost:3000/admin
# First visit prompts you to create the first user (gets the default `admin` role).
```

Two things every fresh checkout needs that a plain `pnpm dev` doesn't give you:

```bash
# 6. Promote an account to superadmin — required to manage folders/tenants,
#    tenant theming, and other admin accounts. There's no "first user is
#    superadmin" special case.
pnpm seed:superadmin you@example.com

# 7. Start the publish worker (separate terminal, separate long-lived process).
#    Publishing/unpublishing is asynchronous via BullMQ — without this running,
#    saves succeed but nothing actually gets rendered or uploaded.
pnpm worker
```

Optional: to route Media uploads to Cloudinary instead of local disk, set `CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>` in `.env` (see `.env.example`). Leave it unset to keep local-disk storage — nothing else changes.

### Everyday scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Next.js dev server (Turbopack) |
| `pnpm worker` | Publish-pipeline worker (BullMQ) — run alongside `dev` |
| `pnpm seed:superadmin <email>` | Promote an existing user to `superadmin` |
| `pnpm publish:rerender` | Force a full re-render/re-publish of every published doc |
| `pnpm generate:types` | Regenerate `src/payload-types.ts` after a collection/field change |
| `pnpm generate:importmap` | Regenerate the admin panel's custom-component import map |
| `pnpm build` / `pnpm start` | Production build / start |
| `pnpm dev:prod` | Clean `.next`, build, and start — a local rehearsal of production |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm test` | Integration (Vitest) + e2e (Playwright) tests |

### Production notes

- **Schema management**: this project currently uses Payload's `db push` (automatic schema sync on boot), not migrations — `payload migrate:create` has never been run here. That's fine for active development, but `db push` can occasionally hit an ambiguous rename it has to resolve without asking (no interactive TTY in a background process), which can silently drop and recreate tables. Adopt real migrations before deploying anywhere the data matters.
- **The worker is a separate deployable**: `pnpm worker` needs to run as its own long-lived process (its own container/service) in production, independent of the Next.js server — it's what actually renders and uploads content after a publish.
- **Object storage**: swap the `S3_*` env vars for real Cloudflare R2 (or any S3-compatible) credentials — MinIO is a local stand-in only.

## B) Feature overview

### Multi-tenant content organization

One self-referencing `Folders` collection is the whole tenant model — there's no separate Tenants collection. A **tenant is a root folder** (`ptofthecity`, `tny`); **subfolders** (`services`, `programs`, `articles`, ...) organize Pages and Articles underneath it, purely for organization. A folder's `path` (e.g. `ptofthecity/services`) is the *render/storage address* — not a real public URL, since Studio has no frontend of its own; each consumer app decides its own real routing and just fetches content by this address.

Pages and Articles always live inside a subfolder, never directly in a tenant root, and their slugs are unique **within their folder**, not globally — `ptofthecity/services` and `tny/services` can both exist.

### Roles & access control

- `admin` (default) and `superadmin` roles on Users.
- **superadmin-only**: create/edit/delete folders, set tenant typography/palette, manage other admin accounts (a regular admin can't self-elevate, even via a raw API call — enforced at the field level).
- **Any authenticated user**: create/edit Pages and Articles, upload Media.
- **Public (unauthenticated)**: read access to published content only.

### Per-tenant theming

Each tenant (root folder) gets its own typography (a curated font list) and an 8-token color palette, set either field-by-field in the admin UI or by pasting a `{ typography, palette }` JSON blob. This reaches the published output as **structured data** on the render envelope (`envelope.theme` — a CSS variable map + font info), not a raw CSS string — consumers merge it into their own `:root`.

### Tenant-scoped block variants

A block can be restricted to one tenant (e.g. `FaqTny`, a genuinely separate component from the plain `Faq`) via server-only metadata (`custom.studioTenant`) right on the block's own config file. A save-time hook rejects a document that mixes a tenant-tagged block with the wrong tenant. Every block also carries its own preview picture for the block-picker UI (`admin.images.thumbnail`), defined the same way — right alongside the tenant tag, in the block's own file.

### Content blocks

`Hero`, `Content` (rich prose), `FAQ` (+ its `FAQ (TNY)` variant), and `Entity List` — each a small Payload block config plus a plain React component. All of them render through **one shared `renderBlocks()` pipeline**, used identically by the render API, the publish worker, and the live-preview route, so there's exactly one implementation of "turn this document into HTML."

### Rich text editor (Lexical)

Fixed toolbar, inline links and formatting mixed within a single paragraph, headings, an upload feature with per-image size/alignment controls (and real CSS constraints, so images can't overflow), and token-driven color/emphasis text states — not a freeform color or font-size picker.

### Render-at-publish pipeline

Publishing a document enqueues a BullMQ job; a standalone worker process renders it through `renderBlocks()` into an envelope (`{ html, head, assets, theme, renderVersion }`), writes it to S3-compatible object storage, purges the CDN cache, and notifies consumer apps over a signed webhook (`x-studio-signature: sha256=...`). **Rendering never happens on a consumer request path** — it's always pre-computed.

The render address is `<folder path>/<slug>`, e.g. `ptofthecity/services/physical-therapy`. Consumers (or the render API itself, for dev/tooling) fetch a document at:

```
GET /api/render/pages/ptofthecity/services/physical-therapy
GET /api/render/textEditor/tny/articles/rotator-cuff-recovery
```

### Preview

Draft preview and one-way live preview in the admin — the preview pane runs the exact same `renderBlocks()` pipeline against unsaved draft data, so what an editor sees while writing matches what actually gets published.

### Media

Local disk by default. Set `CLOUDINARY_URL` and Media uploads switch to Cloudinary instead — organized under `studio/<tenant>/<subfolder>` (mirroring the Folders tree exactly), stored as webp with automatic quality. Any authenticated user can upload; a Media document's folder is auto-assigned the first time it's actually used on a Page or Article ("assign on first use"), and if Cloudinary is active, the underlying asset is physically moved to match.

### Admin navigation

Each tenant appears directly in the nav sidebar as an accordion — expand a tenant to see **Pages / Articles / Media**, expand one of those to see the subfolders holding that content type (with a doc count per subfolder), and click through straight to that collection's list, pre-filtered to the folder. The same breakdown also appears inline on a tenant's own edit page.

### SEO

A per-document SEO group (title, description, image) on Pages and Articles, carried into the render envelope's `head` data for consumers to use however they render `<head>`.
