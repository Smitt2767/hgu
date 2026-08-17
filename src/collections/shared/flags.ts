import { buildCatalog, rendersByDefault, type CatalogEntry } from '@/flags/catalog'
import type { Block, Field, FieldHook, TextFieldValidation } from 'payload'

/**
 * Attaches a GrowthBook flag to a block.
 *
 * The wrapper adds a flag key and **one row per value that flag can serve**. A row
 * says two things: whether the module renders for that value at all, and which of
 * the block's own fields differ. That is the whole model — there is no separate
 * "show/hide mode". Hiding is just a row with `render` off, which is why a
 * three-arm experiment can have an arm that removes the module, and why a boolean
 * that started as a kill switch can later grow variant copy without changing shape.
 *
 * Rows are derived, never typed. `whenValue` comes from the ruleset (see
 * `syncRows`), so an editor cannot write `"urgancy"` and wonder why it never
 * matches. Overrides are derived too — from `block.fields` — which is what makes
 * this work for any block, including ones added later, with no per-block code.
 *
 * Applied to CTA only for now. `withFlags.all(...)` is the whole-site rollout and
 * is deliberately not called yet: every block it touches adds tables.
 */
const attach = (block: Block): Block => ({
  ...block,
  fields: [...block.fields, flagField(block)],
})

export const withFlags = Object.assign(attach, {
  all: (blocks: Block[]): Block[] => blocks.map(attach),
})

const flagField = (block: Block): Field => ({
  name: 'flag',
  type: 'group',
  label: 'Feature flag',
  admin: {
    description:
      'Optional. Serve a different version of this module — or none at all — depending on a GrowthBook flag. Leave the flag empty and the module renders for everyone, exactly as it does today.',
  },
  // The picker writes the rows in the browser the moment a flag is chosen, so an
  // editor never waits on a save to see them. This is the same derivation on the
  // server, and it is the authority: the Local API, a seed script and the MCP plugin
  // all write documents that component never sees, and GrowthBook gains and loses
  // values while a page sits untouched. Both ends read `catalog`, so they agree.
  //
  // `beforeValidate`, not `beforeChange`. Rows are derived, so they must be settled
  // *before* anything judges them — otherwise a row the editor could never fill in
  // (`whenValue` is read-only) fails the required check on publish, and the error
  // points at a field they are not allowed to type into.
  hooks: { beforeValidate: [syncRows] },
  fields: [
    {
      name: 'key',
      type: 'text',
      label: 'Flag',
      validate: validateKey,
      admin: {
        components: {
          Field: '@/collections/blocks/components/flag-key-field#FlagKeyField',
        },
      },
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Values',
      labels: { singular: 'Value', plural: 'Values' },
      admin: {
        initCollapsed: true,
        condition: (_data, siblingData) => Boolean(siblingData?.key),
        description:
          'One row per value the flag can serve, filled in from GrowthBook. Leave a field blank to inherit it from the module above.',
        // Hides "Add Value" — see `custom.scss`. Payload has no config flag for it,
        // and an add button here is a dead end: `whenValue` is read-only, so a
        // hand-made row can never be filled in and `syncRows` drops it on save.
        // Removing a row stays available, because clearing an orphan is a real task.
        className: 'flag-rows',
        components: {
          RowLabel: '@/collections/blocks/components/flag-row-label#FlagRowLabel',
        },
      },
      fields: [
        {
          name: 'whenValue',
          type: 'text',
          label: 'When the flag is',
          required: true,
          admin: {
            readOnly: true,
            description: 'Derived from GrowthBook. Stored as JSON so the string "true" and the boolean true stay distinguishable.',
          },
        },
        {
          name: 'render',
          type: 'checkbox',
          label: 'Render this module',
          defaultValue: true,
          admin: {
            description: 'Off means the module is skipped entirely for this value — no markup ships for it.',
          },
        },
        {
          name: 'orphaned',
          type: 'checkbox',
          label: 'No longer served',
          defaultValue: false,
          admin: {
            readOnly: true,
            // Invisible until it happens, so the common case stays uncluttered.
            condition: (_data, siblingData) => Boolean(siblingData?.orphaned),
            description:
              'GrowthBook no longer serves this value. The row is kept so the copy written into it is not lost; delete it once you are sure.',
          },
        },
        // Collapsed, and behind its own header, because open by default this reads
        // as a second copy of the module rather than a diff against it. For the
        // common case — a kill switch — both rows are supposed to leave it untouched,
        // so the honest presentation is a bar that stays shut.
        //
        // The collapsible is unnamed, so it is purely presentational: `overrides`
        // keeps its path and its columns, and this costs no migration.
        {
          type: 'collapsible',
          label: 'Change the content for this value',
          admin: {
            initCollapsed: true,
            condition: (_data, siblingData) => siblingData?.render !== false,
            description:
              'Leave this shut and the module renders exactly as set up above. Open it to change only the fields that differ for this value — anything left blank still inherits.',
          },
          fields: [
            {
              name: 'overrides',
              type: 'group',
              // The collapsible above is the header; a second one here would nest two
              // titles around one set of fields.
              label: false,
              fields: overridableFields(block.fields, block.slug),
            },
          ],
        },
      ],
    },
  ],
})

/**
 * The block's own fields, restated as optional overrides.
 *
 * Derived rather than hand-written per block: that is what makes this scale to all
 * seventeen modules, and it enforces the constraint every flag platform lands on —
 * a variant is structurally the same module, so it cannot drift into a different
 * one.
 */
function overridableFields(fields: Field[], slug: string): Field[] {
  return fields.flatMap((field) => toOverridable(field, slug))
}

