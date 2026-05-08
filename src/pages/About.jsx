import { motion } from 'framer-motion'

/**
 * About page — clean text-led page with a single optional image.
 */
function About() {
  return (
    <div id="about">
      <section className="page-header">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            About
          </motion.h1>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>
              Still Room Productions is an independent film production company committed to authentic, character-driven storytelling. We develop and produce feature films, shorts, and documentary projects with a distinct creative voice.
            </p>
            <p>
              Founded on the belief that cinema should be both rigorous and compassionate, we work closely with writers and directors to nurture projects from inception through to exhibition. Our focus is on the quiet spaces — the moments that define us, the places we inhabit, and the complex inner lives of those often overlooked by mainstream narrative.
            </p>
            <p>
              We are not currently accepting unsolicited scripts or project submissions, but we are always interested in connecting with new collaborators and co-production partners.
            </p>
          </motion.div>

          {/* Single large image slot */}
          <motion.div 
            className="about-image"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* <img src="/about-image.jpg" alt="Still Room Productions team" /> */}
            <div className="about-image-placeholder">
              <span>Production Image</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
