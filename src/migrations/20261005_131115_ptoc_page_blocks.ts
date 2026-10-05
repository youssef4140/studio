import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_hero_right_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_hero_left_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_hero_center_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_feat4_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_feat3_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_feat_list_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_about_right_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_about_left_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_about_text_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_testi3_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_testi2_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_testi_one_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_cta_dark_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_cta_light_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_cta_banner_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_prog_dark_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_prog_light_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_info_list_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_info_steps_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_info_faq_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_ptoc_pg_faq_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_hero_right_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_hero_left_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_hero_center_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_feat4_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_feat3_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_feat_list_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_about_right_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_about_left_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_about_text_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_testi3_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_testi2_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_testi_one_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_cta_dark_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_cta_light_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_cta_banner_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_prog_dark_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_prog_light_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_info_list_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_info_steps_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_info_faq_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_ptoc_pg_faq_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TABLE "pages_blocks_ptoc_pg_hero_right_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_hero_right_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_hero_right" (
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
  
  CREATE TABLE "pages_blocks_ptoc_pg_hero_left_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_hero_left_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_hero_left" (
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
  
  CREATE TABLE "pages_blocks_ptoc_pg_hero_center_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_hero_center_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_hero_center" (
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
  
  CREATE TABLE "pages_blocks_ptoc_pg_feat4_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_feat4_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_feat4_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_feat4" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_feat3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_feat3_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_feat3_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_feat3" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_feat_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_feat_list_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_feat_list_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_feat_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_about_right_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_about_right_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_about_right_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_about_right" (
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
  
  CREATE TABLE "pages_blocks_ptoc_pg_about_left_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_about_left_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_about_left_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_about_left" (
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
  
  CREATE TABLE "pages_blocks_ptoc_pg_about_text_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_about_text_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_about_text_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_about_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_testi3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"avatar_id" integer,
  	"name" varchar,
  	"role" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_testi3_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_testi3_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_testi3" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_testi2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"avatar_id" integer,
  	"name" varchar,
  	"role" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_testi2_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_testi2_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_testi2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_testi_one_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_testi_one_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_testi_one" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"quote" varchar,
  	"avatar_id" integer,
  	"name" varchar,
  	"role" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_cta_dark_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_cta_dark_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_cta_dark" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"primary_button_label" varchar,
  	"primary_button_href" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_href" varchar,
  	"bg_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_cta_light_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_cta_light_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_cta_light" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_cta_banner_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_cta_banner_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"bg_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_prog_dark_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_prog_dark_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_prog_dark_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_prog_dark_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_prog_dark" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"list_label" varchar,
  	"image_id" integer,
  	"bg_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_prog_light_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_prog_light_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_prog_light_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_prog_light_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_prog_light" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"list_label" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_info_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_info_list_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_info_list_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_info_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_info_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_info_steps_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_info_steps_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_info_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_info_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_info_faq_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_info_faq_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_info_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_faq_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_ptoc_pg_faq_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ptoc_pg_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_hero_right_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_hero_right_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_hero_right" (
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
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_hero_left_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_hero_left_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_hero_left" (
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
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_hero_center_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_hero_center_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_hero_center" (
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
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_feat4_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_feat4_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_feat4_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_feat4" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_feat3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_feat3_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_feat3_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_feat3" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_feat_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_feat_list_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_feat_list_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_feat_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_about_right_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_about_right_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_about_right_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_about_right" (
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
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_about_left_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_about_left_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_about_left_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_about_left" (
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
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_about_text_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_about_text_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_about_text_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_about_text" (
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
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_testi3_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"avatar_id" integer,
  	"name" varchar,
  	"role" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_testi3_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_testi3_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_testi3" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_testi2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"avatar_id" integer,
  	"name" varchar,
  	"role" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_testi2_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_testi2_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_testi2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_testi_one_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_testi_one_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_testi_one" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"quote" varchar,
  	"avatar_id" integer,
  	"name" varchar,
  	"role" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_cta_dark_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_cta_dark_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_cta_dark" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"primary_button_label" varchar,
  	"primary_button_href" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_href" varchar,
  	"bg_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_cta_light_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_cta_light_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_cta_light" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_cta_banner_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_cta_banner_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"bg_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_prog_dark_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_prog_dark_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_prog_dark_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_prog_dark_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_prog_dark" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"list_label" varchar,
  	"image_id" integer,
  	"bg_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_prog_light_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_prog_light_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_prog_light_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_prog_light_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_prog_light" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"list_label" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_info_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_info_list_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_info_list_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_info_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_info_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_info_steps_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_info_steps_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_info_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_info_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_info_faq_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_info_faq_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_info_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_faq_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_ptoc_pg_faq_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ptoc_pg_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_ptoc_pg_hero_right_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_hero_right_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_hero_right"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_hero_right" ADD CONSTRAINT "pages_blocks_ptoc_pg_hero_right_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_hero_right" ADD CONSTRAINT "pages_blocks_ptoc_pg_hero_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_hero_left_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_hero_left_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_hero_left"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_hero_left" ADD CONSTRAINT "pages_blocks_ptoc_pg_hero_left_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_hero_left" ADD CONSTRAINT "pages_blocks_ptoc_pg_hero_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_hero_center_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_hero_center_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_hero_center"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_hero_center" ADD CONSTRAINT "pages_blocks_ptoc_pg_hero_center_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_hero_center" ADD CONSTRAINT "pages_blocks_ptoc_pg_hero_center_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_feat4_items" ADD CONSTRAINT "pages_blocks_ptoc_pg_feat4_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_feat4_items" ADD CONSTRAINT "pages_blocks_ptoc_pg_feat4_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_feat4"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_feat4_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_feat4_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_feat4"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_feat4" ADD CONSTRAINT "pages_blocks_ptoc_pg_feat4_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_feat3_items" ADD CONSTRAINT "pages_blocks_ptoc_pg_feat3_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_feat3_items" ADD CONSTRAINT "pages_blocks_ptoc_pg_feat3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_feat3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_feat3_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_feat3_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_feat3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_feat3" ADD CONSTRAINT "pages_blocks_ptoc_pg_feat3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_feat_list_items" ADD CONSTRAINT "pages_blocks_ptoc_pg_feat_list_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_feat_list_items" ADD CONSTRAINT "pages_blocks_ptoc_pg_feat_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_feat_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_feat_list_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_feat_list_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_feat_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_feat_list" ADD CONSTRAINT "pages_blocks_ptoc_pg_feat_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_about_right_stats" ADD CONSTRAINT "pages_blocks_ptoc_pg_about_right_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_about_right"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_about_right_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_about_right_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_about_right"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_about_right" ADD CONSTRAINT "pages_blocks_ptoc_pg_about_right_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_about_right" ADD CONSTRAINT "pages_blocks_ptoc_pg_about_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_about_left_stats" ADD CONSTRAINT "pages_blocks_ptoc_pg_about_left_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_about_left"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_about_left_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_about_left_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_about_left"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_about_left" ADD CONSTRAINT "pages_blocks_ptoc_pg_about_left_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_about_left" ADD CONSTRAINT "pages_blocks_ptoc_pg_about_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_about_text_stats" ADD CONSTRAINT "pages_blocks_ptoc_pg_about_text_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_about_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_about_text_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_about_text_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_about_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_about_text" ADD CONSTRAINT "pages_blocks_ptoc_pg_about_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_testi3_items" ADD CONSTRAINT "pages_blocks_ptoc_pg_testi3_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_testi3_items" ADD CONSTRAINT "pages_blocks_ptoc_pg_testi3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_testi3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_testi3_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_testi3_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_testi3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_testi3" ADD CONSTRAINT "pages_blocks_ptoc_pg_testi3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_testi2_items" ADD CONSTRAINT "pages_blocks_ptoc_pg_testi2_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_testi2_items" ADD CONSTRAINT "pages_blocks_ptoc_pg_testi2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_testi2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_testi2_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_testi2_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_testi2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_testi2" ADD CONSTRAINT "pages_blocks_ptoc_pg_testi2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_testi_one_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_testi_one_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_testi_one"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_testi_one" ADD CONSTRAINT "pages_blocks_ptoc_pg_testi_one_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_testi_one" ADD CONSTRAINT "pages_blocks_ptoc_pg_testi_one_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_cta_dark_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_cta_dark_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_cta_dark"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_cta_dark" ADD CONSTRAINT "pages_blocks_ptoc_pg_cta_dark_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_cta_dark" ADD CONSTRAINT "pages_blocks_ptoc_pg_cta_dark_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_cta_light_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_cta_light_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_cta_light"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_cta_light" ADD CONSTRAINT "pages_blocks_ptoc_pg_cta_light_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_cta_banner_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_cta_banner_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_cta_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_cta_banner" ADD CONSTRAINT "pages_blocks_ptoc_pg_cta_banner_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_cta_banner" ADD CONSTRAINT "pages_blocks_ptoc_pg_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_prog_dark_stats" ADD CONSTRAINT "pages_blocks_ptoc_pg_prog_dark_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_prog_dark"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_prog_dark_items" ADD CONSTRAINT "pages_blocks_ptoc_pg_prog_dark_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_prog_dark"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_prog_dark_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_prog_dark_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_prog_dark"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_prog_dark" ADD CONSTRAINT "pages_blocks_ptoc_pg_prog_dark_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_prog_dark" ADD CONSTRAINT "pages_blocks_ptoc_pg_prog_dark_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_prog_dark" ADD CONSTRAINT "pages_blocks_ptoc_pg_prog_dark_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_prog_light_stats" ADD CONSTRAINT "pages_blocks_ptoc_pg_prog_light_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_prog_light"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_prog_light_items" ADD CONSTRAINT "pages_blocks_ptoc_pg_prog_light_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_prog_light"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_prog_light_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_prog_light_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_prog_light"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_prog_light" ADD CONSTRAINT "pages_blocks_ptoc_pg_prog_light_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_prog_light" ADD CONSTRAINT "pages_blocks_ptoc_pg_prog_light_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_info_list_items" ADD CONSTRAINT "pages_blocks_ptoc_pg_info_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_info_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_info_list_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_info_list_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_info_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_info_list" ADD CONSTRAINT "pages_blocks_ptoc_pg_info_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_info_steps_items" ADD CONSTRAINT "pages_blocks_ptoc_pg_info_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_info_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_info_steps_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_info_steps_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_info_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_info_steps" ADD CONSTRAINT "pages_blocks_ptoc_pg_info_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_info_faq_items" ADD CONSTRAINT "pages_blocks_ptoc_pg_info_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_info_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_info_faq_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_info_faq_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_info_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_info_faq" ADD CONSTRAINT "pages_blocks_ptoc_pg_info_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_faq_items" ADD CONSTRAINT "pages_blocks_ptoc_pg_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_faq_hide_on" ADD CONSTRAINT "pages_blocks_ptoc_pg_faq_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_ptoc_pg_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ptoc_pg_faq" ADD CONSTRAINT "pages_blocks_ptoc_pg_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_hero_right_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_hero_right_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_hero_right"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_hero_right" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_hero_right_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_hero_right" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_hero_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_hero_left_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_hero_left_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_hero_left"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_hero_left" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_hero_left_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_hero_left" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_hero_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_hero_center_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_hero_center_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_hero_center"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_hero_center" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_hero_center_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_hero_center" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_hero_center_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_feat4_items" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_feat4_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_feat4_items" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_feat4_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_feat4"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_feat4_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_feat4_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_feat4"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_feat4" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_feat4_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_feat3_items" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_feat3_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_feat3_items" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_feat3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_feat3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_feat3_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_feat3_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_feat3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_feat3" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_feat3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_feat_list_items" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_feat_list_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_feat_list_items" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_feat_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_feat_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_feat_list_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_feat_list_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_feat_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_feat_list" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_feat_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_about_right_stats" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_about_right_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_about_right"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_about_right_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_about_right_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_about_right"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_about_right" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_about_right_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_about_right" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_about_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_about_left_stats" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_about_left_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_about_left"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_about_left_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_about_left_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_about_left"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_about_left" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_about_left_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_about_left" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_about_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_about_text_stats" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_about_text_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_about_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_about_text_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_about_text_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_about_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_about_text" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_about_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_testi3_items" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_testi3_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_testi3_items" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_testi3_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_testi3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_testi3_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_testi3_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_testi3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_testi3" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_testi3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_testi2_items" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_testi2_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_testi2_items" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_testi2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_testi2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_testi2_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_testi2_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_testi2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_testi2" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_testi2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_testi_one_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_testi_one_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_testi_one"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_testi_one" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_testi_one_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_testi_one" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_testi_one_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_cta_dark_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_cta_dark_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_cta_dark"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_cta_dark" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_cta_dark_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_cta_dark" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_cta_dark_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_cta_light_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_cta_light_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_cta_light"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_cta_light" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_cta_light_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_cta_banner_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_cta_banner_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_cta_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_cta_banner" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_cta_banner_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_cta_banner" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_prog_dark_stats" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_prog_dark_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_prog_dark"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_prog_dark_items" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_prog_dark_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_prog_dark"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_prog_dark_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_prog_dark_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_prog_dark"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_prog_dark" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_prog_dark_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_prog_dark" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_prog_dark_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_prog_dark" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_prog_dark_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_prog_light_stats" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_prog_light_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_prog_light"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_prog_light_items" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_prog_light_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_prog_light"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_prog_light_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_prog_light_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_prog_light"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_prog_light" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_prog_light_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_prog_light" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_prog_light_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_info_list_items" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_info_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_info_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_info_list_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_info_list_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_info_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_info_list" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_info_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_info_steps_items" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_info_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_info_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_info_steps_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_info_steps_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_info_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_info_steps" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_info_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_info_faq_items" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_info_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_info_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_info_faq_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_info_faq_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_info_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_info_faq" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_info_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_faq_items" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_faq_hide_on" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_faq_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_ptoc_pg_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ptoc_pg_faq" ADD CONSTRAINT "_pages_v_blocks_ptoc_pg_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_ptoc_pg_hero_right_hide_on_order_idx" ON "pages_blocks_ptoc_pg_hero_right_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_hero_right_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_hero_right_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_hero_right_order_idx" ON "pages_blocks_ptoc_pg_hero_right" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_hero_right_parent_id_idx" ON "pages_blocks_ptoc_pg_hero_right" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_hero_right_path_idx" ON "pages_blocks_ptoc_pg_hero_right" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_hero_right_image_idx" ON "pages_blocks_ptoc_pg_hero_right" USING btree ("image_id");
  CREATE INDEX "pages_blocks_ptoc_pg_hero_left_hide_on_order_idx" ON "pages_blocks_ptoc_pg_hero_left_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_hero_left_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_hero_left_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_hero_left_order_idx" ON "pages_blocks_ptoc_pg_hero_left" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_hero_left_parent_id_idx" ON "pages_blocks_ptoc_pg_hero_left" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_hero_left_path_idx" ON "pages_blocks_ptoc_pg_hero_left" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_hero_left_image_idx" ON "pages_blocks_ptoc_pg_hero_left" USING btree ("image_id");
  CREATE INDEX "pages_blocks_ptoc_pg_hero_center_hide_on_order_idx" ON "pages_blocks_ptoc_pg_hero_center_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_hero_center_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_hero_center_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_hero_center_order_idx" ON "pages_blocks_ptoc_pg_hero_center" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_hero_center_parent_id_idx" ON "pages_blocks_ptoc_pg_hero_center" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_hero_center_path_idx" ON "pages_blocks_ptoc_pg_hero_center" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_hero_center_image_idx" ON "pages_blocks_ptoc_pg_hero_center" USING btree ("image_id");
  CREATE INDEX "pages_blocks_ptoc_pg_feat4_items_order_idx" ON "pages_blocks_ptoc_pg_feat4_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_feat4_items_parent_id_idx" ON "pages_blocks_ptoc_pg_feat4_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_feat4_items_icon_idx" ON "pages_blocks_ptoc_pg_feat4_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_ptoc_pg_feat4_hide_on_order_idx" ON "pages_blocks_ptoc_pg_feat4_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_feat4_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_feat4_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_feat4_order_idx" ON "pages_blocks_ptoc_pg_feat4" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_feat4_parent_id_idx" ON "pages_blocks_ptoc_pg_feat4" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_feat4_path_idx" ON "pages_blocks_ptoc_pg_feat4" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_feat3_items_order_idx" ON "pages_blocks_ptoc_pg_feat3_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_feat3_items_parent_id_idx" ON "pages_blocks_ptoc_pg_feat3_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_feat3_items_icon_idx" ON "pages_blocks_ptoc_pg_feat3_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_ptoc_pg_feat3_hide_on_order_idx" ON "pages_blocks_ptoc_pg_feat3_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_feat3_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_feat3_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_feat3_order_idx" ON "pages_blocks_ptoc_pg_feat3" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_feat3_parent_id_idx" ON "pages_blocks_ptoc_pg_feat3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_feat3_path_idx" ON "pages_blocks_ptoc_pg_feat3" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_feat_list_items_order_idx" ON "pages_blocks_ptoc_pg_feat_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_feat_list_items_parent_id_idx" ON "pages_blocks_ptoc_pg_feat_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_feat_list_items_icon_idx" ON "pages_blocks_ptoc_pg_feat_list_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_ptoc_pg_feat_list_hide_on_order_idx" ON "pages_blocks_ptoc_pg_feat_list_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_feat_list_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_feat_list_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_feat_list_order_idx" ON "pages_blocks_ptoc_pg_feat_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_feat_list_parent_id_idx" ON "pages_blocks_ptoc_pg_feat_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_feat_list_path_idx" ON "pages_blocks_ptoc_pg_feat_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_about_right_stats_order_idx" ON "pages_blocks_ptoc_pg_about_right_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_about_right_stats_parent_id_idx" ON "pages_blocks_ptoc_pg_about_right_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_about_right_hide_on_order_idx" ON "pages_blocks_ptoc_pg_about_right_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_about_right_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_about_right_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_about_right_order_idx" ON "pages_blocks_ptoc_pg_about_right" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_about_right_parent_id_idx" ON "pages_blocks_ptoc_pg_about_right" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_about_right_path_idx" ON "pages_blocks_ptoc_pg_about_right" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_about_right_image_idx" ON "pages_blocks_ptoc_pg_about_right" USING btree ("image_id");
  CREATE INDEX "pages_blocks_ptoc_pg_about_left_stats_order_idx" ON "pages_blocks_ptoc_pg_about_left_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_about_left_stats_parent_id_idx" ON "pages_blocks_ptoc_pg_about_left_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_about_left_hide_on_order_idx" ON "pages_blocks_ptoc_pg_about_left_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_about_left_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_about_left_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_about_left_order_idx" ON "pages_blocks_ptoc_pg_about_left" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_about_left_parent_id_idx" ON "pages_blocks_ptoc_pg_about_left" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_about_left_path_idx" ON "pages_blocks_ptoc_pg_about_left" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_about_left_image_idx" ON "pages_blocks_ptoc_pg_about_left" USING btree ("image_id");
  CREATE INDEX "pages_blocks_ptoc_pg_about_text_stats_order_idx" ON "pages_blocks_ptoc_pg_about_text_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_about_text_stats_parent_id_idx" ON "pages_blocks_ptoc_pg_about_text_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_about_text_hide_on_order_idx" ON "pages_blocks_ptoc_pg_about_text_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_about_text_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_about_text_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_about_text_order_idx" ON "pages_blocks_ptoc_pg_about_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_about_text_parent_id_idx" ON "pages_blocks_ptoc_pg_about_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_about_text_path_idx" ON "pages_blocks_ptoc_pg_about_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_testi3_items_order_idx" ON "pages_blocks_ptoc_pg_testi3_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_testi3_items_parent_id_idx" ON "pages_blocks_ptoc_pg_testi3_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_testi3_items_avatar_idx" ON "pages_blocks_ptoc_pg_testi3_items" USING btree ("avatar_id");
  CREATE INDEX "pages_blocks_ptoc_pg_testi3_hide_on_order_idx" ON "pages_blocks_ptoc_pg_testi3_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_testi3_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_testi3_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_testi3_order_idx" ON "pages_blocks_ptoc_pg_testi3" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_testi3_parent_id_idx" ON "pages_blocks_ptoc_pg_testi3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_testi3_path_idx" ON "pages_blocks_ptoc_pg_testi3" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_testi2_items_order_idx" ON "pages_blocks_ptoc_pg_testi2_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_testi2_items_parent_id_idx" ON "pages_blocks_ptoc_pg_testi2_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_testi2_items_avatar_idx" ON "pages_blocks_ptoc_pg_testi2_items" USING btree ("avatar_id");
  CREATE INDEX "pages_blocks_ptoc_pg_testi2_hide_on_order_idx" ON "pages_blocks_ptoc_pg_testi2_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_testi2_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_testi2_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_testi2_order_idx" ON "pages_blocks_ptoc_pg_testi2" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_testi2_parent_id_idx" ON "pages_blocks_ptoc_pg_testi2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_testi2_path_idx" ON "pages_blocks_ptoc_pg_testi2" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_testi_one_hide_on_order_idx" ON "pages_blocks_ptoc_pg_testi_one_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_testi_one_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_testi_one_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_testi_one_order_idx" ON "pages_blocks_ptoc_pg_testi_one" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_testi_one_parent_id_idx" ON "pages_blocks_ptoc_pg_testi_one" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_testi_one_path_idx" ON "pages_blocks_ptoc_pg_testi_one" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_testi_one_avatar_idx" ON "pages_blocks_ptoc_pg_testi_one" USING btree ("avatar_id");
  CREATE INDEX "pages_blocks_ptoc_pg_cta_dark_hide_on_order_idx" ON "pages_blocks_ptoc_pg_cta_dark_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_cta_dark_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_cta_dark_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_cta_dark_order_idx" ON "pages_blocks_ptoc_pg_cta_dark" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_cta_dark_parent_id_idx" ON "pages_blocks_ptoc_pg_cta_dark" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_cta_dark_path_idx" ON "pages_blocks_ptoc_pg_cta_dark" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_cta_dark_bg_image_idx" ON "pages_blocks_ptoc_pg_cta_dark" USING btree ("bg_image_id");
  CREATE INDEX "pages_blocks_ptoc_pg_cta_light_hide_on_order_idx" ON "pages_blocks_ptoc_pg_cta_light_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_cta_light_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_cta_light_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_cta_light_order_idx" ON "pages_blocks_ptoc_pg_cta_light" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_cta_light_parent_id_idx" ON "pages_blocks_ptoc_pg_cta_light" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_cta_light_path_idx" ON "pages_blocks_ptoc_pg_cta_light" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_cta_banner_hide_on_order_idx" ON "pages_blocks_ptoc_pg_cta_banner_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_cta_banner_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_cta_banner_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_cta_banner_order_idx" ON "pages_blocks_ptoc_pg_cta_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_cta_banner_parent_id_idx" ON "pages_blocks_ptoc_pg_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_cta_banner_path_idx" ON "pages_blocks_ptoc_pg_cta_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_cta_banner_bg_image_idx" ON "pages_blocks_ptoc_pg_cta_banner" USING btree ("bg_image_id");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_dark_stats_order_idx" ON "pages_blocks_ptoc_pg_prog_dark_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_dark_stats_parent_id_idx" ON "pages_blocks_ptoc_pg_prog_dark_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_dark_items_order_idx" ON "pages_blocks_ptoc_pg_prog_dark_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_dark_items_parent_id_idx" ON "pages_blocks_ptoc_pg_prog_dark_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_dark_hide_on_order_idx" ON "pages_blocks_ptoc_pg_prog_dark_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_dark_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_prog_dark_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_dark_order_idx" ON "pages_blocks_ptoc_pg_prog_dark" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_dark_parent_id_idx" ON "pages_blocks_ptoc_pg_prog_dark" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_dark_path_idx" ON "pages_blocks_ptoc_pg_prog_dark" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_dark_image_idx" ON "pages_blocks_ptoc_pg_prog_dark" USING btree ("image_id");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_dark_bg_image_idx" ON "pages_blocks_ptoc_pg_prog_dark" USING btree ("bg_image_id");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_light_stats_order_idx" ON "pages_blocks_ptoc_pg_prog_light_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_light_stats_parent_id_idx" ON "pages_blocks_ptoc_pg_prog_light_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_light_items_order_idx" ON "pages_blocks_ptoc_pg_prog_light_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_light_items_parent_id_idx" ON "pages_blocks_ptoc_pg_prog_light_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_light_hide_on_order_idx" ON "pages_blocks_ptoc_pg_prog_light_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_light_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_prog_light_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_light_order_idx" ON "pages_blocks_ptoc_pg_prog_light" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_light_parent_id_idx" ON "pages_blocks_ptoc_pg_prog_light" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_light_path_idx" ON "pages_blocks_ptoc_pg_prog_light" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_prog_light_image_idx" ON "pages_blocks_ptoc_pg_prog_light" USING btree ("image_id");
  CREATE INDEX "pages_blocks_ptoc_pg_info_list_items_order_idx" ON "pages_blocks_ptoc_pg_info_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_info_list_items_parent_id_idx" ON "pages_blocks_ptoc_pg_info_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_info_list_hide_on_order_idx" ON "pages_blocks_ptoc_pg_info_list_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_info_list_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_info_list_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_info_list_order_idx" ON "pages_blocks_ptoc_pg_info_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_info_list_parent_id_idx" ON "pages_blocks_ptoc_pg_info_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_info_list_path_idx" ON "pages_blocks_ptoc_pg_info_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_info_steps_items_order_idx" ON "pages_blocks_ptoc_pg_info_steps_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_info_steps_items_parent_id_idx" ON "pages_blocks_ptoc_pg_info_steps_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_info_steps_hide_on_order_idx" ON "pages_blocks_ptoc_pg_info_steps_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_info_steps_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_info_steps_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_info_steps_order_idx" ON "pages_blocks_ptoc_pg_info_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_info_steps_parent_id_idx" ON "pages_blocks_ptoc_pg_info_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_info_steps_path_idx" ON "pages_blocks_ptoc_pg_info_steps" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_info_faq_items_order_idx" ON "pages_blocks_ptoc_pg_info_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_info_faq_items_parent_id_idx" ON "pages_blocks_ptoc_pg_info_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_info_faq_hide_on_order_idx" ON "pages_blocks_ptoc_pg_info_faq_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_info_faq_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_info_faq_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_info_faq_order_idx" ON "pages_blocks_ptoc_pg_info_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_info_faq_parent_id_idx" ON "pages_blocks_ptoc_pg_info_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_info_faq_path_idx" ON "pages_blocks_ptoc_pg_info_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_ptoc_pg_faq_items_order_idx" ON "pages_blocks_ptoc_pg_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_faq_items_parent_id_idx" ON "pages_blocks_ptoc_pg_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_faq_hide_on_order_idx" ON "pages_blocks_ptoc_pg_faq_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_ptoc_pg_faq_hide_on_parent_idx" ON "pages_blocks_ptoc_pg_faq_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_faq_order_idx" ON "pages_blocks_ptoc_pg_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_ptoc_pg_faq_parent_id_idx" ON "pages_blocks_ptoc_pg_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ptoc_pg_faq_path_idx" ON "pages_blocks_ptoc_pg_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_right_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_hero_right_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_right_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_hero_right_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_right_order_idx" ON "_pages_v_blocks_ptoc_pg_hero_right" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_right_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_hero_right" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_right_path_idx" ON "_pages_v_blocks_ptoc_pg_hero_right" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_right_image_idx" ON "_pages_v_blocks_ptoc_pg_hero_right" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_left_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_hero_left_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_left_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_hero_left_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_left_order_idx" ON "_pages_v_blocks_ptoc_pg_hero_left" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_left_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_hero_left" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_left_path_idx" ON "_pages_v_blocks_ptoc_pg_hero_left" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_left_image_idx" ON "_pages_v_blocks_ptoc_pg_hero_left" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_center_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_hero_center_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_center_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_hero_center_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_center_order_idx" ON "_pages_v_blocks_ptoc_pg_hero_center" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_center_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_hero_center" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_center_path_idx" ON "_pages_v_blocks_ptoc_pg_hero_center" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_hero_center_image_idx" ON "_pages_v_blocks_ptoc_pg_hero_center" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat4_items_order_idx" ON "_pages_v_blocks_ptoc_pg_feat4_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat4_items_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_feat4_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat4_items_icon_idx" ON "_pages_v_blocks_ptoc_pg_feat4_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat4_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_feat4_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat4_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_feat4_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat4_order_idx" ON "_pages_v_blocks_ptoc_pg_feat4" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat4_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_feat4" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat4_path_idx" ON "_pages_v_blocks_ptoc_pg_feat4" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat3_items_order_idx" ON "_pages_v_blocks_ptoc_pg_feat3_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat3_items_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_feat3_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat3_items_icon_idx" ON "_pages_v_blocks_ptoc_pg_feat3_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat3_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_feat3_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat3_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_feat3_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat3_order_idx" ON "_pages_v_blocks_ptoc_pg_feat3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat3_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_feat3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat3_path_idx" ON "_pages_v_blocks_ptoc_pg_feat3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat_list_items_order_idx" ON "_pages_v_blocks_ptoc_pg_feat_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat_list_items_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_feat_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat_list_items_icon_idx" ON "_pages_v_blocks_ptoc_pg_feat_list_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat_list_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_feat_list_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat_list_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_feat_list_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat_list_order_idx" ON "_pages_v_blocks_ptoc_pg_feat_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat_list_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_feat_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_feat_list_path_idx" ON "_pages_v_blocks_ptoc_pg_feat_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_right_stats_order_idx" ON "_pages_v_blocks_ptoc_pg_about_right_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_right_stats_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_about_right_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_right_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_about_right_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_right_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_about_right_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_right_order_idx" ON "_pages_v_blocks_ptoc_pg_about_right" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_right_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_about_right" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_right_path_idx" ON "_pages_v_blocks_ptoc_pg_about_right" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_right_image_idx" ON "_pages_v_blocks_ptoc_pg_about_right" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_left_stats_order_idx" ON "_pages_v_blocks_ptoc_pg_about_left_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_left_stats_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_about_left_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_left_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_about_left_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_left_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_about_left_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_left_order_idx" ON "_pages_v_blocks_ptoc_pg_about_left" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_left_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_about_left" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_left_path_idx" ON "_pages_v_blocks_ptoc_pg_about_left" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_left_image_idx" ON "_pages_v_blocks_ptoc_pg_about_left" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_text_stats_order_idx" ON "_pages_v_blocks_ptoc_pg_about_text_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_text_stats_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_about_text_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_text_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_about_text_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_text_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_about_text_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_text_order_idx" ON "_pages_v_blocks_ptoc_pg_about_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_text_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_about_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_about_text_path_idx" ON "_pages_v_blocks_ptoc_pg_about_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi3_items_order_idx" ON "_pages_v_blocks_ptoc_pg_testi3_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi3_items_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_testi3_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi3_items_avatar_idx" ON "_pages_v_blocks_ptoc_pg_testi3_items" USING btree ("avatar_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi3_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_testi3_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi3_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_testi3_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi3_order_idx" ON "_pages_v_blocks_ptoc_pg_testi3" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi3_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_testi3" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi3_path_idx" ON "_pages_v_blocks_ptoc_pg_testi3" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi2_items_order_idx" ON "_pages_v_blocks_ptoc_pg_testi2_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi2_items_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_testi2_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi2_items_avatar_idx" ON "_pages_v_blocks_ptoc_pg_testi2_items" USING btree ("avatar_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi2_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_testi2_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi2_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_testi2_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi2_order_idx" ON "_pages_v_blocks_ptoc_pg_testi2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi2_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_testi2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi2_path_idx" ON "_pages_v_blocks_ptoc_pg_testi2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi_one_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_testi_one_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi_one_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_testi_one_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi_one_order_idx" ON "_pages_v_blocks_ptoc_pg_testi_one" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi_one_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_testi_one" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi_one_path_idx" ON "_pages_v_blocks_ptoc_pg_testi_one" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_testi_one_avatar_idx" ON "_pages_v_blocks_ptoc_pg_testi_one" USING btree ("avatar_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_cta_dark_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_cta_dark_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_cta_dark_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_cta_dark_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_cta_dark_order_idx" ON "_pages_v_blocks_ptoc_pg_cta_dark" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_cta_dark_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_cta_dark" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_cta_dark_path_idx" ON "_pages_v_blocks_ptoc_pg_cta_dark" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_cta_dark_bg_image_idx" ON "_pages_v_blocks_ptoc_pg_cta_dark" USING btree ("bg_image_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_cta_light_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_cta_light_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_cta_light_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_cta_light_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_cta_light_order_idx" ON "_pages_v_blocks_ptoc_pg_cta_light" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_cta_light_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_cta_light" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_cta_light_path_idx" ON "_pages_v_blocks_ptoc_pg_cta_light" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_cta_banner_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_cta_banner_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_cta_banner_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_cta_banner_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_cta_banner_order_idx" ON "_pages_v_blocks_ptoc_pg_cta_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_cta_banner_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_cta_banner_path_idx" ON "_pages_v_blocks_ptoc_pg_cta_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_cta_banner_bg_image_idx" ON "_pages_v_blocks_ptoc_pg_cta_banner" USING btree ("bg_image_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_dark_stats_order_idx" ON "_pages_v_blocks_ptoc_pg_prog_dark_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_dark_stats_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_prog_dark_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_dark_items_order_idx" ON "_pages_v_blocks_ptoc_pg_prog_dark_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_dark_items_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_prog_dark_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_dark_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_prog_dark_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_dark_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_prog_dark_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_dark_order_idx" ON "_pages_v_blocks_ptoc_pg_prog_dark" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_dark_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_prog_dark" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_dark_path_idx" ON "_pages_v_blocks_ptoc_pg_prog_dark" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_dark_image_idx" ON "_pages_v_blocks_ptoc_pg_prog_dark" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_dark_bg_image_idx" ON "_pages_v_blocks_ptoc_pg_prog_dark" USING btree ("bg_image_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_light_stats_order_idx" ON "_pages_v_blocks_ptoc_pg_prog_light_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_light_stats_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_prog_light_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_light_items_order_idx" ON "_pages_v_blocks_ptoc_pg_prog_light_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_light_items_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_prog_light_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_light_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_prog_light_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_light_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_prog_light_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_light_order_idx" ON "_pages_v_blocks_ptoc_pg_prog_light" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_light_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_prog_light" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_light_path_idx" ON "_pages_v_blocks_ptoc_pg_prog_light" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_prog_light_image_idx" ON "_pages_v_blocks_ptoc_pg_prog_light" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_list_items_order_idx" ON "_pages_v_blocks_ptoc_pg_info_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_list_items_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_info_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_list_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_info_list_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_list_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_info_list_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_list_order_idx" ON "_pages_v_blocks_ptoc_pg_info_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_list_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_info_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_list_path_idx" ON "_pages_v_blocks_ptoc_pg_info_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_steps_items_order_idx" ON "_pages_v_blocks_ptoc_pg_info_steps_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_steps_items_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_info_steps_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_steps_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_info_steps_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_steps_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_info_steps_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_steps_order_idx" ON "_pages_v_blocks_ptoc_pg_info_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_steps_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_info_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_steps_path_idx" ON "_pages_v_blocks_ptoc_pg_info_steps" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_faq_items_order_idx" ON "_pages_v_blocks_ptoc_pg_info_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_faq_items_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_info_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_faq_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_info_faq_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_faq_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_info_faq_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_faq_order_idx" ON "_pages_v_blocks_ptoc_pg_info_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_faq_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_info_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_info_faq_path_idx" ON "_pages_v_blocks_ptoc_pg_info_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_faq_items_order_idx" ON "_pages_v_blocks_ptoc_pg_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_faq_items_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_faq_hide_on_order_idx" ON "_pages_v_blocks_ptoc_pg_faq_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_faq_hide_on_parent_idx" ON "_pages_v_blocks_ptoc_pg_faq_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_faq_order_idx" ON "_pages_v_blocks_ptoc_pg_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_faq_parent_id_idx" ON "_pages_v_blocks_ptoc_pg_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ptoc_pg_faq_path_idx" ON "_pages_v_blocks_ptoc_pg_faq" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_ptoc_pg_hero_right_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_hero_right" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_hero_left_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_hero_left" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_hero_center_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_hero_center" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_feat4_items" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_feat4_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_feat4" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_feat3_items" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_feat3_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_feat3" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_feat_list_items" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_feat_list_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_feat_list" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_about_right_stats" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_about_right_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_about_right" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_about_left_stats" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_about_left_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_about_left" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_about_text_stats" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_about_text_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_about_text" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_testi3_items" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_testi3_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_testi3" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_testi2_items" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_testi2_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_testi2" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_testi_one_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_testi_one" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_cta_dark_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_cta_dark" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_cta_light_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_cta_light" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_cta_banner_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_cta_banner" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_prog_dark_stats" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_prog_dark_items" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_prog_dark_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_prog_dark" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_prog_light_stats" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_prog_light_items" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_prog_light_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_prog_light" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_info_list_items" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_info_list_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_info_list" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_info_steps_items" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_info_steps_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_info_steps" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_info_faq_items" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_info_faq_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_info_faq" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_faq_items" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_faq_hide_on" CASCADE;
  DROP TABLE "pages_blocks_ptoc_pg_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_hero_right_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_hero_right" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_hero_left_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_hero_left" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_hero_center_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_hero_center" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_feat4_items" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_feat4_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_feat4" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_feat3_items" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_feat3_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_feat3" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_feat_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_feat_list_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_feat_list" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_about_right_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_about_right_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_about_right" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_about_left_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_about_left_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_about_left" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_about_text_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_about_text_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_about_text" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_testi3_items" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_testi3_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_testi3" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_testi2_items" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_testi2_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_testi2" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_testi_one_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_testi_one" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_cta_dark_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_cta_dark" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_cta_light_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_cta_light" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_cta_banner_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_cta_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_prog_dark_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_prog_dark_items" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_prog_dark_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_prog_dark" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_prog_light_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_prog_light_items" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_prog_light_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_prog_light" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_info_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_info_list_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_info_list" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_info_steps_items" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_info_steps_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_info_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_info_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_info_faq_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_info_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_faq_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_ptoc_pg_faq" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_hero_right_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_hero_left_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_hero_center_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_feat4_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_feat3_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_feat_list_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_about_right_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_about_left_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_about_text_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_testi3_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_testi2_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_testi_one_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_cta_dark_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_cta_light_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_cta_banner_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_prog_dark_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_prog_light_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_info_list_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_info_steps_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_info_faq_hide_on";
  DROP TYPE "public"."enum_pages_blocks_ptoc_pg_faq_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_hero_right_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_hero_left_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_hero_center_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_feat4_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_feat3_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_feat_list_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_about_right_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_about_left_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_about_text_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_testi3_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_testi2_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_testi_one_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_cta_dark_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_cta_light_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_cta_banner_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_prog_dark_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_prog_light_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_info_list_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_info_steps_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_info_faq_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_ptoc_pg_faq_hide_on";`)
}
