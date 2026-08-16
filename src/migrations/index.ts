import * as migration_20260728_084359_initial from './20260728_084359_initial';
import * as migration_20260728_110000_backfill_media_prefix from './20260728_110000_backfill_media_prefix';
import * as migration_20260728_112427_prefix_default from './20260728_112427_prefix_default';
import * as migration_20260729_115832_add_release_stages from './20260729_115832_add_release_stages';
import * as migration_20260816_080248_remove_feedback_and_pause_experience_blocks from './20260816_080248_remove_feedback_and_pause_experience_blocks';

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
    name: '20260728_112427_prefix_default',
  },
  {
    up: migration_20260729_115832_add_release_stages.up,
    down: migration_20260729_115832_add_release_stages.down,
    name: '20260729_115832_add_release_stages',
  },
  {
    up: migration_20260816_080248_remove_feedback_and_pause_experience_blocks.up,
    down: migration_20260816_080248_remove_feedback_and_pause_experience_blocks.down,
    name: '20260816_080248_remove_feedback_and_pause_experience_blocks'
  },
];
