import { client } from '../lib/sanityClient'

export const revalidate = 3600 // rebuild sitemap every hour

export default async function sitemap() {
  const baseUrl = 'https://www.stillroomproductions.com'

  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'monthly' },
    { url: `${baseUrl}/work`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/contact`, priority: 0.7, changeFrequency: 'yearly' },
  ].map(page => ({ ...page, lastModified: new Date() }))

  // Films — fetched live from Sanity, auto-updates as Gerald adds content
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

  // Projects
  let projectPages = []
  try {
    const projects = await client.fetch(
      `*[_type == "project" && defined(slug.current) && !(_id in path("drafts.**"))]
      { "slug": slug.current, _updatedAt }
      | order(_updatedAt desc)`
    )
    projectPages = projects.map(project => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: new Date(project._updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  } catch (e) {
    console.error('Sitemap: failed to fetch projects', e)
  }

  return [...staticPages, ...filmPages, ...projectPages]
}
