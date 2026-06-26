'use client'

import { motion } from 'framer-motion'

/**
 * Contact section — receives contact data as props from server component.
 * Renders email and location. Matches old Contact.jsx exactly.
 */
export default function ContactSection({ contact }) {
  // Use Sanity contact data if available, fall back to defaults
  const email = contact?.email || 'INFO@STILLROOMPRODUCTIONS.COM'
  const location = contact?.location || 'LONDON, UK'

  return (
    <div>
      <section className="contact-section">
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
              width: '100%',
              textAlign: 'center'
            }}
          >
            <a
              href={`mailto:${email}`}
              className="contact-email"
              aria-label={`Email Still Room Productions at ${email}`}
              style={{
                fontSize: 'clamp(0.75rem, 2.5vw, 1.3rem)',
                letterSpacing: '0.15em',
                marginBottom: '24px',
                textTransform: 'uppercase',
                textIndent: '0.15em',
                whiteSpace: 'nowrap',
                display: 'inline-block'
              }}
            >
              {email.toUpperCase()}
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
              {location.toUpperCase()}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
