export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',

  fields: [
    {
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      initialValue: 'Draft Still Room Productions',
    },

    {
      name: 'subheading',
      title: 'Sub Heading',
      type: 'text',
      initialValue:
        'Cinematic storytelling through visuals, editing, and creative production.',
    },

    {
      name: 'smallText',
      title: 'Small Text',
      type: 'string',
      initialValue: 'Creative Video Production Agency',
    },

    {
      name: 'ctaText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'View Projects',
    },

    {
      name: 'ctaLink',
      title: 'Button Link',
      type: 'string',
      initialValue: '#portfolio',
    },

    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],

  preview: {
    select: {
      title: 'heading',
      media: 'heroImage',
    },
  },
}