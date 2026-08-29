import { client } from '../../lib/sanityClient'
import { getAbout } from '../../lib/queries'
import AboutSection from '../../components/AboutSection'
import JsonLd from '../../components/JsonLd'

// ISR: Revalidate this page every 60 seconds so new Sanity content appears automatically
export const revalidate = 60

export const metadata = {
  title: 'About',
  description: 'Still Room Productions is a London-based independent production company founded by Gerald Gyimah. We develop formally restrained, precise work for film and television about systems, procedure, memory, and moral pressure.',
  alternates: {
    canonical: 'https://stillroomproductions.com/about',
  },
  openGraph: {
    // M14: Fixed from 'profile' to 'website' — this is a company about page
    type: 'website',
    url: 'https://stillroomproductions.com/about',
    title: 'About — Still Room Productions',
    description: 'London-based independent production company founded by Gerald Gyimah, developing formally restrained work for film and television.',
    siteName: 'Still Room Productions',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Still Room Productions — About' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — Still Room Productions',
    description: 'London-based independent production company founded by Gerald Gyimah.',
    images: ['/og-image.jpg'],
  },
}

export default async function AboutPage() {
  const about = await client.fetch(getAbout).catch(() => null)

  return (
    <div className="page-standalone">
      {/* H2: BreadcrumbList schema for SERP breadcrumb display */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://stillroomproductions.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About"
          }
        ]
      }} />

      {/* AboutPage schema with enriched Person entity (H7) */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": "https://stillroomproductions.com/about",
        "name": "About — Still Room Productions",
        "description": "Still Room Productions is a London-based independent production company developing formally restrained work for film and television.",
        "url": "https://stillroomproductions.com/about",
        "isPartOf": {
          "@id": "https://stillroomproductions.com/#website"
        },
        "mainEntity": {
          "@id": "https://stillroomproductions.com/#person-gerald-gyimah"
        },
        "about": [
          { "@id": "https://stillroomproductions.com/#person-gerald-gyimah" },
          { "@id": "https://stillroomproductions.com/#organization" }
        ],
      }} />
      <AboutSection about={about} headingLevel="h1" />
    </div>
  )
}
