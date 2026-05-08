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
          <h1>Contact</h1>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
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
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
