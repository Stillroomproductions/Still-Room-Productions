'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { sanityImage } from '../lib/imageUrl'

/**
 * About section — receives about data as props from server component.
 * Used both inline on the home page and on the standalone /about page.
 *
 * M10: Accepts headingLevel prop to prevent duplicate H1 on homepage.
 * C8: Uses next/image for image optimization.
 */
export default function AboutSection({ about, headingLevel = 'h2' }) {
  const HeadingTag = headingLevel

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

  // About image — comes entirely from Sanity, including its focal point.
  // There is deliberately no hardcoded fallback here: the previous fallback
  // was an unrelated stock photograph that appeared whenever Sanity had no
  // About image, and could not be changed without a developer. Showing
  // nothing is better than showing the wrong picture.
  const aboutImage = sanityImage(about?.image, 1200)
  const imageAlt = about?.imageCaption || 'Gerald Gyimah — Director and founder of Still Room Productions, London-based independent film company'

  return (
    <div>
      <section className="page-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* M10: Dynamic heading level — h2 on homepage, h1 on /about page */}
            <HeadingTag>About</HeadingTag>
          </motion.div>
        </div>
      </section>

      <section className={aboutImage ? 'about-section' : 'about-section about-section--no-image'}>
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

          {/* C8: Using next/image for optimization, lazy loading, and proper dimensions */}
          {aboutImage && (
            <motion.div
              className="about-image"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={aboutImage.src}
                alt={imageAlt}
                width={1200}
                height={800}
                sizes="(max-width: 900px) 100vw, 80vw"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: aboutImage.objectPosition,
                }}
              />
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
