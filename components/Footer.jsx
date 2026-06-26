import Link from 'next/link'

/**
 * Site footer with navigation links, company info, and copyright.
 * H5: Added internal links for crawlability and link equity distribution.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <p className="footer-name">Still Room Productions</p>
        <p className="footer-copyright">© {year} All rights reserved.</p>
      </div>
    </footer>
  )
}
