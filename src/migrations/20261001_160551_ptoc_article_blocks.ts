import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_text_editor_blocks_ptoc_hero_image_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_hero_split_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_hero_split_left_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_hero_text_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_quote_simple_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_quote_pull_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_quote_box_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_image_full_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_image_two_up_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_image_text_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_text_image_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_header_large_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_header_medium_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_header_small_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_header_label_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_cta_banner_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_cta_inline_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_cta_minimal_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_list_bullets_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_list_numbered_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_list_checklist_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_divider_line_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_divider_accent_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_divider_band_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_divider_space_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_author_row_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_author_card_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_rel_grid_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_rel_list_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_hero_image_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_hero_split_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_hero_split_left_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_hero_text_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_quote_simple_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_quote_pull_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_quote_box_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_image_full_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_image_two_up_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_image_text_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_text_image_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_header_large_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_header_medium_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_header_small_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_header_label_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_cta_banner_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_cta_inline_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_cta_minimal_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_list_bullets_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_list_numbered_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_list_checklist_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_divider_line_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_divider_accent_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_divider_band_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_divider_space_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_author_row_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_author_card_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_rel_grid_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_rel_list_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TABLE "text_editor_blocks_ptoc_hero_image_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_hero_image_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_hero_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"bg_image_id" integer,
  	"author" varchar,
  	"date" varchar,
  	"read_time" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_hero_split_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_hero_split_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_hero_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"image_id" integer,
  	"author" varchar,
  	"date" varchar,
  	"read_time" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_hero_split_left_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_hero_split_left_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_hero_split_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"image_id" integer,
  	"author" varchar,
  	"date" varchar,
  	"read_time" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_hero_text_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_hero_text_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_hero_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"author" varchar,
  	"date" varchar,
  	"read_time" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_quote_simple_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_quote_simple_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_quote_simple" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_quote_pull_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_quote_pull_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_quote_pull" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"bg_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_quote_box_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_quote_box_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_quote_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_image_full_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_image_full_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_image_full" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_image_two_up_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_image_two_up_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_image_two_up" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image2_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_image_text_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_image_text_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_text_image_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_text_image_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_header_large_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_header_large_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_header_large" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_header_medium_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_header_medium_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_header_medium" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_header_small_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_header_small_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_header_small" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_header_label_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_header_label_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_header_label" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_cta_banner_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_cta_banner_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_cta_banner" (
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
  
  CREATE TABLE "text_editor_blocks_ptoc_cta_inline_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_cta_inline_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_cta_inline" (
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
  
  CREATE TABLE "text_editor_blocks_ptoc_cta_minimal_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_cta_minimal_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_cta_minimal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_list_bullets_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_list_bullets_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_list_bullets_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_list_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_list_numbered_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_list_numbered_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_list_numbered_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_list_numbered" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_list_checklist_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_list_checklist_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_list_checklist_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_list_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_divider_line_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_divider_line_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_divider_line" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_divider_accent_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_divider_accent_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_divider_accent" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_divider_band_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_divider_band_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_divider_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_divider_space_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_divider_space_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_divider_space" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_author_row_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_author_row_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_author_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"avatar_id" integer,
  	"label" varchar,
  	"name" varchar,
  	"bio" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_author_card_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_author_card_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_author_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"avatar_id" integer,
  	"name" varchar,
  	"bio" varchar,
  	"bg_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_rel_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"category" varchar,
  	"title" varchar,
  	"excerpt" varchar,
  	"read_time" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_rel_grid_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_rel_grid_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_rel_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_rel_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"read_time" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_rel_list_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_rel_list_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_rel_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_hero_image_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_hero_image_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_hero_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"bg_image_id" integer,
  	"author" varchar,
  	"date" varchar,
  	"read_time" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_hero_split_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_hero_split_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_hero_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"image_id" integer,
  	"author" varchar,
  	"date" varchar,
  	"read_time" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_hero_split_left_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_hero_split_left_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_hero_split_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"image_id" integer,
  	"author" varchar,
  	"date" varchar,
  	"read_time" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_hero_text_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_hero_text_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_hero_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"author" varchar,
  	"date" varchar,
  	"read_time" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_quote_simple_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_quote_simple_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_quote_simple" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_quote_pull_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_quote_pull_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_quote_pull" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"bg_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_quote_box_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_quote_box_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_quote_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"attribution" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_image_full_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_image_full_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_image_full" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_image_two_up_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_image_two_up_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_image_two_up" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image2_id" integer,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_image_text_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_image_text_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_text_image_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_text_image_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_header_large_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_header_large_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_header_large" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_header_medium_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_header_medium_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_header_medium" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_header_small_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_header_small_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_header_small" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_header_label_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_header_label_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_header_label" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_cta_banner_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_cta_banner_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_cta_banner" (
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
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_cta_inline_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_cta_inline_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_cta_inline" (
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
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_cta_minimal_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_cta_minimal_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_cta_minimal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_list_bullets_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_list_bullets_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_list_bullets_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_list_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_list_numbered_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_list_numbered_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_list_numbered_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_list_numbered" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_list_checklist_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_list_checklist_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_list_checklist_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_list_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_divider_line_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_divider_line_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_divider_line" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_divider_accent_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_divider_accent_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_divider_accent" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_divider_band_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_divider_band_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_divider_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_divider_space_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_divider_space_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_divider_space" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_author_row_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_author_row_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_author_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"avatar_id" integer,
  	"label" varchar,
  	"name" varchar,
  	"bio" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_author_card_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_author_card_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_author_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"avatar_id" integer,
  	"name" varchar,
  	"bio" varchar,
  	"bg_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_rel_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"category" varchar,
  	"title" varchar,
  	"excerpt" varchar,
  	"read_time" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_rel_grid_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_rel_grid_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_rel_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_rel_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"read_time" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_rel_list_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_rel_list_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_rel_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "text_editor_blocks_ptoc_hero_image_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_hero_image_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_hero_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_hero_image" ADD CONSTRAINT "text_editor_blocks_ptoc_hero_image_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_hero_image" ADD CONSTRAINT "text_editor_blocks_ptoc_hero_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_hero_split_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_hero_split_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_hero_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_hero_split" ADD CONSTRAINT "text_editor_blocks_ptoc_hero_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_hero_split" ADD CONSTRAINT "text_editor_blocks_ptoc_hero_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_hero_split_left_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_hero_split_left_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_hero_split_left"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_hero_split_left" ADD CONSTRAINT "text_editor_blocks_ptoc_hero_split_left_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_hero_split_left" ADD CONSTRAINT "text_editor_blocks_ptoc_hero_split_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_hero_text_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_hero_text_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_hero_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_hero_text" ADD CONSTRAINT "text_editor_blocks_ptoc_hero_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_quote_simple_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_quote_simple_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_quote_simple"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_quote_simple" ADD CONSTRAINT "text_editor_blocks_ptoc_quote_simple_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_quote_pull_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_quote_pull_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_quote_pull"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_quote_pull" ADD CONSTRAINT "text_editor_blocks_ptoc_quote_pull_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_quote_pull" ADD CONSTRAINT "text_editor_blocks_ptoc_quote_pull_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_quote_box_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_quote_box_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_quote_box"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_quote_box" ADD CONSTRAINT "text_editor_blocks_ptoc_quote_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_image_full_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_image_full_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_image_full"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_image_full" ADD CONSTRAINT "text_editor_blocks_ptoc_image_full_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_image_full" ADD CONSTRAINT "text_editor_blocks_ptoc_image_full_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_image_two_up_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_image_two_up_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_image_two_up"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_image_two_up" ADD CONSTRAINT "text_editor_blocks_ptoc_image_two_up_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_image_two_up" ADD CONSTRAINT "text_editor_blocks_ptoc_image_two_up_image2_id_media_id_fk" FOREIGN KEY ("image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_image_two_up" ADD CONSTRAINT "text_editor_blocks_ptoc_image_two_up_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_image_text_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_image_text_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_image_text" ADD CONSTRAINT "text_editor_blocks_ptoc_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_image_text" ADD CONSTRAINT "text_editor_blocks_ptoc_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_text_image_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_text_image_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_text_image" ADD CONSTRAINT "text_editor_blocks_ptoc_text_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_text_image" ADD CONSTRAINT "text_editor_blocks_ptoc_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_header_large_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_header_large_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_header_large"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_header_large" ADD CONSTRAINT "text_editor_blocks_ptoc_header_large_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_header_medium_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_header_medium_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_header_medium"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_header_medium" ADD CONSTRAINT "text_editor_blocks_ptoc_header_medium_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_header_small_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_header_small_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_header_small"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_header_small" ADD CONSTRAINT "text_editor_blocks_ptoc_header_small_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_header_label_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_header_label_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_header_label"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_header_label" ADD CONSTRAINT "text_editor_blocks_ptoc_header_label_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_cta_banner_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_cta_banner_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_cta_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_cta_banner" ADD CONSTRAINT "text_editor_blocks_ptoc_cta_banner_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_cta_banner" ADD CONSTRAINT "text_editor_blocks_ptoc_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_cta_inline_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_cta_inline_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_cta_inline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_cta_inline" ADD CONSTRAINT "text_editor_blocks_ptoc_cta_inline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_cta_minimal_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_cta_minimal_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_cta_minimal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_cta_minimal" ADD CONSTRAINT "text_editor_blocks_ptoc_cta_minimal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_list_bullets_items" ADD CONSTRAINT "text_editor_blocks_ptoc_list_bullets_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor_blocks_ptoc_list_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_list_bullets_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_list_bullets_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_list_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_list_bullets" ADD CONSTRAINT "text_editor_blocks_ptoc_list_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_list_numbered_items" ADD CONSTRAINT "text_editor_blocks_ptoc_list_numbered_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor_blocks_ptoc_list_numbered"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_list_numbered_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_list_numbered_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_list_numbered"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_list_numbered" ADD CONSTRAINT "text_editor_blocks_ptoc_list_numbered_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_list_checklist_items" ADD CONSTRAINT "text_editor_blocks_ptoc_list_checklist_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor_blocks_ptoc_list_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_list_checklist_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_list_checklist_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_list_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_list_checklist" ADD CONSTRAINT "text_editor_blocks_ptoc_list_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_divider_line_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_divider_line_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_divider_line"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_divider_line" ADD CONSTRAINT "text_editor_blocks_ptoc_divider_line_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_divider_accent_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_divider_accent_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_divider_accent"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_divider_accent" ADD CONSTRAINT "text_editor_blocks_ptoc_divider_accent_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_divider_band_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_divider_band_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_divider_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_divider_band" ADD CONSTRAINT "text_editor_blocks_ptoc_divider_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_divider_space_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_divider_space_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_divider_space"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_divider_space" ADD CONSTRAINT "text_editor_blocks_ptoc_divider_space_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_author_row_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_author_row_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_author_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_author_row" ADD CONSTRAINT "text_editor_blocks_ptoc_author_row_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_author_row" ADD CONSTRAINT "text_editor_blocks_ptoc_author_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_author_card_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_author_card_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_author_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_author_card" ADD CONSTRAINT "text_editor_blocks_ptoc_author_card_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_author_card" ADD CONSTRAINT "text_editor_blocks_ptoc_author_card_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_author_card" ADD CONSTRAINT "text_editor_blocks_ptoc_author_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_rel_grid_items" ADD CONSTRAINT "text_editor_blocks_ptoc_rel_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_rel_grid_items" ADD CONSTRAINT "text_editor_blocks_ptoc_rel_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor_blocks_ptoc_rel_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_rel_grid_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_rel_grid_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_rel_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_rel_grid" ADD CONSTRAINT "text_editor_blocks_ptoc_rel_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_rel_list_items" ADD CONSTRAINT "text_editor_blocks_ptoc_rel_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_rel_list_items" ADD CONSTRAINT "text_editor_blocks_ptoc_rel_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor_blocks_ptoc_rel_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_rel_list_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_rel_list_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_rel_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_rel_list" ADD CONSTRAINT "text_editor_blocks_ptoc_rel_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_hero_image_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_hero_image_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_hero_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_hero_image" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_hero_image_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_hero_image" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_hero_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_hero_split_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_hero_split_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_hero_split"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_hero_split" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_hero_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_hero_split" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_hero_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_hero_split_left_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_hero_split_left_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_hero_split_left"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_hero_split_left" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_hero_split_left_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_hero_split_left" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_hero_split_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_hero_text_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_hero_text_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_hero_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_hero_text" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_hero_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_quote_simple_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_quote_simple_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_quote_simple"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_quote_simple" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_quote_simple_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_quote_pull_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_quote_pull_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_quote_pull"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_quote_pull" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_quote_pull_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_quote_pull" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_quote_pull_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_quote_box_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_quote_box_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_quote_box"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_quote_box" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_quote_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_image_full_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_image_full_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_image_full"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_image_full" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_image_full_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_image_full" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_image_full_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_image_two_up_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_image_two_up_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_image_two_up"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_image_two_up" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_image_two_up_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_image_two_up" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_image_two_up_image2_id_media_id_fk" FOREIGN KEY ("image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_image_two_up" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_image_two_up_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_image_text_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_image_text_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_image_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_image_text" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_image_text" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_text_image_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_text_image_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_text_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_text_image" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_text_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_text_image" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_header_large_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_header_large_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_header_large"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_header_large" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_header_large_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_header_medium_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_header_medium_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_header_medium"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_header_medium" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_header_medium_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_header_small_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_header_small_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_header_small"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_header_small" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_header_small_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_header_label_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_header_label_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_header_label"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_header_label" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_header_label_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_cta_banner_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_cta_banner_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_cta_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_cta_banner" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_cta_banner_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_cta_banner" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_cta_inline_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_cta_inline_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_cta_inline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_cta_inline" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_cta_inline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_cta_minimal_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_cta_minimal_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_cta_minimal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_cta_minimal" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_cta_minimal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_list_bullets_items" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_list_bullets_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_list_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_list_bullets_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_list_bullets_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_list_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_list_bullets" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_list_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_list_numbered_items" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_list_numbered_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_list_numbered"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_list_numbered_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_list_numbered_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_list_numbered"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_list_numbered" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_list_numbered_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_list_checklist_items" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_list_checklist_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_list_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_list_checklist_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_list_checklist_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_list_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_list_checklist" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_list_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_divider_line_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_divider_line_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_divider_line"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_divider_line" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_divider_line_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_divider_accent_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_divider_accent_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_divider_accent"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_divider_accent" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_divider_accent_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_divider_band_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_divider_band_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_divider_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_divider_band" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_divider_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_divider_space_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_divider_space_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_divider_space"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_divider_space" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_divider_space_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_author_row_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_author_row_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_author_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_author_row" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_author_row_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_author_row" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_author_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_author_card_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_author_card_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_author_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_author_card" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_author_card_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_author_card" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_author_card_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_author_card" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_author_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_rel_grid_items" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_rel_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_rel_grid_items" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_rel_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_rel_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_rel_grid_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_rel_grid_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_rel_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_rel_grid" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_rel_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_rel_list_items" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_rel_list_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_rel_list_items" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_rel_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_rel_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_rel_list_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_rel_list_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_rel_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_rel_list" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_rel_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "text_editor_blocks_ptoc_hero_image_hide_on_order_idx" ON "text_editor_blocks_ptoc_hero_image_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_hero_image_hide_on_parent_idx" ON "text_editor_blocks_ptoc_hero_image_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_hero_image_order_idx" ON "text_editor_blocks_ptoc_hero_image" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_hero_image_parent_id_idx" ON "text_editor_blocks_ptoc_hero_image" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_hero_image_path_idx" ON "text_editor_blocks_ptoc_hero_image" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_hero_image_bg_image_idx" ON "text_editor_blocks_ptoc_hero_image" USING btree ("bg_image_id");
  CREATE INDEX "text_editor_blocks_ptoc_hero_split_hide_on_order_idx" ON "text_editor_blocks_ptoc_hero_split_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_hero_split_hide_on_parent_idx" ON "text_editor_blocks_ptoc_hero_split_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_hero_split_order_idx" ON "text_editor_blocks_ptoc_hero_split" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_hero_split_parent_id_idx" ON "text_editor_blocks_ptoc_hero_split" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_hero_split_path_idx" ON "text_editor_blocks_ptoc_hero_split" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_hero_split_image_idx" ON "text_editor_blocks_ptoc_hero_split" USING btree ("image_id");
  CREATE INDEX "text_editor_blocks_ptoc_hero_split_left_hide_on_order_idx" ON "text_editor_blocks_ptoc_hero_split_left_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_hero_split_left_hide_on_parent_idx" ON "text_editor_blocks_ptoc_hero_split_left_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_hero_split_left_order_idx" ON "text_editor_blocks_ptoc_hero_split_left" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_hero_split_left_parent_id_idx" ON "text_editor_blocks_ptoc_hero_split_left" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_hero_split_left_path_idx" ON "text_editor_blocks_ptoc_hero_split_left" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_hero_split_left_image_idx" ON "text_editor_blocks_ptoc_hero_split_left" USING btree ("image_id");
  CREATE INDEX "text_editor_blocks_ptoc_hero_text_hide_on_order_idx" ON "text_editor_blocks_ptoc_hero_text_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_hero_text_hide_on_parent_idx" ON "text_editor_blocks_ptoc_hero_text_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_hero_text_order_idx" ON "text_editor_blocks_ptoc_hero_text" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_hero_text_parent_id_idx" ON "text_editor_blocks_ptoc_hero_text" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_hero_text_path_idx" ON "text_editor_blocks_ptoc_hero_text" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_quote_simple_hide_on_order_idx" ON "text_editor_blocks_ptoc_quote_simple_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_quote_simple_hide_on_parent_idx" ON "text_editor_blocks_ptoc_quote_simple_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_quote_simple_order_idx" ON "text_editor_blocks_ptoc_quote_simple" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_quote_simple_parent_id_idx" ON "text_editor_blocks_ptoc_quote_simple" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_quote_simple_path_idx" ON "text_editor_blocks_ptoc_quote_simple" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_quote_pull_hide_on_order_idx" ON "text_editor_blocks_ptoc_quote_pull_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_quote_pull_hide_on_parent_idx" ON "text_editor_blocks_ptoc_quote_pull_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_quote_pull_order_idx" ON "text_editor_blocks_ptoc_quote_pull" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_quote_pull_parent_id_idx" ON "text_editor_blocks_ptoc_quote_pull" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_quote_pull_path_idx" ON "text_editor_blocks_ptoc_quote_pull" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_quote_pull_bg_image_idx" ON "text_editor_blocks_ptoc_quote_pull" USING btree ("bg_image_id");
  CREATE INDEX "text_editor_blocks_ptoc_quote_box_hide_on_order_idx" ON "text_editor_blocks_ptoc_quote_box_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_quote_box_hide_on_parent_idx" ON "text_editor_blocks_ptoc_quote_box_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_quote_box_order_idx" ON "text_editor_blocks_ptoc_quote_box" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_quote_box_parent_id_idx" ON "text_editor_blocks_ptoc_quote_box" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_quote_box_path_idx" ON "text_editor_blocks_ptoc_quote_box" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_image_full_hide_on_order_idx" ON "text_editor_blocks_ptoc_image_full_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_image_full_hide_on_parent_idx" ON "text_editor_blocks_ptoc_image_full_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_image_full_order_idx" ON "text_editor_blocks_ptoc_image_full" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_image_full_parent_id_idx" ON "text_editor_blocks_ptoc_image_full" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_image_full_path_idx" ON "text_editor_blocks_ptoc_image_full" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_image_full_image_idx" ON "text_editor_blocks_ptoc_image_full" USING btree ("image_id");
  CREATE INDEX "text_editor_blocks_ptoc_image_two_up_hide_on_order_idx" ON "text_editor_blocks_ptoc_image_two_up_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_image_two_up_hide_on_parent_idx" ON "text_editor_blocks_ptoc_image_two_up_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_image_two_up_order_idx" ON "text_editor_blocks_ptoc_image_two_up" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_image_two_up_parent_id_idx" ON "text_editor_blocks_ptoc_image_two_up" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_image_two_up_path_idx" ON "text_editor_blocks_ptoc_image_two_up" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_image_two_up_image_idx" ON "text_editor_blocks_ptoc_image_two_up" USING btree ("image_id");
  CREATE INDEX "text_editor_blocks_ptoc_image_two_up_image2_idx" ON "text_editor_blocks_ptoc_image_two_up" USING btree ("image2_id");
  CREATE INDEX "text_editor_blocks_ptoc_image_text_hide_on_order_idx" ON "text_editor_blocks_ptoc_image_text_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_image_text_hide_on_parent_idx" ON "text_editor_blocks_ptoc_image_text_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_image_text_order_idx" ON "text_editor_blocks_ptoc_image_text" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_image_text_parent_id_idx" ON "text_editor_blocks_ptoc_image_text" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_image_text_path_idx" ON "text_editor_blocks_ptoc_image_text" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_image_text_image_idx" ON "text_editor_blocks_ptoc_image_text" USING btree ("image_id");
  CREATE INDEX "text_editor_blocks_ptoc_text_image_hide_on_order_idx" ON "text_editor_blocks_ptoc_text_image_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_text_image_hide_on_parent_idx" ON "text_editor_blocks_ptoc_text_image_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_text_image_order_idx" ON "text_editor_blocks_ptoc_text_image" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_text_image_parent_id_idx" ON "text_editor_blocks_ptoc_text_image" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_text_image_path_idx" ON "text_editor_blocks_ptoc_text_image" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_text_image_image_idx" ON "text_editor_blocks_ptoc_text_image" USING btree ("image_id");
  CREATE INDEX "text_editor_blocks_ptoc_header_large_hide_on_order_idx" ON "text_editor_blocks_ptoc_header_large_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_header_large_hide_on_parent_idx" ON "text_editor_blocks_ptoc_header_large_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_header_large_order_idx" ON "text_editor_blocks_ptoc_header_large" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_header_large_parent_id_idx" ON "text_editor_blocks_ptoc_header_large" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_header_large_path_idx" ON "text_editor_blocks_ptoc_header_large" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_header_medium_hide_on_order_idx" ON "text_editor_blocks_ptoc_header_medium_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_header_medium_hide_on_parent_idx" ON "text_editor_blocks_ptoc_header_medium_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_header_medium_order_idx" ON "text_editor_blocks_ptoc_header_medium" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_header_medium_parent_id_idx" ON "text_editor_blocks_ptoc_header_medium" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_header_medium_path_idx" ON "text_editor_blocks_ptoc_header_medium" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_header_small_hide_on_order_idx" ON "text_editor_blocks_ptoc_header_small_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_header_small_hide_on_parent_idx" ON "text_editor_blocks_ptoc_header_small_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_header_small_order_idx" ON "text_editor_blocks_ptoc_header_small" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_header_small_parent_id_idx" ON "text_editor_blocks_ptoc_header_small" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_header_small_path_idx" ON "text_editor_blocks_ptoc_header_small" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_header_label_hide_on_order_idx" ON "text_editor_blocks_ptoc_header_label_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_header_label_hide_on_parent_idx" ON "text_editor_blocks_ptoc_header_label_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_header_label_order_idx" ON "text_editor_blocks_ptoc_header_label" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_header_label_parent_id_idx" ON "text_editor_blocks_ptoc_header_label" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_header_label_path_idx" ON "text_editor_blocks_ptoc_header_label" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_cta_banner_hide_on_order_idx" ON "text_editor_blocks_ptoc_cta_banner_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_cta_banner_hide_on_parent_idx" ON "text_editor_blocks_ptoc_cta_banner_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_cta_banner_order_idx" ON "text_editor_blocks_ptoc_cta_banner" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_cta_banner_parent_id_idx" ON "text_editor_blocks_ptoc_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_cta_banner_path_idx" ON "text_editor_blocks_ptoc_cta_banner" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_cta_banner_bg_image_idx" ON "text_editor_blocks_ptoc_cta_banner" USING btree ("bg_image_id");
  CREATE INDEX "text_editor_blocks_ptoc_cta_inline_hide_on_order_idx" ON "text_editor_blocks_ptoc_cta_inline_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_cta_inline_hide_on_parent_idx" ON "text_editor_blocks_ptoc_cta_inline_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_cta_inline_order_idx" ON "text_editor_blocks_ptoc_cta_inline" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_cta_inline_parent_id_idx" ON "text_editor_blocks_ptoc_cta_inline" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_cta_inline_path_idx" ON "text_editor_blocks_ptoc_cta_inline" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_cta_minimal_hide_on_order_idx" ON "text_editor_blocks_ptoc_cta_minimal_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_cta_minimal_hide_on_parent_idx" ON "text_editor_blocks_ptoc_cta_minimal_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_cta_minimal_order_idx" ON "text_editor_blocks_ptoc_cta_minimal" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_cta_minimal_parent_id_idx" ON "text_editor_blocks_ptoc_cta_minimal" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_cta_minimal_path_idx" ON "text_editor_blocks_ptoc_cta_minimal" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_list_bullets_items_order_idx" ON "text_editor_blocks_ptoc_list_bullets_items" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_list_bullets_items_parent_id_idx" ON "text_editor_blocks_ptoc_list_bullets_items" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_list_bullets_hide_on_order_idx" ON "text_editor_blocks_ptoc_list_bullets_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_list_bullets_hide_on_parent_idx" ON "text_editor_blocks_ptoc_list_bullets_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_list_bullets_order_idx" ON "text_editor_blocks_ptoc_list_bullets" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_list_bullets_parent_id_idx" ON "text_editor_blocks_ptoc_list_bullets" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_list_bullets_path_idx" ON "text_editor_blocks_ptoc_list_bullets" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_list_numbered_items_order_idx" ON "text_editor_blocks_ptoc_list_numbered_items" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_list_numbered_items_parent_id_idx" ON "text_editor_blocks_ptoc_list_numbered_items" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_list_numbered_hide_on_order_idx" ON "text_editor_blocks_ptoc_list_numbered_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_list_numbered_hide_on_parent_idx" ON "text_editor_blocks_ptoc_list_numbered_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_list_numbered_order_idx" ON "text_editor_blocks_ptoc_list_numbered" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_list_numbered_parent_id_idx" ON "text_editor_blocks_ptoc_list_numbered" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_list_numbered_path_idx" ON "text_editor_blocks_ptoc_list_numbered" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_list_checklist_items_order_idx" ON "text_editor_blocks_ptoc_list_checklist_items" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_list_checklist_items_parent_id_idx" ON "text_editor_blocks_ptoc_list_checklist_items" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_list_checklist_hide_on_order_idx" ON "text_editor_blocks_ptoc_list_checklist_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_list_checklist_hide_on_parent_idx" ON "text_editor_blocks_ptoc_list_checklist_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_list_checklist_order_idx" ON "text_editor_blocks_ptoc_list_checklist" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_list_checklist_parent_id_idx" ON "text_editor_blocks_ptoc_list_checklist" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_list_checklist_path_idx" ON "text_editor_blocks_ptoc_list_checklist" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_divider_line_hide_on_order_idx" ON "text_editor_blocks_ptoc_divider_line_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_divider_line_hide_on_parent_idx" ON "text_editor_blocks_ptoc_divider_line_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_divider_line_order_idx" ON "text_editor_blocks_ptoc_divider_line" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_divider_line_parent_id_idx" ON "text_editor_blocks_ptoc_divider_line" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_divider_line_path_idx" ON "text_editor_blocks_ptoc_divider_line" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_divider_accent_hide_on_order_idx" ON "text_editor_blocks_ptoc_divider_accent_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_divider_accent_hide_on_parent_idx" ON "text_editor_blocks_ptoc_divider_accent_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_divider_accent_order_idx" ON "text_editor_blocks_ptoc_divider_accent" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_divider_accent_parent_id_idx" ON "text_editor_blocks_ptoc_divider_accent" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_divider_accent_path_idx" ON "text_editor_blocks_ptoc_divider_accent" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_divider_band_hide_on_order_idx" ON "text_editor_blocks_ptoc_divider_band_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_divider_band_hide_on_parent_idx" ON "text_editor_blocks_ptoc_divider_band_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_divider_band_order_idx" ON "text_editor_blocks_ptoc_divider_band" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_divider_band_parent_id_idx" ON "text_editor_blocks_ptoc_divider_band" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_divider_band_path_idx" ON "text_editor_blocks_ptoc_divider_band" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_divider_space_hide_on_order_idx" ON "text_editor_blocks_ptoc_divider_space_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_divider_space_hide_on_parent_idx" ON "text_editor_blocks_ptoc_divider_space_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_divider_space_order_idx" ON "text_editor_blocks_ptoc_divider_space" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_divider_space_parent_id_idx" ON "text_editor_blocks_ptoc_divider_space" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_divider_space_path_idx" ON "text_editor_blocks_ptoc_divider_space" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_author_row_hide_on_order_idx" ON "text_editor_blocks_ptoc_author_row_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_author_row_hide_on_parent_idx" ON "text_editor_blocks_ptoc_author_row_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_author_row_order_idx" ON "text_editor_blocks_ptoc_author_row" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_author_row_parent_id_idx" ON "text_editor_blocks_ptoc_author_row" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_author_row_path_idx" ON "text_editor_blocks_ptoc_author_row" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_author_row_avatar_idx" ON "text_editor_blocks_ptoc_author_row" USING btree ("avatar_id");
  CREATE INDEX "text_editor_blocks_ptoc_author_card_hide_on_order_idx" ON "text_editor_blocks_ptoc_author_card_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_author_card_hide_on_parent_idx" ON "text_editor_blocks_ptoc_author_card_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_author_card_order_idx" ON "text_editor_blocks_ptoc_author_card" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_author_card_parent_id_idx" ON "text_editor_blocks_ptoc_author_card" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_author_card_path_idx" ON "text_editor_blocks_ptoc_author_card" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_author_card_avatar_idx" ON "text_editor_blocks_ptoc_author_card" USING btree ("avatar_id");
  CREATE INDEX "text_editor_blocks_ptoc_author_card_bg_image_idx" ON "text_editor_blocks_ptoc_author_card" USING btree ("bg_image_id");
  CREATE INDEX "text_editor_blocks_ptoc_rel_grid_items_order_idx" ON "text_editor_blocks_ptoc_rel_grid_items" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_rel_grid_items_parent_id_idx" ON "text_editor_blocks_ptoc_rel_grid_items" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_rel_grid_items_image_idx" ON "text_editor_blocks_ptoc_rel_grid_items" USING btree ("image_id");
  CREATE INDEX "text_editor_blocks_ptoc_rel_grid_hide_on_order_idx" ON "text_editor_blocks_ptoc_rel_grid_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_rel_grid_hide_on_parent_idx" ON "text_editor_blocks_ptoc_rel_grid_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_rel_grid_order_idx" ON "text_editor_blocks_ptoc_rel_grid" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_rel_grid_parent_id_idx" ON "text_editor_blocks_ptoc_rel_grid" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_rel_grid_path_idx" ON "text_editor_blocks_ptoc_rel_grid" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_rel_list_items_order_idx" ON "text_editor_blocks_ptoc_rel_list_items" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_rel_list_items_parent_id_idx" ON "text_editor_blocks_ptoc_rel_list_items" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_rel_list_items_image_idx" ON "text_editor_blocks_ptoc_rel_list_items" USING btree ("image_id");
  CREATE INDEX "text_editor_blocks_ptoc_rel_list_hide_on_order_idx" ON "text_editor_blocks_ptoc_rel_list_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_rel_list_hide_on_parent_idx" ON "text_editor_blocks_ptoc_rel_list_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_rel_list_order_idx" ON "text_editor_blocks_ptoc_rel_list" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_rel_list_parent_id_idx" ON "text_editor_blocks_ptoc_rel_list" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_rel_list_path_idx" ON "text_editor_blocks_ptoc_rel_list" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_image_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_hero_image_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_image_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_hero_image_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_image_order_idx" ON "_text_editor_v_blocks_ptoc_hero_image" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_image_parent_id_idx" ON "_text_editor_v_blocks_ptoc_hero_image" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_image_path_idx" ON "_text_editor_v_blocks_ptoc_hero_image" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_image_bg_image_idx" ON "_text_editor_v_blocks_ptoc_hero_image" USING btree ("bg_image_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_split_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_hero_split_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_split_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_hero_split_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_split_order_idx" ON "_text_editor_v_blocks_ptoc_hero_split" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_split_parent_id_idx" ON "_text_editor_v_blocks_ptoc_hero_split" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_split_path_idx" ON "_text_editor_v_blocks_ptoc_hero_split" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_split_image_idx" ON "_text_editor_v_blocks_ptoc_hero_split" USING btree ("image_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_split_left_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_hero_split_left_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_split_left_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_hero_split_left_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_split_left_order_idx" ON "_text_editor_v_blocks_ptoc_hero_split_left" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_split_left_parent_id_idx" ON "_text_editor_v_blocks_ptoc_hero_split_left" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_split_left_path_idx" ON "_text_editor_v_blocks_ptoc_hero_split_left" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_split_left_image_idx" ON "_text_editor_v_blocks_ptoc_hero_split_left" USING btree ("image_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_text_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_hero_text_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_text_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_hero_text_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_text_order_idx" ON "_text_editor_v_blocks_ptoc_hero_text" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_text_parent_id_idx" ON "_text_editor_v_blocks_ptoc_hero_text" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_hero_text_path_idx" ON "_text_editor_v_blocks_ptoc_hero_text" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_quote_simple_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_quote_simple_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_quote_simple_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_quote_simple_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_quote_simple_order_idx" ON "_text_editor_v_blocks_ptoc_quote_simple" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_quote_simple_parent_id_idx" ON "_text_editor_v_blocks_ptoc_quote_simple" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_quote_simple_path_idx" ON "_text_editor_v_blocks_ptoc_quote_simple" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_quote_pull_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_quote_pull_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_quote_pull_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_quote_pull_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_quote_pull_order_idx" ON "_text_editor_v_blocks_ptoc_quote_pull" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_quote_pull_parent_id_idx" ON "_text_editor_v_blocks_ptoc_quote_pull" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_quote_pull_path_idx" ON "_text_editor_v_blocks_ptoc_quote_pull" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_quote_pull_bg_image_idx" ON "_text_editor_v_blocks_ptoc_quote_pull" USING btree ("bg_image_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_quote_box_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_quote_box_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_quote_box_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_quote_box_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_quote_box_order_idx" ON "_text_editor_v_blocks_ptoc_quote_box" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_quote_box_parent_id_idx" ON "_text_editor_v_blocks_ptoc_quote_box" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_quote_box_path_idx" ON "_text_editor_v_blocks_ptoc_quote_box" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_full_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_image_full_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_full_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_image_full_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_full_order_idx" ON "_text_editor_v_blocks_ptoc_image_full" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_full_parent_id_idx" ON "_text_editor_v_blocks_ptoc_image_full" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_full_path_idx" ON "_text_editor_v_blocks_ptoc_image_full" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_full_image_idx" ON "_text_editor_v_blocks_ptoc_image_full" USING btree ("image_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_two_up_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_image_two_up_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_two_up_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_image_two_up_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_two_up_order_idx" ON "_text_editor_v_blocks_ptoc_image_two_up" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_two_up_parent_id_idx" ON "_text_editor_v_blocks_ptoc_image_two_up" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_two_up_path_idx" ON "_text_editor_v_blocks_ptoc_image_two_up" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_two_up_image_idx" ON "_text_editor_v_blocks_ptoc_image_two_up" USING btree ("image_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_two_up_image2_idx" ON "_text_editor_v_blocks_ptoc_image_two_up" USING btree ("image2_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_text_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_image_text_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_text_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_image_text_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_text_order_idx" ON "_text_editor_v_blocks_ptoc_image_text" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_text_parent_id_idx" ON "_text_editor_v_blocks_ptoc_image_text" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_text_path_idx" ON "_text_editor_v_blocks_ptoc_image_text" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_image_text_image_idx" ON "_text_editor_v_blocks_ptoc_image_text" USING btree ("image_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_text_image_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_text_image_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_text_image_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_text_image_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_text_image_order_idx" ON "_text_editor_v_blocks_ptoc_text_image" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_text_image_parent_id_idx" ON "_text_editor_v_blocks_ptoc_text_image" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_text_image_path_idx" ON "_text_editor_v_blocks_ptoc_text_image" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_text_image_image_idx" ON "_text_editor_v_blocks_ptoc_text_image" USING btree ("image_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_large_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_header_large_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_large_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_header_large_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_large_order_idx" ON "_text_editor_v_blocks_ptoc_header_large" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_large_parent_id_idx" ON "_text_editor_v_blocks_ptoc_header_large" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_large_path_idx" ON "_text_editor_v_blocks_ptoc_header_large" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_medium_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_header_medium_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_medium_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_header_medium_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_medium_order_idx" ON "_text_editor_v_blocks_ptoc_header_medium" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_medium_parent_id_idx" ON "_text_editor_v_blocks_ptoc_header_medium" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_medium_path_idx" ON "_text_editor_v_blocks_ptoc_header_medium" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_small_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_header_small_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_small_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_header_small_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_small_order_idx" ON "_text_editor_v_blocks_ptoc_header_small" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_small_parent_id_idx" ON "_text_editor_v_blocks_ptoc_header_small" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_small_path_idx" ON "_text_editor_v_blocks_ptoc_header_small" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_label_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_header_label_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_label_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_header_label_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_label_order_idx" ON "_text_editor_v_blocks_ptoc_header_label" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_label_parent_id_idx" ON "_text_editor_v_blocks_ptoc_header_label" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_header_label_path_idx" ON "_text_editor_v_blocks_ptoc_header_label" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_cta_banner_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_cta_banner_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_cta_banner_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_cta_banner_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_cta_banner_order_idx" ON "_text_editor_v_blocks_ptoc_cta_banner" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_cta_banner_parent_id_idx" ON "_text_editor_v_blocks_ptoc_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_cta_banner_path_idx" ON "_text_editor_v_blocks_ptoc_cta_banner" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_cta_banner_bg_image_idx" ON "_text_editor_v_blocks_ptoc_cta_banner" USING btree ("bg_image_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_cta_inline_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_cta_inline_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_cta_inline_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_cta_inline_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_cta_inline_order_idx" ON "_text_editor_v_blocks_ptoc_cta_inline" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_cta_inline_parent_id_idx" ON "_text_editor_v_blocks_ptoc_cta_inline" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_cta_inline_path_idx" ON "_text_editor_v_blocks_ptoc_cta_inline" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_cta_minimal_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_cta_minimal_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_cta_minimal_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_cta_minimal_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_cta_minimal_order_idx" ON "_text_editor_v_blocks_ptoc_cta_minimal" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_cta_minimal_parent_id_idx" ON "_text_editor_v_blocks_ptoc_cta_minimal" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_cta_minimal_path_idx" ON "_text_editor_v_blocks_ptoc_cta_minimal" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_bullets_items_order_idx" ON "_text_editor_v_blocks_ptoc_list_bullets_items" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_bullets_items_parent_id_idx" ON "_text_editor_v_blocks_ptoc_list_bullets_items" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_bullets_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_list_bullets_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_bullets_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_list_bullets_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_bullets_order_idx" ON "_text_editor_v_blocks_ptoc_list_bullets" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_bullets_parent_id_idx" ON "_text_editor_v_blocks_ptoc_list_bullets" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_bullets_path_idx" ON "_text_editor_v_blocks_ptoc_list_bullets" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_numbered_items_order_idx" ON "_text_editor_v_blocks_ptoc_list_numbered_items" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_numbered_items_parent_id_idx" ON "_text_editor_v_blocks_ptoc_list_numbered_items" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_numbered_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_list_numbered_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_numbered_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_list_numbered_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_numbered_order_idx" ON "_text_editor_v_blocks_ptoc_list_numbered" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_numbered_parent_id_idx" ON "_text_editor_v_blocks_ptoc_list_numbered" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_numbered_path_idx" ON "_text_editor_v_blocks_ptoc_list_numbered" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_checklist_items_order_idx" ON "_text_editor_v_blocks_ptoc_list_checklist_items" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_checklist_items_parent_id_idx" ON "_text_editor_v_blocks_ptoc_list_checklist_items" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_checklist_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_list_checklist_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_checklist_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_list_checklist_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_checklist_order_idx" ON "_text_editor_v_blocks_ptoc_list_checklist" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_checklist_parent_id_idx" ON "_text_editor_v_blocks_ptoc_list_checklist" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_list_checklist_path_idx" ON "_text_editor_v_blocks_ptoc_list_checklist" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_line_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_divider_line_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_line_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_divider_line_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_line_order_idx" ON "_text_editor_v_blocks_ptoc_divider_line" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_line_parent_id_idx" ON "_text_editor_v_blocks_ptoc_divider_line" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_line_path_idx" ON "_text_editor_v_blocks_ptoc_divider_line" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_accent_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_divider_accent_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_accent_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_divider_accent_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_accent_order_idx" ON "_text_editor_v_blocks_ptoc_divider_accent" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_accent_parent_id_idx" ON "_text_editor_v_blocks_ptoc_divider_accent" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_accent_path_idx" ON "_text_editor_v_blocks_ptoc_divider_accent" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_band_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_divider_band_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_band_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_divider_band_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_band_order_idx" ON "_text_editor_v_blocks_ptoc_divider_band" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_band_parent_id_idx" ON "_text_editor_v_blocks_ptoc_divider_band" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_band_path_idx" ON "_text_editor_v_blocks_ptoc_divider_band" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_space_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_divider_space_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_space_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_divider_space_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_space_order_idx" ON "_text_editor_v_blocks_ptoc_divider_space" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_space_parent_id_idx" ON "_text_editor_v_blocks_ptoc_divider_space" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_divider_space_path_idx" ON "_text_editor_v_blocks_ptoc_divider_space" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_author_row_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_author_row_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_author_row_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_author_row_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_author_row_order_idx" ON "_text_editor_v_blocks_ptoc_author_row" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_author_row_parent_id_idx" ON "_text_editor_v_blocks_ptoc_author_row" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_author_row_path_idx" ON "_text_editor_v_blocks_ptoc_author_row" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_author_row_avatar_idx" ON "_text_editor_v_blocks_ptoc_author_row" USING btree ("avatar_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_author_card_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_author_card_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_author_card_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_author_card_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_author_card_order_idx" ON "_text_editor_v_blocks_ptoc_author_card" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_author_card_parent_id_idx" ON "_text_editor_v_blocks_ptoc_author_card" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_author_card_path_idx" ON "_text_editor_v_blocks_ptoc_author_card" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_author_card_avatar_idx" ON "_text_editor_v_blocks_ptoc_author_card" USING btree ("avatar_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_author_card_bg_image_idx" ON "_text_editor_v_blocks_ptoc_author_card" USING btree ("bg_image_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_rel_grid_items_order_idx" ON "_text_editor_v_blocks_ptoc_rel_grid_items" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_rel_grid_items_parent_id_idx" ON "_text_editor_v_blocks_ptoc_rel_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_rel_grid_items_image_idx" ON "_text_editor_v_blocks_ptoc_rel_grid_items" USING btree ("image_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_rel_grid_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_rel_grid_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_rel_grid_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_rel_grid_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_rel_grid_order_idx" ON "_text_editor_v_blocks_ptoc_rel_grid" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_rel_grid_parent_id_idx" ON "_text_editor_v_blocks_ptoc_rel_grid" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_rel_grid_path_idx" ON "_text_editor_v_blocks_ptoc_rel_grid" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_rel_list_items_order_idx" ON "_text_editor_v_blocks_ptoc_rel_list_items" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_rel_list_items_parent_id_idx" ON "_text_editor_v_blocks_ptoc_rel_list_items" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_rel_list_items_image_idx" ON "_text_editor_v_blocks_ptoc_rel_list_items" USING btree ("image_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_rel_list_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_rel_list_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_rel_list_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_rel_list_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_rel_list_order_idx" ON "_text_editor_v_blocks_ptoc_rel_list" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_rel_list_parent_id_idx" ON "_text_editor_v_blocks_ptoc_rel_list" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_rel_list_path_idx" ON "_text_editor_v_blocks_ptoc_rel_list" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "text_editor_blocks_ptoc_hero_image_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_hero_image" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_hero_split_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_hero_split" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_hero_split_left_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_hero_split_left" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_hero_text_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_hero_text" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_quote_simple_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_quote_simple" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_quote_pull_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_quote_pull" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_quote_box_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_quote_box" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_image_full_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_image_full" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_image_two_up_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_image_two_up" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_image_text_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_image_text" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_text_image_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_text_image" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_header_large_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_header_large" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_header_medium_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_header_medium" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_header_small_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_header_small" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_header_label_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_header_label" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_cta_banner_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_cta_banner" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_cta_inline_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_cta_inline" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_cta_minimal_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_cta_minimal" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_list_bullets_items" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_list_bullets_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_list_bullets" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_list_numbered_items" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_list_numbered_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_list_numbered" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_list_checklist_items" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_list_checklist_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_list_checklist" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_divider_line_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_divider_line" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_divider_accent_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_divider_accent" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_divider_band_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_divider_band" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_divider_space_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_divider_space" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_author_row_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_author_row" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_author_card_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_author_card" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_rel_grid_items" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_rel_grid_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_rel_grid" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_rel_list_items" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_rel_list_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_rel_list" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_hero_image_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_hero_image" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_hero_split_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_hero_split" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_hero_split_left_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_hero_split_left" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_hero_text_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_hero_text" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_quote_simple_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_quote_simple" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_quote_pull_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_quote_pull" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_quote_box_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_quote_box" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_image_full_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_image_full" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_image_two_up_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_image_two_up" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_image_text_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_image_text" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_text_image_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_text_image" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_header_large_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_header_large" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_header_medium_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_header_medium" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_header_small_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_header_small" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_header_label_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_header_label" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_cta_banner_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_cta_banner" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_cta_inline_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_cta_inline" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_cta_minimal_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_cta_minimal" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_list_bullets_items" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_list_bullets_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_list_bullets" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_list_numbered_items" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_list_numbered_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_list_numbered" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_list_checklist_items" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_list_checklist_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_list_checklist" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_divider_line_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_divider_line" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_divider_accent_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_divider_accent" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_divider_band_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_divider_band" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_divider_space_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_divider_space" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_author_row_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_author_row" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_author_card_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_author_card" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_rel_grid_items" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_rel_grid_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_rel_grid" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_rel_list_items" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_rel_list_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_rel_list" CASCADE;
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_hero_image_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_hero_split_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_hero_split_left_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_hero_text_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_quote_simple_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_quote_pull_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_quote_box_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_image_full_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_image_two_up_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_image_text_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_text_image_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_header_large_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_header_medium_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_header_small_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_header_label_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_cta_banner_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_cta_inline_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_cta_minimal_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_list_bullets_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_list_numbered_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_list_checklist_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_divider_line_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_divider_accent_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_divider_band_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_divider_space_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_author_row_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_author_card_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_rel_grid_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_rel_list_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_hero_image_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_hero_split_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_hero_split_left_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_hero_text_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_quote_simple_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_quote_pull_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_quote_box_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_image_full_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_image_two_up_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_image_text_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_text_image_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_header_large_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_header_medium_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_header_small_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_header_label_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_cta_banner_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_cta_inline_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_cta_minimal_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_list_bullets_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_list_numbered_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_list_checklist_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_divider_line_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_divider_accent_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_divider_band_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_divider_space_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_author_row_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_author_card_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_rel_grid_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_rel_list_hide_on";`)
}
