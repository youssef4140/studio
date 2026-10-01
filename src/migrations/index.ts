import * as migration_20260930_104142_initial from './20260930_104142_initial';
import * as migration_20261001_144437_remove_block_style_and_folder_theme_fields from './20261001_144437_remove_block_style_and_folder_theme_fields';

export const migrations = [
  {
    up: migration_20260930_104142_initial.up,
    down: migration_20260930_104142_initial.down,
    name: '20260930_104142_initial',
  },
  {
    up: migration_20261001_144437_remove_block_style_and_folder_theme_fields.up,
    down: migration_20261001_144437_remove_block_style_and_folder_theme_fields.down,
    name: '20261001_144437_remove_block_style_and_folder_theme_fields'
  },
];