function toOverridable(field: Field, slug: string): Field[] {
  // Presentational wrappers hold no data of their own, so the override belongs to
  // what they contain. Flattened rather than preserved — a `row` nested in the
  // overrides group would fight the group's own layout for nothing.
  if (field.type === 'row' || field.type === 'collapsible') {
    return overridableFields(field.fields, slug)
  }

  // `ui` renders a component and stores nothing; unnamed containers (tabs) store
  // nothing directly either. Nothing to override in either case.
  if (field.type === 'ui' || !('name' in field)) return []

  const override = { ...field, admin: { ...field.admin } } as Record<string, unknown>

  // Every override is optional by construction. Unset means "inherit", so a
  // `required` copy would make "this variant differs only in its label"
  // unexpressible.
  delete override.required
  // A default writes a value into every row, and a field that always holds a value
  // can never mean "inherit".
  delete override.defaultValue
  // Uniqueness, indexes and hooks belong to the canonical value, not to a variant.
  delete override.unique
  delete override.index
  delete override.hooks

  // `position: 'sidebar'` has no meaning nested inside a group.
  delete (override.admin as Record<string, unknown>).position

  // Postgres caps identifiers at 63 characters, and Payload names an enum after the
  // full path to it. The default here overflows before it is even useful:
  // `enum__pages_v_blocks_cta_flag_rows_overrides_desktop_aspect_ratio` is 65, and
  // longer block slugs would be worse.
  //
  // The path carries no information an enum needs — an override enum is identified
  // by its block and its field, and nothing else. Naming it that way keeps it short
  // for every block, keeps it readable, and has the main and versions tables share
  // one enum type instead of defining the same one twice under two names.
  if (field.type === 'radio' || field.type === 'select') {
    override.enumName = `enum_flag_${snake(slug)}_${snake(field.name)}`
  }

  return [override as Field]
}

function snake(value: string): string {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1_$2').replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase()
}

type FlagRow = {
  whenValue?: string | null
  render?: boolean | null
  orphaned?: boolean | null
  overrides?: Record<string, unknown> | null
  id?: string | null
}

type FlagValue = {
  key: string | null
  rows: FlagRow[]
}

/**
 * Rewrites the rows to match what the flag can actually serve.
 *
 * Runs on every save, so adding a variation in GrowthBook makes a row for it appear
 * in the CMS the next time an editor saves the page — no deploy, no migration, no
 * list to maintain in code.
 *
 * Two behaviours worth stating, because both are the difference between this being
 * safe and being a way to lose content:
 *
 * - **A value GrowthBook stopped serving keeps its row**, marked orphaned. Dropping
 *   it would silently throw away copy someone wrote.
 * - **An unreachable GrowthBook changes nothing.** A provider outage must not
 *   rewrite documents, and it must never block a save.
 */
const syncRows: FieldHook = async ({ value }) => {
  const flag = normalise(value)
  if (!flag.key) return flag

  const entry = (await loadCatalog())?.find((candidate) => candidate.key === flag.key)
  // Either GrowthBook is unreachable or the key is unknown. The second is already
  // rejected by `validateKey`; neither is a reason to touch the rows.
  if (!entry) return flag

  const existing = new Map<string, FlagRow>()
  for (const row of flag.rows) {
    // A row with no value stands for nothing and is dropped, not kept as an orphan.
    // Both spellings of "no value" have to be caught: `undefined` from a row added
    // through the API, and `''` from one added in the admin, where the read-only
    // input still submits an empty string.
    if (typeof row?.whenValue === 'string' && row.whenValue !== '') {
      existing.set(row.whenValue, row)
    }
  }

  const derived = entry.values.map((flagValue) => {
    const whenValue = JSON.stringify(flagValue)
    const row = existing.get(whenValue)
    existing.delete(whenValue)

    return row
      ? { ...row, whenValue, orphaned: false }
      : { whenValue, render: rendersByDefault(entry.type, flagValue), orphaned: false }
  })

  const orphans = [...existing.values()].map((row) => ({ ...row, orphaned: true }))

  return { ...flag, rows: [...derived, ...orphans] }
}

/**
 * Rejects a key GrowthBook does not know about, so a typo fails in the admin rather
 * than silently hiding a module in production.
 *
 * Passes when the ruleset is unreachable. Refusing every save during a provider
 * outage would be a far worse failure than accepting a key we could not check.
 */
const validateKey: TextFieldValidation = async (value) => {
  if (!value) return true

  const catalog = await loadCatalog()
  if (!catalog) return true

  return (
    catalog.some((entry) => entry.key === value) ||
    `"${value}" is not a flag in GrowthBook. Pick one from the list, or create it in GrowthBook first.`
  )
}

/**
 * The catalog, or `null` if it cannot be had — which every caller here treats as
 * "change nothing, block nothing".
 *
 * Imported lazily and guarded, for the same underlying reason. `getRuleset` is a
 * `use cache` function calling `cacheTag`/`cacheLife`, and those throw outside a
 * Next request. This module is part of the Payload config, so it is also loaded by
 * the CLI and by any script using the Local API — contexts with no Next runtime at
 * all. Without the guard, a seed script writing a page would crash inside a field
 * hook, which is a baffling place to find a cache error.
 */
async function loadCatalog(): Promise<CatalogEntry[] | null> {
  try {
    const { getRuleset } = await import('@/flags/ruleset')
    const ruleset = await getRuleset()

    return ruleset ? buildCatalog(ruleset) : null
  } catch (error) {
    console.error('[flags] catalog unavailable while saving', error)
    return null
  }
}

function normalise(value: unknown): FlagValue {
  const group = (value ?? {}) as { key?: unknown; rows?: unknown }
  const key = typeof group.key === 'string' ? group.key.trim() : ''

  return {
    key: key || null,
    rows: Array.isArray(group.rows) ? (group.rows as FlagRow[]) : [],
  }
}
