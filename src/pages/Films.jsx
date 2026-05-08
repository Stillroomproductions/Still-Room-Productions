import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import films from '../data/films'

/**
 * Films page — editorial-style listing of all productions.
 * Each entry alternates image/text placement for visual rhythm.
 */
function Films() {
  return (
    <div id="films">
      <section className="page-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Films
          </motion.h1>
        </div>
      </section>

      <section className="films-section">
        <div className="container">
          {films.map((film, index) => (
            <motion.article 
              className="film-entry" 
              key={film.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image */}
              <div className="film-image-wrapper">
                {film.image ? (
                  <img src={film.image} alt={`${film.title} — production still`} loading="lazy" />
                ) : (
                  <div className="film-image-placeholder">
                    <span>Image</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="film-info">
                <span className="film-status">{film.status}</span>
                <h2 className="film-title">
                  <Link to={`/films/${film.slug}`}>{film.title}</Link>
                </h2>
                <p className="film-logline">{film.logline}</p>
                <p className="film-credits">
                  Director: {film.director}<br />
                  Producer: {film.producer}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Films
