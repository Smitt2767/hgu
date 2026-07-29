import type { CollectionBeforeChangeHook, Field } from 'payload'

/**
 * Release stages a document passes through before it goes public.
 *
 * These are deliberately *not* extra `_status` options. Payload hard-codes
 * `_status` to `draft | published` in `payload/dist/versions/baseFields.js`, and
 * its entire version machinery — `replaceWithDraftIfAvailable`, `?draft=true`,
 * autosave, scheduled publish — keys off exactly those two values, so adding
 * values there means fighting core on every query. Alpha and beta are modelled
 * as substates of `draft` instead: `stage` answers "who may preview the current
 * draft", while `_status: 'published'` keeps its usual meaning of "public".
 *
 * The effective visibility of a document is therefore `_status` × `stage`:
 *
 *   draft     + internal → editors and admins only
 *   draft     + alpha    → also users granted the alpha stage
 *   draft     + beta     → also users granted the beta stage
 *   published + (any)    → everyone, served as prerendered static HTML
 *
 * `stage` is an ordinary versioned field, which is what makes the admin list
 * view work. The list queries `find({ draft: true })`, which resolves through
 * `queryDrafts` to the version row with `latest = true`, and Payload rewrites
 * query keys to `version.*` on that path (`appendVersionToQueryKey`). So a page
 * that is already live but whose *next* revision sits in alpha still matches
 * `version.stage = 'alpha'` for a tester, while the public site carries on
 * serving the published version.
 */
export const STAGES = ['internal', 'alpha', 'beta'] as const

export type Stage = (typeof STAGES)[number]

/**
 * Stages that can be granted to an individual account. `internal` is absent on
 * purpose — it is conferred by the `editor` and `admin` roles, not handed out.
 */
export const TESTABLE_STAGES = ['alpha', 'beta'] as const satisfies readonly Stage[]

export type TestableStage = (typeof TESTABLE_STAGES)[number]

/**
 * The `stage` field, shared by every collection whose documents are released in
 * stages. Left optional rather than `required` so the column can be added to
 * existing rows without a backfill turning every subsequent edit into a
 * validation error; a missing stage is read as `internal` everywhere.
 */
export const stageField = (): Field => ({
  name: 'stage',
  type: 'select',
  label: 'Stage',
  defaultValue: 'internal' satisfies Stage,
  index: true,
  options: [
    { label: 'Internal — editors only', value: 'internal' },
    { label: 'Alpha — alpha testers can preview', value: 'alpha' },
    { label: 'Beta — beta testers can preview', value: 'beta' },
  ],
  admin: {
    position: 'sidebar',
    description:
      'Who may preview this document while it is unpublished. Publishing resets this to Internal, because a published document is public regardless of stage.',
  },
})

/**
 * Resets `stage` whenever a document is published.
 *
 * Without this a live document would keep advertising "Alpha" in the sidebar and
 * in testers' list views, and the next draft would silently inherit that stage
 * instead of starting internal and being promoted deliberately.
 */
export const resetStageOnPublish: CollectionBeforeChangeHook = ({ data }) => {
  if (data._status !== 'published') {
    return data
  }

  return { ...data, stage: 'internal' satisfies Stage }
}
