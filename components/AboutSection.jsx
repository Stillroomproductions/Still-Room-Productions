'use client'

import { motion } from 'framer-motion'
import { urlFor } from '../lib/sanityClient'

/**
 * About section — receives about data as props from server component.
 * Used both inline on the home page and on the standalone /about page.
 */
export default function AboutSection({ about }) {
  // Use Sanity about data if available, fall back to defaults
  const fallbackText =
    'Still Room Productions is a London-based independent production company developing restrained, formally precise work for film and television. Its projects observe people at the point where private life meets process, record, and procedure.'

  // about.content is portable text (array of blocks), extract plain text
  let contentText = fallbackText
  if (about?.content && Array.isArray(about.content)) {
    const extracted = about.content
      .map((block) => block.children?.map((child) => child.text).join(''))
      .filter(Boolean)
      .join('\n\n')
    if (extracted) contentText = extracted
  } else if (about?.content && typeof about.content === 'string') {
    contentText = about.content
  }

  // About image — use Sanity image if available, fall back to local
  const aboutImageUrl = about?.image
    ? urlFor(about.image).width(1200).url()
    : '/images/_52A6982.jpg'
  const imageAlt = about?.imageCaption || 'Still Room Productions — Independent Film Production'

  return (
    <div>
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
            <p>{contentText}</p>
          </motion.div>

          {/* Single large image slot */}
          <motion.div
            className="about-image"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={aboutImageUrl} alt={imageAlt} />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
