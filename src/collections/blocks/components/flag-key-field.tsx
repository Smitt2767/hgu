'use client'

import { isUrlDetermined, rendersByDefault, type CatalogEntry } from '@/flags/catalog'
import { FieldLabel, SelectInput, useField, useForm } from '@payloadcms/ui'
import type { FormState, TextFieldClientComponent } from 'payload'
import { useEffect, useState } from 'react'

type Catalog = {
  reachable: boolean
  flags: CatalogEntry[]
}

type State = { status: 'loading' } | { status: 'ready'; catalog: Catalog } | { status: 'failed' }

type RowData = {
  whenValue?: string | null
  render?: boolean | null
}

/**
 * The flag picker, fed live by `/api/flags/catalog`.
 *
 * Payload's `select` options are baked into the config at build time, so a dropdown
 * of flags that exist right now has to be a custom component backed by an endpoint.
 * That is the point rather than a workaround: create a feature in GrowthBook, reload
 * this page, and it is in the list — no code change and no deploy.
 *
 * Picking a flag also writes the value rows immediately, in the browser. The save
 * hook (`collections/shared/flags.ts`) derives exactly the same rows and remains the
 * authority — it has to, since the Local API and the MCP plugin write documents this
 * component never sees. But leaving it to the server alone meant picking a flag,
 * seeing an empty "Values" box, and having to save before anything appeared. Both
 * ends derive from `catalog`, so they cannot disagree.
 */
export const FlagKeyField: TextFieldClientComponent = ({ field, path, schemaPath, readOnly }) => {
  const { value, setValue, showError } = useField<string>({ path })
  const { addFieldRow, getDataByPath, removeFieldRow } = useForm()
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/flags/catalog', { credentials: 'same-origin', signal: controller.signal })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(new Error(`${response.status}`)),
      )
      .then((catalog: Catalog) => setState({ status: 'ready', catalog }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        console.error('[flags] could not load the catalog', error)
        setState({ status: 'failed' })
      })

    return () => controller.abort()
  }, [])

  const flags = state.status === 'ready' ? state.catalog.flags : []
  const selected = flags.find((entry) => entry.key === value)

  const options = flags.map((entry) => ({ label: entry.key, value: entry.key }))

  // A key the catalog does not offer still has to be selectable, or the field would
  // render blank and the next save would quietly clear it. That happens whenever the
  // ruleset is unreachable, and whenever a flag is deleted in GrowthBook while a page
  // still points at it.
  if (value && !selected) options.unshift({ label: `${value} (not in GrowthBook)`, value })

  // Siblings of `key` within the same `flag` group.
  const rowsPath = siblingPath(path)
  const rowsSchemaPath = siblingPath(schemaPath ?? path)

  /**
   * Rebuilds the rows for a newly chosen flag.
   *
   * Only ever called from `onChange`, never from an effect. Rows loaded from the
   * document already carry an editor's overrides, and rebuilding them on mount would
   * throw that away — the one thing this must not do. Changing the flag discards
   * them too, but there the rows belong to a different flag and mean nothing.
   */
  const rebuildRows = (entry?: CatalogEntry) => {
    const current = (getDataByPath(rowsPath) as RowData[] | undefined) ?? []

    // Backwards: removing by index shifts everything after it.
    for (let index = current.length - 1; index >= 0; index--) {
      removeFieldRow({ path: rowsPath, rowIndex: index })
    }

    if (!entry) return

    // Re-picking the same flag keeps each row's rendering choice, so an editor who
    // cleared the field by accident does not lose the kill switch they set up.
    const previous = new Map(
      current.filter((row) => row?.whenValue).map((row) => [row.whenValue as string, row]),
    )

    entry.values.forEach((flagValue, index) => {
      const whenValue = JSON.stringify(flagValue)
      const render = previous.get(whenValue)?.render ?? rendersByDefault(entry.type, flagValue)

      addFieldRow({
        path: rowsPath,
        schemaPath: rowsSchemaPath,
        rowIndex: index,
        subFieldState: {
          whenValue: { initialValue: whenValue, value: whenValue },
          render: { initialValue: render, value: render },
          orphaned: { initialValue: false, value: false },
        } as FormState,
      })
    })
  }

  return (
    <div className="field-type">
      <FieldLabel label={field.label} path={path} />
      <SelectInput
        name={field.name}
        path={path}
        options={options}
        value={value ?? ''}
        isClearable
        readOnly={readOnly}
        showError={showError}
        placeholder={placeholderFor(state)}
        onChange={(option) => {
          const next = Array.isArray(option) ? option[0] : option
          const key = next?.value ?? null

          if (key === (value ?? null)) return

          setValue(key)
          rebuildRows(flags.find((entry) => entry.key === key))
        }}
      />
      <Hint state={state} selected={selected} hasValue={Boolean(value)} />
    </div>
  )
}

function Hint({
  state,
  selected,
  hasValue,
}: {
  state: State
  selected?: CatalogEntry
  hasValue: boolean
}) {
  const description = (text: string) => <p className="field-description">{text}</p>

  if (state.status === 'loading') return description('Loading flags…')

  if (state.status === 'failed') {
    return description(
      'Could not reach the flag list. You can still save — an existing flag is left untouched.',
    )
  }

  // Worth separating from "no flags exist yet": both render as an empty dropdown, and
  // only one of them is something to fix.
  if (!state.catalog.reachable) {
    return description(
      'GrowthBook is unreachable, so the list is empty. Existing flags on saved pages keep working from the last cached ruleset.',
    )
  }

  if (state.catalog.flags.length === 0) {
    return description('No flags in GrowthBook yet. Create one there and reload this page.')
  }

  if (!hasValue) {
    return description('Leave empty and this module renders for everyone, as it does today.')
  }

  if (!selected) return null

  return description(
    `${selected.type} · serves ${selected.values.map(readable).join(', ')} · ${whereItRenders(selected)}`,
  )
}

/**
 * Where this flag's decision is actually made, in the terms an editor cares about.
 *
 * Never derived from `tier` alone. `tier` says where a flag *could* live, which is a
 * different question from where it does — and an earlier version of this hint said
 * "still fully prerendered" about a module that visibly streamed behind a
 * placeholder, describing a future state as if it were the current one.
 *
 * `precomputed` comes from the endpoint, which runs the same selection proxy and the
 * build run, so the admin cannot disagree with what ships. `isUrlDetermined` covers
 * the rest: no rules at all, or targeting only what the path already carries.
 */
function whereItRenders(entry: CatalogEntry): string {
  // Checked first: an identity flag is never precomputed or url-determined, and
  // "personal" is the more important thing to say about it than "streamed".
  if (entry.tier === 'private') return 'personal to each visitor, never shared'

  if (entry.precomputed) return 'decided before the page is sent, whatever it targets'

  if (isUrlDetermined(entry, ['locale'])) {
    return entry.tier === 'static'
      ? 'same for everyone, in the page itself'
      : 'varies by locale, in the page itself'
  }

  return 'varies per visitor, streamed in after the page'
}

/** `layout.3.flag.key` → `layout.3.flag.rows`, for both paths and schema paths. */
function siblingPath(from: string): string {
  return `${from.split('.').slice(0, -1).join('.')}.rows`
}

function readable(value: unknown): string {
  return typeof value === 'string' ? value : JSON.stringify(value)
}

function placeholderFor(state: State): string {
  if (state.status === 'loading') return 'Loading…'
  if (state.status === 'failed') return 'Unavailable'
  return 'No flag — always render'
}
