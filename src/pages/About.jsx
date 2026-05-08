/**
 * About page — clean text-led page with a single optional image.
 */
function About() {
  return (
    <div id="about">
      <section className="page-header">
        <div className="container">
          <h1>About</h1>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <p>
              Still Room Productions is an independent film production company committed to authentic, character-driven storytelling. We develop and produce feature films, shorts, and documentary projects with a distinct creative voice.
            </p>
            <p>
              Founded on the belief that cinema should be both rigorous and compassionate, we work closely with writers and directors to nurture projects from inception through to exhibition. Our focus is on the quiet spaces — the moments that define us, the places we inhabit, and the complex inner lives of those often overlooked by mainstream narrative.
            </p>
            <p>
              We are not currently accepting unsolicited scripts or project submissions, but we are always interested in connecting with new collaborators and co-production partners.
            </p>
          </div>

          {/* Single large image slot */}
          <div className="about-image">
            {/* <img src="/about-image.jpg" alt="Still Room Productions team" /> */}
            <div className="about-image-placeholder">
              <span>Production Image</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
