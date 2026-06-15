'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

/**
 * Site header with logo, desktop nav, and mobile hamburger menu.
 * Adds a subtle background on scroll.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

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
  }, [pathname])

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { href: '/#home', label: 'HOME' },
    { href: '/#work', label: 'WORK' },
    { href: '/#about', label: 'ABOUT' },
    { href: '/#contact', label: 'CONTACT' },
  ]

  return (
    <>
      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Logo */}
          <Link
            href="/"
            className="header-logo"
            aria-label="Still Room Productions — Home"
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
          </Link>

          {/* Desktop nav */}
          <nav className="main-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
              >
                {link.label}
              </Link>
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
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  )
}
