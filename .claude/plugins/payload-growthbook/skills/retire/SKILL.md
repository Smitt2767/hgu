---
name: retire
description: >
  Remove a GrowthBook flag from a Payload + Next.js app once it has served its
  purpose — a shipped experiment, a graduated beta, a kill switch nobody needs —
  without stranding CMS rows, dropping columns in the wrong order, or losing the
  variant copy that won. Use when asked to clean up, remove or graduate a flag,
  when an experiment has concluded, or when flag rows are cluttering the admin.
---

# Retire a flag

The order is the whole skill. Done backwards, this loses content or breaks a live
page; done forwards, nothing visible happens at any step.

## First: which variant won?

**The winning copy lives in the CMS rows, not in code.** Before anything else,
promote it: copy the winning row's overrides up into the block's own fields, so
the module renders the winner with no flag at all. Only then is the flag
removable.

A concluded experiment whose winning arm was "the module is hidden" graduates by
deleting the module, not by keeping a flag that hides it.

## Then, in this order

**1 — Make the flag serve one value.** In the dashboard, remove the rules and set
the default to the surviving value. Everyone now gets the winner, immediately and
without a deploy, and you can stop here for a day to be sure. This is the
reversible step; everything after it is not.

**2 — Confirm nothing depends on the variant any more.** Search the CMS for
documents referencing the key, and the code for it. The catalog endpoint lists
what still exists; the flag picker in the admin will show the key on any page
still pointing at it.

**3 — Clear the flag in the CMS.** Clearing the picker on each document leaves the
module rendering its own fields — which is why step 0 mattered. Do not delete the
flag in GrowthBook yet: while pages still reference it, the picker keeps showing
the key rather than clearing it, and rows go orphaned instead of disappearing.

**4 — Delete it in GrowthBook.** The app degrades gracefully by design — an
unknown key resolves to the base module — so this is safe once nothing points at
it. Any row left behind is marked orphaned and keeps its copy rather than being
dropped.

**5 — Remove the code, if any.** For a CMS-attached flag there usually is none.
For a route- or component-level flag, delete the read and the branch.

**6 — Remove the field, and only then the columns.** Taking `withFlags` off a
block is a **destructive migration** — every `flag` group, row and override column
for that block goes with it. Generate the migration, read what it drops, and keep
a backup of the affected documents. This is the step to do on its own, in its own
deploy, after everything above has been live long enough to be sure.

## What breaks if you reorder it

| Doing this first | Costs |
| --- | --- |
| Deleting the flag in GrowthBook | every page still pointing at it falls back to the base module — which may be the losing variant, silently |
| Dropping the field | the winning copy goes with the columns, unrecoverable without a backup |
| Removing the code | the CMS keeps offering a picker for a flag nothing reads, so editors configure variants that never render |

## Experiments have one extra step

Stop the experiment in the dashboard **before** removing the flag, and note the
date. Exposure and conversion rows keep arriving until the code stops running, and
rows that arrive after the analysis window quietly widen the denominator of a
result someone has already acted on.

If a tracked event name is no longer sent by anything, remove it from the ingest
allow-list too — an allow-list that outlives its events is a list nobody trusts.

## Verify

- The page renders the winning content with the flag gone, on a deployment.
- No warning about an unknown or orphaned key in the logs.
- The permutation count dropped, if the flag was precomputed — one fewer factor in
  the product.
- The migration ran, and the columns it dropped are the ones you expected.
