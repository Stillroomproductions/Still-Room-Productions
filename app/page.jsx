// app/page.js
import { Suspense } from 'react'
import { client } from '../lib/sanityClient'
import { getHero, getAllProjects, getAbout, getContact } from '../lib/queries'
import HomeClient from '../components/HomeClient'

// ISR: Revalidate this page every 60 seconds so new Sanity content appears automatically
export const revalidate = 60

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

  // If Sanity is unreachable the Work section simply renders empty rather than
  // showing stand-in content. The previous fallback invented a film credited to
  // "London Film Festival 2025" and "Sundance Film Festival 2026", with a
  // placeholder cast and a joke trailer link. Publishing unearned festival
  // selections is a reputational risk for a production company, so it is gone.
  return (
    <Suspense fallback={null}>
      <HomeClient hero={hero} films={films || []} about={about} contact={contact} />
    </Suspense>
  )
}
