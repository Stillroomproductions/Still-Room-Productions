'use client'

import { useEffect } from 'react'
import HeroSection from './HeroSection'
import WorkSection from './WorkSection'
import AboutSection from './AboutSection'
import ContactSection from './ContactSection'

export default function HomeClient({ hero, films, about, contact }) {
  // Scroll to hash anchor on mount (e.g. /#project-protocol coming from detail page)
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      // Small delay to let the DOM fully render before scrolling
      const timer = setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div>
      <section id="home">
        <HeroSection hero={hero} />
      </section>

      <section id="work">
        <WorkSection projects={films} />
      </section>

      {/* No extra top padding here: these sections sit mid-scroll on the
          homepage, so the section's own spacing is enough. The 120px offset
          belongs only on the standalone /about and /contact pages, where it
          clears the fixed header. */}
      <section id="about">
        <AboutSection about={about} />
      </section>

      <section id="contact">
        <ContactSection contact={contact} />
      </section>
    </div>
  )
}
