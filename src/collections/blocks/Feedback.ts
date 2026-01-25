import { Block } from 'payload'

export const Feedback: Block = {
  slug: 'feedback',
  imageURL: '/images/blocks/feedback.png',
  labels: {
    singular: 'Feedback',
    plural: 'Feedback',
  },
  fields: [
    {
      name: 'questionText',
      type: 'text',
      localized: true,
      label: 'Question Text',
      admin: {
        description:
          'Initial consent question (e.g., "Did anything here shift how you think about Jesus?").',
      },
    },
    {
      name: 'yesButtonLabel',
      type: 'text',
      localized: true,
      label: 'Yes Button Label',
      defaultValue: 'Yes',
      admin: {
        description: 'Text for positive consent button. Default: "Yes".',
      },
    },
    {
      name: 'noButtonLabel',
      type: 'text',
      localized: true,
      label: 'No Button Label',
      defaultValue: 'No',
      admin: {
        description: 'Text for negative consent button. Default: "No".',
      },
    },
    {
      name: 'yesFormTitle',
      type: 'text',
      localized: true,
      label: 'Yes Form Title',
      admin: {
        description: 'Title shown when user clicks Yes (e.g., "We\'re so glad...").',
      },
    },
    {
      name: 'noFormTitle',
      type: 'text',
      localized: true,
      label: 'No Form Title',
      admin: {
        description: 'Title shown when user clicks No (e.g., "We\'d love to hear more...").',
      },
    },
    {
      name: 'formFields',
      type: 'group',
      label: 'Form Fields',
      fields: [
        {
          name: 'firstName',
          type: 'checkbox',
          label: 'First Name',
          defaultValue: true,
          admin: {
            description: 'Include First Name field (optional).',
          },
        },
        {
          name: 'lastName',
          type: 'checkbox',
          label: 'Last Name',
          defaultValue: true,
          admin: {
            description: 'Include Last Name field (optional).',
          },
        },
        {
          name: 'email',
          type: 'checkbox',
          label: 'Email',
          defaultValue: true,
          admin: {
            description: 'Include Email field (required).',
          },
        },
        {
          name: 'message',
          type: 'checkbox',
          label: 'Message',
          defaultValue: true,
          admin: {
            description: 'Include Message textarea (required).',
          },
        },
      ],
      admin: {
        description:
          'First Name (optional), Last Name (optional), Email (required), Message textarea (required). All use floating labels with yellow borders.',
      },
    },
    {
      name: 'privacyCheckbox',
      type: 'checkbox',
      label: 'Privacy Checkbox',
      required: true,
      defaultValue: true,
      admin: {
        description:
          'Required acknowledgment checkbox with link to privacy policy. Must be checked to submit.',
      },
    },
    {
      name: 'contactCheckbox',
      type: 'checkbox',
      label: 'Contact Checkbox',
      defaultValue: false,
      admin: {
        description: 'Optional checkbox allowing user to consent to future contact.',
      },
    },
    {
      name: 'privacyLink',
      type: 'relationship',
      label: 'Privacy Link',
      relationTo: 'links',
      admin: {
        description: 'URL to your privacy policy page.',
      },
    },
    {
      name: 'backButton',
      type: 'text',
      localized: true,
      label: 'Back Button',
      defaultValue: 'Back',
      admin: {
        description: 'Returns to consent question. Default: "Back".',
      },
    },
    {
      name: 'submitButton',
      type: 'text',
      localized: true,
      label: 'Submit Button',
      defaultValue: 'Submit',
      admin: {
        description: 'Submits the form. Default: "Submit".',
      },
    },
    {
      name: 'successTitle',
      type: 'text',
      localized: true,
      label: 'Success Title',
      defaultValue: 'Thank You',
      admin: {
        description: 'Title displayed after successful form submission. Default: "Thank You".',
      },
    },
    {
      name: 'successDescription',
      type: 'textarea',
      localized: true,
      label: 'Success Description',
      admin: {
        description: 'Message displayed after successful form submission.',
      },
    },
  ],
}
