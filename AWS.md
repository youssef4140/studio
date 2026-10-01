# Running Studio on AWS

What Studio needs on AWS, how the pieces map to what runs locally, and the limits to know about. Nothing here has been deployed yet: the mapping comes from reading the code and running the pipeline locally against MinIO, so treat the items marked "check" as the first things to verify.

For the generic production steps (build, migrate, start, first superadmin) see [README.md](README.md#production-setup). This file only covers what is specific to AWS.

## The pieces

| Runs locally as | On AWS | What it does |
| --- | --- | --- |
| `pnpm dev` | **ECS Fargate service** running the `app` image, behind an **Application Load Balancer** | The admin, the API, the render API and the preview. The only part people log in to. |
| `pnpm worker` | **ECS Fargate service** running the `tools` image (no load balancer, no open port) | Renders articles when they are published and writes them to storage. |
| Native Postgres | **RDS for PostgreSQL 16** | Studio's database. |
| Redis container | **ElastiCache** (Redis or Valkey), one node, cluster mode off | The publish queue between the app and the worker. |
| MinIO container | **S3 bucket** | Holds the published article files and the stylesheet/script bundle. |
| nothing | **CloudFront** in front of the bucket | The address the sites fetch from. Caches the files close to visitors. |
| local disk | **Cloudinary**, or an **EFS** volume | Uploaded images. See "Media" below. |
| `.env` | **Secrets Manager** or SSM Parameter Store | The settings and secrets, injected into both services. |
| `docker build` | **ECR** | Stores the two images. |

Supporting pieces: a VPC with private subnets for RDS, ElastiCache and the two services; an ACM certificate and a Route 53 record for the Studio domain (for example `studio.example.com`); optionally a second domain for CloudFront (for example `cdn.example.com`).

How a published article travels:

1. An editor publishes in the admin (the `app` service). The app puts a job in Redis.
2. The worker takes the job, renders the article and writes `render/<collection>/<tenant>/<subfolder>/<slug>.json` to the S3 bucket.
3. The worker calls each site's webhook, so the site drops its cached copy.
4. The site fetches the file from CloudFront. Studio is not involved in that request.

If Redis does not answer within two seconds at step 1, the app does steps 2 and 3 itself for that one article, and goes back to the queue once Redis returns. A publish is therefore not lost to a Redis outage, and the `app` service needs the same bucket permissions as the worker.

## What to create, in order

1. **S3 bucket**, private, in your region.
2. **CloudFront distribution** with the bucket as origin, using Origin Access Control so only CloudFront can read the bucket. Leave the cache policy to honour the origin's `Cache-Control` headers with a minimum TTL of 0 (see "Cache freshness" below).
3. **IAM role** shared by the two ECS services as their task role, allowed `s3:PutObject`, `s3:GetObject` and `s3:DeleteObject` on that one bucket. Studio uses it automatically when no S3 key is set, so there is no key to store or rotate. The worker logs `[publish] storage: no S3 key set, using the IAM role` when it starts; if it says `using the static key` instead, a key variable is still set. (The app only touches the bucket when it publishes in place of the worker, so it logs the same line only then.) **Check:** the role path has only been exercised locally, where it correctly fails for lack of AWS credentials.
4. **RDS PostgreSQL 16** instance in private subnets, with a database and user for Studio.
5. **ElastiCache** node in the same private subnets. Set the parameter `maxmemory-policy` to `noeviction`; the queue library (BullMQ) loses jobs otherwise.
6. **ECR repositories** for the two images. Build and push them:
   ```bash
   docker build --target app   --build-arg NEXT_PUBLIC_SERVER_URL=https://studio.example.com -t <ecr>/studio-app .
   docker build --target tools -t <ecr>/studio-tools .
   ```
   `NEXT_PUBLIC_SERVER_URL` is baked into the app image; changing the domain means rebuilding.
7. **Secrets** holding the environment below.
8. **A one-off ECS task** from the `tools` image that runs `node_modules/.bin/payload migrate`. Run it on every deploy, before the services start. Production never creates tables any other way.
9. **The `app` service**: port 3000, behind the load balancer with HTTPS. `/admin` answers 200 and works as the health check path.
10. **The `worker` service**: one task, default command, no port.
11. **First user**: open `https://studio.example.com/admin`, create the user, then run `node_modules/.bin/tsx scripts/seedSuperadmin.ts you@example.com` as a one-off task from the `tools` image.

## Environment

Both services and the migration task get the same variables.

| Variable | Value on AWS |
| --- | --- |
| `DATABASE_URL` | `postgres://<user>:<password>@<rds-endpoint>:5432/<db>`. RDS for PostgreSQL 16 requires SSL by default; expect to add `?sslmode=no-verify`, or supply the RDS CA bundle. **Check.** |
| `REDIS_URL` | `redis://<elasticache-endpoint>:6379`, or `rediss://…` if in-transit encryption is on. |
| `PAYLOAD_SECRET`, `CRON_SECRET`, `PREVIEW_SECRET`, `CONSUMER_WEBHOOK_SECRET` | New random values: `openssl rand -hex 24` each. |
| `NEXT_PUBLIC_SERVER_URL` | `https://studio.example.com` (the same value used as the build arg). |
| `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | **Leave both unset.** Studio then uses the task role from step 3. Setting only one of them is an error at startup. |
| `S3_ENDPOINT`, `S3_FORCE_PATH_STYLE` | Leave unset. Under a role Studio talks to AWS S3 directly; the MinIO defaults only apply when a key is set. |
| `S3_REGION` | The bucket's region, for example `eu-central-1`. Optional on ECS, which provides `AWS_REGION`. |
| `S3_BUCKET` | The bucket name. |
| `S3_PUBLIC_URL` | The CloudFront address, no trailing slash: `https://cdn.example.com`. |
| `RENDER_ASSET_BASE_URL` | The same CloudFront address. Without it, published articles link their stylesheet from the Studio app instead of the CDN. |
| `CDN_PURGE_PROVIDER` | `none`. Studio cannot purge CloudFront; see "Cache freshness". |
| `CONSUMER_WEBHOOK_URLS` | Comma-separated webhook URLs of the sites, for example `https://www.tnystaffingco.com/api/studio/webhook`. |
| `CLOUDINARY_URL` | Set it to store media in Cloudinary (see "Media"). |

On the site side:

- The address to fetch from becomes `https://cdn.example.com/render/textEditor/<tenant>/<subfolder>/{slug}.json`.
- A site that keeps the render API as a fallback (the TNY site does) points it at `https://studio.example.com/api/render/textEditor/<tenant>/<subfolder>/{slug}`. That fallback renders on every request and needs the `app` service up, so it should stay the exception.
- The site's webhook secret must equal `CONSUMER_WEBHOOK_SECRET`.

## Media

Uploaded images are written to the app container's local disk unless `CLOUDINARY_URL` is set. On Fargate that disk is thrown away whenever the task is replaced, so one of these is required:

- **Cloudinary** (already supported): set `CLOUDINARY_URL`. Nothing else to run. This is the simpler option.
- **EFS**: mount a volume at `/app/public/media` in the `app` service. Images are then served by the Studio app itself, so articles with images depend on Studio being up.

There is no S3 media storage in the code today. Adding it is possible but is new work.

## Cache freshness

Studio can purge Cloudflare after a publish but has no CloudFront equivalent (`CDN_PURGE_PROVIDER` only accepts `none` or `cloudflare`). The decision for now is to run without a purge and accept a delay of up to one minute:

- **Article files** are stored with `Cache-Control: public, max-age=60`. With CloudFront honouring that header, an edit reaches visitors within about a minute. Sites that cache on their own side are told immediately by the webhook.
- **Stylesheet and script** have the version in their file name and are cached for a year. A style change produces new file names, and the worker re-renders every published article on its next start so they link the new files.
- **Unpublishing** deletes the file; CloudFront keeps serving the old copy for up to a minute. With Origin Access Control a deleted file then answers 403 rather than 404, and sites should treat both as "not found" (the TNY site already does).

If a minute ever becomes too long, add a `cloudfront` provider in [src/publish/cdn.ts](src/publish/cdn.ts); it is a small change.

## Limits to know about

1. **Redis must not be a cluster.** The queue uses plain single-node connections; ElastiCache with cluster mode enabled, or ElastiCache Serverless, is not expected to work. Use one node with cluster mode off.
2. **The envelope's `canonical` is Studio's own address**, not the site's. Sites must set their own canonical URL.
3. **No S3 storage for uploaded images.** See "Media".
4. **Run one worker task.** It processes four jobs at a time, which is plenty for editorial publishing. Running several has not been tried.

## A cheaper, simpler alternative

Everything can also run on **one EC2 instance** with Docker: the two images, Postgres and Redis as containers, an S3 bucket and CloudFront for the published files. It costs less and is quicker to set up, but the database and queue then live on a single machine that you back up and patch yourself. The S3 and CloudFront parts, the environment and the limits above are the same either way; the bucket role is attached to the instance (an instance profile) instead of to ECS tasks.

## Before going live

- [ ] Migrations ran against RDS and the admin loads.
- [ ] The `worker` log says `storage: no S3 key set, using the IAM role` at startup.
- [ ] A test article publishes: its `.json` appears in the bucket and loads through CloudFront.
- [ ] The stylesheet link inside that file points at CloudFront, not at the Studio domain.
- [ ] The site's webhook answers 200 to a publish (shared secret set on both sides).
- [ ] An uploaded image survives restarting the `app` service.
- [ ] RDS automated backups are on.
