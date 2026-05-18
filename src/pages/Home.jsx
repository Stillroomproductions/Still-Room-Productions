import { motion } from 'framer-motion'
import Work from './Work'
import About from './About'
import Contact from './Contact'

/**
 * Home page — full-screen hero with centred logo and tagline,
 * followed by scrolling sections for Work, About, and Contact.
 */
function Home() {
  return (
    <div className="page-enter">
      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-background">
          <img src="/images/_52A6947_jpg.jpeg" alt="Wider, empty clinical room with teal curtains, monitor, equipment trolley and digital clock on the wall" />
          <div className="hero-gradient"></div>
          {/* Dark radial veil centred where text lives */}
          <div className="hero-veil"></div>
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
      <Work />
      <About />
      <Contact />
    </div>
  )
}

export default Home
