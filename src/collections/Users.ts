import { admin, asUser, canCreate, canDelete, canUpdateRole, canUpdateUser } from '@/access'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    description: 'Manage user accounts and authentication credentials.',
  },
  auth: true,
  access: {
    read: canUpdateUser,
    update: canUpdateUser,
    delete: canDelete,
    create: canCreate,
    unlock: admin,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      filterOptions({ options, req }) {
        if (asUser(req.user)?.role === 'admin') {
          return options
        }

        return options.filter((option) =>
          typeof option === 'string' ? option !== 'admin' : option.value !== 'admin',
        )
      },
      access: {
        update: canUpdateRole,
      },
    },
  ],
}
