//sitemap.js
import { client } from '../lib/sanityClient'

export const revalidate = 3600

export default async function sitemap() {
  const baseUrl = 'https://stillroomproductions.com'

  // M4: Use fixed dates for static pages (content doesn't change on every build)
  const staticPages = [
    {
      url: baseUrl,
      lastModified: '2025-01-01',
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: '2025-01-01',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: '2025-01-01',
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ]

  let projectPages = []
  try {
    // M17: Added visibleOnSite filter to match main query logic
    const projects = await client.fetch(
      `*[_type == "project" && defined(slug.current) && !(_id in path("drafts.**")) && visibleOnSite == true]
      {
        "slug": slug.current,
        _updatedAt
      }
      | order(_updatedAt desc)`
    )
    // M5: Removed console.log debug logging
    projectPages = projects.map(project => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: new Date(project._updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  } catch (e) {
    console.error('Sitemap: failed to fetch projects', e)
  }

  return [...staticPages, ...projectPages]
}
