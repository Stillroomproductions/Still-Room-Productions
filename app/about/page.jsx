import { client } from '../../lib/sanityClient'
import { getAbout, getSiteSettings, getHero } from '../../lib/queries'
import AboutSection from '../../components/AboutSection'
import HeroSection from '../../components/HeroSection'

export const metadata = {
  title: 'About',
  description: 'Still Room Productions is founded by Gerald Gyimah. A London-based independent production company developing restrained, formally precise work for film and television.',
  keywords: ['Gerald Gyimah', 'Still Room Productions founder', 'independent film director London', 'UK film producer'],
  alternates: { canonical: 'https://www.stillroomproductions.com/about' },
  openGraph: {
    url: 'https://www.stillroomproductions.com/about',
    title: 'About — Still Room Productions',
    description: 'Founded by Gerald Gyimah. London-based production company developing formally precise work for film and television.',
  },
}

/**
 * About page — async server component that fetches about data from Sanity.
 */
export default async function AboutPage() {
  const [about, hero] = await Promise.all([
    client.fetch(getAbout).catch(() => null),
    client.fetch(getHero).catch(() => null)
  ])

  return (
    <>
      <HeroSection hero={hero} />
      <div className="page-enter" style={{ paddingTop: '120px' }}>
        <AboutSection about={about} />
      </div>
    </>
  )
}
