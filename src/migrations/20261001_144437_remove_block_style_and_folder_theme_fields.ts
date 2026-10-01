import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" DROP COLUMN "background";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "padding_y";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "background";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "padding_y";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "background";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "padding_y";
  ALTER TABLE "pages_blocks_faq_tny" DROP COLUMN "background";
  ALTER TABLE "pages_blocks_faq_tny" DROP COLUMN "padding_y";
  ALTER TABLE "pages_blocks_entity_list" DROP COLUMN "background";
  ALTER TABLE "pages_blocks_entity_list" DROP COLUMN "padding_y";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "padding_y";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "padding_y";
  ALTER TABLE "_pages_v_blocks_faq" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_faq" DROP COLUMN "padding_y";
  ALTER TABLE "_pages_v_blocks_faq_tny" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_faq_tny" DROP COLUMN "padding_y";
  ALTER TABLE "_pages_v_blocks_entity_list" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_entity_list" DROP COLUMN "padding_y";
  ALTER TABLE "folders" DROP COLUMN "theme_typography_font_family";
  ALTER TABLE "folders" DROP COLUMN "theme_palette_surface";
  ALTER TABLE "folders" DROP COLUMN "theme_palette_muted";
  ALTER TABLE "folders" DROP COLUMN "theme_palette_brand";
  ALTER TABLE "folders" DROP COLUMN "theme_palette_on_brand";
  ALTER TABLE "folders" DROP COLUMN "theme_palette_inverse";
  ALTER TABLE "folders" DROP COLUMN "theme_palette_on_inverse";
  ALTER TABLE "folders" DROP COLUMN "theme_palette_border";
  ALTER TABLE "folders" DROP COLUMN "theme_palette_text";
  ALTER TABLE "folders" DROP COLUMN "theme_theme_j_s_o_n";
  DROP TYPE "public"."enum_pages_blocks_hero_background";
  DROP TYPE "public"."enum_pages_blocks_hero_padding_y";
  DROP TYPE "public"."enum_pages_blocks_content_background";
  DROP TYPE "public"."enum_pages_blocks_content_padding_y";
  DROP TYPE "public"."enum_pages_blocks_faq_background";
  DROP TYPE "public"."enum_pages_blocks_faq_padding_y";
  DROP TYPE "public"."enum_pages_blocks_faq_tny_background";
  DROP TYPE "public"."enum_pages_blocks_faq_tny_padding_y";
  DROP TYPE "public"."enum_pages_blocks_entity_list_background";
  DROP TYPE "public"."enum_pages_blocks_entity_list_padding_y";
  DROP TYPE "public"."enum__pages_v_blocks_hero_background";
  DROP TYPE "public"."enum__pages_v_blocks_hero_padding_y";
  DROP TYPE "public"."enum__pages_v_blocks_content_background";
  DROP TYPE "public"."enum__pages_v_blocks_content_padding_y";
  DROP TYPE "public"."enum__pages_v_blocks_faq_background";
  DROP TYPE "public"."enum__pages_v_blocks_faq_padding_y";
  DROP TYPE "public"."enum__pages_v_blocks_faq_tny_background";
  DROP TYPE "public"."enum__pages_v_blocks_faq_tny_padding_y";
  DROP TYPE "public"."enum__pages_v_blocks_entity_list_background";
  DROP TYPE "public"."enum__pages_v_blocks_entity_list_padding_y";
  DROP TYPE "public"."enum_folders_theme_typography_font_family";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_background" AS ENUM('none', 'surface', 'muted', 'brand', 'inverse');
  CREATE TYPE "public"."enum_pages_blocks_hero_padding_y" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_content_background" AS ENUM('none', 'surface', 'muted', 'brand', 'inverse');
  CREATE TYPE "public"."enum_pages_blocks_content_padding_y" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_faq_background" AS ENUM('none', 'surface', 'muted', 'brand', 'inverse');
  CREATE TYPE "public"."enum_pages_blocks_faq_padding_y" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_faq_tny_background" AS ENUM('none', 'surface', 'muted', 'brand', 'inverse');
  CREATE TYPE "public"."enum_pages_blocks_faq_tny_padding_y" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_entity_list_background" AS ENUM('none', 'surface', 'muted', 'brand', 'inverse');
  CREATE TYPE "public"."enum_pages_blocks_entity_list_padding_y" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_background" AS ENUM('none', 'surface', 'muted', 'brand', 'inverse');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_padding_y" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_content_background" AS ENUM('none', 'surface', 'muted', 'brand', 'inverse');
  CREATE TYPE "public"."enum__pages_v_blocks_content_padding_y" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_background" AS ENUM('none', 'surface', 'muted', 'brand', 'inverse');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_padding_y" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_tny_background" AS ENUM('none', 'surface', 'muted', 'brand', 'inverse');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_tny_padding_y" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_entity_list_background" AS ENUM('none', 'surface', 'muted', 'brand', 'inverse');
  CREATE TYPE "public"."enum__pages_v_blocks_entity_list_padding_y" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_folders_theme_typography_font_family" AS ENUM('system-ui', 'Inter', 'Merriweather', 'Poppins', 'Lora');
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "background" "enum_pages_blocks_hero_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "padding_y" "enum_pages_blocks_hero_padding_y" DEFAULT 'md';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "background" "enum_pages_blocks_content_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "padding_y" "enum_pages_blocks_content_padding_y" DEFAULT 'md';
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "background" "enum_pages_blocks_faq_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "padding_y" "enum_pages_blocks_faq_padding_y" DEFAULT 'md';
  ALTER TABLE "pages_blocks_faq_tny" ADD COLUMN "background" "enum_pages_blocks_faq_tny_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_faq_tny" ADD COLUMN "padding_y" "enum_pages_blocks_faq_tny_padding_y" DEFAULT 'md';
  ALTER TABLE "pages_blocks_entity_list" ADD COLUMN "background" "enum_pages_blocks_entity_list_background" DEFAULT 'none';
  ALTER TABLE "pages_blocks_entity_list" ADD COLUMN "padding_y" "enum_pages_blocks_entity_list_padding_y" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "background" "enum__pages_v_blocks_hero_background" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "padding_y" "enum__pages_v_blocks_hero_padding_y" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "background" "enum__pages_v_blocks_content_background" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "padding_y" "enum__pages_v_blocks_content_padding_y" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_faq" ADD COLUMN "background" "enum__pages_v_blocks_faq_background" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_faq" ADD COLUMN "padding_y" "enum__pages_v_blocks_faq_padding_y" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_faq_tny" ADD COLUMN "background" "enum__pages_v_blocks_faq_tny_background" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_faq_tny" ADD COLUMN "padding_y" "enum__pages_v_blocks_faq_tny_padding_y" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_entity_list" ADD COLUMN "background" "enum__pages_v_blocks_entity_list_background" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_entity_list" ADD COLUMN "padding_y" "enum__pages_v_blocks_entity_list_padding_y" DEFAULT 'md';
  ALTER TABLE "folders" ADD COLUMN "theme_typography_font_family" "enum_folders_theme_typography_font_family" DEFAULT 'system-ui';
  ALTER TABLE "folders" ADD COLUMN "theme_palette_surface" varchar;
  ALTER TABLE "folders" ADD COLUMN "theme_palette_muted" varchar;
  ALTER TABLE "folders" ADD COLUMN "theme_palette_brand" varchar;
  ALTER TABLE "folders" ADD COLUMN "theme_palette_on_brand" varchar;
  ALTER TABLE "folders" ADD COLUMN "theme_palette_inverse" varchar;
  ALTER TABLE "folders" ADD COLUMN "theme_palette_on_inverse" varchar;
  ALTER TABLE "folders" ADD COLUMN "theme_palette_border" varchar;
  ALTER TABLE "folders" ADD COLUMN "theme_palette_text" varchar;
  ALTER TABLE "folders" ADD COLUMN "theme_theme_j_s_o_n" jsonb;`)
}
