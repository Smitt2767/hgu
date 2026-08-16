/**
 * Applying a flag decision to a CMS block.
 *
 * Pure functions over plain data, deliberately: this is the logic that decides
 * whether a module appears on the page and what it says, and it should be readable
 * without holding React or the cache in your head. `components/blocks/index.tsx`
 * supplies the decision; everything about *what to do with it* lives here.
 */

export type FlagRow = {
  whenValue?: string | null
  render?: boolean | null
  orphaned?: boolean | null
  overrides?: Record<string, unknown> | null
  id?: string | null
}

/** A flag that is actually attached — `key` is present, so callers never re-check. */
export type FlagConfig = {
  key: string
  rows: FlagRow[]
}

/**
 * The flag attached to a block, if there is one.
 *
 * Written defensively because `RenderBlocks` is shared across four collections and
 * only Pages carries the field — a Template's CTA is the same block with no `flag`
 * at all, and must keep rendering exactly as it does today. A block whose group
 * exists but whose key is empty counts as unflagged, which is the state Payload
 * leaves behind when an editor clears the picker.
 */
export function flagOf(block: unknown): FlagConfig | undefined {
  if (!block || typeof block !== 'object' || !('flag' in block)) return undefined

  const flag = (block as { flag?: unknown }).flag
  if (!flag || typeof flag !== 'object') return undefined

  const { key, rows } = flag as { key?: unknown; rows?: unknown }
  if (typeof key !== 'string' || key === '') return undefined

  return { key, rows: Array.isArray(rows) ? (rows as FlagRow[]) : [] }
}

/**
 * The block as it should render for `value`, or `null` to skip it entirely.
 *
 * Three behaviours here are load-bearing rather than stylistic:
 *
 * - **A value with no row renders the base module.** Add a variation in GrowthBook
 *   that nobody has written a row for yet and the page keeps working. The failure
 *   mode of a flag system must never be a blank page, and this is the line that
 *   guarantees it — including when GrowthBook is unreachable and `value` is
 *   `undefined`.
 * - **`render: false` skips the module.** Not hidden with CSS: nothing is rendered,
 *   so nothing ships in the markup.
 * - **An unset override inherits.** Only `null`/`undefined` mean "inherit", so an
 *   editor who deliberately clears a field to empty gets an empty field. Payload
 *   distinguishes the two, which is the only reason "make this blank for the
 *   variant" is expressible at all.
 */
export function applyFlag<T extends object>(block: T, flag: FlagConfig, value: unknown): T | null {
  const row = rowFor(flag.rows, value)

  if (!row) return block
  if (row.render === false) return null

  return { ...block, ...definedOverrides(row.overrides) }
}

function rowFor(rows: FlagRow[] | null | undefined, value: unknown): FlagRow | undefined {
  if (!rows?.length || value === undefined) return undefined

  // Compared as JSON, the same form the editor's rows are stored in. It is what
  // keeps the string "true" and the boolean true from matching each other — a real
  // possibility, since a flag's type can change in the GrowthBook dashboard without
  // this code hearing about it.
  const whenValue = JSON.stringify(value)

  // Orphaned rows still match. GrowthBook no longer lists the value, but if it is
  // somehow still being served, the copy written for it is the better answer than
  // silently falling back to the base module.
  return rows.find((row) => row.whenValue === whenValue)
}

function definedOverrides(overrides: Record<string, unknown> | null | undefined) {
  if (!overrides) return {}

  return Object.fromEntries(
    Object.entries(overrides).filter(([, value]) => value !== null && value !== undefined),
  )
}
