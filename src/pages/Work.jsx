import { Fragment } from 'react'
import { motion } from 'framer-motion'
import useProjects from '../hooks/useProjects'

/**
 * Work page — structurally clean and empty, ready for real titles to be dropped in.
 */
function Work() {
  const { projects, isLoading } = useProjects()

  if (isLoading) {
    return <div id="work" style={{ minHeight: '100vh', background: '#000' }} />
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
          {projects.map((film, index) => (
            <Fragment key={film.title || index}>
              <motion.article
                className="film-entry"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="film-media-container">
                  <div className="film-image-wrapper">
                    {film.title?.toUpperCase() === "ASSESSMENT" && (
                      <img 
                        src="/images/_52A6947_jpg.jpeg" 
                        alt="Hospital bed with gown and observation chart" 
                      />
                    )}
                    {film.title?.toUpperCase() === "THE CONSULTATION" && (
                      <img src="/images/the_consultation_office.jpg" alt="Empty office with desk, computer, and chairs" />
                    )}
                  </div>
                </div>
                <div className="film-info">
                  <span className="film-status">{film.type} — {film.status}</span>
                  <h2 className="film-title">{film.title?.toUpperCase()}</h2>
                  <p className="film-logline">{film.description}</p>
                </div>
              </motion.article>

              {index === 3 && (
                <motion.div 
                  className="work-divider-image"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img 
                    src="/images/_52A6909.jpg" 
                    alt="Hospital monitor, clock, and oxygen equipment against the wall" 
                  />
                </motion.div>
              )}
            </Fragment>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Work
