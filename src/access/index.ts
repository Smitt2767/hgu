import { User } from '@/payload-types'
import type { Access, FieldAccess, Where } from 'payload'

export const admin: Access = ({ req: { user } }) => {
  return user?.role === 'admin'
}

export const canRead: Access = ({ req: { user } }) => {
  return Boolean(user)
}

export const canUpdateUser: Access<User> = ({ req: { user } }) => {
  if (user?.role === 'admin') {
    return true
  }

  if (user?.role === 'editor') {
    return {
      or: [{ role: { equals: 'user' } }, { id: { equals: user.id } }],
    } as Where
  }

  return {
    id: {
      equals: user?.id,
    },
  }
}

export const canCreate: Access = ({ req: { user } }) => {
  return user?.role === 'admin' || user?.role === 'editor'
}

export const canUpdate: Access = ({ req: { user } }) => {
  return user?.role === 'admin' || user?.role === 'editor'
}

export const canDelete: Access = ({ req: { user } }) => {
  return user?.role === 'admin'
}

export const canUpdateRole: FieldAccess = ({ req: { user } }) => {
  return user?.role === 'admin' || user?.role === 'editor'
}
