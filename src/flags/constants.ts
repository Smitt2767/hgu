/**
 * Deliberately import-free.
 *
 * proxy.ts needs the cookie name, and pulling it from `@/flags/attributes` would
 * drag `next/headers` and the Flags SDK into the proxy bundle — neither belongs
 * there. Anything proxy and the render both need lives in this file.
 */

/**
 * Anonymous visitor id. Every experiment hashes on this, so a visitor who loses
 * it is re-bucketed and their conversions land in the wrong arm.
 *
 * `httpOnly`: an id JavaScript can rewrite is an id an injected script can use to
 * move someone between variants.
 */
export const VISITOR_COOKIE = 'hgu_vid'

export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365
