// app/page.js
import { Suspense } from 'react'
import { client } from '../lib/sanityClient'
import { getHero, getAllProjects, getAbout, getContact, getSiteSettings } from '../lib/queries'
import HomeClient from '../components/HomeClient'

const MOCK_PROJECTS = [
  {
    _id: 'mock-project-1',
    title: 'Assessment',
    type: 'Short Film',
    status: 'Completed',
    description: 'A dark institutional drama exploring procedure and moral pressure in a bureaucratic system.',
    slug: { current: 'assessment' },
    image: '/images/_52A6916.jpg',
    images: ['/images/_52A6916.jpg', '/images/_52A6916.jpg', '/images/_52A6916.jpg'],
    cast: [
      { actorName: 'Gerald Gyimah', characterName: 'Officer' },
      { actorName: 'John Doe', characterName: 'Witness' }
    ],
    festivalSelections: ['London Film Festival 2025', 'Sundance Film Festival 2026'],
    trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
]

export const metadata = {
  title: 'Still Room Productions — Independent Film Production, London',
  description: 'Still Room Productions is a London-based independent film and television production company developing formally restrained, precise work about systems, procedure, memory, and moral pressure.',
  alternates: { canonical: 'https://stillroomproductions.com' },
  openGraph: {
    url: 'https://stillroomproductions.com',
    title: 'Still Room Productions — Independent Film Production, London',
    description: 'London-based production company making formally precise film and television about systems, procedure, memory, and moral pressure.',
  },
}

export default async function HomePage() {
  const [hero, films, about, contact] = await Promise.all([
    client.fetch(getHero).catch(() => null),
    client.fetch(getAllProjects).catch(() => []),
    client.fetch(getAbout).catch(() => null),
    client.fetch(getContact).catch(() => null),
  ])

  const projectData = films && films.length > 0 ? films : MOCK_PROJECTS

  return (
    <Suspense fallback={null}>
      <HomeClient hero={hero} films={projectData} about={about} contact={contact} />
    </Suspense>
  )
}
