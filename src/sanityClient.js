import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'tk6o47ip',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  ignoreBrowserTokenWarning: true,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
export default client
