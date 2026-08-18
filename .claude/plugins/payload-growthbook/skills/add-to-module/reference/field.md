# The field wrapper

Adds a flag key and one row per value the flag can serve. Rows are **derived,
never typed** — `whenValue` comes from the ruleset, so an editor cannot write
`"urgancy"` and wonder why it never matches.

Reads the catalog derivation from the setup skill: `../../setup/reference/catalog.md`.

```ts
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
      'Optional. Serve a different version of this module — or none at all — depending on a flag. Leave it empty and the module renders for everyone, exactly as it does today.',
  },
  // `beforeValidate`, not `beforeChange`. Rows are derived, so they must be
  // settled *before* anything judges them — otherwise a row the editor could
  // never fill in (`whenValue` is read-only) fails the required check on publish,
  // and the error points at a field they are not allowed to type into.
  hooks: { beforeValidate: [syncRows] },
  fields: [
    {
      name: 'key',
      type: 'text',
      label: 'Flag',
      validate: validateKey,
      admin: { components: { Field: '@/…/flag-key-field#FlagKeyField' } },
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Values',
      admin: {
        initCollapsed: true,
        condition: (_data, siblingData) => Boolean(siblingData?.key),
        // Hide "Add Value" in CSS. An add button here is a dead end: `whenValue`
        // is read-only, so a hand-made row can never be filled in and the sync
        // hook drops it on save. Removing a row stays available — clearing an
        // orphan is a real task.
        className: 'flag-rows',
        components: { RowLabel: '@/…/flag-row-label#FlagRowLabel' },
      },
      fields: [
        {
          name: 'whenValue',
          type: 'text',
          required: true,
          admin: { readOnly: true },
        },
        { name: 'render', type: 'checkbox', defaultValue: true },
        {
          name: 'orphaned',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            readOnly: true,
            // Invisible until it happens, so the common case stays uncluttered.
            condition: (_data, sibling) => Boolean(sibling?.orphaned),
          },
        },
        // Collapsed, behind its own header: open by default this reads as a second
        // copy of the module rather than a diff against it. For a kill switch both
        // rows leave it untouched, so the honest presentation is a bar that stays
        // shut. Unnamed collapsible, so it is purely presentational — `overrides`
        // keeps its path and its columns, and this costs no migration.
        {
          type: 'collapsible',
          label: 'Change the content for this value',
          admin: {
            initCollapsed: true,
            condition: (_data, sibling) => sibling?.render !== false,
          },
          fields: [
            {
              name: 'overrides',
              type: 'group',
              label: false,
              fields: overridableFields(block.fields, block.slug),
            },
          ],
        },
      ],
    },
  ],
})
```

## Deriving the overrides

```ts
function toOverridable(field: Field, slug: string): Field[] {
  // Presentational wrappers hold no data, so the override belongs to what they
  // contain. Flattened rather than preserved — a `row` nested inside the overrides
  // group fights the group's own layout for nothing.
  if (field.type === 'row' || field.type === 'collapsible')
    return overridableFields(field.fields, slug)

  // `ui` renders a component and stores nothing; unnamed containers store nothing
  // directly either.
  if (field.type === 'ui' || !('name' in field)) return []

  const override = { ...field, admin: { ...field.admin } } as Record<string, unknown>

  // Every override is optional by construction. Unset means "inherit", so a
  // `required` copy makes "this variant differs only in its label" unexpressible.
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

  // Postgres caps identifiers at 63 characters and Payload names an enum after the
  // full path to it, which overflows before it is even useful:
  // `enum__pages_v_blocks_cta_flag_rows_overrides_desktop_aspect_ratio` is 65.
  // The path carries no information an enum needs — it is identified by its block
  // and its field. Naming it that way keeps it short for every block and lets the
  // main and versions tables share one enum type instead of defining it twice.
  if (field.type === 'radio' || field.type === 'select') {
    override.enumName = `enum_flag_${snake(slug)}_${snake(field.name)}`
  }

  return [override as Field]
}
```

## The sync hook

Runs on every save, so adding a variation in the dashboard makes a row for it
appear the next time an editor saves — no deploy, no migration, no list in code.

```ts
const syncRows: FieldHook = async ({ value }) => {
  const flag = normalise(value)
  if (!flag.key) return flag

  const entry = (await loadCatalog())?.find((c) => c.key === flag.key)
  // Either GrowthBook is unreachable or the key is unknown. Neither is a reason to
  // touch the rows.
  if (!entry) return flag

  const existing = new Map<string, FlagRow>()
  for (const row of flag.rows) {
    // A row with no value stands for nothing and is dropped, not kept as an orphan.
    // Both spellings of "no value" have to be caught: `undefined` from a row added
    // through the API, and `''` from the admin, where a read-only input still
    // submits an empty string.
    if (typeof row?.whenValue === 'string' && row.whenValue !== '')
      existing.set(row.whenValue, row)
  }

  const derived = entry.values.map((flagValue) => {
    const whenValue = JSON.stringify(flagValue)
    const row = existing.get(whenValue)
    existing.delete(whenValue)
    return row
      ? { ...row, whenValue, orphaned: false }
      : { whenValue, render: rendersByDefault(entry.type, flagValue), orphaned: false }
  })

  // Kept, not dropped: deleting them silently throws away copy someone wrote.
  const orphans = [...existing.values()].map((row) => ({ ...row, orphaned: true }))

  return { ...flag, rows: [...derived, ...orphans] }
}

/**
 * Whether a freshly created row renders. `false` on a boolean means off, whichever
 * way round the flag's default sits — so attaching a boolean produces a working
 * kill switch with no further clicks. Both ends need the same answer: the picker
 * creates rows in the browser, the hook re-derives them on the server.
 */
export function rendersByDefault(type: FlagValueType, value: unknown): boolean {
  return type === 'boolean' ? value !== false : true
}
```

**Validation rejects a key the dashboard does not know**, so a typo fails in the
admin rather than silently hiding a module in production — but **passes when the
ruleset is unreachable**. Refusing every save during a provider outage is a far
worse failure than accepting a key you could not check.

## Loading the catalog inside the Payload config

```ts
/**
 * Imported lazily and guarded. `getRuleset` is a `use cache` function calling
 * `cacheTag`/`cacheLife`, and those throw outside a Next request. This module is
 * part of the Payload config, so it is also loaded by the CLI and by any script
 * using the Local API — contexts with no Next runtime at all. Without the guard, a
 * seed script writing a page crashes inside a field hook, which is a baffling
 * place to find a cache error.
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
```

## The picker

Fetches the catalog on mount and writes the rows the moment a flag is chosen.

- **Rebuild rows only from `onChange`, never from an effect.** Rows loaded from the
  document already carry an editor's overrides, and rebuilding on mount throws
  them away — the one thing this must not do.
- **Re-picking the same flag keeps each row's `render` choice**, so an editor who
  cleared the field by accident does not lose the kill switch they set up.
- **A key the catalog does not offer must stay selectable**, or the field renders
  blank and the next save quietly clears it. That happens whenever the ruleset is
  unreachable, and whenever a flag is deleted while a page still points at it.
- **Distinguish "no flags exist" from "could not reach GrowthBook"** in the hint.
  Both render as an empty dropdown and only one of them is something to fix.
- **Describe where the flag renders in the editor's terms**, and derive it from
  what actually ships rather than from the tier alone — a hint saying "still fully
  prerendered" about a module that visibly streams behind a placeholder is
  describing a future state as if it were the current one.
