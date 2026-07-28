import * as migration_20260728_084359_initial from './20260728_084359_initial';

export const migrations = [
  {
    up: migration_20260728_084359_initial.up,
    down: migration_20260728_084359_initial.down,
    name: '20260728_084359_initial'
  },
];
