'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
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

export default function FilmDetail({ film: project }) {
  const embedUrl = getEmbedUrl(project.trailerUrl)
  const isConsultation = project.title?.toLowerCase().trim() === 'the consultation'
  const firstImageIndex = isConsultation ? 2 : 1
  const secondImageIndex = isConsultation ? 1 : 2

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
          <Link href={`/#project-${project.slug?.current}`} className="back-link" style={{ display: 'inline-block', textDecoration: 'none', color: '#fff', fontSize: '14px', marginBottom: '16px' }}>
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

          {/* Synopsis */}
          {/* {project.description && (
            <div className="project-synopsis" style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '48px', maxWidth: '800px', opacity: 0.9 }}>
              {project.description}
            </div>
          )} */}
        </motion.div>

        {/* First image (main film still) */}
        {/* {project.images?.[0] && (
          <motion.div 
            className="project-hero-image" 
            style={{ marginBottom: '80px', aspectRatio: '16/9', overflow: 'hidden' }}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={urlFor(project.images[0]).width(1600).url()} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        )} */}
        {/* Cast + Image row (Responsive) */}
        <motion.div
          className="film-detail-cast-row"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Image */}
          {hasAsset(project.images?.[firstImageIndex]) && (
            <div className="film-detail-image-col" style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
              <img src={urlFor(project.images[firstImageIndex]).width(1600).url()} alt={`${project.title} image 1`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
        {!isConsultation && hasAsset(project.images?.[secondImageIndex]) && (
          <motion.div 
            className="project-image" 
            style={{ marginBottom: '60px', aspectRatio: '16/9', overflow: 'hidden' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={urlFor(project.images[secondImageIndex]).width(1600).url()} alt={`${project.title} image 2`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        )}

        {/* Trailer */}
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
                frameBorder="0"
                allow="autoplay; fullscreen"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
