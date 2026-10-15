import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cob_pg_location_details_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum_pages_blocks_cob_pg_location_cards_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_location_details_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__pages_v_blocks_cob_pg_location_cards_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TABLE "pages_blocks_cob_pg_location_details_contact_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"value" varchar,
  	"action_label" varchar,
  	"action_href" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_location_details_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_location_details_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_location_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"map_title" varchar,
  	"map_address" varchar,
  	"map_button_label" varchar,
  	"map_button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_location_cards_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"name" varchar,
  	"address" varchar,
  	"phone" varchar,
  	"button_label" varchar,
  	"button_href" varchar
  );
  
  CREATE TABLE "pages_blocks_cob_pg_location_cards_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_cob_pg_location_cards_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cob_pg_location_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_location_details_contact_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"value" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_location_details_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_location_details_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_location_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"map_title" varchar,
  	"map_address" varchar,
  	"map_button_label" varchar,
  	"map_button_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_location_cards_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"name" varchar,
  	"address" varchar,
  	"phone" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_location_cards_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_cob_pg_location_cards_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cob_pg_location_cards" (
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
  
  ALTER TABLE "pages_blocks_cob_pg_location_details_contact_methods" ADD CONSTRAINT "pages_blocks_cob_pg_location_details_contact_methods_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_location_details_contact_methods" ADD CONSTRAINT "pages_blocks_cob_pg_location_details_contact_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cob_pg_location_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_location_details_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_location_details_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_location_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_location_details" ADD CONSTRAINT "pages_blocks_cob_pg_location_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_location_cards_locations" ADD CONSTRAINT "pages_blocks_cob_pg_location_cards_locations_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_location_cards_locations" ADD CONSTRAINT "pages_blocks_cob_pg_location_cards_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cob_pg_location_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_location_cards_hide_on" ADD CONSTRAINT "pages_blocks_cob_pg_location_cards_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_cob_pg_location_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cob_pg_location_cards" ADD CONSTRAINT "pages_blocks_cob_pg_location_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_location_details_contact_methods" ADD CONSTRAINT "_pages_v_blocks_cob_pg_location_details_contact_methods_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_location_details_contact_methods" ADD CONSTRAINT "_pages_v_blocks_cob_pg_location_details_contact_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_location_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_location_details_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_location_details_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_location_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_location_details" ADD CONSTRAINT "_pages_v_blocks_cob_pg_location_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_location_cards_locations" ADD CONSTRAINT "_pages_v_blocks_cob_pg_location_cards_locations_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_location_cards_locations" ADD CONSTRAINT "_pages_v_blocks_cob_pg_location_cards_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_location_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_location_cards_hide_on" ADD CONSTRAINT "_pages_v_blocks_cob_pg_location_cards_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_cob_pg_location_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cob_pg_location_cards" ADD CONSTRAINT "_pages_v_blocks_cob_pg_location_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cob_pg_location_details_contact_methods_order_idx" ON "pages_blocks_cob_pg_location_details_contact_methods" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_location_details_contact_methods_parent_id_idx" ON "pages_blocks_cob_pg_location_details_contact_methods" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_location_details_contact_methods_ico_idx" ON "pages_blocks_cob_pg_location_details_contact_methods" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_cob_pg_location_details_hide_on_order_idx" ON "pages_blocks_cob_pg_location_details_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_location_details_hide_on_parent_idx" ON "pages_blocks_cob_pg_location_details_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_location_details_order_idx" ON "pages_blocks_cob_pg_location_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_location_details_parent_id_idx" ON "pages_blocks_cob_pg_location_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_location_details_path_idx" ON "pages_blocks_cob_pg_location_details" USING btree ("_path");
  CREATE INDEX "pages_blocks_cob_pg_location_cards_locations_order_idx" ON "pages_blocks_cob_pg_location_cards_locations" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_location_cards_locations_parent_id_idx" ON "pages_blocks_cob_pg_location_cards_locations" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_location_cards_locations_icon_idx" ON "pages_blocks_cob_pg_location_cards_locations" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_cob_pg_location_cards_hide_on_order_idx" ON "pages_blocks_cob_pg_location_cards_hide_on" USING btree ("order");
  CREATE INDEX "pages_blocks_cob_pg_location_cards_hide_on_parent_idx" ON "pages_blocks_cob_pg_location_cards_hide_on" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_cob_pg_location_cards_order_idx" ON "pages_blocks_cob_pg_location_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cob_pg_location_cards_parent_id_idx" ON "pages_blocks_cob_pg_location_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cob_pg_location_cards_path_idx" ON "pages_blocks_cob_pg_location_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_location_details_contact_methods_order_idx" ON "_pages_v_blocks_cob_pg_location_details_contact_methods" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_location_details_contact_methods_parent_id_idx" ON "_pages_v_blocks_cob_pg_location_details_contact_methods" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_location_details_contact_methods__idx" ON "_pages_v_blocks_cob_pg_location_details_contact_methods" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_location_details_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_location_details_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_location_details_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_location_details_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_location_details_order_idx" ON "_pages_v_blocks_cob_pg_location_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_location_details_parent_id_idx" ON "_pages_v_blocks_cob_pg_location_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_location_details_path_idx" ON "_pages_v_blocks_cob_pg_location_details" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cob_pg_location_cards_locations_order_idx" ON "_pages_v_blocks_cob_pg_location_cards_locations" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_location_cards_locations_parent_id_idx" ON "_pages_v_blocks_cob_pg_location_cards_locations" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_location_cards_locations_icon_idx" ON "_pages_v_blocks_cob_pg_location_cards_locations" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_location_cards_hide_on_order_idx" ON "_pages_v_blocks_cob_pg_location_cards_hide_on" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_cob_pg_location_cards_hide_on_parent_idx" ON "_pages_v_blocks_cob_pg_location_cards_hide_on" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_location_cards_order_idx" ON "_pages_v_blocks_cob_pg_location_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cob_pg_location_cards_parent_id_idx" ON "_pages_v_blocks_cob_pg_location_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cob_pg_location_cards_path_idx" ON "_pages_v_blocks_cob_pg_location_cards" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_cob_pg_location_details_contact_methods" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_location_details_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_location_details" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_location_cards_locations" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_location_cards_hide_on" CASCADE;
  DROP TABLE "pages_blocks_cob_pg_location_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_location_details_contact_methods" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_location_details_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_location_details" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_location_cards_locations" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_location_cards_hide_on" CASCADE;
  DROP TABLE "_pages_v_blocks_cob_pg_location_cards" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_cob_pg_location_details_hide_on";
  DROP TYPE "public"."enum_pages_blocks_cob_pg_location_cards_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_location_details_hide_on";
  DROP TYPE "public"."enum__pages_v_blocks_cob_pg_location_cards_hide_on";`)
}
