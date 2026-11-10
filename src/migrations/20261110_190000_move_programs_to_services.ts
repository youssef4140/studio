import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Data only. The ptofthecity "programs" folder was removed from src/tenants.ts
 * (20261110_174356_remove_programs_folder), but the folder sync never deletes,
 * so its pages and media were left filed under a folder no admin view lists.
 * Programs now live in Services: refile everything there.
 *
 * Slugs are unique per folder, so a program whose slug a service already uses
 * gets "-program" appended. Published pages keep their old envelope at
 * ptofthecity/programs/<slug> until they are re-rendered (`pnpm publish:rerender`,
 * or the worker's re-render on the next renderVersion change).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$
  DECLARE
    programs_id integer;
    services_id integer;
  BEGIN
    SELECT id INTO programs_id FROM folders WHERE path = 'ptofthecity/programs';
    SELECT id INTO services_id FROM folders WHERE path = 'ptofthecity/services';
    IF programs_id IS NULL OR services_id IS NULL THEN
      RETURN;
    END IF;

    WITH renamed AS (
      UPDATE pages p SET slug = p.slug || '-program'
        WHERE p.folder_id = programs_id AND p.slug IS NOT NULL
          AND EXISTS (SELECT 1 FROM pages s WHERE s.folder_id = services_id AND s.slug = p.slug)
        RETURNING p.id, p.slug
    )
    UPDATE _pages_v v SET version_slug = r.slug
      FROM renamed r
      WHERE v.parent_id = r.id AND v.version_slug || '-program' = r.slug;

    UPDATE _pages_v SET version_folder_id = services_id WHERE version_folder_id = programs_id;
    UPDATE pages SET folder_id = services_id WHERE folder_id = programs_id;
    UPDATE media SET folder_id = services_id WHERE folder_id = programs_id;
  END $$;`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Not reversible: after the move there is no record of which pages were programs.
}
