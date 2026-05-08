import { Link } from 'react-router-dom'
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
          <h1>Films</h1>
        </div>
      </section>

      <section className="films-section">
        <div className="container">
          {films.map((film) => (
            <article className="film-entry" key={film.id}>
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
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Films
