import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_tny_pg_hero_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_tny_pg_overview_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_tny_pg_roles_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_tny_pg_spotlight_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_tny_pg_focus_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_tny_pg_settings_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_tny_pg_why_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_tny_pg_cta_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_tny_pg_hero_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_tny_pg_overview_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_tny_pg_roles_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_tny_pg_spotlight_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_tny_pg_focus_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_tny_pg_settings_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_tny_pg_why_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_tny_pg_cta_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TABLE "pages_blocks_tny_pg_hero_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_tny_pg_hero_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tny_pg_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tny_pg_overview_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_tny_pg_overview_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_tny_pg_overview_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tny_pg_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tny_pg_roles_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_tny_pg_roles_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_tny_pg_roles_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tny_pg_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tny_pg_spotlight_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_tny_pg_spotlight_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tny_pg_spotlight" (
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
  
  CREATE TABLE "pages_blocks_tny_pg_focus_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_tny_pg_focus_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_tny_pg_focus_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tny_pg_focus" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tny_pg_settings_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_tny_pg_settings_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_tny_pg_settings_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tny_pg_settings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tny_pg_why_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_tny_pg_why_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_tny_pg_why_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tny_pg_why" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tny_pg_cta_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_tny_pg_cta_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tny_pg_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"primary_button_label" varchar,
  	"primary_button_href" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_hero_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_tny_pg_hero_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_overview_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_overview_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_tny_pg_overview_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_overview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_roles_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_roles_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_tny_pg_roles_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_spotlight_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_tny_pg_spotlight_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_spotlight" (
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
  
  CREATE TABLE "_pages_v_blocks_tny_pg_focus_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_focus_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_tny_pg_focus_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_focus" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_settings_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_settings_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_tny_pg_settings_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_settings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_why_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_why_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_tny_pg_why_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_why" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_cta_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_tny_pg_cta_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_tny_pg_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"primary_button_label" varchar,
  	"primary_button_href" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_tny_pg_hero_hide_on" ADD CONSTRAINT "pages_blocks_tny_pg_hero_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_tny_pg_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_hero" ADD CONSTRAINT "pages_blocks_tny_pg_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_overview_paragraphs" ADD CONSTRAINT "pages_blocks_tny_pg_overview_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tny_pg_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_overview_hide_on" ADD CONSTRAINT "pages_blocks_tny_pg_overview_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_tny_pg_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_overview" ADD CONSTRAINT "pages_blocks_tny_pg_overview_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_overview" ADD CONSTRAINT "pages_blocks_tny_pg_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_roles_items" ADD CONSTRAINT "pages_blocks_tny_pg_roles_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tny_pg_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_roles_hide_on" ADD CONSTRAINT "pages_blocks_tny_pg_roles_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_tny_pg_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_roles" ADD CONSTRAINT "pages_blocks_tny_pg_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_spotlight_hide_on" ADD CONSTRAINT "pages_blocks_tny_pg_spotlight_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_tny_pg_spotlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_spotlight" ADD CONSTRAINT "pages_blocks_tny_pg_spotlight_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_spotlight" ADD CONSTRAINT "pages_blocks_tny_pg_spotlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_focus_items" ADD CONSTRAINT "pages_blocks_tny_pg_focus_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tny_pg_focus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_focus_hide_on" ADD CONSTRAINT "pages_blocks_tny_pg_focus_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_tny_pg_focus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_focus" ADD CONSTRAINT "pages_blocks_tny_pg_focus_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_settings_items" ADD CONSTRAINT "pages_blocks_tny_pg_settings_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tny_pg_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_settings_hide_on" ADD CONSTRAINT "pages_blocks_tny_pg_settings_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_tny_pg_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_settings" ADD CONSTRAINT "pages_blocks_tny_pg_settings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_why_items" ADD CONSTRAINT "pages_blocks_tny_pg_why_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tny_pg_why"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_why_hide_on" ADD CONSTRAINT "pages_blocks_tny_pg_why_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_tny_pg_why"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_why" ADD CONSTRAINT "pages_blocks_tny_pg_why_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_cta_hide_on" ADD CONSTRAINT "pages_blocks_tny_pg_cta_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_tny_pg_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tny_pg_cta" ADD CONSTRAINT "pages_blocks_tny_pg_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_hero_hide_on" ADD CONSTRAINT "_pages_v_blocks_tny_pg_hero_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_tny_pg_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_hero" ADD CONSTRAINT "_pages_v_blocks_tny_pg_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_overview_paragraphs" ADD CONSTRAINT "_pages_v_blocks_tny_pg_overview_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tny_pg_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_overview_hide_on" ADD CONSTRAINT "_pages_v_blocks_tny_pg_overview_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_tny_pg_overview"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_overview" ADD CONSTRAINT "_pages_v_blocks_tny_pg_overview_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_overview" ADD CONSTRAINT "_pages_v_blocks_tny_pg_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_roles_items" ADD CONSTRAINT "_pages_v_blocks_tny_pg_roles_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tny_pg_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_roles_hide_on" ADD CONSTRAINT "_pages_v_blocks_tny_pg_roles_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_tny_pg_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_roles" ADD CONSTRAINT "_pages_v_blocks_tny_pg_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_spotlight_hide_on" ADD CONSTRAINT "_pages_v_blocks_tny_pg_spotlight_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_tny_pg_spotlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_spotlight" ADD CONSTRAINT "_pages_v_blocks_tny_pg_spotlight_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_spotlight" ADD CONSTRAINT "_pages_v_blocks_tny_pg_spotlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_focus_items" ADD CONSTRAINT "_pages_v_blocks_tny_pg_focus_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tny_pg_focus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_focus_hide_on" ADD CONSTRAINT "_pages_v_blocks_tny_pg_focus_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_tny_pg_focus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_focus" ADD CONSTRAINT "_pages_v_blocks_tny_pg_focus_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_settings_items" ADD CONSTRAINT "_pages_v_blocks_tny_pg_settings_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tny_pg_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_settings_hide_on" ADD CONSTRAINT "_pages_v_blocks_tny_pg_settings_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_tny_pg_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_settings" ADD CONSTRAINT "_pages_v_blocks_tny_pg_settings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_why_items" ADD CONSTRAINT "_pages_v_blocks_tny_pg_why_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tny_pg_why"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_why_hide_on" ADD CONSTRAINT "_pages_v_blocks_tny_pg_why_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_tny_pg_why"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_why" ADD CONSTRAINT "_pages_v_blocks_tny_pg_why_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_cta_hide_on" ADD CONSTRAINT "_pages_v_blocks_tny_pg_cta_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_tny_pg_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tny_pg_cta" ADD CONSTRAINT "_pages_v_blocks_tny_pg_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_tny_pg_hero_hide_on_order_idx" ON "pages_blocks_tny_pg_hero_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_tny_pg_hero_hide_on_parent_idx" ON "pages_blocks_tny_pg_hero_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_tny_pg_hero_order_idx" ON "pages_blocks_tny_pg_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_tny_pg_hero_parent_id_idx" ON "pages_blocks_tny_pg_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tny_pg_hero_path_idx" ON "pages_blocks_tny_pg_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_tny_pg_overview_paragraphs_order_idx" ON "pages_blocks_tny_pg_overview_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_blocks_tny_pg_overview_paragraphs_parent_id_idx" ON "pages_blocks_tny_pg_overview_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tny_pg_overview_hide_on_order_idx" ON "pages_blocks_tny_pg_overview_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_tny_pg_overview_hide_on_parent_idx" ON "pages_blocks_tny_pg_overview_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_tny_pg_overview_order_idx" ON "pages_blocks_tny_pg_overview" USING btree ("_order");
  CREATE INDEX "pages_blocks_tny_pg_overview_parent_id_idx" ON "pages_blocks_tny_pg_overview" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tny_pg_overview_path_idx" ON "pages_blocks_tny_pg_overview" USING btree ("_path");
  CREATE INDEX "pages_blocks_tny_pg_overview_image_idx" ON "pages_blocks_tny_pg_overview" USING btree ("image_id");
  CREATE INDEX "pages_blocks_tny_pg_roles_items_order_idx" ON "pages_blocks_tny_pg_roles_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_tny_pg_roles_items_parent_id_idx" ON "pages_blocks_tny_pg_roles_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tny_pg_roles_hide_on_order_idx" ON "pages_blocks_tny_pg_roles_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_tny_pg_roles_hide_on_parent_idx" ON "pages_blocks_tny_pg_roles_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_tny_pg_roles_order_idx" ON "pages_blocks_tny_pg_roles" USING btree ("_order");
  CREATE INDEX "pages_blocks_tny_pg_roles_parent_id_idx" ON "pages_blocks_tny_pg_roles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tny_pg_roles_path_idx" ON "pages_blocks_tny_pg_roles" USING btree ("_path");
  CREATE INDEX "pages_blocks_tny_pg_spotlight_hide_on_order_idx" ON "pages_blocks_tny_pg_spotlight_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_tny_pg_spotlight_hide_on_parent_idx" ON "pages_blocks_tny_pg_spotlight_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_tny_pg_spotlight_order_idx" ON "pages_blocks_tny_pg_spotlight" USING btree ("_order");
  CREATE INDEX "pages_blocks_tny_pg_spotlight_parent_id_idx" ON "pages_blocks_tny_pg_spotlight" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tny_pg_spotlight_path_idx" ON "pages_blocks_tny_pg_spotlight" USING btree ("_path");
  CREATE INDEX "pages_blocks_tny_pg_spotlight_image_idx" ON "pages_blocks_tny_pg_spotlight" USING btree ("image_id");
  CREATE INDEX "pages_blocks_tny_pg_focus_items_order_idx" ON "pages_blocks_tny_pg_focus_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_tny_pg_focus_items_parent_id_idx" ON "pages_blocks_tny_pg_focus_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tny_pg_focus_hide_on_order_idx" ON "pages_blocks_tny_pg_focus_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_tny_pg_focus_hide_on_parent_idx" ON "pages_blocks_tny_pg_focus_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_tny_pg_focus_order_idx" ON "pages_blocks_tny_pg_focus" USING btree ("_order");
  CREATE INDEX "pages_blocks_tny_pg_focus_parent_id_idx" ON "pages_blocks_tny_pg_focus" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tny_pg_focus_path_idx" ON "pages_blocks_tny_pg_focus" USING btree ("_path");
  CREATE INDEX "pages_blocks_tny_pg_settings_items_order_idx" ON "pages_blocks_tny_pg_settings_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_tny_pg_settings_items_parent_id_idx" ON "pages_blocks_tny_pg_settings_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tny_pg_settings_hide_on_order_idx" ON "pages_blocks_tny_pg_settings_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_tny_pg_settings_hide_on_parent_idx" ON "pages_blocks_tny_pg_settings_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_tny_pg_settings_order_idx" ON "pages_blocks_tny_pg_settings" USING btree ("_order");
  CREATE INDEX "pages_blocks_tny_pg_settings_parent_id_idx" ON "pages_blocks_tny_pg_settings" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tny_pg_settings_path_idx" ON "pages_blocks_tny_pg_settings" USING btree ("_path");
  CREATE INDEX "pages_blocks_tny_pg_why_items_order_idx" ON "pages_blocks_tny_pg_why_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_tny_pg_why_items_parent_id_idx" ON "pages_blocks_tny_pg_why_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tny_pg_why_hide_on_order_idx" ON "pages_blocks_tny_pg_why_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_tny_pg_why_hide_on_parent_idx" ON "pages_blocks_tny_pg_why_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_tny_pg_why_order_idx" ON "pages_blocks_tny_pg_why" USING btree ("_order");
  CREATE INDEX "pages_blocks_tny_pg_why_parent_id_idx" ON "pages_blocks_tny_pg_why" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tny_pg_why_path_idx" ON "pages_blocks_tny_pg_why" USING btree ("_path");
  CREATE INDEX "pages_blocks_tny_pg_cta_hide_on_order_idx" ON "pages_blocks_tny_pg_cta_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_tny_pg_cta_hide_on_parent_idx" ON "pages_blocks_tny_pg_cta_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_tny_pg_cta_order_idx" ON "pages_blocks_tny_pg_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_tny_pg_cta_parent_id_idx" ON "pages_blocks_tny_pg_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tny_pg_cta_path_idx" ON "pages_blocks_tny_pg_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_tny_pg_hero_hide_on_order_idx" ON "_pages_v_blocks_tny_pg_hero_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_tny_pg_hero_hide_on_parent_idx" ON "_pages_v_blocks_tny_pg_hero_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_hero_order_idx" ON "_pages_v_blocks_tny_pg_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tny_pg_hero_parent_id_idx" ON "_pages_v_blocks_tny_pg_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_hero_path_idx" ON "_pages_v_blocks_tny_pg_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_tny_pg_overview_paragraphs_order_idx" ON "_pages_v_blocks_tny_pg_overview_paragraphs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tny_pg_overview_paragraphs_parent_id_idx" ON "_pages_v_blocks_tny_pg_overview_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_overview_hide_on_order_idx" ON "_pages_v_blocks_tny_pg_overview_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_tny_pg_overview_hide_on_parent_idx" ON "_pages_v_blocks_tny_pg_overview_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_overview_order_idx" ON "_pages_v_blocks_tny_pg_overview" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tny_pg_overview_parent_id_idx" ON "_pages_v_blocks_tny_pg_overview" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_overview_path_idx" ON "_pages_v_blocks_tny_pg_overview" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_tny_pg_overview_image_idx" ON "_pages_v_blocks_tny_pg_overview" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_roles_items_order_idx" ON "_pages_v_blocks_tny_pg_roles_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tny_pg_roles_items_parent_id_idx" ON "_pages_v_blocks_tny_pg_roles_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_roles_hide_on_order_idx" ON "_pages_v_blocks_tny_pg_roles_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_tny_pg_roles_hide_on_parent_idx" ON "_pages_v_blocks_tny_pg_roles_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_roles_order_idx" ON "_pages_v_blocks_tny_pg_roles" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tny_pg_roles_parent_id_idx" ON "_pages_v_blocks_tny_pg_roles" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_roles_path_idx" ON "_pages_v_blocks_tny_pg_roles" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_tny_pg_spotlight_hide_on_order_idx" ON "_pages_v_blocks_tny_pg_spotlight_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_tny_pg_spotlight_hide_on_parent_idx" ON "_pages_v_blocks_tny_pg_spotlight_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_spotlight_order_idx" ON "_pages_v_blocks_tny_pg_spotlight" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tny_pg_spotlight_parent_id_idx" ON "_pages_v_blocks_tny_pg_spotlight" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_spotlight_path_idx" ON "_pages_v_blocks_tny_pg_spotlight" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_tny_pg_spotlight_image_idx" ON "_pages_v_blocks_tny_pg_spotlight" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_focus_items_order_idx" ON "_pages_v_blocks_tny_pg_focus_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tny_pg_focus_items_parent_id_idx" ON "_pages_v_blocks_tny_pg_focus_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_focus_hide_on_order_idx" ON "_pages_v_blocks_tny_pg_focus_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_tny_pg_focus_hide_on_parent_idx" ON "_pages_v_blocks_tny_pg_focus_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_focus_order_idx" ON "_pages_v_blocks_tny_pg_focus" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tny_pg_focus_parent_id_idx" ON "_pages_v_blocks_tny_pg_focus" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_focus_path_idx" ON "_pages_v_blocks_tny_pg_focus" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_tny_pg_settings_items_order_idx" ON "_pages_v_blocks_tny_pg_settings_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tny_pg_settings_items_parent_id_idx" ON "_pages_v_blocks_tny_pg_settings_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_settings_hide_on_order_idx" ON "_pages_v_blocks_tny_pg_settings_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_tny_pg_settings_hide_on_parent_idx" ON "_pages_v_blocks_tny_pg_settings_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_settings_order_idx" ON "_pages_v_blocks_tny_pg_settings" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tny_pg_settings_parent_id_idx" ON "_pages_v_blocks_tny_pg_settings" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_settings_path_idx" ON "_pages_v_blocks_tny_pg_settings" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_tny_pg_why_items_order_idx" ON "_pages_v_blocks_tny_pg_why_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tny_pg_why_items_parent_id_idx" ON "_pages_v_blocks_tny_pg_why_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_why_hide_on_order_idx" ON "_pages_v_blocks_tny_pg_why_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_tny_pg_why_hide_on_parent_idx" ON "_pages_v_blocks_tny_pg_why_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_why_order_idx" ON "_pages_v_blocks_tny_pg_why" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tny_pg_why_parent_id_idx" ON "_pages_v_blocks_tny_pg_why" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_why_path_idx" ON "_pages_v_blocks_tny_pg_why" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_tny_pg_cta_hide_on_order_idx" ON "_pages_v_blocks_tny_pg_cta_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_tny_pg_cta_hide_on_parent_idx" ON "_pages_v_blocks_tny_pg_cta_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_cta_order_idx" ON "_pages_v_blocks_tny_pg_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tny_pg_cta_parent_id_idx" ON "_pages_v_blocks_tny_pg_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tny_pg_cta_path_idx" ON "_pages_v_blocks_tny_pg_cta" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_tny_pg_hero_hide_on" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_hero" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_overview_paragraphs" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_overview_hide_on" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_overview" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_roles_items" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_roles_hide_on" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_roles" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_spotlight_hide_on" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_spotlight" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_focus_items" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_focus_hide_on" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_focus" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_settings_items" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_settings_hide_on" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_settings" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_why_items" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_why_hide_on" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_why" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_cta_hide_on" CASCADE;
  DROP TABLE "pages_blocks_tny_pg_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_hero_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_overview_paragraphs" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_overview_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_overview" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_roles_items" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_roles_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_roles" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_spotlight_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_spotlight" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_focus_items" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_focus_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_focus" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_settings_items" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_settings_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_settings" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_why_items" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_why_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_why" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_cta_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_tny_pg_cta" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_tny_pg_hero_hide_on";
  DROP TYPE "public"."enum_pages_blocks_tny_pg_overview_hide_on";
  DROP TYPE "public"."enum_pages_blocks_tny_pg_roles_hide_on";
  DROP TYPE "public"."enum_pages_blocks_tny_pg_spotlight_hide_on";
  DROP TYPE "public"."enum_pages_blocks_tny_pg_focus_hide_on";
  DROP TYPE "public"."enum_pages_blocks_tny_pg_settings_hide_on";
  DROP TYPE "public"."enum_pages_blocks_tny_pg_why_hide_on";
  DROP TYPE "public"."enum_pages_blocks_tny_pg_cta_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_tny_pg_hero_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_tny_pg_overview_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_tny_pg_roles_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_tny_pg_spotlight_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_tny_pg_focus_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_tny_pg_settings_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_tny_pg_why_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_tny_pg_cta_hide_on";`)
}
