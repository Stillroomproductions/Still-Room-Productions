import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tk6o47ip',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // Always fetch fresh content (required for ISR revalidation)
})

const builder = createImageUrlBuilder(client)

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
    // Return an empty URL rather than a hardcoded photograph. Callers treat a
    // missing URL as "no image" and skip the slot, which is safer than
    // silently substituting an unrelated picture nobody can change in Sanity.
    return {
      url: () => '',
      width: () => ({ url: () => '' })
    }
  }
}
