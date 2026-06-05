import { Fragment, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { urlFor } from '../sanityClient'
import useProjects from '../hooks/useProjects'
import ProjectPage from '../pages/ProjectPage'

/**
 * Work page — renders project content exclusively from Sanity.
 */
function Work() {
  const { projects, isLoading } = useProjects()
  const [selectedSlug, setSelectedSlug] = useState(null)
  const { hash } = useLocation()

  /* Close ProjectPage when navigating to a different section via header nav */
  useEffect(() => {
    if (hash && hash !== '#work') {
      setSelectedSlug(null)
    }
  }, [hash])

  if (isLoading) {
    return <div id="work" style={{ minHeight: '100vh', background: '#000' }} />
  }

  if (selectedSlug) {
    return (
      <ProjectPage slug={selectedSlug} onBack={() => setSelectedSlug(null)} />
    )
  }

  return (
    <div id="work">
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
                onClick={() => {
                  console.log('clicked:', project.slug?.current)
                  setSelectedSlug(project.slug?.current)
                }}
                style={{ cursor: 'pointer' }}
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
                        alt={project.title}
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

export default Work
