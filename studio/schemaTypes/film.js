export default {
  name: 'film',
  title: 'Film',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Film Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'logline',
      title: 'Logline',
      type: 'string',
      description: 'One-line description of the film',
    },

    {
      name: 'synopsis',
      title: 'Synopsis',
      type: 'array',
      of: [{ type: 'block' }],
    },

    {
      name: 'status',
      title: 'Production Status',
      type: 'string',
      options: {
        list: [
          { title: 'In Development', value: 'In Development' },
          { title: 'Pre-Production', value: 'Pre-Production' },
          { title: 'In Production', value: 'In Production' },
          { title: 'Post-Production', value: 'Post-Production' },
          { title: 'Released', value: 'Released' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          { title: 'Feature Film', value: 'Feature Film' },
          { title: 'Short Film', value: 'Short Film' },
          { title: 'Documentary', value: 'Documentary' },
          { title: 'Web Series', value: 'Web Series' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },

    {
      name: 'director',
      title: 'Director',
      type: 'string',
    },

    {
      name: 'producer',
      title: 'Producer',
      type: 'string',
    },

    {
      name: 'runtime',
      title: 'Runtime',
      type: 'string',
      description: 'e.g., "22 min" or "78 min"',
    },

    {
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },

    {
      name: 'crew',
      title: 'Crew Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },

    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Link to Vimeo or YouTube video',
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
      status: 'status',
    },
    prepare({ title, media, status }) {
      return {
        title,
        media,
        subtitle: status || 'No status set',
      }
    },
  },
}
