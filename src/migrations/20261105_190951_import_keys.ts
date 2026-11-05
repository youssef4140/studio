import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_import_keys_folders" AS ENUM('ptofthecity/programs', 'ptofthecity/conditions', 'ptofthecity/services', 'tny/services', 'cob/services');
  CREATE TYPE "public"."enum_import_keys_tenant" AS ENUM('ptofthecity', 'tny', 'cob');
  CREATE TABLE "import_keys_folders" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_import_keys_folders",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "import_keys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"tenant" "enum_import_keys_tenant" NOT NULL,
  	"key_prefix" varchar,
  	"key_hash" varchar,
  	"expires_at" timestamp(3) with time zone NOT NULL,
  	"revoked_at" timestamp(3) with time zone,
  	"can_delete" boolean DEFAULT false,
  	"last_used_at" timestamp(3) with time zone,
  	"created_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "import_keys_id" integer;
  ALTER TABLE "import_keys_folders" ADD CONSTRAINT "import_keys_folders_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."import_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "import_keys" ADD CONSTRAINT "import_keys_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "import_keys_folders_order_idx" ON "import_keys_folders" USING btree ("order");
  CREATE INDEX "import_keys_folders_parent_idx" ON "import_keys_folders" USING btree ("parent_id");
  CREATE INDEX "import_keys_key_hash_idx" ON "import_keys" USING btree ("key_hash");
  CREATE INDEX "import_keys_created_by_idx" ON "import_keys" USING btree ("created_by_id");
  CREATE INDEX "import_keys_updated_at_idx" ON "import_keys" USING btree ("updated_at");
  CREATE INDEX "import_keys_created_at_idx" ON "import_keys" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_import_keys_fk" FOREIGN KEY ("import_keys_id") REFERENCES "public"."import_keys"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_import_keys_id_idx" ON "payload_locked_documents_rels" USING btree ("import_keys_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "import_keys_folders" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "import_keys" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "import_keys_folders" CASCADE;
  DROP TABLE "import_keys" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_import_keys_fk";
  
  DROP INDEX "payload_locked_documents_rels_import_keys_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "import_keys_id";
  DROP TYPE "public"."enum_import_keys_folders";
  DROP TYPE "public"."enum_import_keys_tenant";`)
}
