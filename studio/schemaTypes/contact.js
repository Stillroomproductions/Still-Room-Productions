export default {
  name: 'contact',
  title: 'Contact Page',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Contact',
    },

    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      initialValue: 'INFO@STILLROOMPRODUCTIONS.COM',
      validation: (Rule) => Rule.required().email(),
    },

    {
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'London, UK',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },

    {
      name: 'message',
      title: 'Additional Message',
      type: 'text',
    },

    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Vimeo', value: 'vimeo' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter', value: 'twitter' },
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
}
