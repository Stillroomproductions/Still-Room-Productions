import { motion } from 'framer-motion'

/**
 * Contact page — minimal text layout with a clean form.
 */
function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // For now, just a frontend form, no backend processing
    alert('Thank you. We will be in touch shortly.')
    e.target.reset()
  }

  return (
    <div id="contact">
      <section className="page-header">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Contact
          </motion.h1>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <motion.div 
            className="contact-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="mailto:hello@stillroomproductions.com" className="contact-email">
              hello@stillroomproductions.com
            </a>
            <p className="contact-location">London, UK</p>

            <div className="contact-divider"></div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your name" 
                  required 
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Your email address" 
                  required 
                />
              </div>

              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="How can we help?" 
                  required 
                ></textarea>
              </div>

              <button type="submit" className="form-submit">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
