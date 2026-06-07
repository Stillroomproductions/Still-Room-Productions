import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Site header with logo, desktop nav, and mobile hamburger menu.
 * Adds a subtle background on scroll.
 */
function Header({ onNavClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  /* Track scroll position for header background */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Close mobile menu on route change */
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { to: '/#home', label: 'Home' },
    {
      to: '/#work',
      label: 'Work',
      // Sub-categories ready to activate when content is available:
      // subItems: [
      //   { label: 'Film' },
      //   { label: 'Television' },
      //   { label: 'In Development' }
      // ]
    },
    { to: '/#about', label: 'About' },
    { to: '/#contact', label: 'Contact' },
  ]

  return (
    <>
      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Logo */}
          <a
            href="/#home"
            className="header-logo"
            aria-label="Still Room Productions — Home"
            onClick={onNavClick}
          >
            <svg className="header-logo-icon" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="100" height="100" stroke="currentColor" strokeWidth="3" fill="none" />
              <rect x="38" y="35" width="44" height="44" stroke="currentColor" strokeWidth="2" fill="none" />
              <line x1="10" y1="10" x2="38" y2="35" stroke="currentColor" strokeWidth="1.5" />
              <line x1="110" y1="10" x2="82" y2="35" stroke="currentColor" strokeWidth="1.5" />
              <line x1="10" y1="110" x2="38" y2="79" stroke="currentColor" strokeWidth="1.5" />
              <line x1="110" y1="110" x2="82" y2="79" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="header-logo-text">Still Room Productions</span>
          </a>

          {/* Desktop nav */}
          <nav className="main-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                onClick={onNavClick}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      <nav className={`mobile-nav-overlay ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        {navLinks.map((link) => (
          <a
            key={link.to}
            href={link.to}
            onClick={() => {
              setMenuOpen(false)
              if (onNavClick) onNavClick()
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </>
  )
}

export default Header
