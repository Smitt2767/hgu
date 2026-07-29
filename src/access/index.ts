import type { TestableStage } from '@/collections/shared/stage'
import { User } from '@/payload-types'
import type { Access, BaseFilter, FieldAccess, TypedUser, Where } from 'payload'

/**
 * Narrows `req.user` to an actual CMS user.
 *
 * The MCP plugin registers `payload-mcp-api-keys` as a second auth collection,
 * which widens `req.user` to a union where `role` no longer exists on every
 * member. That is not just a typing detail: Payload's REST API accepts
 * `Authorization: payload-mcp-api-keys API-Key <key>`, so an MCP key can
 * authenticate as the key document itself and bypass the per-collection
 * capabilities configured for it. Requiring the `users` collection here means
 * such a request holds no role and satisfies no check below.
 */
export const asUser = (user: TypedUser | null) => (user?.collection === 'users' ? user : null)

export const admin: Access = ({ req: { user } }) => {
  return asUser(user)?.role === 'admin'
}

export const canRead: Access = ({ req: { user } }) => {
  return Boolean(asUser(user))
}

/** Pre-release stages this user was granted, per `previewStages` on their account. */
const grantedStages = (user: User): TestableStage[] => user.previewStages ?? []

const PUBLISHED: Where = { _status: { equals: 'published' } }

/** Unpublished documents currently sitting at one of the given stages. */
const stagedDrafts = (stages: TestableStage[]): Where => ({
  and: [{ _status: { equals: 'draft' } }, { stage: { in: stages } }],
})

/**
 * Read access for content released in stages — see `collections/shared/stage.ts`.
 *
 * Editors and admins read everything. Everyone else reads published documents,
 * plus unpublished ones whose `stage` was granted to them. Returning a `Where`
 * rather than a boolean is what makes this work on both query paths: for a
 * `draft: true` query Payload rewrites the constraint to `version._status` /
 * `version.stage` (`appendVersionToQueryKey`) and applies it to the latest
 * version row, so asking for a document above your stage yields zero results
 * instead of a 403 that would confirm the document exists.
 *
 * Anonymous requests and non-`users` authentications stay denied outright, which
 * is what `canRead` — still the gate on the unstaged collections — does. See the
 * note on `asUser` for why MCP API keys must not slip through.
 */
export const canReadStaged: Access = ({ req: { user } }) => {
  const currentUser = asUser(user)

  if (!currentUser) {
    return false
  }

  if (currentUser.role === 'admin' || currentUser.role === 'editor') {
    return true
  }

  const stages = grantedStages(currentUser)

  if (stages.length === 0) {
    return PUBLISHED
  }

  return { or: [PUBLISHED, stagedDrafts(stages)] }
}

/**
 * Narrows the admin list view — and Lexical's internal-link picker — to the
 * stages a tester was granted, so an alpha tester opening Pages sees the pages
 * currently in alpha and nothing else.
 *
 * Presentation only. `canReadStaged` is the gate that actually holds; a base
 * filter is trivially removed by editing the query string.
 */
export const stageBaseFilter: BaseFilter = ({ req }) => {
  const currentUser = asUser(req.user)

  if (!currentUser || currentUser.role === 'admin' || currentUser.role === 'editor') {
    return null
  }

  const stages = grantedStages(currentUser)

  if (stages.length === 0) {
    return null
  }

  return stagedDrafts(stages)
}

export const canUpdateUser: Access<User> = ({ req: { user } }) => {
  const currentUser = asUser(user)

  if (currentUser?.role === 'admin') {
    return true
  }

  if (currentUser?.role === 'editor') {
    return {
      or: [{ role: { equals: 'user' } }, { id: { equals: currentUser.id } }],
    } as Where
  }

  return {
    id: {
      equals: currentUser?.id,
    },
  }
}

export const canCreate: Access = ({ req: { user } }) => {
  const role = asUser(user)?.role
  return role === 'admin' || role === 'editor'
}

export const canUpdate: Access = ({ req: { user } }) => {
  const role = asUser(user)?.role
  return role === 'admin' || role === 'editor'
}

export const canDelete: Access = ({ req: { user } }) => {
  return asUser(user)?.role === 'admin'
}

export const canUpdateRole: FieldAccess = ({ req: { user } }) => {
  const role = asUser(user)?.role
  return role === 'admin' || role === 'editor'
}

/**
 * Field-level equivalent of `admin`, for fields that grant access and so must not
 * be writable by the account they apply to. `canUpdateUser` lets any user update
 * their own document, so a field left open here is a field users can award
 * themselves.
 */
export const adminField: FieldAccess = ({ req: { user } }) => {
  return asUser(user)?.role === 'admin'
}
