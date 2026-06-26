import Link from 'next/link'

/**
 * C4: Custom 404 page with noindex metadata.
 * Ensures non-existent URLs return proper 404 with helpful navigation.
 */
export const metadata = {
  title: 'Page Not Found',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="page-enter" style={{ paddingTop: '180px', paddingBottom: '120px', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ marginBottom: '24px' }}>Page Not Found</h1>
        <p style={{
          margin: '0 auto 48px',
          maxWidth: '450px',
          textAlign: 'center',
        }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <nav aria-label="Helpful links" style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
          <Link href="/" style={{
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Home
          </Link>
          <Link href="/work" style={{
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Work
          </Link>
          <Link href="/about" style={{
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            About
          </Link>
          <Link href="/contact" style={{
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Contact
          </Link>
        </nav>
      </div>
    </div>
  )
}
