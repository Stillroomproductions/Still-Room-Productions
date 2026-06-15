'use client'

import HeroSection from './HeroSection'
import WorkSection from './WorkSection'
import AboutSection from './AboutSection'
import ContactSection from './ContactSection'

export default function HomeClient({ hero, films, about, contact }) {
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
