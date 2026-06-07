import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'tk6o47ip',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => {
  if (!source) {
    return { url: () => '', width: () => ({ url: () => '' }) }
  }
  if (typeof source === 'string' && (source.startsWith('http') || source.startsWith('/'))) {
    return {
      url: () => source,
      width: () => ({ url: () => source })
    }
  }
  try {
    return builder.image(source)
  } catch (e) {
    return {
      url: () => '/images/_52A6916.jpg',
      width: () => ({ url: () => '/images/_52A6916.jpg' })
    }
  }
}
