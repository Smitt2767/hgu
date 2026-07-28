import * as migration_20260728_084359_initial from './20260728_084359_initial';
import * as migration_20260728_110000_backfill_media_prefix from './20260728_110000_backfill_media_prefix';
import * as migration_20260728_112427_prefix_default from './20260728_112427_prefix_default';

export const migrations = [
  {
    up: migration_20260728_084359_initial.up,
    down: migration_20260728_084359_initial.down,
    name: '20260728_084359_initial',
  },
  {
    up: migration_20260728_110000_backfill_media_prefix.up,
    down: migration_20260728_110000_backfill_media_prefix.down,
    name: '20260728_110000_backfill_media_prefix',
  },
  {
    up: migration_20260728_112427_prefix_default.up,
    down: migration_20260728_112427_prefix_default.down,
    name: '20260728_112427_prefix_default'
  },
];
