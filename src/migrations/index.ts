import * as migration_20260930_104142_initial from './20260930_104142_initial';

export const migrations = [
  {
    up: migration_20260930_104142_initial.up,
    down: migration_20260930_104142_initial.down,
    name: '20260930_104142_initial'
  },
];
