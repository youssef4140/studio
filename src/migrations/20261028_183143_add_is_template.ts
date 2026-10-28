import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "is_template" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "version_is_template" boolean;
  ALTER TABLE "text_editor" ADD COLUMN "is_template" boolean;
  ALTER TABLE "_text_editor_v" ADD COLUMN "version_is_template" boolean;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN "is_template";
  ALTER TABLE "_pages_v" DROP COLUMN "version_is_template";
  ALTER TABLE "text_editor" DROP COLUMN "is_template";
  ALTER TABLE "_text_editor_v" DROP COLUMN "version_is_template";`)
}
