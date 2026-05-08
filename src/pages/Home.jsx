import { motion } from 'framer-motion'
import CinematicBackground from '../components/CinematicBackground'
import Films from './Films'
import About from './About'
import Contact from './Contact'

/**
 * Home page — full-screen hero with centred logo and tagline,
 * followed by scrolling sections for Films, About, and Contact.
 */
function Home() {
  return (
    <div className="page-enter">
      {/* HERO SECTION */}
      <section className="hero" id="home">
        <CinematicBackground />
        
        {/* Full logo with room icon + text */}
        <motion.svg 
          className="hero-logo" 
          viewBox="0 0 200 220" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <rect x="40" y="20" width="120" height="120" stroke="currentColor" strokeWidth="3" fill="none"/>
          <rect x="75" y="50" width="50" height="50" stroke="currentColor" strokeWidth="2" fill="none"/>
          <line x1="40" y1="20" x2="75" y2="50" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="160" y1="20" x2="125" y2="50" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="40" y1="140" x2="75" y2="100" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="160" y1="140" x2="125" y2="100" stroke="currentColor" strokeWidth="1.5"/>
          <text x="100" y="175" textAnchor="middle" fontFamily="Inter, Helvetica Neue, Arial, sans-serif" fontWeight="300" fontSize="18" letterSpacing="6" fill="currentColor">STILL ROOM</text>
          <text x="100" y="198" textAnchor="middle" fontFamily="Inter, Helvetica Neue, Arial, sans-serif" fontWeight="300" fontSize="11" letterSpacing="8" fill="currentColor">PRODUCTIONS</text>
        </motion.svg>

        <motion.p 
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Independent film production.
        </motion.p>
        
        <motion.p 
          className="hero-location"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Based in London, UK
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
      <Films />
      <About />
      <Contact />
    </div>
  )
}

export default Home
