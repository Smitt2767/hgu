---
name: add-to-module
description: >
  Put a GrowthBook flag on a Payload block or module so editors choose what each
  flag value serves — hide the module, or override just the fields that differ —
  with no deploy and no per-block code. Use when asked to make a CMS module
  flaggable or A/B testable, to let marketing switch a module off, to serve
  different copy or images per variant from the CMS, to add the flag picker to
  the admin, or to resolve a flagged block correctly at render time under Cache
  Components.
---

# Flag a CMS module

The deliverable: an editor picks a flag on a block, sees **one row per value that
flag can serve**, and for each row decides whether the module renders and which of
its own fields differ. No deploy when a flag is added, no per-block code, and the
block component never learns a flag exists.

Assumes the core from `payload-growthbook:setup`, including the catalog endpoint.

## The model

```
flag.key                 the picker, fed by /api/flags/catalog
flag.rows[].whenValue    derived from the ruleset, read-only, stored as JSON
flag.rows[].render       checkbox — off means the module is skipped entirely
flag.rows[].orphaned     derived — the flag no longer serves this value
flag.rows[].overrides    the block's own fields, all optional
```

**Hiding is not a separate mode.** It is a row with `render` off. That is why a
three-arm experiment can have an arm that removes the module, and why a boolean
that started as a kill switch can grow variant copy later without changing shape.

**`whenValue` is stored as JSON.** It is what keeps the string `"true"` and the
boolean `true` from matching each other — a real possibility, since a flag's type
can change in the dashboard without your code hearing about it.

## Build it in this order

**1 — The field wrapper.** `withFlags(block)` appends one `flag` group to a
block's fields, with the overrides derived from `block.fields` itself. Code and
the full rationale: `reference/field.md`. Deriving the overrides is what makes
this work for every block, including ones added later, with no per-block code —
and it enforces the constraint every flag platform lands on: **a variant is
structurally the same module**, so it cannot drift into a different one.

**2 — Apply it narrowly at first.** `withFlags(OneBlock)` in one collection, not
`withFlags.all(...)` across the site. Every flagged block adds columns and tables;
a wide rollout is a large migration for modules nobody has flagged yet.

**3 — The admin components.** A picker fed live by the catalog endpoint, and a row
label so the collapsed list reads as the rule it encodes (`false → hidden`,
`urgency → shown`) rather than "Value 1, Value 2". Payload bakes `select` options
into the config at build time, so a dropdown of flags that exist *right now* has
to be a custom component backed by an endpoint. That is the point, not a
workaround.

**4 — Migrations.** If your project has schema push disabled, generate and run the
migration now, before the field reaches anyone's branch. Note the identifier
length trap in `reference/field.md` — Postgres caps identifiers at 63 characters
and Payload names enums after the full path, which overflows on override fields.

**5 — Resolution at render.** One place reads flags: the block renderer. Code and
the tier logic: `reference/resolve.md`. Every block component stays untouched —
that is what stops flag checks leaking into seventeen components and becoming
impossible to remove.

## The six behaviours that are load-bearing

Each of these is the difference between a flag system and a way to lose content.

1. **A value with no row renders the base module.** Add a variation in the
   dashboard that nobody has written copy for yet and the page keeps working. The
   failure mode of a flag system must never be a blank page — including when
   GrowthBook is unreachable and the value is `undefined`.
2. **An empty override inherits.** Blank, cleared, never touched — all the same
   thing. Payload stores a cleared text field as `''`, but nothing in the admin
   distinguishes that from "not set", and clearing a field plainly means "this
   variant does not change this". Honouring `''` produces a variant with no label.
   Test emptiness explicitly so `false` and `0` survive; a truthiness check
   silently drops every unticked checkbox override.
3. **A value the flag stopped serving keeps its row**, marked orphaned. Dropping it
   throws away copy someone wrote. Orphaned rows still *match* at render: if the
   value is somehow still being served, the copy written for it is a better answer
   than falling back to the base module.
4. **An unreachable GrowthBook changes nothing and blocks nothing.** The sync hook
   returns the rows untouched and validation passes. A provider outage must never
   rewrite documents or refuse a save.
5. **Rows are derived twice, on purpose** — in the browser when a flag is picked,
   and on the server when the document is saved. The server is the authority (the
   Local API, seed scripts and MCP plugins write documents the component never
   sees), but leaving it to the server alone means picking a flag, seeing an empty
   box, and having to save before anything appears. Both ends derive from the same
   catalog function, so they cannot disagree.
6. **The fallback for a streamed block is a neutral skeleton, never the base
   module.** Rendering the base and replacing it flashes the content the flag
   exists to suppress — worst of all for a kill switch, which would briefly show
   the thing it was turned off to hide.

## Where the decision happens

Three paths, chosen per block per request, all derived from the ruleset — so a
rule added in the dashboard moves a module between them with no code change:

| Block | Cost |
| --- | --- |
| No flag | rendered as before; **no ruleset fetch at all** |
| A flag the URL already answers | decided inline, module ships in the first HTML |
| A flag targeting the visitor | `<Suspense>`, streams in behind a skeleton |

Only pay for the ruleset when a block on this page actually carries a flag.

## Verify

- Pick a flag in the admin → rows appear immediately, before saving.
- Untick `render` on one row → that value ships **no markup**, not hidden markup.
- Clear an override field → the base value is inherited, not blanked.
- Add a variation in GrowthBook → save the page → a new row appears, no deploy.
- Delete a flag in GrowthBook → the page still renders the base module, and the
  picker still shows the key rather than clearing it on the next save.

Then `payload-growthbook:verify` for the deployed checks, and
`payload-growthbook:track` if any of these flags is an experiment.
