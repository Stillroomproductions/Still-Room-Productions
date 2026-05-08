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
        {/* Full logo with room icon + text */}
        <svg className="hero-logo" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="20" width="120" height="120" stroke="currentColor" strokeWidth="3" fill="none"/>
          <rect x="75" y="50" width="50" height="50" stroke="currentColor" strokeWidth="2" fill="none"/>
          <line x1="40" y1="20" x2="75" y2="50" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="160" y1="20" x2="125" y2="50" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="40" y1="140" x2="75" y2="100" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="160" y1="140" x2="125" y2="100" stroke="currentColor" strokeWidth="1.5"/>
          <text x="100" y="175" textAnchor="middle" fontFamily="Inter, Helvetica Neue, Arial, sans-serif" fontWeight="300" fontSize="18" letterSpacing="6" fill="currentColor">STILL ROOM</text>
          <text x="100" y="198" textAnchor="middle" fontFamily="Inter, Helvetica Neue, Arial, sans-serif" fontWeight="300" fontSize="11" letterSpacing="8" fill="currentColor">PRODUCTIONS</text>
        </svg>

        <p className="hero-tagline">Independent film production.</p>
        <p className="hero-location">Based in London, UK</p>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator" aria-hidden="true">
          <span></span>
        </div>
      </section>

      {/* OTHER SECTIONS */}
      <Films />
      <About />
      <Contact />
    </div>
  )
}

export default Home
