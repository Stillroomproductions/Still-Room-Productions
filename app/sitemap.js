// app/sitemap.js
import { client } from '../lib/sanityClient'

export const revalidate = 3600 // rebuild sitemap every hour

export default async function sitemap() {
  const baseUrl = 'https://stillroomproductions.com'

  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'monthly' },
    { url: `${baseUrl}/work`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/about`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/contact`, priority: 0.6, changeFrequency: 'yearly' },
  ].map(page => ({ ...page, lastModified: new Date() }))

  // Films — fetched live from Sanity, auto-updates as Gerald adds content
  // Note: Only homepage and film pages are included in the sitemap since this is a single-page scroll app.
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
