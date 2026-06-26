import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import JsonLd from '../components/JsonLd'

// H9: Proper font loading with next/font
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400'],
  display: 'swap',
  variable: '--font-inter',
})

// M1: Proper viewport export (Next.js 16 separates viewport from metadata)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000', // H11: Moved from metadata.other to viewport
}

export const metadata = {
  metadataBase: new URL('https://stillroomproductions.com'),

  title: {
    default: 'Still Room Productions — Independent Film Production | London',
    template: '%s | Still Room Productions',
  },

  description: 'Still Room Productions is a London-based independent film and television production company. We develop formally restrained, precise work about systems, procedure, memory, and moral pressure.',

  keywords: [
    // Brand
    'Still Room Productions',
    'Gerald Gyimah',
    'Gerald Gyimah director',
    'Gerald Gyimah writer',
    'Gerald Gyimah producer',
    // What they do
    'independent film production London',
    'independent film company UK',
    'short film production company London',
    'arthouse film production UK',
    'drama film production London',
    'film and television production London',
    'emerging film production company UK',
    // Film-industry specific
    'short film UK',
    'festival short film',
    'BAFTA eligible short film',
    'BFI funded film',
    'film festival submissions UK',
    'UK drama short film',
    'formally restrained cinema',
    'observational drama',
    'institutional drama film',
    // Style/tone
    'cinematic drama UK',
    'slow cinema UK',
    'arthouse short film London',
    'formally precise filmmaking',
    'moral drama short film',
    // Audience-facing
    'film production company for commissioners',
    'TV drama development UK',
    'independent television production',
    'film portfolio London director',
  ],

  authors: [{ name: 'Gerald Gyimah', url: 'https://stillroomproductions.com/#about' }],
  creator: 'Gerald Gyimah',
  publisher: 'Still Room Productions',

  category: 'Film & Television Production',

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://stillroomproductions.com',
    siteName: 'Still Room Productions',
    title: 'Still Room Productions — Independent Film Production | London',
    description: 'London-based independent production company developing formally restrained work for film and television. Work about systems, procedure, memory, and moral pressure.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Still Room Productions — Independent Film Production Company, London',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    // TODO: Update these handles when confirmed — remove if not real accounts
    site: '@stillroomprod',
    creator: '@geraldgyimah',
    title: 'Still Room Productions — Independent Film Production',
    description: 'London-based independent production company developing formally restrained work for film and television.',
    images: ['/og-image.jpg'],
  },

  icons: {
    icon: [
      // C6: Fixed MIME type — favicon.png is PNG, not SVG
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },

  manifest: '/site.webmanifest',

  alternates: {
    canonical: 'https://stillroomproductions.com',
    languages: {
      'en-GB': 'https://stillroomproductions.com',
    },
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <body>
        {/* Organization Schema — C2: Populated sameAs, H8: Added contactPoint */}
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://stillroomproductions.com/#organization",
          "name": "Still Room Productions",
          "alternateName": "Still Room",
          "url": "https://stillroomproductions.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://stillroomproductions.com/logo.svg",
            "width": 200,
            "height": 60
          },
          "image": "https://stillroomproductions.com/og-image.jpg",
          "description": "Still Room Productions is a London-based independent production company developing formally restrained work for film and television about systems, procedure, memory, and moral pressure.",
          "foundingDate": "2021",
          "founder": {
            "@id": "https://stillroomproductions.com/#person-gerald-gyimah"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "London",
            "addressCountry": "GB"
          },
          "areaServed": ["GB", "US", "EU"],
          "knowsAbout": [
            "Independent Film Production",
            "Short Film",
            "Drama",
            "Television Development",
            "Arthouse Cinema"
          ],
          "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "value": 1
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "info@stillroomproductions.com",
            "contactType": "General Enquiries",
            "areaServed": "GB",
            "availableLanguage": "English"
          },
          "sameAs": []
        }} />

        {/* C3/H1: Standalone Person schema for Gerald Gyimah entity recognition */}
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://stillroomproductions.com/#person-gerald-gyimah",
          "name": "Gerald Gyimah",
          "givenName": "Gerald",
          "familyName": "Gyimah",
          "url": "https://stillroomproductions.com/about",
          "image": "https://stillroomproductions.com/og-image.jpg",
          "jobTitle": "Director & Producer",
          "description": "Gerald Gyimah is a London-based writer, director, and producer. He is the founder of Still Room Productions, an independent production company developing formally restrained work for film and television.",
          "worksFor": {
            "@id": "https://stillroomproductions.com/#organization"
          },
          "affiliation": {
            "@id": "https://stillroomproductions.com/#organization"
          },
          "hasOccupation": [
            {
              "@type": "Occupation",
              "name": "Film Director"
            },
            {
              "@type": "Occupation",
              "name": "Film Producer"
            },
            {
              "@type": "Occupation",
              "name": "Screenwriter"
            }
          ],
          "knowsAbout": [
            "Film Direction",
            "Film Production",
            "Screenwriting",
            "Independent Cinema",
            "Short Film",
            "Drama",
            "Arthouse Film"
          ],
          "nationality": {
            "@type": "Country",
            "name": "United Kingdom"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "London",
            "addressCountry": "GB"
          },
          "sameAs": []
        }} />

        {/* WebSite Schema — H6: Removed non-functional SearchAction */}
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://stillroomproductions.com/#website",
          "url": "https://stillroomproductions.com",
          "name": "Still Room Productions",
          "description": "Independent film and television production company based in London.",
          "publisher": {
            "@id": "https://stillroomproductions.com/#organization"
          },
          "inLanguage": "en-GB"
        }} />
        <div className="page-container">
          <Header />
          <main className="page-content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
