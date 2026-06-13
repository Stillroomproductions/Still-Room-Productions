import { client } from '../../lib/sanityClient'
import { getContact, getHero } from '../../lib/queries'
import ContactSection from '../../components/ContactSection'
import HeroSection from '../../components/HeroSection'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Still Room Productions. Enquiries for collaboration, commissioning, press, and festival programming welcome.',
  keywords: ['contact Still Room Productions', 'film production enquiries London', 'Gerald Gyimah contact'],
  alternates: { canonical: 'https://www.stillroomproductions.com/contact' },
  openGraph: {
    url: 'https://www.stillroomproductions.com/contact',
    title: 'Contact — Still Room Productions',
    description: 'Get in touch with Still Room Productions for commissioning, collaboration, press, and festival enquiries.',
  },
}

/**
 * Contact page — async server component that fetches contact data from Sanity.
 */
export default async function ContactPage() {
  const [contact, hero] = await Promise.all([
    client.fetch(getContact).catch(() => null),
    client.fetch(getHero).catch(() => null)
  ])

  return (
    <>
      <HeroSection hero={hero} />
      <div className="page-enter" style={{ paddingTop: '120px' }}>
        <ContactSection contact={contact} />
      </div>
    </>
  )
}
