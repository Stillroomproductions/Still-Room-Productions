import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import films from '../data/films'

/**
 * Individual film detail page.
 * Shows expanded information, synopsis, and large hero image.
 */
function FilmDetail() {
  const { slug } = useParams()
  
  // Find the requested film
  const film = films.find(f => f.slug === slug)

  if (!film) {
    return (
      <div className="page-enter">
        <section className="page-header">
          <div className="container">
            <h1>Film Not Found</h1>
            <p style={{ marginTop: '20px' }}>
              <Link to="/films" className="back-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Films
              </Link>
            </p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page-enter">
      <section className="page-header">
        <div className="container">
          <Link to="/films" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Films
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {film.title}
          </motion.h1>
        </div>
      </section>

      <div className="film-detail">
        <div className="container">
          {/* Full width hero image */}
          <motion.div 
            className="film-detail-hero"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {film.image ? (
              <img src={film.image} alt={`${film.title} hero`} loading="lazy" />
            ) : (
              <div className="film-image-placeholder">
                <span>Hero Image</span>
              </div>
            )}
          </motion.div>

          {/* Content grid */}
          <motion.div 
            className="film-detail-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="film-detail-main">
              <h2>Synopsis</h2>
              <p>{film.synopsis}</p>
            </div>
            
            <aside className="film-detail-sidebar">
              <dl className="film-detail-meta">
                <dt>Status</dt>
                <dd>{film.status}</dd>

                <dt>Director</dt>
                <dd>{film.director}</dd>

                <dt>Producer</dt>
                <dd>{film.producer}</dd>

                <dt>Year</dt>
                <dd>{film.year}</dd>

                <dt>Format</dt>
                <dd>{film.format}</dd>

                {film.runtime && (
                  <>
                    <dt>Runtime</dt>
                    <dd>{film.runtime}</dd>
                  </>
                )}
              </dl>
            </aside>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default FilmDetail
