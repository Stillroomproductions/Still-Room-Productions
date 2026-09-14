const CROP_HELP =
  'After uploading, click the crop icon on the image and drag the circle over the part ' +
  'that must always stay visible. The site keeps that point in frame at every screen ' +
  'size, so nothing important is cut off on mobile.'

export default {
  name: 'hero',
  title: 'Homepage',
  type: 'document',

  fields: [
    {
      name: 'heroImage',
      title: 'Background Image',
      type: 'image',
      description: `The large image behind the homepage title. ${CROP_HELP}`,
      options: {
        hotspot: true,
      },
    },

    {
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      description: 'The large text over the homepage image.',
      initialValue: 'Still Room Productions',
    },

    {
      name: 'subheading',
      title: 'Sub Heading',
      type: 'text',
      description: 'The smaller line of text below the heading.',
      initialValue:
        'Develops formally restrained film and television work about systems, procedure, memory, and moral pressure.',
    },

    {
      name: 'smallText',
      title: 'Small Text',
      type: 'string',
      description: 'Optional. Not currently shown on the site.',
    },

    {
      name: 'ctaText',
      title: 'Button Text',
      type: 'string',
      description: 'Optional. Not currently shown on the site.',
    },

    {
      name: 'ctaLink',
      title: 'Button Link',
      type: 'string',
      description: 'Optional. Not currently shown on the site.',
    },
  ],

  preview: {
    select: {
      title: 'heading',
      media: 'heroImage',
    },
    prepare({title, media}) {
      return {title: title || 'Homepage', subtitle: 'Homepage hero', media}
    },
  },
}
