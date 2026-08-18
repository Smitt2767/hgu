---
name: precompute
description: >
  Prerender one page per flag decision by deciding in proxy and rewriting to a
  signed URL segment, so flagged content ships in the first HTML response instead
  of streaming — with the flag set derived from the ruleset rather than declared
  in code. Use when above-the-fold variants must not stream, when a flagged hero
  or pricing block is behind a skeleton, when composing a flag rewrite with an
  existing i18n middleware, or when setting up generateStaticParams over flag
  permutations. The most expensive tier — do it last.
---

# Precompute: decide before the render starts

Every other tier keeps the page static and lets the decision arrive at request
time, streaming each flag-dependent region behind `<Suspense>`. Precompute
inverts that: **proxy decides first, encodes the decision into a URL segment, and
rewrites to the page built for exactly that decision.** Nothing streams, because
nothing is undecided by the time rendering starts — whatever attribute produced
the answer.

Do it when the demo or the metric needs above-the-fold variants in the first HTML
response. Not before: everything works streamed, and this tier carries its own
risk.

## Why the URL has to carry the decision

A CDN keys its cache on the URL. A page that branched on a header without the URL
changing would be cached under one visitor's answer and served to the next.
Encoding the decision into the path makes the cache key **correct by
construction**.

The address bar never changes — proxy rewrites, it does not redirect.

## Do not use the Flags SDK's precompute

`precompute(flags)` and `generatePermutations(flags)` take an array of `flag()`
declarations and `serialize` encodes values **positionally**, by index into that
array. Both force a hand-maintained, append-only list in code — a deploy every
time an editor adds a flag or a value in the dashboard. That is the one property
this whole system exists to avoid.

Derive the set from the ruleset instead, by a rule both sides run, and encode
**self-describing key/value pairs**. Adding or removing a flag then cannot corrupt
an existing code: an older code simply lacks the new key, and that flag falls
through to the ordinary request-time path.

The cost is toolbar-style overrides, which only work through `flag()`.

## The four pieces

| Piece | File | Reference |
| --- | --- | --- |
| Which flags qualify, and every permutation | `src/flags/precompute.ts` | `reference/encoding.md` |
| Sign / encode / decode the segment | same | `reference/encoding.md` |
| Decide and rewrite | `src/proxy.ts` | `reference/proxy.md` |
| Build the pages, decode the segment | `app/[locale]/[code]/…/page.tsx` | `reference/route.md` |

**Proxy and the build must agree exactly**, and proxy runs at the edge with no
database — so the selection rule can only read the ruleset, the one input both
sides share. Keep it deterministic: same ruleset in, same set out, no ordering
luck. When they do disagree — a flag added since the last build — the failure is
soft: the code misses the prebuilt set and the page renders on demand, then caches.

## What may be precomputed

Almost everything, because the decision is made in proxy where every attribute
exists. Country, device, campaign, experiment bucket — all collapse into a value,
and only the value reaches the URL. Two exclusions:

- **Identity-targeted flags. Never.** A rule forcing a value for specific `id`s has
  an answer that belongs to one account, and a shared page carrying it is served to
  whoever lands on it next. This is the worst failure available here and the only
  one the exclusion list exists to prevent.
- **Wide value domains.** They multiply the page count fastest for the least
  benefit. A cost decision, not a correctness one.

**Experiments are included, and that is safe only because exposure is tracked on
the client.** An exposure fired inside a prerendered render fires once per *build*
while conversions keep attaching to every visitor. A client component fires on
each page view whether the HTML was prerendered or not, which is what makes this
sound. Move exposure into a server component inside these pages and the data goes
quietly wrong. `payload-growthbook:track` first.

Assignment itself is unaffected: an experiment hashes the identifier, so a third
of visitors share a variant, and a shared decision is exactly what a shared page
may carry. That is different from an identity *force* rule.

## Bound the page count in code, not in memory

Page count is now a product of things edited in a dashboard, so it needs limits
that do not depend on anyone remembering:

- **Max values per flag** (~4). The permutation count is a product, so one wide
  flag costs more than several narrow ones. Anything wider is better streamed.
- **Max permutations** (~32), trimming **widest flag first** with a stable
  tie-break so proxy and the build trim identically. What exceeds the cap still
  *works* — it renders on demand and caches — it just is not prebuilt.
- **Warn on overlong codes.** A prerendered page is a file named after its code and
  most filesystems stop at 255 bytes; a self-describing encoding grows with the
  number of flags. Past the limit the build fails on a *filename*, with nothing to
  connect it to the number of flags.

**Warn loudly when an experiment is dropped from the set.** It keeps running and
quietly stops being measured — variants still serve, conversions still arrive, and
no dashboard shows the denominator went missing.

## Composing with an existing i18n middleware

Mutate the i18n response rather than building a new one. It returns either a
rewrite or a plain `next()`, and in both cases it has already attached its locale
header and cookie; constructing a fresh `NextResponse.rewrite()` silently drops
all of that. Edit the two headers that distinguish the shapes instead. Full code
in `reference/proxy.md`.

Skip entirely when the response carries a `location` — a redirect has no
downstream render to target.

## Verify

- `next build` lists the permutation pages; the count matches
  locales × codes × pages.
- Requesting the clean path returns the variant's markup **in the first response**
  — assert byte position, not presence: content still pending when the shell
  flushed is appended after `</main>`.
- Two visitors who bucket differently get different HTML from the same clean URL,
  **on a deployment**.
- A tampered code renders the base content rather than an error page.
- Exposure count still equals the number of page views. This is the check that
  catches the whole tier going wrong quietly.
