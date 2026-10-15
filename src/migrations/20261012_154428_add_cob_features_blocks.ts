import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cob_pg_feat4_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_cob_pg_feat3_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_cob_pg_feat_grid_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_feat4_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_feat3_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_feat_grid_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TABLE "pages_blocks_cob_pg_feat4_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_feat4_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_feat4_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_feat4" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_feat3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_feat3_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_feat3_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_feat3" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_feat_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_feat_grid_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_feat_grid_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_feat_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_feat4_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_feat4_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_feat4_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_feat4" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_feat3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_feat3_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_feat3_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_feat3" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_feat_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_feat_grid_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_feat_grid_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_feat_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_cob_pg_feat4_items" ADD CONSTRAINT "pages_blocks_cob_pg_feat4_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_feat4_items" ADD CONSTRAINT "pages_blocks_cob_pg_feat4_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cob_pg_feat4"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_feat4_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_feat4_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_feat4"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_feat4" ADD CONSTRAINT "pages_blocks_cob_pg_feat4_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_feat3_items" ADD CONSTRAINT "pages_blocks_cob_pg_feat3_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_feat3_items" ADD CONSTRAINT "pages_blocks_cob_pg_feat3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cob_pg_feat3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_feat3_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_feat3_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_feat3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_feat3" ADD CONSTRAINT "pages_blocks_cob_pg_feat3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_feat_grid_items" ADD CONSTRAINT "pages_blocks_cob_pg_feat_grid_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_feat_grid_items" ADD CONSTRAINT "pages_blocks_cob_pg_feat_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cob_pg_feat_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_feat_grid_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_feat_grid_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_feat_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_feat_grid" ADD CONSTRAINT "pages_blocks_cob_pg_feat_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_feat4_items" ADD CONSTRAINT "_pages_v_blocks_cob_pg_feat4_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_feat4_items" ADD CONSTRAINT "_pages_v_blocks_cob_pg_feat4_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_feat4"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_feat4_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_feat4_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_feat4"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_feat4" ADD CONSTRAINT "_pages_v_blocks_cob_pg_feat4_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_feat3_items" ADD CONSTRAINT "_pages_v_blocks_cob_pg_feat3_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_feat3_items" ADD CONSTRAINT "_pages_v_blocks_cob_pg_feat3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_feat3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_feat3_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_feat3_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_feat3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_feat3" ADD CONSTRAINT "_pages_v_blocks_cob_pg_feat3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_feat_grid_items" ADD CONSTRAINT "_pages_v_blocks_cob_pg_feat_grid_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_feat_grid_items" ADD CONSTRAINT "_pages_v_blocks_cob_pg_feat_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_feat_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_feat_grid_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_feat_grid_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_feat_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_feat_grid" ADD CONSTRAINT "_pages_v_blocks_cob_pg_feat_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cob_pg_feat4_items_order_idx" ON "pages_blocks_cob_pg_feat4_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_feat4_items_parent_id_idx" ON "pages_blocks_cob_pg_feat4_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_feat4_items_icon_idx" ON "pages_blocks_cob_pg_feat4_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_cob_pg_feat4_hide_on_order_idx" ON "pages_blocks_cob_pg_feat4_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_feat4_hide_on_parent_idx" ON "pages_blocks_cob_pg_feat4_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_feat4_order_idx" ON "pages_blocks_cob_pg_feat4" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_feat4_parent_id_idx" ON "pages_blocks_cob_pg_feat4" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_feat4_path_idx" ON "pages_blocks_cob_pg_feat4" USING btree ("_path");
  CREATE INDEX "pages_blocks_cob_pg_feat3_items_order_idx" ON "pages_blocks_cob_pg_feat3_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_feat3_items_parent_id_idx" ON "pages_blocks_cob_pg_feat3_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_feat3_items_image_idx" ON "pages_blocks_cob_pg_feat3_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_cob_pg_feat3_hide_on_order_idx" ON "pages_blocks_cob_pg_feat3_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_feat3_hide_on_parent_idx" ON "pages_blocks_cob_pg_feat3_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_feat3_order_idx" ON "pages_blocks_cob_pg_feat3" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_feat3_parent_id_idx" ON "pages_blocks_cob_pg_feat3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_feat3_path_idx" ON "pages_blocks_cob_pg_feat3" USING btree ("_path");
  CREATE INDEX "pages_blocks_cob_pg_feat_grid_items_order_idx" ON "pages_blocks_cob_pg_feat_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_feat_grid_items_parent_id_idx" ON "pages_blocks_cob_pg_feat_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_feat_grid_items_icon_idx" ON "pages_blocks_cob_pg_feat_grid_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_cob_pg_feat_grid_hide_on_order_idx" ON "pages_blocks_cob_pg_feat_grid_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_feat_grid_hide_on_parent_idx" ON "pages_blocks_cob_pg_feat_grid_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_feat_grid_order_idx" ON "pages_blocks_cob_pg_feat_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_feat_grid_parent_id_idx" ON "pages_blocks_cob_pg_feat_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_feat_grid_path_idx" ON "pages_blocks_cob_pg_feat_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat4_items_order_idx" ON "_pages_v_blocks_cob_pg_feat4_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat4_items_parent_id_idx" ON "_pages_v_blocks_cob_pg_feat4_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat4_items_icon_idx" ON "_pages_v_blocks_cob_pg_feat4_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat4_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_feat4_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat4_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_feat4_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat4_order_idx" ON "_pages_v_blocks_cob_pg_feat4" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat4_parent_id_idx" ON "_pages_v_blocks_cob_pg_feat4" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat4_path_idx" ON "_pages_v_blocks_cob_pg_feat4" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat3_items_order_idx" ON "_pages_v_blocks_cob_pg_feat3_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat3_items_parent_id_idx" ON "_pages_v_blocks_cob_pg_feat3_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat3_items_image_idx" ON "_pages_v_blocks_cob_pg_feat3_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat3_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_feat3_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat3_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_feat3_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat3_order_idx" ON "_pages_v_blocks_cob_pg_feat3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat3_parent_id_idx" ON "_pages_v_blocks_cob_pg_feat3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat3_path_idx" ON "_pages_v_blocks_cob_pg_feat3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat_grid_items_order_idx" ON "_pages_v_blocks_cob_pg_feat_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat_grid_items_parent_id_idx" ON "_pages_v_blocks_cob_pg_feat_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat_grid_items_icon_idx" ON "_pages_v_blocks_cob_pg_feat_grid_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat_grid_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_feat_grid_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat_grid_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_feat_grid_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat_grid_order_idx" ON "_pages_v_blocks_cob_pg_feat_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat_grid_parent_id_idx" ON "_pages_v_blocks_cob_pg_feat_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_feat_grid_path_idx" ON "_pages_v_blocks_cob_pg_feat_grid" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_cob_pg_feat4_items" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_feat4_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_feat4" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_feat3_items" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_feat3_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_feat3" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_feat_grid_items" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_feat_grid_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_feat_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_feat4_items" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_feat4_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_feat4" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_feat3_items" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_feat3_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_feat3" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_feat_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_feat_grid_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_feat_grid" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_cob_pg_feat4_hide_on";
  DROP TYPE "public"."enum_pages_blocks_cob_pg_feat3_hide_on";
  DROP TYPE "public"."enum_pages_blocks_cob_pg_feat_grid_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_feat4_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_feat3_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_feat_grid_hide_on";`)
}
