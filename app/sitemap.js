//sitemap.js
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

  let projectPages = []
  try {
    const projects = await client.fetch(
      `*[_type == "project" && defined(slug.current) && !(_id in path("drafts.**"))]
      {
        "slug": slug.current,
        _updatedAt
      }
      | order(_updatedAt desc)`
    )
    console.log("Sitemap projects:", projects)
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
