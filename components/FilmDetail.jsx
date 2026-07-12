'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../lib/sanityClient'

function getEmbedUrl(url) {
  if (!url) return null
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const id = url.split('v=')[1]?.split('&')[0] || url.split('/').pop()
    return `https://www.youtube.com/embed/${id}`
  }
  if (url.includes('vimeo.com')) {
    const id = url.split('/').pop()
    return `https://player.vimeo.com/video/${id}`
  }
  return null
}

/** Check whether a Sanity image object has an actual asset reference that urlFor can resolve */
function hasAsset(img) {
  return img && (img.asset || img._ref || (typeof img === 'string'))
}

/**
 * Film detail page component.
 * C8: Uses next/image for all images.
 * M11: Descriptive alt text for Google Image search.
 * M12: Added title to iframe for accessibility.
 * L8: Removed deprecated frameBorder attribute.
 */
export default function FilmDetail({ film: project }) {
  const embedUrl = getEmbedUrl(project.trailerUrl)
  const allImages = project.images || []
  const isConsultation = project.title?.toLowerCase().trim() === 'the consultation'
  
  let firstImg = null
  let secondImg = null
  
  if (allImages.length > 0) {
    if (isConsultation) {
      firstImg = allImages[2] || allImages[1] || allImages[0]
    } else {
      firstImg = allImages[1] || allImages[0]
      secondImg = allImages[2] || null
    }
  }

  return (
    <div id="project-detail" style={{ minHeight: '100vh', background: '#000', color: '#fff', paddingBottom: '80px' }}>
      <div className="container" style={{ paddingTop: '100px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Back link */}
          <Link href="/work" className="back-link" style={{ display: 'inline-block', textDecoration: 'none', color: '#fff', fontSize: '14px', marginBottom: '16px' }}>
            ←   Work
          </Link>

          {/* Status */}
          <div className="project-status" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', opacity: 0.7 }}>
            {project.type ? project.type.toUpperCase() : 'SHORT FILM'}
          </div>

          {/* Title */}
          <h1 className="project-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 36px)', fontWeight: 300, letterSpacing: '-1px', marginBottom: '8px', lineHeight: 1.2, textTransform: 'uppercase' }}>
            {project.title}
          </h1>

          {/* Written & Directed credit */}
          <p style={{
            fontSize: '13px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#7a6e5f',
            marginBottom: '24px',
            fontWeight: 200,
          }}>
            Written & Directed by {project.director || 'Gerald Gyimah'}
          </p>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '32px' }} />
        </motion.div>

        {/* Cast + Image row (Responsive) */}
        <motion.div
          className="film-detail-cast-row"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* C8: Using next/image, M11: Descriptive alt text */}
          {hasAsset(firstImg) && (
            <div className="film-detail-image-col" style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
              <Image
                src={urlFor(firstImg).width(1600).url()}
                alt={`Scene from ${project.title} — ${project.description?.slice(0, 100) || 'a short film by Still Room Productions'}`}
                width={1600}
                height={900}
                sizes="(max-width: 992px) 100vw, 60vw"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}

          {/* Cast */}
          {project.cast?.length > 0 && (
            <div className="film-detail-cast-col">
              <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '24px', opacity: 0.7 }}>
                Cast
              </h2>
              <div className="cast-grid">
                {project.cast.map((member, i) => (
                  <div key={i} className="cast-member" style={{ fontSize: '16px', opacity: 0.9 }}>
                    {member.actorName}
                    {member.characterName && (
                      <span style={{ display: 'block', opacity: 0.6, fontSize: '14px', marginTop: '4px' }}>
                        as {member.characterName}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Third image (hidden for The Consultation) */}
        {!isConsultation && hasAsset(secondImg) && (
          <motion.div 
            className="project-image" 
            style={{ marginBottom: '60px', aspectRatio: '16/9', overflow: 'hidden' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={urlFor(secondImg).width(1600).url()}
              alt={`Production still from ${project.title} — Still Room Productions`}
              width={1600}
              height={900}
              sizes="(max-width: 992px) 100vw, 80vw"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>
        )}

        {/* Trailer — M12: Added title, L8: Removed deprecated frameBorder */}
        {embedUrl && (
          <motion.div 
            className="project-trailer" 
            style={{ marginBottom: '60px' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', opacity: 0.7 }}>
              Trailer
            </h2>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe
                src={embedUrl}
                title={`${project.title} — Trailer`}
                allow="autoplay; fullscreen"
                allowFullScreen
                loading="lazy"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
