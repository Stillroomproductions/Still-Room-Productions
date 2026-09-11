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
    <div className="page-enter">
      <section id="home">
        <HeroSection hero={hero} />
      </section>

      <section id="work">
        <WorkSection projects={films} />
      </section>

      <section id="about">
        <div className="page-enter" style={{ paddingTop: '120px' }}>
          <AboutSection about={about} />
        </div>
      </section>

      <section id="contact">
        <div className="page-enter" style={{ paddingTop: '120px' }}>
          <ContactSection contact={contact} />
        </div>
      </section>
    </div>
  )
}
