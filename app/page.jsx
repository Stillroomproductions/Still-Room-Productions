import { client } from '../lib/sanityClient'
import { getHero, getAllProjects, getAbout, getContact, getSiteSettings } from '../lib/queries'
import HeroSection from '../components/HeroSection'
import WorkSection from '../components/WorkSection'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'

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
  title: 'Home',
  description: 'Still Room Productions is a London-based independent film and television production company developing formally restrained, precise work about systems, procedure, memory, and moral pressure.',
  alternates: { canonical: 'https://www.stillroomproductions.com' },
  openGraph: {
    url: 'https://www.stillroomproductions.com',
    title: 'Still Room Productions — Independent Film Production | London',
    description: 'London-based production company making formally precise film and television about systems, procedure, memory, and moral pressure.',
  },
}

/**
 * Home page — async server component that fetches hero, projects, about,
 * and contact data from Sanity, then passes to client section components.
 */
export default async function HomePage() {
  // Fetch all data in parallel
  const [hero, projects, about, contact] = await Promise.all([
    client.fetch(getHero).catch(() => null),
    client.fetch(getAllProjects).catch(() => []),
    client.fetch(getAbout).catch(() => null),
    client.fetch(getContact).catch(() => null),
  ])

  // Fall back to mock projects if Sanity returns nothing
  const projectData = projects && projects.length > 0 ? projects : MOCK_PROJECTS

  return (
    <div className="page-enter">
      {/* HERO SECTION */}
      <HeroSection hero={hero} />

      {/* OTHER SECTIONS */}
      <WorkSection projects={projectData} />
      <AboutSection about={about} />
      <ContactSection contact={contact} />
    </div>
  )
}
