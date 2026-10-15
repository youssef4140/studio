import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cob_pg_cta_banner_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_cob_pg_cta_strip_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_cob_pg_cta_box_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_cta_banner_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_cta_strip_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_cta_box_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TABLE "pages_blocks_cob_pg_cta_banner_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_cta_banner_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"primary_button_label" varchar,
  	"primary_button_href" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_cta_strip_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_cta_strip_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_cta_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"primary_button_label" varchar,
  	"primary_button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_cta_box_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_cta_box_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_cta_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"primary_button_label" varchar,
  	"primary_button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_cta_banner_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_cta_banner_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"primary_button_label" varchar,
  	"primary_button_href" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_cta_strip_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_cta_strip_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_cta_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"primary_button_label" varchar,
  	"primary_button_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_cta_box_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_cta_box_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_cta_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"primary_button_label" varchar,
  	"primary_button_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_cob_pg_cta_banner_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_cta_banner_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_cta_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_cta_banner" ADD CONSTRAINT "pages_blocks_cob_pg_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_cta_strip_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_cta_strip_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_cta_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_cta_strip" ADD CONSTRAINT "pages_blocks_cob_pg_cta_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_cta_box_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_cta_box_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_cta_box"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_cta_box" ADD CONSTRAINT "pages_blocks_cob_pg_cta_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_cta_banner_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_cta_banner_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_cta_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_cta_banner" ADD CONSTRAINT "_pages_v_blocks_cob_pg_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_cta_strip_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_cta_strip_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_cta_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_cta_strip" ADD CONSTRAINT "_pages_v_blocks_cob_pg_cta_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_cta_box_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_cta_box_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_cta_box"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_cta_box" ADD CONSTRAINT "_pages_v_blocks_cob_pg_cta_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cob_pg_cta_banner_hide_on_order_idx" ON "pages_blocks_cob_pg_cta_banner_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_cta_banner_hide_on_parent_idx" ON "pages_blocks_cob_pg_cta_banner_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_cta_banner_order_idx" ON "pages_blocks_cob_pg_cta_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_cta_banner_parent_id_idx" ON "pages_blocks_cob_pg_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_cta_banner_path_idx" ON "pages_blocks_cob_pg_cta_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_cob_pg_cta_strip_hide_on_order_idx" ON "pages_blocks_cob_pg_cta_strip_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_cta_strip_hide_on_parent_idx" ON "pages_blocks_cob_pg_cta_strip_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_cta_strip_order_idx" ON "pages_blocks_cob_pg_cta_strip" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_cta_strip_parent_id_idx" ON "pages_blocks_cob_pg_cta_strip" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_cta_strip_path_idx" ON "pages_blocks_cob_pg_cta_strip" USING btree ("_path");
  CREATE INDEX "pages_blocks_cob_pg_cta_box_hide_on_order_idx" ON "pages_blocks_cob_pg_cta_box_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_cta_box_hide_on_parent_idx" ON "pages_blocks_cob_pg_cta_box_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_cta_box_order_idx" ON "pages_blocks_cob_pg_cta_box" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_cta_box_parent_id_idx" ON "pages_blocks_cob_pg_cta_box" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_cta_box_path_idx" ON "pages_blocks_cob_pg_cta_box" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_cta_banner_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_cta_banner_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_cta_banner_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_cta_banner_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_cta_banner_order_idx" ON "_pages_v_blocks_cob_pg_cta_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_cta_banner_parent_id_idx" ON "_pages_v_blocks_cob_pg_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_cta_banner_path_idx" ON "_pages_v_blocks_cob_pg_cta_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_cta_strip_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_cta_strip_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_cta_strip_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_cta_strip_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_cta_strip_order_idx" ON "_pages_v_blocks_cob_pg_cta_strip" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_cta_strip_parent_id_idx" ON "_pages_v_blocks_cob_pg_cta_strip" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_cta_strip_path_idx" ON "_pages_v_blocks_cob_pg_cta_strip" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_cta_box_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_cta_box_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_cta_box_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_cta_box_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_cta_box_order_idx" ON "_pages_v_blocks_cob_pg_cta_box" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_cta_box_parent_id_idx" ON "_pages_v_blocks_cob_pg_cta_box" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_cta_box_path_idx" ON "_pages_v_blocks_cob_pg_cta_box" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_cob_pg_cta_banner_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_cta_banner" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_cta_strip_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_cta_strip" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_cta_box_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_cta_box" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_cta_banner_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_cta_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_cta_strip_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_cta_strip" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_cta_box_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_cta_box" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_cob_pg_cta_banner_hide_on";
  DROP TYPE "public"."enum_pages_blocks_cob_pg_cta_strip_hide_on";
  DROP TYPE "public"."enum_pages_blocks_cob_pg_cta_box_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_cta_banner_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_cta_strip_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_cta_box_hide_on";`)
}
