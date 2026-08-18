---
name: add-to-page
description: >
  Read a GrowthBook flag at route, page, layout or component scope in a Payload +
  Next.js App Router app — a whole-page variant, a gated route or section, a
  flagged nav or banner, or metadata that depends on a flag — without taking the
  route out of its prerender. Use when a flag decides something larger than one
  CMS block, when gating a page behind a beta entitlement, when redirecting or
  404ing on a flag, or when a flag read has made a page dynamic.
---

# Flag a page, a route, or a component

Four shapes, and picking the wrong one is what makes a page go dynamic. Assumes
the core from `payload-growthbook:setup`.

| What you want | Do it |
| --- | --- |
| Whole page looks different | a flag field on the page document, or two pages and a proxy rewrite |
| A route is gated | in **proxy**, before any render |
| A section, nav or banner branches | read at the smallest scope that needs it |
| Metadata depends on a flag | only if the flag is URL-determined — see below |

## Where a flag may be read

The rule is the same everywhere and it is about **who else gets the same answer**:

| Answer belongs to | Read it | Cost |
| --- | --- | --- |
| everyone | inline, in the shell | free |
| everyone on this URL | inline, passing only URL-derived attributes | free |
| this visitor, shared by many | inside `<Suspense>` | one streamed region |
| this person only | `use cache: private`, or uncached | never shared |

Evaluating a flag is a hash over rules already in memory, so **reading one is not
what makes a page dynamic** — reading `cookies()`, `headers()`, `searchParams` or
unresolved `params` outside `<Suspense>` is. Keep the two apart when diagnosing.

## Whole-page variants

**Prefer a flag field on the page document.** The same wrapper that flags a block
(`payload-growthbook:add-to-module`) applies to a collection's own fields: an
editor picks a flag, and each value overrides page-level fields or hides sections.
Editors keep control and nothing new is declared in code.

**Two genuinely different pages are a routing problem, not a rendering one.** Let
proxy decide and rewrite; the address bar stays clean and the CDN keys on the
rewritten path. That is `payload-growthbook:precompute` — do not branch a page's
body on a header, because a CDN would cache one visitor's answer under the shared
URL and serve it to the next.

## Gating a route

Do it in **proxy**, not in the page. Proxy runs before any render exists, so a
redirect or a 404 there costs nothing and leaks nothing.

A page that calls `redirect()` or `notFound()` on request data has already started
rendering — it must read cookies to decide, which forces the route dynamic, and
the shell it would have prerendered no longer exists.

For an entitlement gate specifically: **never cache the gated answer in a shared
scope**. Either resolve it in proxy, or render it in `use cache: private`, or do
not cache it. A prerendered page that says "you have access" is served to whoever
lands on that URL next.

## Sections, navs and banners

Read the flag at the smallest scope that needs the answer, and pass the *decision*
down as a prop rather than passing identity in.

```tsx
export default async function Layout({ children }) {
  return (
    <>
      {/* streams; the rest of the layout is still prerendered */}
      <Suspense fallback={<BannerSkeleton />}>
        <PromoBanner />
      </Suspense>
      {children}
    </>
  )
}

async function PromoBanner() {
  const [ruleset, attributes] = await Promise.all([getRuleset(), readAttributes()])
  const value = evaluateValueWith(ruleset, 'promo-banner', attributes)
  if (!value) return null
  return <Banner variant={value} />
}
```

**A flag in a layout costs its streamed region on every route beneath it.** That
is usually the right trade for a site-wide banner and the wrong one for something
only the home page shows. Push the read down to where it matters.

**A client component may render the variant but must not decide it.** Shipping the
rule to the browser means shipping the whole ruleset; decide on the server and
pass the value.

## Metadata

`generateMetadata` runs as part of the shell. A flag read there is fine **only if
it is URL-determined** — no rules, or targeting only what the path already
carries. Anything else reads request data and takes the route out of its
prerender, and under precompute it also means titles differ per variant, which is
rarely what anyone wanted.

## Cache Components rules you will hit here

- **`params` is runtime data**, even when `generateStaticParams` enumerates every
  value. Hand the unresolved promise into a `use cache` scope and `await` it in
  there.
- **A throw inside `use cache` fails the build**, even when the caller catches it.
  Cached scopes return failure as a value.
- **Never `await` a cached scope inside `use cache: private`.** It builds, it
  passes locally, and it fails on deployment. Watch for indirect reach — the
  awaited call may be three functions deep before it touches a cached scope.
- **A local success is not evidence about serverless.** Plain `use cache` is
  in-process memory; on a long-lived local server that is a real cache, and on
  serverless the same code may be no cache at all.

If the repo carries a `nextjs-cache-components` skill, it is the full catalogue.

## Verify

- The route still prerenders: `next build` reports it static, and the flagged
  region is the only thing streaming.
- Two visitors who should differ do differ **on a deployment**, not just locally.
- A gated page returns the same response to an unentitled visitor after an
  entitled one has loaded it. This is the check that catches a shared cache
  holding a personal answer, and nothing else catches it.

Then `payload-growthbook:track` if the flag is an experiment.
