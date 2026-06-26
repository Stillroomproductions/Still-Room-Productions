import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client, urlFor } from '../../../lib/sanityClient'
import { getProjectBySlug, getAllProjects } from '../../../lib/queries'
import FilmDetail from '../../../components/FilmDetail'
import JsonLd from '../../../components/JsonLd'

// M15: Only allow slugs that exist in generateStaticParams
export const dynamicParams = true // Keep true to allow ISR for new films

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
    `${project.title} — a short film by Still Room Productions, directed by Gerald Gyimah.`

  return {
    title: project.title,
    description: description,
    keywords: [
      project.title,
      `${project.title} short film`,
      'Still Room Productions',
      'Gerald Gyimah',
      'Gerald Gyimah director',
      'short film',
      'independent film UK',
      ...(project.genre ? [project.genre] : []),
      ...(project.festivalSelections || []),
    ],
    alternates: {
      canonical: `https://stillroomproductions.com/work/${slug}`,
    },
    openGraph: {
      type: 'video.movie',
      url: `https://stillroomproductions.com/work/${slug}`,
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
  const project = await client.fetch(getProjectBySlug, { slug }).catch(() => null)

  // M8: Use notFound() for proper HTTP 404 response
  if (!project) {
    notFound()
  }

  // H3: Build enriched Movie schema
  const movieSchema = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "@id": `https://stillroomproductions.com/work/${project.slug?.current || slug}`,
    "name": project.title || '',
    "description": project.description || '',
    "url": `https://stillroomproductions.com/work/${project.slug?.current || slug}`,
    "inLanguage": "en-GB",
    "countryOfOrigin": { "@type": "Country", "name": "United Kingdom" },
    "director": {
      "@id": "https://stillroomproductions.com/#person-gerald-gyimah",
    },
    "productionCompany": {
      "@id": "https://stillroomproductions.com/#organization",
    },
    "isPartOf": {
      "@id": "https://stillroomproductions.com/work"
    },
  }

  // Add image if available
  if (project.images?.[0]) {
    movieSchema.image = urlFor(project.images[0]).width(1200).height(630).url()
    movieSchema.thumbnailUrl = urlFor(project.images[0]).width(400).height(225).url()
  }

  // H4: Add dates if available (requires _createdAt, _updatedAt in query)
  if (project._createdAt) movieSchema.dateCreated = project._createdAt
  if (project._updatedAt) movieSchema.dateModified = project._updatedAt
  if (project.year) movieSchema.copyrightYear = project.year

  // Add genre
  if (project.genre) movieSchema.genre = project.genre

  // Add runtime/duration in ISO 8601 format
  if (project.runtime) movieSchema.duration = `PT${project.runtime}M`

  // Add type as additional type info
  if (project.type) movieSchema.additionalType = project.type

  // Add producer
  if (project.producer) {
    movieSchema.producer = {
      "@type": "Person",
      "name": project.producer,
    }
  }

  // Add cast as actors array (H3 enrichment)
  if (project.cast?.length > 0) {
    movieSchema.actor = project.cast.map(member => ({
      "@type": "Person",
      "name": member.actorName,
      ...(member.characterName && {
        "characterName": member.characterName,
      }),
    }))
  }

  // Festival selections as individual awards
  if (project.festivalSelections?.length > 0) {
    movieSchema.award = project.festivalSelections
  }

  // Add trailer if available
  if (project.trailerUrl) {
    movieSchema.trailer = {
      "@type": "VideoObject",
      "name": `${project.title} — Trailer`,
      "description": `Trailer for ${project.title} by Still Room Productions`,
      "url": project.trailerUrl,
      "thumbnailUrl": movieSchema.thumbnailUrl || movieSchema.image,
      "uploadDate": project._createdAt || undefined,
    }
  }

  // H2: Build BreadcrumbList
  const breadcrumbSchema = {
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
        "name": "Work",
        "item": "https://stillroomproductions.com/work"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.title || 'Film'
      }
    ]
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={movieSchema} />
      <FilmDetail film={project} />
    </>
  )
}
