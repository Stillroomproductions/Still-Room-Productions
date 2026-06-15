import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import JsonLd from '../components/JsonLd'

export const metadata = {
  metadataBase: new URL('https://www.stillroomproductions.com'),

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

  authors: [{ name: 'Gerald Gyimah', url: 'https://www.stillroomproductions.com/#about' }],
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
    url: 'https://www.stillroomproductions.com',
    siteName: 'Still Room Productions',
    title: 'Still Room Productions — Independent Film Production | London',
    description: 'London-based independent production company developing formally restrained work for film and television. Work about systems, procedure, memory, and moral pressure.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Still Room Productions',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@stillroomprod', // update when Gerald provides handle
    creator: '@geraldgyimah', // update when Gerald provides handle
    title: 'Still Room Productions — Independent Film Production',
    description: 'London-based independent production company developing formally restrained work for film and television.',
    images: ['/og-image.jpg'],
  },

  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },

  manifest: '/site.webmanifest',

  alternates: {
    canonical: 'https://www.stillroomproductions.com',
    languages: {
      'en-GB': 'https://www.stillroomproductions.com',
    },
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || 'REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
  },

  other: {
    'theme-color': '#000000',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://www.stillroomproductions.com/#organization",
          "name": "Still Room Productions",
          "alternateName": "Still Room",
          "url": "https://www.stillroomproductions.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.stillroomproductions.com/logo.svg",
            "width": 200,
            "height": 60
          },
          "description": "Still Room Productions is a London-based independent production company developing formally restrained work for film and television about systems, procedure, memory, and moral pressure.",
          "foundingDate": "2020",
          "founder": {
            "@type": "Person",
            "name": "Gerald Gyimah",
            "jobTitle": "Director & Producer",
            "url": "https://www.stillroomproductions.com/about"
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
          "sameAs": [
            // Gerald will fill these in when he provides social handles
          ]
        }} />

        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://www.stillroomproductions.com/#website",
          "url": "https://www.stillroomproductions.com",
          "name": "Still Room Productions",
          "description": "Independent film and television production company based in London.",
          "publisher": {
            "@id": "https://www.stillroomproductions.com/#organization"
          },
          "inLanguage": "en-GB",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.stillroomproductions.com/work?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
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
