import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// 20261012_152941_add_cob_hero_blocks was generated without CLOUDINARY_URL set,
// so besides its blocks it dropped the Cloudinary plugin's columns. With
// CLOUDINARY_URL set (staging) every media query then fails. IF NOT EXISTS: a
// database that never ran that drop already has them.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "cloudinary_folder" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_cloudinary_folder" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_square_cloudinary_folder" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_small_cloudinary_folder" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_medium_cloudinary_folder" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_large_cloudinary_folder" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_xlarge_cloudinary_folder" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_og_cloudinary_folder" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DROP COLUMN IF EXISTS "cloudinary_folder";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_cloudinary_folder";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_square_cloudinary_folder";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_small_cloudinary_folder";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_medium_cloudinary_folder";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_large_cloudinary_folder";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_xlarge_cloudinary_folder";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_og_cloudinary_folder";`)
}
