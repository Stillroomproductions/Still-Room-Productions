import { client } from '../../lib/sanityClient'
import { getAllProjects, getHero } from '../../lib/queries'
import HeroSection from '../../components/HeroSection'
import WorkSection from '../../components/WorkSection'

const MOCK_PROJECTS = [
  {
    _id: 'mock-project-1',
    title: 'Assessment',
    type: 'Short Film',
    status: 'Completed',
    description: 'A dark institutional drama exploring procedure and moral pressure in a bureaucratic system.',
    slug: { current: 'assessment' },
    image: '/images/_52A6916.jpg',
    images: ['/images/_52A6916.jpg'],
    cast: [],
    festivalSelections: [],
    trailerUrl: null
  }
]

export const metadata = {
  title: 'Work',
  description: 'Browse the films and projects by Still Room Productions. Short films and drama exploring institutional systems, procedure, and moral pressure.',
  keywords: ['Still Room Productions films', 'short films London', 'Gerald Gyimah films', 'UK short film catalogue', 'arthouse short films'],
  alternates: { canonical: 'https://www.stillroomproductions.com/work' },
  openGraph: {
    url: 'https://www.stillroomproductions.com/work',
    title: 'Work — Still Room Productions',
    description: 'Films and projects by Still Room Productions. Short drama and observational work for film and television.',
  },
}

/**
 * Work page — async server component that fetches all projects from Sanity.
 */
export default async function WorkPage() {
  const [projects, hero] = await Promise.all([
    client.fetch(getAllProjects).catch(() => []),
    client.fetch(getHero).catch(() => null)
  ])
  const projectData = projects && projects.length > 0 ? projects : MOCK_PROJECTS

  return (
    <>
      <HeroSection hero={hero} />
      <div className="page-enter" style={{ paddingTop: '120px' }}>
        <WorkSection projects={projectData} />
      </div>
    </>
  )
}
