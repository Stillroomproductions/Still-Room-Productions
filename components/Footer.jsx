/**
 * Minimal footer — company name and copyright only.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-name">Still Room Productions</p>
        <p className="footer-copyright">© {year} All rights reserved.</p>
      </div>
    </footer>
  )
}
