export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Short Film', value: 'Short Film' },
          { title: 'Feature Film', value: 'Feature Film' },
          { title: 'Television', value: 'Television' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'In Development', value: 'In Development' },
          { title: 'Post-Production', value: 'Post-Production' },
          { title: 'Released', value: 'Released' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
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
      name: 'images',
      title: 'Project Images',
      description: 'Add up to 3 images. First image is the hero, second and third appear below the project info.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: Rule => Rule.max(3)
    },
    {
      name: 'slug',
      title: 'Page URL',
      type: 'slug',
      description: 'Click Generate after filling in the title. Required for individual project pages.',
      options: { source: 'title', maxLength: 96 }
    },
    {
      name: 'trailerUrl',
      title: 'Trailer URL',
      type: 'url',
    },
    {
      name: 'cast',
      title: 'Cast',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'actorName', title: 'Actor Name', type: 'string' },
          { name: 'characterName', title: 'Character Name', type: 'string' }
        ]
      }]
    },
    {
      name: 'festivalSelections',
      title: 'Festival Selections',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'pressQuotes',
      title: 'Press Quotes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
            },
            {
              name: 'source',
              title: 'Source',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'visibleOnSite',
      title: 'Visible on site',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.integer(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'images.0',
    },
  },
}
