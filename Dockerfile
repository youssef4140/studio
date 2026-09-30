# Two runtime images from one build graph:
#
#   --target app     Next.js standalone server (admin, API, render + preview routes)
#   --target tools   full source + node_modules, for the BullMQ publish worker
#                    (default CMD) and one-shot `payload migrate`
#
# Both need the same runtime env (see .env.example). NEXT_PUBLIC_SERVER_URL is
# inlined by `next build`, so it is a build arg as well as a runtime var.

# 22.17 predates Node's default-on type stripping, which fights tsx/payload's loader.
FROM node:22.17.0-alpine AS base
RUN apk add --no-cache libc6-compat \
  && corepack enable \
  && corepack prepare pnpm@10.34.6 --activate
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
# Placeholders only: the build never connects to Postgres, but module-level
# config (payload secret, publish S3 creds) must be present to import. Scoped to
# this RUN so none of it lands in an image layer's env.
RUN PAYLOAD_SECRET=build-placeholder \
  DATABASE_URL=postgres://build:build@127.0.0.1:1/build \
  S3_ACCESS_KEY_ID=build S3_SECRET_ACCESS_KEY=build \
  pnpm run build

# ─── Publish worker + migrations ───────────────────────────────────────────────
FROM base AS tools
ENV NODE_ENV=production \
  NODE_OPTIONS="--no-deprecation --no-experimental-strip-types"
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .
USER node
# `payload migrate` is run by the compose `migrate` service with this image.
CMD ["node_modules/.bin/tsx", "src/publish/worker.ts"]

# ─── Next.js server ───────────────────────────────────────────────────────────
FROM node:22.17.0-alpine AS app
WORKDIR /app
ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  PORT=3000 \
  HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# Standalone output also carries src/render/assets (traced from render/assets.ts).
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Local-disk media uploads (when CLOUDINARY_URL is unset) and locally served
# render bundles (when RENDER_ASSET_BASE_URL is unset) are written here.
RUN mkdir -p public/media public/_render && chown -R nextjs:nodejs public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
