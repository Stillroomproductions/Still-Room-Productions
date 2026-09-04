'use client'

import { motion } from 'framer-motion'
import { sanityImage } from '../lib/imageUrl'
import CinematicBackground from './CinematicBackground'

/**
 * Hero section — full-screen hero with background image, title, and tagline.
 * Client component because it uses framer-motion.
 * Receives data as props from the server component page.
 */
export default function HeroSection({ hero }) {
  // Use Sanity hero data if available, fall back to defaults
  const heading = hero?.heading || 'Still Room Productions'
  const tagline = hero?.subheading ||
    'Develops formally restrained film and television work about systems, procedure, memory, and moral pressure.'
  // Honour the focal point set in Sanity; fall back to the bundled still and
  // centre framing when no hero image has been chosen yet.
  const heroImage = sanityImage(hero?.heroImage, 1920)
  const heroImageUrl = heroImage?.src || '/images/_52A6916.jpg'
  const heroImagePosition = heroImage?.objectPosition || '50% 50%'

  return (
    <section className="hero">
      <div className="hero-background">
        <CinematicBackground src={heroImageUrl} objectPosition={heroImagePosition} />
        <div className="hero-gradient"></div>
      </div>

      {/* Typographic logo text */}
      <motion.h1
        className="hero-logo-text"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {heading}
      </motion.h1>

      <motion.p
        className="hero-tagline"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {tagline}
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
  )
}
