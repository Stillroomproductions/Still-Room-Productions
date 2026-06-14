import Link from 'next/link'
import { client, urlFor } from '../../../lib/sanityClient'
import { getProjectBySlug, getAllProjects, getHero } from '../../../lib/queries'
import HeroSection from '../../../components/HeroSection'
import FilmDetailClient from './FilmDetailClient'
import JsonLd from '../../../components/JsonLd'

export async function generateStaticParams() {
  const projects = await client.fetch(getAllProjects).catch(() => [])
  return (projects || [])
    .filter((project) => project?.slug?.current)
    .map((project) => ({
      slug: project.slug.current,
    }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = await client.fetch(getProjectBySlug, { slug }).catch(() => null)

  if (!project) {
    return {
      title: 'Film Not Found',
      robots: { index: false },
    }
  }

  const ogImage = project.images?.[0]
    ? urlFor(project.images[0]).width(1200).height(630).quality(85).url()
    : '/og-image.jpg'

  const description = project.description ||
    `${project.title} — a short film by Still Room Productions.`

  return {
    title: project.title,
    description: description,
    keywords: [
      project.title,
      'Still Room Productions',
      'Gerald Gyimah',
      'short film',
      'independent film UK',
      ...(project.festivalSelections || []),
    ],
    alternates: {
      canonical: `https://www.stillroomproductions.com/work/${slug}`,
    },
    openGraph: {
      type: 'video.movie',
      url: `https://www.stillroomproductions.com/work/${slug}`,
      title: `${project.title} — Still Room Productions`,
      description: description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${project.title} — Still Room Productions` }],
      siteName: 'Still Room Productions',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Still Room Productions`,
      description: description,
      images: [ogImage],
    },
  }
}

export default async function FilmDetailPage({ params }) {
  const { slug } = await params
  const [project, hero] = await Promise.all([
    client.fetch(getProjectBySlug, { slug }).catch(() => null),
    client.fetch(getHero).catch(() => null)
  ])

  if (!project) {
    return (
      <div className="page-enter" style={{ paddingTop: '120px' }}>
        <section className="page-header">
          <div className="container">
            <h1>Film Not Found</h1>
            <p style={{ marginTop: '20px' }}>
              <Link href="/work" className="back-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Films
              </Link>
            </p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Movie",
        "@id": `https://www.stillroomproductions.com/work/${project.slug?.current}`,
        "name": project.title,
        "description": project.description,
        "url": `https://www.stillroomproductions.com/work/${project.slug?.current}`,
        "image": project.images?.[0] ? urlFor(project.images[0]).width(1200).height(630).url() : undefined,
        "datePublished": project._createdAt,
        "dateModified": project._updatedAt,
        "director": {
          "@type": "Person",
          "name": project.director || "Gerald Gyimah",
          "url": "https://www.stillroomproductions.com/about"
        },
        "productionCompany": {
          "@type": "Organization",
          "name": "Still Room Productions",
          "url": "https://www.stillroomproductions.com"
        },
        "countryOfOrigin": { "@type": "Country", "name": "United Kingdom" },
        "inLanguage": "en-GB",
        ...(project.festivalSelections?.length && {
          "award": project.festivalSelections.join(', ')
        }),
      }} />
      {/* <HeroSection hero={hero} /> */}
      <FilmDetailClient film={project} />
    </>
  )
}
