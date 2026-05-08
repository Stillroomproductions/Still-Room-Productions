import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Lenis from 'lenis'
import Header from './Header'
import Footer from './Footer'

/**
 * Layout wrapper — provides consistent Header and Footer across all pages.
 * Integrates Lenis for smooth custom scrolling.
 */
function Layout() {
  const { pathname, hash } = useLocation()

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
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="page-container">
      <Header />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
