import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import Header from './Header'
import Footer from './Footer'

/**
 * Layout wrapper — provides consistent Header and Footer across all pages.
 * Integrates Lenis for smooth custom scrolling.
 */
function Layout() {
  const { pathname, hash } = useLocation()
  const [selectedSlug, setSelectedSlug] = useState(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08, // Fluid, linear interpolation
      wheelMultiplier: 1, // Default wheel speed
      smoothWheel: true,
      smoothTouch: false, // Usually disabled for native feel on mobile
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (hash) {
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 50)
      return () => clearTimeout(timeoutId)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash, selectedSlug])

  return (
    <div className="page-container">
      <Header onNavClick={() => setSelectedSlug(null)} />
      <main className="page-content">
        <Outlet context={{ selectedSlug, setSelectedSlug }} />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
