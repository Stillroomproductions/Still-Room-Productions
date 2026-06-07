import { motion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import Work from './Work'
import About from './About'
import Contact from './Contact'

/**
 * Home page — full-screen hero with centred logo and tagline,
 * followed by scrolling sections for Work, About, and Contact.
 */
function Home() {
  const context = useOutletContext()
  const selectedSlug = context?.selectedSlug
  const setSelectedSlug = context?.setSelectedSlug

  return (
    <div className="page-enter">
      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-background">
          <img src="/images/_52A6916.jpg" alt="Dark institutional corridor with single overhead bulb" />
          <div className="hero-gradient"></div>
        </div>

        {/* Typographic logo text */}
        <motion.h1
          className="hero-logo-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Still Room Productions
        </motion.h1>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Develops formally restrained film and television work about systems, procedure, memory, and moral pressure.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="hero-scroll-indicator"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <span></span>
        </motion.div>
      </section>

      {/* OTHER SECTIONS */}
      <Work selectedSlug={selectedSlug} setSelectedSlug={setSelectedSlug} />
      <About />
      <Contact />
    </div>
  )
}

export default Home
