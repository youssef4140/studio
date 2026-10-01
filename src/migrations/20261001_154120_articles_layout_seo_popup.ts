import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_text_editor_blocks_hero_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_content_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_faq_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_faq_tny_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_entity_list_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_entity_list_field" AS ENUM('symptoms', 'treatments');
  CREATE TYPE "public"."enum_text_editor_blocks_entity_list_style" AS ENUM('bullets', 'cards');
  CREATE TYPE "public"."enum__text_editor_v_blocks_hero_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_content_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_faq_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_faq_tny_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_entity_list_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_entity_list_field" AS ENUM('symptoms', 'treatments');
  CREATE TYPE "public"."enum__text_editor_v_blocks_entity_list_style" AS ENUM('bullets', 'cards');
  CREATE TABLE "pages_seo_custom" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "_pages_v_version_seo_custom" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "text_editor_blocks_hero_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_hero_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_content_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_content_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "text_editor_blocks_faq_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_faq_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_faq_tny_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "text_editor_blocks_faq_tny_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_faq_tny_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_faq_tny" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_entity_list_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_entity_list_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_entity_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"field" "enum_text_editor_blocks_entity_list_field" DEFAULT 'symptoms',
  	"style" "enum_text_editor_blocks_entity_list_style" DEFAULT 'bullets',
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_seo_custom" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_hero_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_hero_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_content_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_content_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"featured" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_faq_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_faq_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_faq_tny_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_faq_tny_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_faq_tny_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_faq_tny" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_entity_list_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_entity_list_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_entity_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"field" "enum__text_editor_v_blocks_entity_list_field" DEFAULT 'symptoms',
  	"style" "enum__text_editor_v_blocks_entity_list_style" DEFAULT 'bullets',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_version_seo_custom" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "text_editor" DROP CONSTRAINT "text_editor_featured_image_id_media_id_fk";
  
  ALTER TABLE "_text_editor_v" DROP CONSTRAINT "_text_editor_v_version_featured_image_id_media_id_fk";
  
  DROP INDEX "text_editor_featured_image_idx";
  DROP INDEX "_text_editor_v_version_version_featured_image_idx";
  ALTER TABLE "pages_seo_custom" ADD CONSTRAINT "pages_seo_custom_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_seo_custom" ADD CONSTRAINT "_pages_v_version_seo_custom_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_hero_hide_on" ADD CONSTRAINT "text_editor_blocks_hero_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_hero" ADD CONSTRAINT "text_editor_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_hero" ADD CONSTRAINT "text_editor_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_content_hide_on" ADD CONSTRAINT "text_editor_blocks_content_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_content" ADD CONSTRAINT "text_editor_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_faq_items" ADD CONSTRAINT "text_editor_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_faq_hide_on" ADD CONSTRAINT "text_editor_blocks_faq_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_faq" ADD CONSTRAINT "text_editor_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_faq_tny_items" ADD CONSTRAINT "text_editor_blocks_faq_tny_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor_blocks_faq_tny"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_faq_tny_hide_on" ADD CONSTRAINT "text_editor_blocks_faq_tny_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_faq_tny"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_faq_tny" ADD CONSTRAINT "text_editor_blocks_faq_tny_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_entity_list_hide_on" ADD CONSTRAINT "text_editor_blocks_entity_list_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_entity_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_entity_list" ADD CONSTRAINT "text_editor_blocks_entity_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_seo_custom" ADD CONSTRAINT "text_editor_seo_custom_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_hero_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_hero_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_hero" ADD CONSTRAINT "_text_editor_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_hero" ADD CONSTRAINT "_text_editor_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_content_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_content_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_content" ADD CONSTRAINT "_text_editor_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_faq_items" ADD CONSTRAINT "_text_editor_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_faq_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_faq_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_faq" ADD CONSTRAINT "_text_editor_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_faq_tny_items" ADD CONSTRAINT "_text_editor_v_blocks_faq_tny_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v_blocks_faq_tny"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_faq_tny_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_faq_tny_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_faq_tny"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_faq_tny" ADD CONSTRAINT "_text_editor_v_blocks_faq_tny_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_entity_list_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_entity_list_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_entity_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_entity_list" ADD CONSTRAINT "_text_editor_v_blocks_entity_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_version_seo_custom" ADD CONSTRAINT "_text_editor_v_version_seo_custom_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_seo_custom_order_idx" ON "pages_seo_custom" USING btree ("_order");
  CREATE INDEX "pages_seo_custom_parent_id_idx" ON "pages_seo_custom" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_seo_custom_order_idx" ON "_pages_v_version_seo_custom" USING btree ("_order");
  CREATE INDEX "_pages_v_version_seo_custom_parent_id_idx" ON "_pages_v_version_seo_custom" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_hero_hide_on_order_idx" ON "text_editor_blocks_hero_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_hero_hide_on_parent_idx" ON "text_editor_blocks_hero_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_hero_order_idx" ON "text_editor_blocks_hero" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_hero_parent_id_idx" ON "text_editor_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_hero_path_idx" ON "text_editor_blocks_hero" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_hero_image_idx" ON "text_editor_blocks_hero" USING btree ("image_id");
  CREATE INDEX "text_editor_blocks_content_hide_on_order_idx" ON "text_editor_blocks_content_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_content_hide_on_parent_idx" ON "text_editor_blocks_content_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_content_order_idx" ON "text_editor_blocks_content" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_content_parent_id_idx" ON "text_editor_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_content_path_idx" ON "text_editor_blocks_content" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_faq_items_order_idx" ON "text_editor_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_faq_items_parent_id_idx" ON "text_editor_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_faq_hide_on_order_idx" ON "text_editor_blocks_faq_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_faq_hide_on_parent_idx" ON "text_editor_blocks_faq_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_faq_order_idx" ON "text_editor_blocks_faq" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_faq_parent_id_idx" ON "text_editor_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_faq_path_idx" ON "text_editor_blocks_faq" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_faq_tny_items_order_idx" ON "text_editor_blocks_faq_tny_items" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_faq_tny_items_parent_id_idx" ON "text_editor_blocks_faq_tny_items" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_faq_tny_hide_on_order_idx" ON "text_editor_blocks_faq_tny_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_faq_tny_hide_on_parent_idx" ON "text_editor_blocks_faq_tny_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_faq_tny_order_idx" ON "text_editor_blocks_faq_tny" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_faq_tny_parent_id_idx" ON "text_editor_blocks_faq_tny" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_faq_tny_path_idx" ON "text_editor_blocks_faq_tny" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_entity_list_hide_on_order_idx" ON "text_editor_blocks_entity_list_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_entity_list_hide_on_parent_idx" ON "text_editor_blocks_entity_list_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_entity_list_order_idx" ON "text_editor_blocks_entity_list" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_entity_list_parent_id_idx" ON "text_editor_blocks_entity_list" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_entity_list_path_idx" ON "text_editor_blocks_entity_list" USING btree ("_path");
  CREATE INDEX "text_editor_seo_custom_order_idx" ON "text_editor_seo_custom" USING btree ("_order");
  CREATE INDEX "text_editor_seo_custom_parent_id_idx" ON "text_editor_seo_custom" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_hero_hide_on_order_idx" ON "_text_editor_v_blocks_hero_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_hero_hide_on_parent_idx" ON "_text_editor_v_blocks_hero_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_hero_order_idx" ON "_text_editor_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_hero_parent_id_idx" ON "_text_editor_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_hero_path_idx" ON "_text_editor_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_hero_image_idx" ON "_text_editor_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_text_editor_v_blocks_content_hide_on_order_idx" ON "_text_editor_v_blocks_content_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_content_hide_on_parent_idx" ON "_text_editor_v_blocks_content_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_content_order_idx" ON "_text_editor_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_content_parent_id_idx" ON "_text_editor_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_content_path_idx" ON "_text_editor_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_faq_items_order_idx" ON "_text_editor_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_faq_items_parent_id_idx" ON "_text_editor_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_faq_hide_on_order_idx" ON "_text_editor_v_blocks_faq_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_faq_hide_on_parent_idx" ON "_text_editor_v_blocks_faq_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_faq_order_idx" ON "_text_editor_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_faq_parent_id_idx" ON "_text_editor_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_faq_path_idx" ON "_text_editor_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_faq_tny_items_order_idx" ON "_text_editor_v_blocks_faq_tny_items" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_faq_tny_items_parent_id_idx" ON "_text_editor_v_blocks_faq_tny_items" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_faq_tny_hide_on_order_idx" ON "_text_editor_v_blocks_faq_tny_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_faq_tny_hide_on_parent_idx" ON "_text_editor_v_blocks_faq_tny_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_faq_tny_order_idx" ON "_text_editor_v_blocks_faq_tny" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_faq_tny_parent_id_idx" ON "_text_editor_v_blocks_faq_tny" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_faq_tny_path_idx" ON "_text_editor_v_blocks_faq_tny" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_entity_list_hide_on_order_idx" ON "_text_editor_v_blocks_entity_list_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_entity_list_hide_on_parent_idx" ON "_text_editor_v_blocks_entity_list_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_entity_list_order_idx" ON "_text_editor_v_blocks_entity_list" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_entity_list_parent_id_idx" ON "_text_editor_v_blocks_entity_list" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_entity_list_path_idx" ON "_text_editor_v_blocks_entity_list" USING btree ("_path");
  CREATE INDEX "_text_editor_v_version_seo_custom_order_idx" ON "_text_editor_v_version_seo_custom" USING btree ("_order");
  CREATE INDEX "_text_editor_v_version_seo_custom_parent_id_idx" ON "_text_editor_v_version_seo_custom" USING btree ("_parent_id");
  ALTER TABLE "text_editor" DROP COLUMN "excerpt";
  ALTER TABLE "text_editor" DROP COLUMN "featured_image_id";
  ALTER TABLE "text_editor" DROP COLUMN "content";
  ALTER TABLE "_text_editor_v" DROP COLUMN "version_excerpt";
  ALTER TABLE "_text_editor_v" DROP COLUMN "version_featured_image_id";
  ALTER TABLE "_text_editor_v" DROP COLUMN "version_content";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_seo_custom" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_seo_custom" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "text_editor_blocks_hero_hide_on" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "text_editor_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "text_editor_blocks_content_hide_on" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "text_editor_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "text_editor_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "text_editor_blocks_faq_hide_on" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "text_editor_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "text_editor_blocks_faq_tny_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "text_editor_blocks_faq_tny_hide_on" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "text_editor_blocks_faq_tny" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "text_editor_blocks_entity_list_hide_on" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "text_editor_blocks_entity_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "text_editor_seo_custom" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_text_editor_v_blocks_hero_hide_on" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_text_editor_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_text_editor_v_blocks_content_hide_on" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_text_editor_v_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_text_editor_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_text_editor_v_blocks_faq_hide_on" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_text_editor_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_text_editor_v_blocks_faq_tny_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_text_editor_v_blocks_faq_tny_hide_on" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_text_editor_v_blocks_faq_tny" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_text_editor_v_blocks_entity_list_hide_on" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_text_editor_v_blocks_entity_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_text_editor_v_version_seo_custom" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_seo_custom" CASCADE;
  DROP TABLE "_pages_v_version_seo_custom" CASCADE;
  DROP TABLE "text_editor_blocks_hero_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_hero" CASCADE;
  DROP TABLE "text_editor_blocks_content_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_content" CASCADE;
  DROP TABLE "text_editor_blocks_faq_items" CASCADE;
  DROP TABLE "text_editor_blocks_faq_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_faq" CASCADE;
  DROP TABLE "text_editor_blocks_faq_tny_items" CASCADE;
  DROP TABLE "text_editor_blocks_faq_tny_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_faq_tny" CASCADE;
  DROP TABLE "text_editor_blocks_entity_list_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_entity_list" CASCADE;
  DROP TABLE "text_editor_seo_custom" CASCADE;
  DROP TABLE "_text_editor_v_blocks_hero_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_hero" CASCADE;
  DROP TABLE "_text_editor_v_blocks_content_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_content" CASCADE;
  DROP TABLE "_text_editor_v_blocks_faq_items" CASCADE;
  DROP TABLE "_text_editor_v_blocks_faq_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_faq" CASCADE;
  DROP TABLE "_text_editor_v_blocks_faq_tny_items" CASCADE;
  DROP TABLE "_text_editor_v_blocks_faq_tny_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_faq_tny" CASCADE;
  DROP TABLE "_text_editor_v_blocks_entity_list_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_entity_list" CASCADE;
  DROP TABLE "_text_editor_v_version_seo_custom" CASCADE;
  ALTER TABLE "text_editor" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "text_editor" ADD COLUMN "featured_image_id" integer;
  ALTER TABLE "text_editor" ADD COLUMN "content" jsonb;
  ALTER TABLE "_text_editor_v" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "_text_editor_v" ADD COLUMN "version_featured_image_id" integer;
  ALTER TABLE "_text_editor_v" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "text_editor" ADD CONSTRAINT "text_editor_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v" ADD CONSTRAINT "_text_editor_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "text_editor_featured_image_idx" ON "text_editor" USING btree ("featured_image_id");
  CREATE INDEX "_text_editor_v_version_version_featured_image_idx" ON "_text_editor_v" USING btree ("version_featured_image_id");
  DROP TYPE "public"."enum_text_editor_blocks_hero_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_content_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_faq_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_faq_tny_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_entity_list_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_entity_list_field";
  DROP TYPE "public"."enum_text_editor_blocks_entity_list_style";
  DROP TYPE "public"."enum__text_editor_v_blocks_hero_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_content_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_faq_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_faq_tny_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_entity_list_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_entity_list_field";
  DROP TYPE "public"."enum__text_editor_v_blocks_entity_list_style";`)
}
