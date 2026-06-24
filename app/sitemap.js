import { client } from '../lib/sanityClient'

export const revalidate = 3600

export default async function sitemap() {
  const baseUrl = 'https://stillroomproductions.com'

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ]

  let filmPages = []
  try {
    const films = await client.fetch(
      `*[_type == "film" && defined(slug.current) && !(_id in path("drafts.**"))]
      { "slug": slug.current, _updatedAt }
      | order(_updatedAt desc)`
    )
    filmPages = films.map(film => ({
      url: `${baseUrl}/work/${film.slug}`,
      lastModified: new Date(film._updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  } catch (e) {
    console.error('Sitemap: failed to fetch films', e)
  }

  return [...staticPages, ...filmPages]
}
