import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cob_pg_services_list_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_cob_pg_services_cards_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_services_list_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_services_cards_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TABLE "pages_blocks_cob_pg_services_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_services_list_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_services_list_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_services_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_services_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"text" varchar,
  	"link_text" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_services_cards_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_services_cards_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_services_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_services_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_services_list_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_services_list_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_services_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_services_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"text" varchar,
  	"link_text" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_services_cards_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_services_cards_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_services_cards" (
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
  
  ALTER TABLE "pages_blocks_cob_pg_services_list_items" ADD CONSTRAINT "pages_blocks_cob_pg_services_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cob_pg_services_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_services_list_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_services_list_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_services_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_services_list" ADD CONSTRAINT "pages_blocks_cob_pg_services_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_services_cards_cards" ADD CONSTRAINT "pages_blocks_cob_pg_services_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_services_cards_cards" ADD CONSTRAINT "pages_blocks_cob_pg_services_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cob_pg_services_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_services_cards_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_services_cards_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_services_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_services_cards" ADD CONSTRAINT "pages_blocks_cob_pg_services_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_services_list_items" ADD CONSTRAINT "_pages_v_blocks_cob_pg_services_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_services_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_services_list_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_services_list_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_services_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_services_list" ADD CONSTRAINT "_pages_v_blocks_cob_pg_services_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_services_cards_cards" ADD CONSTRAINT "_pages_v_blocks_cob_pg_services_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_services_cards_cards" ADD CONSTRAINT "_pages_v_blocks_cob_pg_services_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_services_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_services_cards_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_services_cards_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_services_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_services_cards" ADD CONSTRAINT "_pages_v_blocks_cob_pg_services_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cob_pg_services_list_items_order_idx" ON "pages_blocks_cob_pg_services_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_services_list_items_parent_id_idx" ON "pages_blocks_cob_pg_services_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_services_list_hide_on_order_idx" ON "pages_blocks_cob_pg_services_list_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_services_list_hide_on_parent_idx" ON "pages_blocks_cob_pg_services_list_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_services_list_order_idx" ON "pages_blocks_cob_pg_services_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_services_list_parent_id_idx" ON "pages_blocks_cob_pg_services_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_services_list_path_idx" ON "pages_blocks_cob_pg_services_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_cob_pg_services_cards_cards_order_idx" ON "pages_blocks_cob_pg_services_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_services_cards_cards_parent_id_idx" ON "pages_blocks_cob_pg_services_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_services_cards_cards_image_idx" ON "pages_blocks_cob_pg_services_cards_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_cob_pg_services_cards_hide_on_order_idx" ON "pages_blocks_cob_pg_services_cards_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_services_cards_hide_on_parent_idx" ON "pages_blocks_cob_pg_services_cards_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_services_cards_order_idx" ON "pages_blocks_cob_pg_services_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_services_cards_parent_id_idx" ON "pages_blocks_cob_pg_services_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_services_cards_path_idx" ON "pages_blocks_cob_pg_services_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_services_list_items_order_idx" ON "_pages_v_blocks_cob_pg_services_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_services_list_items_parent_id_idx" ON "_pages_v_blocks_cob_pg_services_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_services_list_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_services_list_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_services_list_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_services_list_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_services_list_order_idx" ON "_pages_v_blocks_cob_pg_services_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_services_list_parent_id_idx" ON "_pages_v_blocks_cob_pg_services_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_services_list_path_idx" ON "_pages_v_blocks_cob_pg_services_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_services_cards_cards_order_idx" ON "_pages_v_blocks_cob_pg_services_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_services_cards_cards_parent_id_idx" ON "_pages_v_blocks_cob_pg_services_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_services_cards_cards_image_idx" ON "_pages_v_blocks_cob_pg_services_cards_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_services_cards_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_services_cards_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_services_cards_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_services_cards_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_services_cards_order_idx" ON "_pages_v_blocks_cob_pg_services_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_services_cards_parent_id_idx" ON "_pages_v_blocks_cob_pg_services_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_services_cards_path_idx" ON "_pages_v_blocks_cob_pg_services_cards" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_cob_pg_services_list_items" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_services_list_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_services_list" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_services_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_services_cards_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_services_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_services_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_services_list_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_services_list" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_services_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_services_cards_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_services_cards" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_cob_pg_services_list_hide_on";
  DROP TYPE "public"."enum_pages_blocks_cob_pg_services_cards_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_services_list_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_services_cards_hide_on";`)
}
