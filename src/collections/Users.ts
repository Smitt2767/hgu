import {
  admin,
  adminField,
  asUser,
  canCreate,
  canDelete,
  canUpdateRole,
  canUpdateUser,
} from '@/access'
import type { CollectionConfig } from 'payload'
import { TESTABLE_STAGES } from './shared/stage'

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
    {
      name: 'previewStages',
      type: 'select',
      hasMany: true,
      label: 'Preview Stages',
      options: TESTABLE_STAGES.map((stage) => ({
        label: `${stage[0].toUpperCase()}${stage.slice(1)}`,
        value: stage,
      })),
      admin: {
        description:
          'Makes unpublished content at these stages visible to this account, both in the admin lists and in draft-mode previews. Editors and admins already see every stage, so this is only meaningful for the User role.',
      },
      access: {
        // Admin-only in both directions. This field grants access to unreleased
        // content, and `canUpdateUser` lets every user update their own document —
        // leaving it open would let a tester award themselves the beta stage, and
        // an editor hand it out on creation.
        create: adminField,
        update: adminField,
      },
    },
  ],
}
