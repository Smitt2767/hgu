/**
 * Public surface of the flag setup.
 *
 * **No flags are declared yet, on purpose.** Everything here is the plumbing a
 * flag needs — a cached ruleset, attribute resolution, an evaluator, and the
 * prerender escape hatch. Declaring the first flag means adding a `flag()` call
 * to this file and listing it in the discovery endpoint.
 */

export type { Attributes } from '@/flags/attributes'
export { VISITOR_COOKIE, identify, readAttributes, resolveAttributes } from '@/flags/attributes'
export { evaluate, evaluateWith } from '@/flags/evaluate'
export { RULESET_TAG, getRuleset } from '@/flags/ruleset'

/**
 * Resolves a flag against a synthetic request so it can be read during a
 * prerender. Wrap every Tier 0 flag in this; call none of them directly.
 *
 * An ordinary `flag()` call reads `headers()` and `cookies()` unconditionally —
 * before `identify` is ever consulted — because every invocation checks for a
 * Vercel Toolbar override and overrides live in a cookie. That alone makes the
 * surrounding scope unprerenderable, and dropping `identify` does not help.
 * Handing the flag a Request takes the branch that never touches `next/headers`.
 *
 * Per call, deliberately. Memoising the Request in a module constant would
 * outlive every invalidation, because the SDK keys its own cache on the identity
 * of the headers object.
 *
 * **Only for flags with no targeting.** The stand-in carries no cookies and no
 * headers, so a flag consulting `identify` would see nothing and mis-target
 * rather than fail loudly.
 */
export function readStatic<T>(f: (request: Request) => Promise<T>): Promise<T> {
  return f(new Request('https://prerender.invalid/'))
}
