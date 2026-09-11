export default {
  name: 'work',
  title: 'Work / Portfolio Page',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Work',
    },

    {
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'string',
    },

    {
      name: 'description',
      title: 'Page Description',
      type: 'text',
    },

    {
      name: 'films',
      title: 'Featured Films',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'film' }],
        },
      ],
      description: 'Select and order the films to display on the portfolio page',
    },
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
}
