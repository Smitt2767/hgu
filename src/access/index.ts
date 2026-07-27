import { User } from '@/payload-types'
import type { Access, FieldAccess, TypedUser, Where } from 'payload'

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
