import { Suspense } from 'react'
import { client } from '../../lib/sanityClient'
import { getAllProjects } from '../../lib/queries'
import WorkSection from '../../components/WorkSection'
import JsonLd from '../../components/JsonLd'

export const metadata = {
  title: 'Work — Films & Projects',
  description: 'Explore the films and projects of Still Room Productions — formally restrained, precise short films about systems, procedure, memory, and moral pressure. Based in London.',
  alternates: {
    canonical: 'https://stillroomproductions.com/work',
  },
  openGraph: {
    type: 'website',
    url: 'https://stillroomproductions.com/work',
    title: 'Work — Still Room Productions',
    description: 'Explore the films and projects of Still Room Productions — formally restrained short films about systems, procedure, memory, and moral pressure.',
    siteName: 'Still Room Productions',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Still Room Productions — Work' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work — Still Room Productions',
    description: 'Explore the films and projects of Still Room Productions.',
    images: ['/og-image.jpg'],
  },
}

export default async function WorkPage() {
  const films = await client.fetch(getAllProjects).catch(() => [])

  // H12: Build hasPart array from film data for CollectionPage schema
  const filmParts = (films || [])
    .filter(p => p?.slug?.current)
    .map(p => ({
      "@type": "Movie",
      "@id": `https://stillroomproductions.com/work/${p.slug.current}`,
      "name": p.title,
      "url": `https://stillroomproductions.com/work/${p.slug.current}`,
    }))

  return (
    <div className="page-enter" style={{ paddingTop: '120px' }}>
      {/* H2: BreadcrumbList schema */}
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
            "name": "Work"
          }
        ]
      }} />

      {/* H12: CollectionPage with hasPart references to all films */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": "https://stillroomproductions.com/work",
        "name": "Work — Still Room Productions",
        "description": "Films and projects by Still Room Productions.",
        "url": "https://stillroomproductions.com/work",
        "isPartOf": {
          "@id": "https://stillroomproductions.com/#website"
        },
        "publisher": {
          "@id": "https://stillroomproductions.com/#organization"
        },
        ...(filmParts.length > 0 && {
          "hasPart": filmParts,
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": filmParts.length,
            "itemListElement": filmParts.map((film, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "item": film
            }))
          }
        }),
      }} />
      <Suspense fallback={null}>
        <WorkSection projects={films} headingLevel="h1" />
      </Suspense>
    </div>
  )
}
