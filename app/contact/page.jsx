import { client } from '../../lib/sanityClient'
import { getContact } from '../../lib/queries'
import ContactSection from '../../components/ContactSection'
import JsonLd from '../../components/JsonLd'

// ISR: Revalidate this page every 60 seconds so new Sanity content appears automatically
export const revalidate = 60

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Still Room Productions. Based in London, UK — reach us for film production enquiries, commissions, and collaboration.',
  alternates: {
    canonical: 'https://stillroomproductions.com/contact',
  },
  openGraph: {
    type: 'website',
    url: 'https://stillroomproductions.com/contact',
    title: 'Contact — Still Room Productions',
    description: 'Get in touch with Still Room Productions for film production enquiries, commissions, and collaboration.',
    siteName: 'Still Room Productions',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Still Room Productions — Contact' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — Still Room Productions',
    description: 'Get in touch with Still Room Productions.',
    images: ['/og-image.jpg'],
  },
}

export default async function ContactPage() {
  const contact = await client.fetch(getContact).catch(() => null)

  return (
    <div className="page-standalone">
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
            "name": "Contact"
          }
        ]
      }} />

      {/* ContactPage schema with ContactPoint (H8) */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": "https://stillroomproductions.com/contact",
        "name": "Contact — Still Room Productions",
        "description": "Contact Still Room Productions for film production enquiries and collaboration.",
        "url": "https://stillroomproductions.com/contact",
        "isPartOf": {
          "@id": "https://stillroomproductions.com/#website"
        },
        "mainEntity": {
          "@id": "https://stillroomproductions.com/#organization"
        },
      }} />
      <ContactSection contact={contact} />
    </div>
  )
}
