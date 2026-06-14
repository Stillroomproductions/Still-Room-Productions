'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { urlFor } from '../lib/sanityClient'

/**
 * Work section — renders project content from Sanity.
 * Receives projects array as props from the server component.
 * Clicking a project navigates to /projects/[slug].
 */
export default function WorkSection({ projects = [], onFilmClick }) {
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
            Work
          </motion.h1>
        </div>
      </section>

      <section className="films-section">
        <div className="container">
          {projects.map((project, index) => (
            <Fragment key={project._id || project.title || index}>
              <div
                onClick={() => onFilmClick && onFilmClick(project)}
                style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onFilmClick && onFilmClick(project);
                  }
                }}
              >
                <motion.article
                  className="film-entry"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="film-media-container">
                    <div className="film-image-wrapper">
                      {project.image ? (
                        <img
                          src={urlFor(project.image).width(1200).url()}
                          alt={project.title + ' — Still Room Productions'}
                          loading="lazy"
                        />
                      ) : (
                        <div className="image-placeholder" />
                      )}
                    </div>
                  </div>

                  <div className="film-info">
                    <span className="film-status">SHORT FILM</span>
                    <h2 className="film-title" style={{ cursor: project.slug?.current ? 'pointer' : 'default' }}>{project.title?.toUpperCase()}</h2>
                    <p className="film-logline">{project.description}</p>
                  </div>
                </motion.article>
              </div>
            </Fragment>
          ))}
        </div>
      </section>
    </div>
  )
}
