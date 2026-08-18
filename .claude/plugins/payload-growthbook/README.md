# payload-growthbook

Task-scoped skills for running GrowthBook feature flags and experiments in a
**Payload CMS + Next.js App Router** app with **Cache Components** on.

Nine skills instead of one, because these are nine different sittings. Each one
loads only what its job needs; the bulky code lives in `reference/` files the
skill reads on demand.

| Skill | The job |
| --- | --- |
| `payload-growthbook:scan` | Audit an existing integration, tier every flag, rank the hazards. Read-only |
| `payload-growthbook:setup` | Wire the core: attributes, cached ruleset, evaluation, visitor cookie, endpoints, webhook |
| `payload-growthbook:new-flag` | Pick the archetype — fixed value, targeting, campaign, experiment, entitlement — and its tier |
| `payload-growthbook:add-to-module` | Flag a CMS block so editors drive variants with no deploy |
| `payload-growthbook:add-to-page` | Flag a route, page, layout or component without losing the prerender |
| `payload-growthbook:track` | Exposure and conversion, placed so caching cannot silently delete the data |
| `payload-growthbook:precompute` | Decide in proxy, rewrite to a signed segment, prerender one page per decision |
| `payload-growthbook:verify` | Prove it works — a checklist to run, local versus deployed |
| `payload-growthbook:retire` | Remove a flag without stranding rows or dropping columns in the wrong order |

Start with `scan` on a repo you did not write, `setup` on one with nothing.

## The premise

A flag decision is a pure function of two inputs: the **ruleset** (identical for
every visitor on Earth — ordinary cacheable content) and the **attributes**
(ordinary request data). Joining them is a hash and a walk over rules already in
memory.

**Cache the ruleset. Never cache the evaluation. Never cache the visitor.**

Everything else follows: flags do not make a page dynamic, the attribute a rule
targets decides where its answer may render, and nothing about a flag needs to be
declared in code — which is what keeps adding one out of the deploy path.

## Install

```
/plugin marketplace add <path-to>/.claude/plugins
/plugin install payload-growthbook@payload-growthbook
```

Then `/payload-growthbook:scan` (or any of the nine) from any project.

## Requirements

- Next.js 16.3+ with `cacheComponents: true`
- Payload 3
- `@growthbook/growthbook` — the SDK, **not** `@flags-sdk/growthbook`, whose
  per-request fetch cannot be prerendered

## Related

Cache-correctness rules and the Cache Components failure catalogue are their own
subject; where a project carries a `nextjs-cache-components` skill, these skills
defer to it rather than restating it.
