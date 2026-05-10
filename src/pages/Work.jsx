import { motion } from 'framer-motion'

/**
 * Work page — structurally clean and empty, ready for real titles to be dropped in.
 */
function Work() {
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
          {/* 
            Code Comment:
            Insert real film entries here when content is available. 
            Structure should follow:
            
            <motion.article className="film-entry">
              <div className="film-image-wrapper">
                <img src="..." alt="..." loading="lazy" />
              </div>
              <div className="film-info">
                <span className="film-status">Status</span>
                <h2 className="film-title">Title</h2>
                <p className="film-logline">Logline...</p>
                <p className="film-credits">Credits...</p>
              </div>
            </motion.article>
          */}
        </div>
      </section>
    </div>
  )
}

export default Work
