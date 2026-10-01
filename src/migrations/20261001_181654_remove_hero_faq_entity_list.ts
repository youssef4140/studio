import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_hide_on" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq_hide_on" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_entity_list_hide_on" CASCADE;
  DROP TABLE "pages_blocks_entity_list" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_entity_list_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_entity_list" CASCADE;
  DROP TABLE "text_editor_blocks_hero_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_hero" CASCADE;
  DROP TABLE "text_editor_blocks_faq_items" CASCADE;
  DROP TABLE "text_editor_blocks_faq_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_faq" CASCADE;
  DROP TABLE "text_editor_blocks_entity_list_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_entity_list" CASCADE;
  DROP TABLE "_text_editor_v_blocks_hero_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_hero" CASCADE;
  DROP TABLE "_text_editor_v_blocks_faq_items" CASCADE;
  DROP TABLE "_text_editor_v_blocks_faq_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_faq" CASCADE;
  DROP TABLE "_text_editor_v_blocks_entity_list_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_entity_list" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_hero_hide_on";
  DROP TYPE "public"."enum_pages_blocks_faq_hide_on";
  DROP TYPE "public"."enum_pages_blocks_entity_list_hide_on";
  DROP TYPE "public"."enum_pages_blocks_entity_list_field";
  DROP TYPE "public"."enum_pages_blocks_entity_list_style";
  DROP TYPE "public"."enum__pages_v_blocks_hero_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_faq_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_entity_list_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_entity_list_field";
  DROP TYPE "public"."enum__pages_v_blocks_entity_list_style";
  DROP TYPE "public"."enum_text_editor_blocks_hero_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_faq_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_entity_list_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_entity_list_field";
  DROP TYPE "public"."enum_text_editor_blocks_entity_list_style";
  DROP TYPE "public"."enum__text_editor_v_blocks_hero_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_faq_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_entity_list_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_entity_list_field";
  DROP TYPE "public"."enum__text_editor_v_blocks_entity_list_style";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_faq_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_entity_list_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_entity_list_field" AS ENUM('symptoms', 'treatments');
  CREATE TYPE "public"."enum_pages_blocks_entity_list_style" AS ENUM('bullets', 'cards');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_entity_list_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_entity_list_field" AS ENUM('symptoms', 'treatments');
  CREATE TYPE "public"."enum__pages_v_blocks_entity_list_style" AS ENUM('bullets', 'cards');
  CREATE TYPE "public"."enum_text_editor_blocks_hero_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_faq_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_entity_list_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_entity_list_field" AS ENUM('symptoms', 'treatments');
  CREATE TYPE "public"."enum_text_editor_blocks_entity_list_style" AS ENUM('bullets', 'cards');
  CREATE TYPE "public"."enum__text_editor_v_blocks_hero_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_faq_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_entity_list_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_entity_list_field" AS ENUM('symptoms', 'treatments');
  CREATE TYPE "public"."enum__text_editor_v_blocks_entity_list_style" AS ENUM('bullets', 'cards');
  CREATE TABLE "pages_blocks_hero_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_hero_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
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
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_faq_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_faq_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_entity_list_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_entity_list_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_entity_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"field" "enum_pages_blocks_entity_list_field" DEFAULT 'symptoms',
  	"style" "enum_pages_blocks_entity_list_style" DEFAULT 'bullets',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_hero_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
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
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"featured" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_faq_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_entity_list_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_entity_list_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_entity_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"field" "enum__pages_v_blocks_entity_list_field" DEFAULT 'symptoms',
  	"style" "enum__pages_v_blocks_entity_list_style" DEFAULT 'bullets',
  	"_uuid" varchar,
  	"block_name" varchar
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
  
  ALTER TABLE "pages_blocks_hero_hide_on" ADD CONSTRAINT "pages_blocks_hero_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_hide_on" ADD CONSTRAINT "pages_blocks_faq_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_entity_list_hide_on" ADD CONSTRAINT "pages_blocks_entity_list_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_entity_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_entity_list" ADD CONSTRAINT "pages_blocks_entity_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_hide_on" ADD CONSTRAINT "_pages_v_blocks_hero_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_hide_on" ADD CONSTRAINT "_pages_v_blocks_faq_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_entity_list_hide_on" ADD CONSTRAINT "_pages_v_blocks_entity_list_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_entity_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_entity_list" ADD CONSTRAINT "_pages_v_blocks_entity_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_hero_hide_on" ADD CONSTRAINT "text_editor_blocks_hero_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_hero" ADD CONSTRAINT "text_editor_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_hero" ADD CONSTRAINT "text_editor_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_faq_items" ADD CONSTRAINT "text_editor_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_faq_hide_on" ADD CONSTRAINT "text_editor_blocks_faq_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_faq" ADD CONSTRAINT "text_editor_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_entity_list_hide_on" ADD CONSTRAINT "text_editor_blocks_entity_list_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_entity_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_entity_list" ADD CONSTRAINT "text_editor_blocks_entity_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_hero_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_hero_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_hero" ADD CONSTRAINT "_text_editor_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_hero" ADD CONSTRAINT "_text_editor_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_faq_items" ADD CONSTRAINT "_text_editor_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_faq_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_faq_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_faq" ADD CONSTRAINT "_text_editor_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_entity_list_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_entity_list_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_entity_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_entity_list" ADD CONSTRAINT "_text_editor_v_blocks_entity_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_hide_on_order_idx" ON "pages_blocks_hero_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_hero_hide_on_parent_idx" ON "pages_blocks_hero_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_hide_on_order_idx" ON "pages_blocks_faq_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_faq_hide_on_parent_idx" ON "pages_blocks_faq_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_entity_list_hide_on_order_idx" ON "pages_blocks_entity_list_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_entity_list_hide_on_parent_idx" ON "pages_blocks_entity_list_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_entity_list_order_idx" ON "pages_blocks_entity_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_entity_list_parent_id_idx" ON "pages_blocks_entity_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_entity_list_path_idx" ON "pages_blocks_entity_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_hide_on_order_idx" ON "_pages_v_blocks_hero_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_hero_hide_on_parent_idx" ON "_pages_v_blocks_hero_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_hide_on_order_idx" ON "_pages_v_blocks_faq_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_faq_hide_on_parent_idx" ON "_pages_v_blocks_faq_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_entity_list_hide_on_order_idx" ON "_pages_v_blocks_entity_list_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_entity_list_hide_on_parent_idx" ON "_pages_v_blocks_entity_list_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_entity_list_order_idx" ON "_pages_v_blocks_entity_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_entity_list_parent_id_idx" ON "_pages_v_blocks_entity_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_entity_list_path_idx" ON "_pages_v_blocks_entity_list" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_hero_hide_on_order_idx" ON "text_editor_blocks_hero_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_hero_hide_on_parent_idx" ON "text_editor_blocks_hero_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_hero_order_idx" ON "text_editor_blocks_hero" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_hero_parent_id_idx" ON "text_editor_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_hero_path_idx" ON "text_editor_blocks_hero" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_hero_image_idx" ON "text_editor_blocks_hero" USING btree ("image_id");
  CREATE INDEX "text_editor_blocks_faq_items_order_idx" ON "text_editor_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_faq_items_parent_id_idx" ON "text_editor_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_faq_hide_on_order_idx" ON "text_editor_blocks_faq_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_faq_hide_on_parent_idx" ON "text_editor_blocks_faq_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_faq_order_idx" ON "text_editor_blocks_faq" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_faq_parent_id_idx" ON "text_editor_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_faq_path_idx" ON "text_editor_blocks_faq" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_entity_list_hide_on_order_idx" ON "text_editor_blocks_entity_list_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_entity_list_hide_on_parent_idx" ON "text_editor_blocks_entity_list_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_entity_list_order_idx" ON "text_editor_blocks_entity_list" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_entity_list_parent_id_idx" ON "text_editor_blocks_entity_list" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_entity_list_path_idx" ON "text_editor_blocks_entity_list" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_hero_hide_on_order_idx" ON "_text_editor_v_blocks_hero_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_hero_hide_on_parent_idx" ON "_text_editor_v_blocks_hero_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_hero_order_idx" ON "_text_editor_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_hero_parent_id_idx" ON "_text_editor_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_hero_path_idx" ON "_text_editor_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_hero_image_idx" ON "_text_editor_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_text_editor_v_blocks_faq_items_order_idx" ON "_text_editor_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_faq_items_parent_id_idx" ON "_text_editor_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_faq_hide_on_order_idx" ON "_text_editor_v_blocks_faq_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_faq_hide_on_parent_idx" ON "_text_editor_v_blocks_faq_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_faq_order_idx" ON "_text_editor_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_faq_parent_id_idx" ON "_text_editor_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_faq_path_idx" ON "_text_editor_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_entity_list_hide_on_order_idx" ON "_text_editor_v_blocks_entity_list_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_entity_list_hide_on_parent_idx" ON "_text_editor_v_blocks_entity_list_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_entity_list_order_idx" ON "_text_editor_v_blocks_entity_list" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_entity_list_parent_id_idx" ON "_text_editor_v_blocks_entity_list" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_entity_list_path_idx" ON "_text_editor_v_blocks_entity_list" USING btree ("_path");`)
}
