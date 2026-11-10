import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "import_keys_folders" ALTER COLUMN "value" SET DATA TYPE text;
  -- Programs pages now live in Services: a key scoped to Programs moves there
  -- (dropping the row when the key already has Services), or the cast below fails.
  DELETE FROM "import_keys_folders" p
    WHERE p."value" = 'ptofthecity/programs'
      AND EXISTS (SELECT 1 FROM "import_keys_folders" s
        WHERE s."parent_id" = p."parent_id" AND s."value" = 'ptofthecity/services');
  UPDATE "import_keys_folders" SET "value" = 'ptofthecity/services' WHERE "value" = 'ptofthecity/programs';
  DROP TYPE "public"."enum_import_keys_folders";
  CREATE TYPE "public"."enum_import_keys_folders" AS ENUM('ptofthecity/conditions', 'ptofthecity/services', 'tny/services', 'cob/services');
  ALTER TABLE "import_keys_folders" ALTER COLUMN "value" SET DATA TYPE "public"."enum_import_keys_folders" USING "value"::"public"."enum_import_keys_folders";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_import_keys_folders" ADD VALUE 'ptofthecity/programs' BEFORE 'ptofthecity/conditions';`)
}
