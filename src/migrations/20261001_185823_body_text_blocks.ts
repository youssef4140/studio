import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_text_editor_blocks_ptoc_body_single_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_body_lead_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_body_two_col_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_body_callout_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_body_sidebar_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_ptoc_body_drop_cap_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_tny_body_single_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_tny_body_lead_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_tny_body_two_col_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_tny_body_callout_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_tny_body_sidebar_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_text_editor_blocks_tny_body_drop_cap_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_body_single_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_body_lead_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_body_two_col_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_body_callout_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_body_sidebar_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_ptoc_body_drop_cap_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_tny_body_single_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_tny_body_lead_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_tny_body_two_col_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_tny_body_callout_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_tny_body_sidebar_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_tny_body_drop_cap_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TABLE "text_editor_blocks_ptoc_body_single_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_body_single_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_body_single" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_body_lead_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_body_lead_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_body_lead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lead" jsonb,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_body_two_col_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_body_two_col_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_body_two_col" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"body2" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_body_callout_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_body_callout_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_body_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"callout_label" varchar,
  	"callout" jsonb,
  	"body_after" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_body_sidebar_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_body_sidebar_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_body_sidebar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"side_label" varchar,
  	"side" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_body_drop_cap_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_ptoc_body_drop_cap_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_ptoc_body_drop_cap" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_tny_body_single_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_tny_body_single_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_tny_body_single" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_tny_body_lead_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_tny_body_lead_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_tny_body_lead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lead" jsonb,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_tny_body_two_col_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_tny_body_two_col_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_tny_body_two_col" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"body2" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_tny_body_callout_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_tny_body_callout_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_tny_body_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"callout_label" varchar,
  	"callout" jsonb,
  	"body_after" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_tny_body_sidebar_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_tny_body_sidebar_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_tny_body_sidebar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"side_label" varchar,
  	"side" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "text_editor_blocks_tny_body_drop_cap_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_tny_body_drop_cap_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_tny_body_drop_cap" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_body_single_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_body_single_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_body_single" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_body_lead_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_body_lead_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_body_lead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"lead" jsonb,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_body_two_col_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_body_two_col_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_body_two_col" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"body2" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_body_callout_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_body_callout_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_body_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"callout_label" varchar,
  	"callout" jsonb,
  	"body_after" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_body_sidebar_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_body_sidebar_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_body_sidebar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"side_label" varchar,
  	"side" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_body_drop_cap_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_ptoc_body_drop_cap_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_ptoc_body_drop_cap" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_tny_body_single_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_tny_body_single_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_tny_body_single" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_tny_body_lead_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_tny_body_lead_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_tny_body_lead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"lead" jsonb,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_tny_body_two_col_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_tny_body_two_col_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_tny_body_two_col" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"body2" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_tny_body_callout_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_tny_body_callout_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_tny_body_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"callout_label" varchar,
  	"callout" jsonb,
  	"body_after" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_tny_body_sidebar_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_tny_body_sidebar_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_tny_body_sidebar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"side_label" varchar,
  	"side" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_tny_body_drop_cap_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_tny_body_drop_cap_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_tny_body_drop_cap" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "text_editor_blocks_ptoc_body_single_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_body_single_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_body_single"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_body_single" ADD CONSTRAINT "text_editor_blocks_ptoc_body_single_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_body_lead_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_body_lead_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_body_lead"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_body_lead" ADD CONSTRAINT "text_editor_blocks_ptoc_body_lead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_body_two_col_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_body_two_col_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_body_two_col"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_body_two_col" ADD CONSTRAINT "text_editor_blocks_ptoc_body_two_col_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_body_callout_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_body_callout_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_body_callout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_body_callout" ADD CONSTRAINT "text_editor_blocks_ptoc_body_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_body_sidebar_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_body_sidebar_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_body_sidebar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_body_sidebar" ADD CONSTRAINT "text_editor_blocks_ptoc_body_sidebar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_body_drop_cap_hide_on" ADD CONSTRAINT "text_editor_blocks_ptoc_body_drop_cap_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_ptoc_body_drop_cap"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_ptoc_body_drop_cap" ADD CONSTRAINT "text_editor_blocks_ptoc_body_drop_cap_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_tny_body_single_hide_on" ADD CONSTRAINT "text_editor_blocks_tny_body_single_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_tny_body_single"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_tny_body_single" ADD CONSTRAINT "text_editor_blocks_tny_body_single_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_tny_body_lead_hide_on" ADD CONSTRAINT "text_editor_blocks_tny_body_lead_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_tny_body_lead"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_tny_body_lead" ADD CONSTRAINT "text_editor_blocks_tny_body_lead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_tny_body_two_col_hide_on" ADD CONSTRAINT "text_editor_blocks_tny_body_two_col_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_tny_body_two_col"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_tny_body_two_col" ADD CONSTRAINT "text_editor_blocks_tny_body_two_col_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_tny_body_callout_hide_on" ADD CONSTRAINT "text_editor_blocks_tny_body_callout_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_tny_body_callout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_tny_body_callout" ADD CONSTRAINT "text_editor_blocks_tny_body_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_tny_body_sidebar_hide_on" ADD CONSTRAINT "text_editor_blocks_tny_body_sidebar_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_tny_body_sidebar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_tny_body_sidebar" ADD CONSTRAINT "text_editor_blocks_tny_body_sidebar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_tny_body_drop_cap_hide_on" ADD CONSTRAINT "text_editor_blocks_tny_body_drop_cap_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_tny_body_drop_cap"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_tny_body_drop_cap" ADD CONSTRAINT "text_editor_blocks_tny_body_drop_cap_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_body_single_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_body_single_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_body_single"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_body_single" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_body_single_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_body_lead_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_body_lead_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_body_lead"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_body_lead" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_body_lead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_body_two_col_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_body_two_col_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_body_two_col"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_body_two_col" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_body_two_col_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_body_callout_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_body_callout_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_body_callout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_body_callout" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_body_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_body_sidebar_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_body_sidebar_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_body_sidebar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_body_sidebar" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_body_sidebar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_body_drop_cap_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_body_drop_cap_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_ptoc_body_drop_cap"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_ptoc_body_drop_cap" ADD CONSTRAINT "_text_editor_v_blocks_ptoc_body_drop_cap_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_tny_body_single_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_tny_body_single_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_tny_body_single"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_tny_body_single" ADD CONSTRAINT "_text_editor_v_blocks_tny_body_single_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_tny_body_lead_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_tny_body_lead_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_tny_body_lead"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_tny_body_lead" ADD CONSTRAINT "_text_editor_v_blocks_tny_body_lead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_tny_body_two_col_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_tny_body_two_col_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_tny_body_two_col"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_tny_body_two_col" ADD CONSTRAINT "_text_editor_v_blocks_tny_body_two_col_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_tny_body_callout_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_tny_body_callout_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_tny_body_callout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_tny_body_callout" ADD CONSTRAINT "_text_editor_v_blocks_tny_body_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_tny_body_sidebar_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_tny_body_sidebar_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_tny_body_sidebar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_tny_body_sidebar" ADD CONSTRAINT "_text_editor_v_blocks_tny_body_sidebar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_tny_body_drop_cap_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_tny_body_drop_cap_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_tny_body_drop_cap"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_tny_body_drop_cap" ADD CONSTRAINT "_text_editor_v_blocks_tny_body_drop_cap_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "text_editor_blocks_ptoc_body_single_hide_on_order_idx" ON "text_editor_blocks_ptoc_body_single_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_body_single_hide_on_parent_idx" ON "text_editor_blocks_ptoc_body_single_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_body_single_order_idx" ON "text_editor_blocks_ptoc_body_single" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_body_single_parent_id_idx" ON "text_editor_blocks_ptoc_body_single" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_body_single_path_idx" ON "text_editor_blocks_ptoc_body_single" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_body_lead_hide_on_order_idx" ON "text_editor_blocks_ptoc_body_lead_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_body_lead_hide_on_parent_idx" ON "text_editor_blocks_ptoc_body_lead_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_body_lead_order_idx" ON "text_editor_blocks_ptoc_body_lead" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_body_lead_parent_id_idx" ON "text_editor_blocks_ptoc_body_lead" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_body_lead_path_idx" ON "text_editor_blocks_ptoc_body_lead" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_body_two_col_hide_on_order_idx" ON "text_editor_blocks_ptoc_body_two_col_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_body_two_col_hide_on_parent_idx" ON "text_editor_blocks_ptoc_body_two_col_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_body_two_col_order_idx" ON "text_editor_blocks_ptoc_body_two_col" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_body_two_col_parent_id_idx" ON "text_editor_blocks_ptoc_body_two_col" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_body_two_col_path_idx" ON "text_editor_blocks_ptoc_body_two_col" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_body_callout_hide_on_order_idx" ON "text_editor_blocks_ptoc_body_callout_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_body_callout_hide_on_parent_idx" ON "text_editor_blocks_ptoc_body_callout_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_body_callout_order_idx" ON "text_editor_blocks_ptoc_body_callout" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_body_callout_parent_id_idx" ON "text_editor_blocks_ptoc_body_callout" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_body_callout_path_idx" ON "text_editor_blocks_ptoc_body_callout" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_body_sidebar_hide_on_order_idx" ON "text_editor_blocks_ptoc_body_sidebar_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_body_sidebar_hide_on_parent_idx" ON "text_editor_blocks_ptoc_body_sidebar_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_body_sidebar_order_idx" ON "text_editor_blocks_ptoc_body_sidebar" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_body_sidebar_parent_id_idx" ON "text_editor_blocks_ptoc_body_sidebar" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_body_sidebar_path_idx" ON "text_editor_blocks_ptoc_body_sidebar" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_ptoc_body_drop_cap_hide_on_order_idx" ON "text_editor_blocks_ptoc_body_drop_cap_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_ptoc_body_drop_cap_hide_on_parent_idx" ON "text_editor_blocks_ptoc_body_drop_cap_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_body_drop_cap_order_idx" ON "text_editor_blocks_ptoc_body_drop_cap" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_ptoc_body_drop_cap_parent_id_idx" ON "text_editor_blocks_ptoc_body_drop_cap" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_ptoc_body_drop_cap_path_idx" ON "text_editor_blocks_ptoc_body_drop_cap" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_tny_body_single_hide_on_order_idx" ON "text_editor_blocks_tny_body_single_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_tny_body_single_hide_on_parent_idx" ON "text_editor_blocks_tny_body_single_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_tny_body_single_order_idx" ON "text_editor_blocks_tny_body_single" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_tny_body_single_parent_id_idx" ON "text_editor_blocks_tny_body_single" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_tny_body_single_path_idx" ON "text_editor_blocks_tny_body_single" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_tny_body_lead_hide_on_order_idx" ON "text_editor_blocks_tny_body_lead_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_tny_body_lead_hide_on_parent_idx" ON "text_editor_blocks_tny_body_lead_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_tny_body_lead_order_idx" ON "text_editor_blocks_tny_body_lead" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_tny_body_lead_parent_id_idx" ON "text_editor_blocks_tny_body_lead" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_tny_body_lead_path_idx" ON "text_editor_blocks_tny_body_lead" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_tny_body_two_col_hide_on_order_idx" ON "text_editor_blocks_tny_body_two_col_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_tny_body_two_col_hide_on_parent_idx" ON "text_editor_blocks_tny_body_two_col_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_tny_body_two_col_order_idx" ON "text_editor_blocks_tny_body_two_col" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_tny_body_two_col_parent_id_idx" ON "text_editor_blocks_tny_body_two_col" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_tny_body_two_col_path_idx" ON "text_editor_blocks_tny_body_two_col" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_tny_body_callout_hide_on_order_idx" ON "text_editor_blocks_tny_body_callout_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_tny_body_callout_hide_on_parent_idx" ON "text_editor_blocks_tny_body_callout_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_tny_body_callout_order_idx" ON "text_editor_blocks_tny_body_callout" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_tny_body_callout_parent_id_idx" ON "text_editor_blocks_tny_body_callout" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_tny_body_callout_path_idx" ON "text_editor_blocks_tny_body_callout" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_tny_body_sidebar_hide_on_order_idx" ON "text_editor_blocks_tny_body_sidebar_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_tny_body_sidebar_hide_on_parent_idx" ON "text_editor_blocks_tny_body_sidebar_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_tny_body_sidebar_order_idx" ON "text_editor_blocks_tny_body_sidebar" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_tny_body_sidebar_parent_id_idx" ON "text_editor_blocks_tny_body_sidebar" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_tny_body_sidebar_path_idx" ON "text_editor_blocks_tny_body_sidebar" USING btree ("_path");
  CREATE INDEX "text_editor_blocks_tny_body_drop_cap_hide_on_order_idx" ON "text_editor_blocks_tny_body_drop_cap_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_tny_body_drop_cap_hide_on_parent_idx" ON "text_editor_blocks_tny_body_drop_cap_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_tny_body_drop_cap_order_idx" ON "text_editor_blocks_tny_body_drop_cap" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_tny_body_drop_cap_parent_id_idx" ON "text_editor_blocks_tny_body_drop_cap" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_tny_body_drop_cap_path_idx" ON "text_editor_blocks_tny_body_drop_cap" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_single_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_body_single_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_single_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_body_single_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_single_order_idx" ON "_text_editor_v_blocks_ptoc_body_single" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_single_parent_id_idx" ON "_text_editor_v_blocks_ptoc_body_single" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_single_path_idx" ON "_text_editor_v_blocks_ptoc_body_single" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_lead_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_body_lead_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_lead_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_body_lead_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_lead_order_idx" ON "_text_editor_v_blocks_ptoc_body_lead" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_lead_parent_id_idx" ON "_text_editor_v_blocks_ptoc_body_lead" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_lead_path_idx" ON "_text_editor_v_blocks_ptoc_body_lead" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_two_col_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_body_two_col_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_two_col_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_body_two_col_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_two_col_order_idx" ON "_text_editor_v_blocks_ptoc_body_two_col" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_two_col_parent_id_idx" ON "_text_editor_v_blocks_ptoc_body_two_col" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_two_col_path_idx" ON "_text_editor_v_blocks_ptoc_body_two_col" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_callout_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_body_callout_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_callout_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_body_callout_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_callout_order_idx" ON "_text_editor_v_blocks_ptoc_body_callout" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_callout_parent_id_idx" ON "_text_editor_v_blocks_ptoc_body_callout" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_callout_path_idx" ON "_text_editor_v_blocks_ptoc_body_callout" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_sidebar_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_body_sidebar_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_sidebar_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_body_sidebar_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_sidebar_order_idx" ON "_text_editor_v_blocks_ptoc_body_sidebar" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_sidebar_parent_id_idx" ON "_text_editor_v_blocks_ptoc_body_sidebar" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_sidebar_path_idx" ON "_text_editor_v_blocks_ptoc_body_sidebar" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_drop_cap_hide_on_order_idx" ON "_text_editor_v_blocks_ptoc_body_drop_cap_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_drop_cap_hide_on_parent_idx" ON "_text_editor_v_blocks_ptoc_body_drop_cap_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_drop_cap_order_idx" ON "_text_editor_v_blocks_ptoc_body_drop_cap" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_drop_cap_parent_id_idx" ON "_text_editor_v_blocks_ptoc_body_drop_cap" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_ptoc_body_drop_cap_path_idx" ON "_text_editor_v_blocks_ptoc_body_drop_cap" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_tny_body_single_hide_on_order_idx" ON "_text_editor_v_blocks_tny_body_single_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_tny_body_single_hide_on_parent_idx" ON "_text_editor_v_blocks_tny_body_single_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_tny_body_single_order_idx" ON "_text_editor_v_blocks_tny_body_single" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_tny_body_single_parent_id_idx" ON "_text_editor_v_blocks_tny_body_single" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_tny_body_single_path_idx" ON "_text_editor_v_blocks_tny_body_single" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_tny_body_lead_hide_on_order_idx" ON "_text_editor_v_blocks_tny_body_lead_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_tny_body_lead_hide_on_parent_idx" ON "_text_editor_v_blocks_tny_body_lead_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_tny_body_lead_order_idx" ON "_text_editor_v_blocks_tny_body_lead" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_tny_body_lead_parent_id_idx" ON "_text_editor_v_blocks_tny_body_lead" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_tny_body_lead_path_idx" ON "_text_editor_v_blocks_tny_body_lead" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_tny_body_two_col_hide_on_order_idx" ON "_text_editor_v_blocks_tny_body_two_col_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_tny_body_two_col_hide_on_parent_idx" ON "_text_editor_v_blocks_tny_body_two_col_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_tny_body_two_col_order_idx" ON "_text_editor_v_blocks_tny_body_two_col" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_tny_body_two_col_parent_id_idx" ON "_text_editor_v_blocks_tny_body_two_col" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_tny_body_two_col_path_idx" ON "_text_editor_v_blocks_tny_body_two_col" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_tny_body_callout_hide_on_order_idx" ON "_text_editor_v_blocks_tny_body_callout_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_tny_body_callout_hide_on_parent_idx" ON "_text_editor_v_blocks_tny_body_callout_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_tny_body_callout_order_idx" ON "_text_editor_v_blocks_tny_body_callout" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_tny_body_callout_parent_id_idx" ON "_text_editor_v_blocks_tny_body_callout" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_tny_body_callout_path_idx" ON "_text_editor_v_blocks_tny_body_callout" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_tny_body_sidebar_hide_on_order_idx" ON "_text_editor_v_blocks_tny_body_sidebar_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_tny_body_sidebar_hide_on_parent_idx" ON "_text_editor_v_blocks_tny_body_sidebar_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_tny_body_sidebar_order_idx" ON "_text_editor_v_blocks_tny_body_sidebar" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_tny_body_sidebar_parent_id_idx" ON "_text_editor_v_blocks_tny_body_sidebar" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_tny_body_sidebar_path_idx" ON "_text_editor_v_blocks_tny_body_sidebar" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_tny_body_drop_cap_hide_on_order_idx" ON "_text_editor_v_blocks_tny_body_drop_cap_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_tny_body_drop_cap_hide_on_parent_idx" ON "_text_editor_v_blocks_tny_body_drop_cap_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_tny_body_drop_cap_order_idx" ON "_text_editor_v_blocks_tny_body_drop_cap" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_tny_body_drop_cap_parent_id_idx" ON "_text_editor_v_blocks_tny_body_drop_cap" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_tny_body_drop_cap_path_idx" ON "_text_editor_v_blocks_tny_body_drop_cap" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "text_editor_blocks_ptoc_body_single_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_body_single" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_body_lead_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_body_lead" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_body_two_col_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_body_two_col" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_body_callout_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_body_callout" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_body_sidebar_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_body_sidebar" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_body_drop_cap_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_ptoc_body_drop_cap" CASCADE;
  DROP TABLE "text_editor_blocks_tny_body_single_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_tny_body_single" CASCADE;
  DROP TABLE "text_editor_blocks_tny_body_lead_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_tny_body_lead" CASCADE;
  DROP TABLE "text_editor_blocks_tny_body_two_col_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_tny_body_two_col" CASCADE;
  DROP TABLE "text_editor_blocks_tny_body_callout_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_tny_body_callout" CASCADE;
  DROP TABLE "text_editor_blocks_tny_body_sidebar_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_tny_body_sidebar" CASCADE;
  DROP TABLE "text_editor_blocks_tny_body_drop_cap_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_tny_body_drop_cap" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_body_single_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_body_single" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_body_lead_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_body_lead" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_body_two_col_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_body_two_col" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_body_callout_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_body_callout" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_body_sidebar_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_body_sidebar" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_body_drop_cap_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_ptoc_body_drop_cap" CASCADE;
  DROP TABLE "_text_editor_v_blocks_tny_body_single_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_tny_body_single" CASCADE;
  DROP TABLE "_text_editor_v_blocks_tny_body_lead_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_tny_body_lead" CASCADE;
  DROP TABLE "_text_editor_v_blocks_tny_body_two_col_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_tny_body_two_col" CASCADE;
  DROP TABLE "_text_editor_v_blocks_tny_body_callout_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_tny_body_callout" CASCADE;
  DROP TABLE "_text_editor_v_blocks_tny_body_sidebar_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_tny_body_sidebar" CASCADE;
  DROP TABLE "_text_editor_v_blocks_tny_body_drop_cap_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_tny_body_drop_cap" CASCADE;
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_body_single_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_body_lead_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_body_two_col_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_body_callout_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_body_sidebar_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_ptoc_body_drop_cap_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_tny_body_single_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_tny_body_lead_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_tny_body_two_col_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_tny_body_callout_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_tny_body_sidebar_hide_on";
  DROP TYPE "public"."enum_text_editor_blocks_tny_body_drop_cap_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_body_single_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_body_lead_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_body_two_col_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_body_callout_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_body_sidebar_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_ptoc_body_drop_cap_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_tny_body_single_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_tny_body_lead_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_tny_body_two_col_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_tny_body_callout_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_tny_body_sidebar_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_tny_body_drop_cap_hide_on";`)
}
