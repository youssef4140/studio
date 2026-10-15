import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cob_pg_about_right_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_cob_pg_about_left_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_cob_pg_about_steps_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_about_right_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_about_left_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_about_steps_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TABLE "pages_blocks_cob_pg_about_right_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_about_right_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_about_right_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_about_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_about_left_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_about_left_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_about_left_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_about_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_about_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_about_steps_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_about_steps_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_about_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_about_right_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_about_right_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_about_right_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_about_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_about_left_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_about_left_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_about_left_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_about_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_about_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_about_steps_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_about_steps_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_about_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_cob_pg_about_right_stats" ADD CONSTRAINT "pages_blocks_cob_pg_about_right_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cob_pg_about_right"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_about_right_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_about_right_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_about_right"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_about_right" ADD CONSTRAINT "pages_blocks_cob_pg_about_right_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_about_right" ADD CONSTRAINT "pages_blocks_cob_pg_about_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_about_left_stats" ADD CONSTRAINT "pages_blocks_cob_pg_about_left_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cob_pg_about_left"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_about_left_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_about_left_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_about_left"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_about_left" ADD CONSTRAINT "pages_blocks_cob_pg_about_left_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_about_left" ADD CONSTRAINT "pages_blocks_cob_pg_about_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_about_steps_steps" ADD CONSTRAINT "pages_blocks_cob_pg_about_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cob_pg_about_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_about_steps_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_about_steps_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_about_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_about_steps" ADD CONSTRAINT "pages_blocks_cob_pg_about_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_about_right_stats" ADD CONSTRAINT "_pages_v_blocks_cob_pg_about_right_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_about_right"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_about_right_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_about_right_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_about_right"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_about_right" ADD CONSTRAINT "_pages_v_blocks_cob_pg_about_right_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_about_right" ADD CONSTRAINT "_pages_v_blocks_cob_pg_about_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_about_left_stats" ADD CONSTRAINT "_pages_v_blocks_cob_pg_about_left_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_about_left"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_about_left_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_about_left_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_about_left"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_about_left" ADD CONSTRAINT "_pages_v_blocks_cob_pg_about_left_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_about_left" ADD CONSTRAINT "_pages_v_blocks_cob_pg_about_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_about_steps_steps" ADD CONSTRAINT "_pages_v_blocks_cob_pg_about_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_about_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_about_steps_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_about_steps_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_about_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_about_steps" ADD CONSTRAINT "_pages_v_blocks_cob_pg_about_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cob_pg_about_right_stats_order_idx" ON "pages_blocks_cob_pg_about_right_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_about_right_stats_parent_id_idx" ON "pages_blocks_cob_pg_about_right_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_about_right_hide_on_order_idx" ON "pages_blocks_cob_pg_about_right_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_about_right_hide_on_parent_idx" ON "pages_blocks_cob_pg_about_right_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_about_right_order_idx" ON "pages_blocks_cob_pg_about_right" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_about_right_parent_id_idx" ON "pages_blocks_cob_pg_about_right" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_about_right_path_idx" ON "pages_blocks_cob_pg_about_right" USING btree ("_path");
  CREATE INDEX "pages_blocks_cob_pg_about_right_image_idx" ON "pages_blocks_cob_pg_about_right" USING btree ("image_id");
  CREATE INDEX "pages_blocks_cob_pg_about_left_stats_order_idx" ON "pages_blocks_cob_pg_about_left_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_about_left_stats_parent_id_idx" ON "pages_blocks_cob_pg_about_left_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_about_left_hide_on_order_idx" ON "pages_blocks_cob_pg_about_left_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_about_left_hide_on_parent_idx" ON "pages_blocks_cob_pg_about_left_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_about_left_order_idx" ON "pages_blocks_cob_pg_about_left" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_about_left_parent_id_idx" ON "pages_blocks_cob_pg_about_left" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_about_left_path_idx" ON "pages_blocks_cob_pg_about_left" USING btree ("_path");
  CREATE INDEX "pages_blocks_cob_pg_about_left_image_idx" ON "pages_blocks_cob_pg_about_left" USING btree ("image_id");
  CREATE INDEX "pages_blocks_cob_pg_about_steps_steps_order_idx" ON "pages_blocks_cob_pg_about_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_about_steps_steps_parent_id_idx" ON "pages_blocks_cob_pg_about_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_about_steps_hide_on_order_idx" ON "pages_blocks_cob_pg_about_steps_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_about_steps_hide_on_parent_idx" ON "pages_blocks_cob_pg_about_steps_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_about_steps_order_idx" ON "pages_blocks_cob_pg_about_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_about_steps_parent_id_idx" ON "pages_blocks_cob_pg_about_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_about_steps_path_idx" ON "pages_blocks_cob_pg_about_steps" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_right_stats_order_idx" ON "_pages_v_blocks_cob_pg_about_right_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_right_stats_parent_id_idx" ON "_pages_v_blocks_cob_pg_about_right_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_right_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_about_right_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_right_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_about_right_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_right_order_idx" ON "_pages_v_blocks_cob_pg_about_right" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_right_parent_id_idx" ON "_pages_v_blocks_cob_pg_about_right" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_right_path_idx" ON "_pages_v_blocks_cob_pg_about_right" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_right_image_idx" ON "_pages_v_blocks_cob_pg_about_right" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_left_stats_order_idx" ON "_pages_v_blocks_cob_pg_about_left_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_left_stats_parent_id_idx" ON "_pages_v_blocks_cob_pg_about_left_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_left_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_about_left_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_left_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_about_left_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_left_order_idx" ON "_pages_v_blocks_cob_pg_about_left" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_left_parent_id_idx" ON "_pages_v_blocks_cob_pg_about_left" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_left_path_idx" ON "_pages_v_blocks_cob_pg_about_left" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_left_image_idx" ON "_pages_v_blocks_cob_pg_about_left" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_steps_steps_order_idx" ON "_pages_v_blocks_cob_pg_about_steps_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_steps_steps_parent_id_idx" ON "_pages_v_blocks_cob_pg_about_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_steps_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_about_steps_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_steps_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_about_steps_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_steps_order_idx" ON "_pages_v_blocks_cob_pg_about_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_steps_parent_id_idx" ON "_pages_v_blocks_cob_pg_about_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_about_steps_path_idx" ON "_pages_v_blocks_cob_pg_about_steps" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_cob_pg_about_right_stats" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_about_right_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_about_right" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_about_left_stats" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_about_left_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_about_left" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_about_steps_steps" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_about_steps_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_about_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_about_right_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_about_right_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_about_right" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_about_left_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_about_left_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_about_left" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_about_steps_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_about_steps_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_about_steps" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_cob_pg_about_right_hide_on";
  DROP TYPE "public"."enum_pages_blocks_cob_pg_about_left_hide_on";
  DROP TYPE "public"."enum_pages_blocks_cob_pg_about_steps_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_about_right_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_about_left_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_about_steps_hide_on";`)
}
