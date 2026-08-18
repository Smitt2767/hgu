# Resolution at render

One place reads flags. Every block component receives resolved props and never
learns a flag exists — that is what stops flag checks leaking into every component
and becoming impossible to remove.

## Applying a decision to a block

Pure functions over plain data, deliberately: this is the logic that decides
whether a module appears and what it says, and it should be readable without
holding React or the cache in your head.

```ts
/**
 * The block as it should render for `value`, or `null` to skip it entirely.
 */
export function applyFlag<T extends object>(block: T, flag: FlagConfig, value: unknown): T | null {
  const row = rowFor(flag.rows, value)

  if (!row) return block            // no row → base module. Never a blank page.
  if (row.render === false) return null   // nothing rendered, no markup ships
  return { ...block, ...definedOverrides(row.overrides) }
}

function rowFor(rows: FlagRow[] | undefined, value: unknown): FlagRow | undefined {
  if (!rows?.length || value === undefined) return undefined

  // Compared as JSON, the same form the rows are stored in. It is what keeps the
  // string "true" and the boolean true from matching each other.
  const whenValue = JSON.stringify(value)

  // Orphaned rows still match: the dashboard no longer lists the value, but if it
  // is somehow still being served, the copy written for it is the better answer.
  return rows.find((row) => row.whenValue === whenValue)
}

/** Empty means inherit. `false` and `0` are real values and must survive. */
function definedOverrides(overrides: Record<string, unknown> | null | undefined) {
  if (!overrides) return {}
  return Object.fromEntries(Object.entries(overrides).filter(([, v]) => !isEmpty(v)))
}

function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined || value === '') return true
  // A cleared `hasMany` relationship arrives as `[]`.
  return Array.isArray(value) && value.length === 0
}
```

**Read the flag defensively.** A shared renderer is used by several collections
and typically only one of them carries the field, so the same block with no `flag`
at all must keep rendering exactly as it does today. A group that exists but whose
key is empty counts as unflagged — that is the state Payload leaves behind when an
editor clears the picker.

## The renderer

```tsx
export default async function RenderBlocks({ data, precomputed, code, locale }) {
  if (!data?.length) return null

  // Only pay for either of these when something on this page actually uses them.
  const flagged = data.some((block) => flagOf(block))
  const ruleset = flagged ? await getRuleset() : null
  const catalog = buildCatalog(ruleset)

  return data.map((block) => {
    const flag = flagOf(block)
    if (!flag) return renderBlock(block, block.id)

    // Already decided, before this render started: proxy resolved it against the
    // full attribute set and encoded the answer into the URL, so this page *is*
    // the page for that answer. Nothing to evaluate, nothing to stream, whatever
    // the flag targets.
    if (precomputed && flag.key in precomputed)
      return renderBlock(applyFlag(block, flag, precomputed[flag.key]), block.id)

    const entry = catalog.find((c) => c.key === flag.key)

    // Not precomputed, but still answerable from the URL: a flag with no rules is
    // the same for everyone, and one targeting only `locale` is settled by the
    // path. An unknown flag lands here too and resolves to the base module, so a
    // provider outage cannot drag every flagged page out of its prerender.
    if (!entry || isUrlDetermined(entry, ['locale'])) {
      // Only what this route carries. Handing the evaluator anything else puts a
      // per-visitor answer into a response everyone shares.
      const value = evaluateValueWith(ruleset, flag.key, { locale })
      return renderBlock(applyFlag(block, flag, value), block.id)
    }

    return (
      <Suspense key={block.id} fallback={<ModuleSkeleton />}>
        <TargetedBlock block={block} flag={flag} />
      </Suspense>
    )
  })
}

/**
 * A module whose flag targets the visitor, resolved per request.
 *
 * Nothing here may be cached: `readAttributes` reads cookies and headers, and a
 * shared cache entry keyed on one visitor's attributes serves their answer to
 * whoever lands on it next.
 */
async function TargetedBlock({ block, flag }) {
  const [ruleset, attributes] = await Promise.all([getRuleset(), readAttributes()])
  const value = evaluateValueWith(ruleset, flag.key, attributes)
  return renderBlock(applyFlag(block, flag, value), null)
}
```

## Three rules about the props

**Pass the locale in; never read it mid-render.** `await getLocale()` inside the
renderer only avoids reading `headers()` if some ancestor already primed the
request-locale cache — an ordering nothing enforces. When it does not hold, the
read becomes runtime data outside `<Suspense>` and takes the whole route out of
its prerender, reporting "uncached or runtime data during prerendering" against
this component rather than against the missing call. Every caller already resolved
the locale to fetch its content, so passing it is cheaper and impossible to get
wrong: **a prop cannot silently become a request read.**

**Pass decisions, never identities.** A user id passed as a prop into a cached
scope is not rejected the way `cookies()` is; one entry per variant quietly
becomes one per visitor and the page still looks right.

**The Suspense fallback is a neutral skeleton, never the base module.** Rendering
the base and replacing it flashes the content the flag exists to suppress. The
skeleton says "something is coming" without saying what, and reserves space so the
page does not jump — and it still collapses if the module turns out not to render,
which is the honest cost of deciding at request time. A module that cannot afford
that belongs in the precompute tier.
