// components/HomeClient.jsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import FilmDetail from './FilmDetail'
import HeroSection from './HeroSection'
import WorkSection from './WorkSection'
import AboutSection from './AboutSection'
import ContactSection from './ContactSection'

export default function HomeClient({ hero, films, about, contact }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const filmSlug = searchParams.get('film')
  const selectedFilm = filmSlug && films ? films.find(f => f.slug?.current === filmSlug) : null

  const openFilm = (film) => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    router.push(`/?film=${film.slug.current}`, { scroll: false })
  }

  const closeFilm = () => {
    router.push('/', { scroll: false })
    // restore scroll position to work section
    setTimeout(() => {
      document.getElementById('work')?.scrollIntoView({ behavior: 'instant' })
    }, 50)
  }

  if (selectedFilm) {
    return <FilmDetail film={selectedFilm} onBack={closeFilm} />
  }

  return (
    <div className="page-enter">
      <section id="home">
        <HeroSection hero={hero} />
      </section>

      <section id="work">
        <WorkSection projects={films} onFilmClick={openFilm} />
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
