import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cob_pg_testimonial_cards_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_cob_pg_testimonial_columns_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_cob_pg_testimonial_banner_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_testimonial_cards_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_testimonial_columns_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_testimonial_banner_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TABLE "pages_blocks_cob_pg_testimonial_cards_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"avatar_id" integer
  );
  
  CREATE TABLE "pages_blocks_cob_pg_testimonial_cards_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_testimonial_cards_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_testimonial_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_testimonial_columns_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"avatar_id" integer
  );
  
  CREATE TABLE "pages_blocks_cob_pg_testimonial_columns_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_testimonial_columns_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_testimonial_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_testimonial_banner_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_testimonial_banner_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_testimonial_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"avatar_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_testimonial_cards_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"avatar_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_testimonial_cards_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_testimonial_cards_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_testimonial_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_testimonial_columns_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"avatar_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_testimonial_columns_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_testimonial_columns_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_testimonial_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_testimonial_banner_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_testimonial_banner_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_testimonial_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"avatar_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_cob_pg_testimonial_cards_testimonials" ADD CONSTRAINT "pages_blocks_cob_pg_testimonial_cards_testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_testimonial_cards_testimonials" ADD CONSTRAINT "pages_blocks_cob_pg_testimonial_cards_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cob_pg_testimonial_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_testimonial_cards_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_testimonial_cards_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_testimonial_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_testimonial_cards" ADD CONSTRAINT "pages_blocks_cob_pg_testimonial_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_testimonial_columns_testimonials" ADD CONSTRAINT "pages_blocks_cob_pg_testimonial_columns_testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_testimonial_columns_testimonials" ADD CONSTRAINT "pages_blocks_cob_pg_testimonial_columns_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cob_pg_testimonial_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_testimonial_columns_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_testimonial_columns_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_testimonial_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_testimonial_columns" ADD CONSTRAINT "pages_blocks_cob_pg_testimonial_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_testimonial_banner_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_testimonial_banner_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_testimonial_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_testimonial_banner" ADD CONSTRAINT "pages_blocks_cob_pg_testimonial_banner_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_testimonial_banner" ADD CONSTRAINT "pages_blocks_cob_pg_testimonial_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_testimonial_cards_testimonials" ADD CONSTRAINT "_pages_v_blocks_cob_pg_testimonial_cards_testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_testimonial_cards_testimonials" ADD CONSTRAINT "_pages_v_blocks_cob_pg_testimonial_cards_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_testimonial_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_testimonial_cards_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_testimonial_cards_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_testimonial_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_testimonial_cards" ADD CONSTRAINT "_pages_v_blocks_cob_pg_testimonial_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_testimonial_columns_testimonials" ADD CONSTRAINT "_pages_v_blocks_cob_pg_testimonial_columns_testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_testimonial_columns_testimonials" ADD CONSTRAINT "_pages_v_blocks_cob_pg_testimonial_columns_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_testimonial_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_testimonial_columns_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_testimonial_columns_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_testimonial_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_testimonial_columns" ADD CONSTRAINT "_pages_v_blocks_cob_pg_testimonial_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_testimonial_banner_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_testimonial_banner_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_testimonial_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_testimonial_banner" ADD CONSTRAINT "_pages_v_blocks_cob_pg_testimonial_banner_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_testimonial_banner" ADD CONSTRAINT "_pages_v_blocks_cob_pg_testimonial_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cob_pg_testimonial_cards_testimonials_order_idx" ON "pages_blocks_cob_pg_testimonial_cards_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_cards_testimonials_parent_id_idx" ON "pages_blocks_cob_pg_testimonial_cards_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_cards_testimonials_avata_idx" ON "pages_blocks_cob_pg_testimonial_cards_testimonials" USING btree ("avatar_id");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_cards_hide_on_order_idx" ON "pages_blocks_cob_pg_testimonial_cards_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_cards_hide_on_parent_idx" ON "pages_blocks_cob_pg_testimonial_cards_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_cards_order_idx" ON "pages_blocks_cob_pg_testimonial_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_cards_parent_id_idx" ON "pages_blocks_cob_pg_testimonial_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_cards_path_idx" ON "pages_blocks_cob_pg_testimonial_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_columns_testimonials_order_idx" ON "pages_blocks_cob_pg_testimonial_columns_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_columns_testimonials_parent_id_idx" ON "pages_blocks_cob_pg_testimonial_columns_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_columns_testimonials_ava_idx" ON "pages_blocks_cob_pg_testimonial_columns_testimonials" USING btree ("avatar_id");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_columns_hide_on_order_idx" ON "pages_blocks_cob_pg_testimonial_columns_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_columns_hide_on_parent_idx" ON "pages_blocks_cob_pg_testimonial_columns_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_columns_order_idx" ON "pages_blocks_cob_pg_testimonial_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_columns_parent_id_idx" ON "pages_blocks_cob_pg_testimonial_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_columns_path_idx" ON "pages_blocks_cob_pg_testimonial_columns" USING btree ("_path");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_banner_hide_on_order_idx" ON "pages_blocks_cob_pg_testimonial_banner_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_banner_hide_on_parent_idx" ON "pages_blocks_cob_pg_testimonial_banner_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_banner_order_idx" ON "pages_blocks_cob_pg_testimonial_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_banner_parent_id_idx" ON "pages_blocks_cob_pg_testimonial_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_banner_path_idx" ON "pages_blocks_cob_pg_testimonial_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_cob_pg_testimonial_banner_avatar_idx" ON "pages_blocks_cob_pg_testimonial_banner" USING btree ("avatar_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_cards_testimonials_order_idx" ON "_pages_v_blocks_cob_pg_testimonial_cards_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_cards_testimonials_parent_id_idx" ON "_pages_v_blocks_cob_pg_testimonial_cards_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_cards_testimonials_av_idx" ON "_pages_v_blocks_cob_pg_testimonial_cards_testimonials" USING btree ("avatar_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_cards_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_testimonial_cards_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_cards_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_testimonial_cards_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_cards_order_idx" ON "_pages_v_blocks_cob_pg_testimonial_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_cards_parent_id_idx" ON "_pages_v_blocks_cob_pg_testimonial_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_cards_path_idx" ON "_pages_v_blocks_cob_pg_testimonial_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_columns_testimonials_order_idx" ON "_pages_v_blocks_cob_pg_testimonial_columns_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_columns_testimonials_parent_id_idx" ON "_pages_v_blocks_cob_pg_testimonial_columns_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_columns_testimonials__idx" ON "_pages_v_blocks_cob_pg_testimonial_columns_testimonials" USING btree ("avatar_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_columns_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_testimonial_columns_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_columns_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_testimonial_columns_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_columns_order_idx" ON "_pages_v_blocks_cob_pg_testimonial_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_columns_parent_id_idx" ON "_pages_v_blocks_cob_pg_testimonial_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_columns_path_idx" ON "_pages_v_blocks_cob_pg_testimonial_columns" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_banner_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_testimonial_banner_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_banner_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_testimonial_banner_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_banner_order_idx" ON "_pages_v_blocks_cob_pg_testimonial_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_banner_parent_id_idx" ON "_pages_v_blocks_cob_pg_testimonial_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_banner_path_idx" ON "_pages_v_blocks_cob_pg_testimonial_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_testimonial_banner_avatar_idx" ON "_pages_v_blocks_cob_pg_testimonial_banner" USING btree ("avatar_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_cob_pg_testimonial_cards_testimonials" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_testimonial_cards_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_testimonial_cards" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_testimonial_columns_testimonials" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_testimonial_columns_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_testimonial_columns" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_testimonial_banner_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_testimonial_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_testimonial_cards_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_testimonial_cards_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_testimonial_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_testimonial_columns_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_testimonial_columns_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_testimonial_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_testimonial_banner_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_testimonial_banner" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_cob_pg_testimonial_cards_hide_on";
  DROP TYPE "public"."enum_pages_blocks_cob_pg_testimonial_columns_hide_on";
  DROP TYPE "public"."enum_pages_blocks_cob_pg_testimonial_banner_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_testimonial_cards_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_testimonial_columns_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_testimonial_banner_hide_on";`)
}
