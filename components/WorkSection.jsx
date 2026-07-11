'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../lib/sanityClient'

/**
 * Work section — renders project content from Sanity.
 * Receives projects array as props from the server component.
 * Clicking a project navigates to /work/[slug].
 *
 * M9: Accepts headingLevel prop to prevent duplicate H1 on homepage.
 * C8: Uses next/image for image optimization.
 */
export default function WorkSection({ projects = [], headingLevel = 'h2' }) {
  const HeadingTag = headingLevel

  return (
    <div>
      <section className="work-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* M9: Dynamic heading level — h2 on homepage, h1 on /work page */}
            <HeadingTag>Work</HeadingTag>
          </motion.div>
        </div>
      </section>

      <section className="films-section">
        <div className="container">
          {projects.map((project, index) => (
            <Fragment key={project._id || project.title || index}>
              <Link href={`/work/${project.slug?.current}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.article
                  id={`project-${project.slug?.current}`}
                  className="film-entry"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="film-media-container">
                    <div className="film-image-wrapper">
                      {/* C8: Using next/image for optimization, lazy loading, and responsive srcset */}
                      {project.image ? (
                        <Image
                          src={urlFor(project.image).width(1200).url()}
                          alt={`${project.title} — film still from Still Room Productions short film`}
                          width={1200}
                          height={750}
                          sizes="(max-width: 900px) 100vw, 60vw"
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="image-placeholder" />
                      )}
                    </div>
                  </div>

                  <div className="film-info">
                    <span className="film-status">{project.type?.toUpperCase() || 'FILM'}</span>
                    <h2 className="film-title" style={{ cursor: project.slug?.current ? 'pointer' : 'default' }}>{project.title?.toUpperCase()}</h2>
                    <p className="film-logline">{project.description}</p>
                  </div>
                </motion.article>
              </Link>
            </Fragment>
          ))}
        </div>
      </section>
    </div>
  )
}
