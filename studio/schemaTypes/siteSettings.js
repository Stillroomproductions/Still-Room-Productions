export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'aboutText',
      title: 'About Text',
      type: 'text',
      description: 'Body text shown on the About page.',
    },
  ],
  preview: {
    select: {
      title: 'About Settings',
    },
  },
}
