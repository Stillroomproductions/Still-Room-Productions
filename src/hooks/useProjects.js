import { useEffect, useState } from 'react'
import { client as sanityClient } from '../sanityClient'

const query = `*[_type == "project" && visibleOnSite == true] | order(displayOrder asc){
  _id,
  title,
  type,
  status,
  description,
  director,
  producer,
  slug,
  "image": images[0],
  images,
  cast,
  trailerUrl,
  festivalSelections,
  pressQuotes
}`

export const MOCK_PROJECTS = [
  {
    _id: 'mock-project-1',
    title: 'Assessment',
    type: 'Short Film',
    status: 'Completed',
    description: 'A dark institutional drama exploring procedure and moral pressure in a bureaucratic system.',
    slug: { current: 'assessment' },
    image: '/images/_52A6916.jpg',
    images: [
      '/images/_52A6916.jpg',
      '/images/_52A6916.jpg',
      '/images/_52A6916.jpg'
    ],
    cast: [
      { actorName: 'Gerald Gyimah', characterName: 'Officer' },
      { actorName: 'John Doe', characterName: 'Witness' }
    ],
    festivalSelections: ['London Film Festival 2025', 'Sundance Film Festival 2026'],
    trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
]

export default function useProjects() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    sanityClient.fetch(query)
      .then((data) => {
        if (active) {
          // If no data returned, use mock
          setProjects(data && data.length > 0 ? data : MOCK_PROJECTS)
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (active) {
          console.warn('Sanity fetch failed, using local mock projects')
          setProjects(MOCK_PROJECTS)
          setIsLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  return { projects, isLoading }
}
