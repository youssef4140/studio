import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "text_editor_blocks_content_hide_on" CASCADE;
  DROP TABLE "text_editor_blocks_content" CASCADE;
  DROP TABLE "_text_editor_v_blocks_content_hide_on" CASCADE;
  DROP TABLE "_text_editor_v_blocks_content" CASCADE;
  DROP TYPE "public"."enum_text_editor_blocks_content_hide_on";
  DROP TYPE "public"."enum__text_editor_v_blocks_content_hide_on";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_text_editor_blocks_content_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TYPE "public"."enum__text_editor_v_blocks_content_hide_on" AS ENUM('mobile', 'tablet', 'desktop');
  CREATE TABLE "text_editor_blocks_content_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_text_editor_blocks_content_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "text_editor_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_text_editor_v_blocks_content_hide_on" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__text_editor_v_blocks_content_hide_on",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_text_editor_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "text_editor_blocks_content_hide_on" ADD CONSTRAINT "text_editor_blocks_content_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."text_editor_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "text_editor_blocks_content" ADD CONSTRAINT "text_editor_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."text_editor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_content_hide_on" ADD CONSTRAINT "_text_editor_v_blocks_content_hide_on_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_text_editor_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_text_editor_v_blocks_content" ADD CONSTRAINT "_text_editor_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_text_editor_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "text_editor_blocks_content_hide_on_order_idx" ON "text_editor_blocks_content_hide_on" USING btree ("order");
  CREATE INDEX "text_editor_blocks_content_hide_on_parent_idx" ON "text_editor_blocks_content_hide_on" USING btree ("parent_id");
  CREATE INDEX "text_editor_blocks_content_order_idx" ON "text_editor_blocks_content" USING btree ("_order");
  CREATE INDEX "text_editor_blocks_content_parent_id_idx" ON "text_editor_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "text_editor_blocks_content_path_idx" ON "text_editor_blocks_content" USING btree ("_path");
  CREATE INDEX "_text_editor_v_blocks_content_hide_on_order_idx" ON "_text_editor_v_blocks_content_hide_on" USING btree ("order");
  CREATE INDEX "_text_editor_v_blocks_content_hide_on_parent_idx" ON "_text_editor_v_blocks_content_hide_on" USING btree ("parent_id");
  CREATE INDEX "_text_editor_v_blocks_content_order_idx" ON "_text_editor_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_text_editor_v_blocks_content_parent_id_idx" ON "_text_editor_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_text_editor_v_blocks_content_path_idx" ON "_text_editor_v_blocks_content" USING btree ("_path");`)
}
