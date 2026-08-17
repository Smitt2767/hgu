/**
 * Public surface of the flag setup, for callers outside `src/flags`.
 *
 * Nothing here declares a flag, and nothing ever will. Flags are created in
 * GrowthBook and attached to modules in Payload; the code only ever reads the
 * ruleset and evaluates against it, which is what keeps adding a flag out of the
 * deploy path entirely.
 */

export type { Attributes } from '@/flags/attributes'
export { VISITOR_COOKIE, readAttributes, resolveAttributes } from '@/flags/attributes'
export { audienceOf, type Audience } from '@/flags/audience'
export { evaluateValueWith } from '@/flags/evaluate'
export { RULESET_TAG, getRuleset } from '@/flags/ruleset'
