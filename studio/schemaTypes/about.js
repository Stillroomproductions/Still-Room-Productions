export default {
  name: 'about',
  title: 'About Page',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About',
    },

    {
      name: 'content',
      title: 'About Content',
      type: 'array',
      of: [{ type: 'block' }],
      initialValue: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Still Room Productions is a London-based independent production company developing restrained, formally precise work for film and television. Its projects observe people at the point where private life meets process, record, and procedure.',
            },
          ],
        },
      ],
    },

    {
      name: 'image',
      title: 'About Image',
      type: 'image',
      description:
        'The photograph on the About section. After uploading, click the crop icon and ' +
        'drag the circle over the part that must always stay visible (usually a face). ' +
        'This slot is a wide landscape shape, so on a portrait photo the hotspot is what ' +
        'stops the top of the head being cut off.',
      options: {
        hotspot: true,
      },
    },

    {
      name: 'imageCaption',
      title: 'Image Caption',
      type: 'string',
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}
