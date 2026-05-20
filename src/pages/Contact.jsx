import { motion } from 'framer-motion'

/**
 * Contact page — Simplified completely to show only email and location.
 */
function Contact() {
  return (
    <div id="contact">
      <section className="contact-section" style={{ padding: '180px 0 220px' }}>
        <div className="container">
          <motion.div 
            className="contact-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '100%',
              textAlign: 'center'
            }}
          >
            <a 
              href="mailto:INFO@STILLROOMPRODUCTIONS.COM" 
              className="contact-email" 
              style={{ 
                fontSize: 'clamp(0.8rem, 4.5vw, 1.3rem)', 
                letterSpacing: '0.15em', 
                marginBottom: '24px',
                textTransform: 'uppercase',
                textIndent: '0.15em',
                wordBreak: 'break-all',
                display: 'inline-block'
              }}
            >
              INFO@STILLROOMPRODUCTIONS.COM
            </a>
            <p 
              className="contact-location" 
              style={{ 
                margin: 0, 
                color: 'var(--color-grey)', 
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textIndent: '0.2em',
                display: 'inline-block'
              }}
            >
              LONDON, UK
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
