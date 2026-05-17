import { motion } from 'framer-motion'

/**
 * Work page — structurally clean and empty, ready for real titles to be dropped in.
 */
function Work() {
  const films = [
    {
      title: "ON RECORD",
      type: "Short Film",
      status: "Post-Production",
      description: "A procedural interview unfolds inside a small administrative room as a woman attempts to formally account for a private event. The institution records everything except what matters."
    },
    {
      title: "THE CONSULTATION",
      type: "Short Film",
      status: "Post-Production",
      description: "Two partners attend a formal consultation with a specialist. Across a single meeting, administrative procedure slowly replaces intimacy, responsibility, and speech."
    },
    {
      title: "ASSESSMENT",
      type: "Short Film",
      status: "Post-Production",
      description: "Inside a clinical assessment room, a patient is processed through a sequence of institutional checks and observations. Procedure continues regardless of emotional reality."
    },
    {
      title: "PROTOCOL",
      type: "Short Film",
      status: "In Development",
      description: "Following an incident at a community centre, a worker attempts to complete the required safeguarding procedure while another staff member struggles to remain functional inside the process itself."
    },
    {
      title: "THE POSITION",
      type: "Short Film",
      status: "In Development",
      description: "A woman waits upstairs while a formal family discussion unfolds below. Through silence, movement, and administrative language, a decision gradually takes shape around her absence."
    },
    {
      title: "MY HOUSE",
      type: "Short Film",
      status: "In Development",
      description: "A routine housing visit slowly reveals the unstable boundary between care, observation, and institutional authority inside a domestic space."
    },
    {
      title: "THE CHILD IS WELL",
      type: "Short Film",
      status: "In Development",
      description: "Across a late-night phone line between two separate rooms, a procedural welfare check becomes an attempt to determine whether language itself can adequately account for harm."
    }
  ];

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
          {films.map((film, index) => (
            <motion.article
              key={index}
              className="film-entry"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="film-media-container">
                <div className="film-image-wrapper">
                  {film.title === "ASSESSMENT" && (
                    <img 
                      src="/images/_52A6982.jpg" 
                      alt="PLEASE DO NOT ABUSE OUR STAFF institutional sign under fluorescent lighting" 
                      style={{ objectFit: 'contain', backgroundColor: '#000000' }} 
                    />
                  )}
                  {/* Image placeholder: institutional still, to be provided */}
                </div>
                {film.title === "ASSESSMENT" && (
                  <div className="supporting-image-wrapper">
                    <img 
                      src="/images/_52A6909.jpg" 
                      alt="Hospital monitor, clock, and oxygen equipment against the wall" 
                    />
                  </div>
                )}
              </div>
              <div className="film-info">
                <span className="film-status">{film.type} — {film.status}</span>
                <h2 className="film-title">{film.title}</h2>
                <p className="film-logline">{film.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Work
