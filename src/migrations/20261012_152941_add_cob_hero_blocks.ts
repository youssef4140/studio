import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cob_pg_hero_left_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_cob_pg_hero_right_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_cob_pg_hero_background_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_hero_left_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_hero_right_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_hero_background_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TABLE "pages_blocks_cob_pg_hero_left_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_hero_left_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_hero_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"primary_button_label" varchar,
  	"primary_button_href" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_href" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_hero_right_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_hero_right_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_hero_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"primary_button_label" varchar,
  	"primary_button_href" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_href" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_hero_background_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_hero_background_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_hero_background" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"primary_button_label" varchar,
  	"primary_button_href" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_href" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_hero_left_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_hero_left_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_hero_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"primary_button_label" varchar,
  	"primary_button_href" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_href" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_hero_right_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_hero_right_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_hero_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"primary_button_label" varchar,
  	"primary_button_href" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_href" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_hero_background_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_hero_background_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_hero_background" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"primary_button_label" varchar,
  	"primary_button_href" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_href" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_cob_pg_hero_left_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_hero_left_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_hero_left"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_hero_left" ADD CONSTRAINT "pages_blocks_cob_pg_hero_left_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_hero_left" ADD CONSTRAINT "pages_blocks_cob_pg_hero_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_hero_right_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_hero_right_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_hero_right"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_hero_right" ADD CONSTRAINT "pages_blocks_cob_pg_hero_right_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_hero_right" ADD CONSTRAINT "pages_blocks_cob_pg_hero_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_hero_background_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_hero_background_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_hero_background"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_hero_background" ADD CONSTRAINT "pages_blocks_cob_pg_hero_background_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_hero_background" ADD CONSTRAINT "pages_blocks_cob_pg_hero_background_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_hero_left_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_hero_left_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_hero_left"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_hero_left" ADD CONSTRAINT "_pages_v_blocks_cob_pg_hero_left_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_hero_left" ADD CONSTRAINT "_pages_v_blocks_cob_pg_hero_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_hero_right_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_hero_right_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_hero_right"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_hero_right" ADD CONSTRAINT "_pages_v_blocks_cob_pg_hero_right_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_hero_right" ADD CONSTRAINT "_pages_v_blocks_cob_pg_hero_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_hero_background_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_hero_background_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_hero_background"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_hero_background" ADD CONSTRAINT "_pages_v_blocks_cob_pg_hero_background_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_hero_background" ADD CONSTRAINT "_pages_v_blocks_cob_pg_hero_background_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cob_pg_hero_left_hide_on_order_idx" ON "pages_blocks_cob_pg_hero_left_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_hero_left_hide_on_parent_idx" ON "pages_blocks_cob_pg_hero_left_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_hero_left_order_idx" ON "pages_blocks_cob_pg_hero_left" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_hero_left_parent_id_idx" ON "pages_blocks_cob_pg_hero_left" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_hero_left_path_idx" ON "pages_blocks_cob_pg_hero_left" USING btree ("_path");
  CREATE INDEX "pages_blocks_cob_pg_hero_left_image_idx" ON "pages_blocks_cob_pg_hero_left" USING btree ("image_id");
  CREATE INDEX "pages_blocks_cob_pg_hero_right_hide_on_order_idx" ON "pages_blocks_cob_pg_hero_right_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_hero_right_hide_on_parent_idx" ON "pages_blocks_cob_pg_hero_right_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_hero_right_order_idx" ON "pages_blocks_cob_pg_hero_right" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_hero_right_parent_id_idx" ON "pages_blocks_cob_pg_hero_right" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_hero_right_path_idx" ON "pages_blocks_cob_pg_hero_right" USING btree ("_path");
  CREATE INDEX "pages_blocks_cob_pg_hero_right_image_idx" ON "pages_blocks_cob_pg_hero_right" USING btree ("image_id");
  CREATE INDEX "pages_blocks_cob_pg_hero_background_hide_on_order_idx" ON "pages_blocks_cob_pg_hero_background_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_hero_background_hide_on_parent_idx" ON "pages_blocks_cob_pg_hero_background_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_hero_background_order_idx" ON "pages_blocks_cob_pg_hero_background" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_hero_background_parent_id_idx" ON "pages_blocks_cob_pg_hero_background" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_hero_background_path_idx" ON "pages_blocks_cob_pg_hero_background" USING btree ("_path");
  CREATE INDEX "pages_blocks_cob_pg_hero_background_image_idx" ON "pages_blocks_cob_pg_hero_background" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_left_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_hero_left_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_left_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_hero_left_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_left_order_idx" ON "_pages_v_blocks_cob_pg_hero_left" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_left_parent_id_idx" ON "_pages_v_blocks_cob_pg_hero_left" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_left_path_idx" ON "_pages_v_blocks_cob_pg_hero_left" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_left_image_idx" ON "_pages_v_blocks_cob_pg_hero_left" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_right_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_hero_right_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_right_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_hero_right_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_right_order_idx" ON "_pages_v_blocks_cob_pg_hero_right" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_right_parent_id_idx" ON "_pages_v_blocks_cob_pg_hero_right" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_right_path_idx" ON "_pages_v_blocks_cob_pg_hero_right" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_right_image_idx" ON "_pages_v_blocks_cob_pg_hero_right" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_background_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_hero_background_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_background_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_hero_background_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_background_order_idx" ON "_pages_v_blocks_cob_pg_hero_background" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_background_parent_id_idx" ON "_pages_v_blocks_cob_pg_hero_background" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_background_path_idx" ON "_pages_v_blocks_cob_pg_hero_background" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_hero_background_image_idx" ON "_pages_v_blocks_cob_pg_hero_background" USING btree ("image_id");
  ALTER TABLE "media" DROP COLUMN "cloudinary_folder";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_cloudinary_folder";
  ALTER TABLE "media" DROP COLUMN "sizes_square_cloudinary_folder";
  ALTER TABLE "media" DROP COLUMN "sizes_small_cloudinary_folder";
  ALTER TABLE "media" DROP COLUMN "sizes_medium_cloudinary_folder";
  ALTER TABLE "media" DROP COLUMN "sizes_large_cloudinary_folder";
  ALTER TABLE "media" DROP COLUMN "sizes_xlarge_cloudinary_folder";
  ALTER TABLE "media" DROP COLUMN "sizes_og_cloudinary_folder";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_cob_pg_hero_left_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_hero_left" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_hero_right_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_hero_right" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_hero_background_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_hero_background" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_hero_left_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_hero_left" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_hero_right_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_hero_right" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_hero_background_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_hero_background" CASCADE;
  ALTER TABLE "media" ADD COLUMN "cloudinary_folder" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_cloudinary_folder" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_square_cloudinary_folder" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_small_cloudinary_folder" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_cloudinary_folder" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_large_cloudinary_folder" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_cloudinary_folder" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_og_cloudinary_folder" varchar;
  DROP TYPE "public"."enum_pages_blocks_cob_pg_hero_left_hide_on";
  DROP TYPE "public"."enum_pages_blocks_cob_pg_hero_right_hide_on";
  DROP TYPE "public"."enum_pages_blocks_cob_pg_hero_background_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_hero_left_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_hero_right_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_hero_background_hide_on";`)
}
