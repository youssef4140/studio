import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cob_pg_program_dark_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_cob_pg_program_light_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_program_dark_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_program_light_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TABLE "pages_blocks_cob_pg_program_dark_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_program_dark_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_program_dark_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_program_dark_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_program_dark" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"features_title" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_program_light_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_program_light_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_program_light_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_program_light_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_program_light" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"features_title" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_program_dark_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_program_dark_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_program_dark_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_program_dark_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_program_dark" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"features_title" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_program_light_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_program_light_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_program_light_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_program_light_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_program_light" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"features_title" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_cob_pg_program_dark_cards" ADD CONSTRAINT "pages_blocks_cob_pg_program_dark_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cob_pg_program_dark"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_program_dark_features" ADD CONSTRAINT "pages_blocks_cob_pg_program_dark_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cob_pg_program_dark"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_program_dark_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_program_dark_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_program_dark"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_program_dark" ADD CONSTRAINT "pages_blocks_cob_pg_program_dark_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_program_dark" ADD CONSTRAINT "pages_blocks_cob_pg_program_dark_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_program_light_cards" ADD CONSTRAINT "pages_blocks_cob_pg_program_light_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cob_pg_program_light"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_program_light_features" ADD CONSTRAINT "pages_blocks_cob_pg_program_light_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cob_pg_program_light"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_program_light_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_program_light_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_program_light"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_program_light" ADD CONSTRAINT "pages_blocks_cob_pg_program_light_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_program_light" ADD CONSTRAINT "pages_blocks_cob_pg_program_light_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_program_dark_cards" ADD CONSTRAINT "_pages_v_blocks_cob_pg_program_dark_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_program_dark"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_program_dark_features" ADD CONSTRAINT "_pages_v_blocks_cob_pg_program_dark_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_program_dark"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_program_dark_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_program_dark_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_program_dark"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_program_dark" ADD CONSTRAINT "_pages_v_blocks_cob_pg_program_dark_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_program_dark" ADD CONSTRAINT "_pages_v_blocks_cob_pg_program_dark_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_program_light_cards" ADD CONSTRAINT "_pages_v_blocks_cob_pg_program_light_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_program_light"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_program_light_features" ADD CONSTRAINT "_pages_v_blocks_cob_pg_program_light_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_program_light"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_program_light_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_program_light_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_program_light"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_program_light" ADD CONSTRAINT "_pages_v_blocks_cob_pg_program_light_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_program_light" ADD CONSTRAINT "_pages_v_blocks_cob_pg_program_light_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cob_pg_program_dark_cards_order_idx" ON "pages_blocks_cob_pg_program_dark_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_program_dark_cards_parent_id_idx" ON "pages_blocks_cob_pg_program_dark_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_program_dark_features_order_idx" ON "pages_blocks_cob_pg_program_dark_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_program_dark_features_parent_id_idx" ON "pages_blocks_cob_pg_program_dark_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_program_dark_hide_on_order_idx" ON "pages_blocks_cob_pg_program_dark_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_program_dark_hide_on_parent_idx" ON "pages_blocks_cob_pg_program_dark_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_program_dark_order_idx" ON "pages_blocks_cob_pg_program_dark" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_program_dark_parent_id_idx" ON "pages_blocks_cob_pg_program_dark" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_program_dark_path_idx" ON "pages_blocks_cob_pg_program_dark" USING btree ("_path");
  CREATE INDEX "pages_blocks_cob_pg_program_dark_image_idx" ON "pages_blocks_cob_pg_program_dark" USING btree ("image_id");
  CREATE INDEX "pages_blocks_cob_pg_program_light_cards_order_idx" ON "pages_blocks_cob_pg_program_light_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_program_light_cards_parent_id_idx" ON "pages_blocks_cob_pg_program_light_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_program_light_features_order_idx" ON "pages_blocks_cob_pg_program_light_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_program_light_features_parent_id_idx" ON "pages_blocks_cob_pg_program_light_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_program_light_hide_on_order_idx" ON "pages_blocks_cob_pg_program_light_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_program_light_hide_on_parent_idx" ON "pages_blocks_cob_pg_program_light_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_program_light_order_idx" ON "pages_blocks_cob_pg_program_light" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_program_light_parent_id_idx" ON "pages_blocks_cob_pg_program_light" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_program_light_path_idx" ON "pages_blocks_cob_pg_program_light" USING btree ("_path");
  CREATE INDEX "pages_blocks_cob_pg_program_light_image_idx" ON "pages_blocks_cob_pg_program_light" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_dark_cards_order_idx" ON "_pages_v_blocks_cob_pg_program_dark_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_dark_cards_parent_id_idx" ON "_pages_v_blocks_cob_pg_program_dark_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_dark_features_order_idx" ON "_pages_v_blocks_cob_pg_program_dark_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_dark_features_parent_id_idx" ON "_pages_v_blocks_cob_pg_program_dark_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_dark_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_program_dark_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_dark_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_program_dark_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_dark_order_idx" ON "_pages_v_blocks_cob_pg_program_dark" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_dark_parent_id_idx" ON "_pages_v_blocks_cob_pg_program_dark" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_dark_path_idx" ON "_pages_v_blocks_cob_pg_program_dark" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_dark_image_idx" ON "_pages_v_blocks_cob_pg_program_dark" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_light_cards_order_idx" ON "_pages_v_blocks_cob_pg_program_light_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_light_cards_parent_id_idx" ON "_pages_v_blocks_cob_pg_program_light_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_light_features_order_idx" ON "_pages_v_blocks_cob_pg_program_light_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_light_features_parent_id_idx" ON "_pages_v_blocks_cob_pg_program_light_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_light_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_program_light_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_light_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_program_light_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_light_order_idx" ON "_pages_v_blocks_cob_pg_program_light" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_light_parent_id_idx" ON "_pages_v_blocks_cob_pg_program_light" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_light_path_idx" ON "_pages_v_blocks_cob_pg_program_light" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_program_light_image_idx" ON "_pages_v_blocks_cob_pg_program_light" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_cob_pg_program_dark_cards" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_program_dark_features" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_program_dark_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_program_dark" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_program_light_cards" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_program_light_features" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_program_light_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_program_light" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_program_dark_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_program_dark_features" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_program_dark_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_program_dark" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_program_light_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_program_light_features" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_program_light_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_program_light" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_cob_pg_program_dark_hide_on";
  DROP TYPE "public"."enum_pages_blocks_cob_pg_program_light_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_program_dark_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_program_light_hide_on";`)
}
