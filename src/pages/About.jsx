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
              Still Room Productions is a London-based independent production company developing restrained, formally precise work for film and television. Its projects observe people at the point where private life meets process, record, and procedure.
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
            {/* 
              Image Art Direction Note:
              When real images are eventually added by the client, the visual language should lean toward:
              - Empty rooms
              - Institutional and procedural spaces
              - Documents, tables, chairs, corridors
              - Fluorescent-lit environments
              - Thresholds, surfaces, architectural details
              - Objects with an evidentiary quality
            */}
            <img src="/images/_52A6982.jpg" alt="Institutional red signage under fluorescent light" />
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
