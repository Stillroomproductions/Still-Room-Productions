import SkeletonBlock from './SkeletonBlock'

/**
 * HomePageSkeleton — mirrors the home page layout:
 * Hero (full viewport), Work section (title + film cards), About section, Contact section.
 */
export default function HomePageSkeleton() {
  return (
    <div className="page-enter">
      {/* ── Hero Section ── */}
      <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Background shimmer */}
        <SkeletonBlock
          width="100%"
          height="100%"
          rounded="image"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        {/* Title */}
        <SkeletonBlock
          width="420px"
          height="44px"
          style={{ marginBottom: '48px', position: 'relative', zIndex: 1 }}
        />
        {/* Tagline */}
        <SkeletonBlock
          width="500px"
          height="18px"
          style={{ position: 'relative', zIndex: 1, maxWidth: '90%' }}
        />
        <SkeletonBlock
          width="350px"
          height="18px"
          style={{ marginTop: '10px', position: 'relative', zIndex: 1, maxWidth: '70%' }}
        />
      </section>

      {/* ── Work Section ── */}
      <div id="work">
        <section className="page-header">
          <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
            <SkeletonBlock width="100px" height="28px" />
          </div>
        </section>

        <section className="films-section">
          <div className="container">
            {[0, 1].map((i) => (
              <article className="film-entry" key={i}>
                <div className="film-media-container">
                  <div className="film-image-wrapper">
                    <SkeletonBlock width="100%" height="100%" rounded="image" style={{ position: 'absolute', top: 0, left: 0 }} />
                  </div>
                </div>
                <div className="film-info">
                  <SkeletonBlock width="80px" height="12px" style={{ marginBottom: '16px' }} />
                  <SkeletonBlock width="240px" height="28px" style={{ marginBottom: '20px' }} />
                  <SkeletonBlock width="100%" height="14px" style={{ marginBottom: '8px', maxWidth: '400px' }} />
                  <SkeletonBlock width="75%" height="14px" style={{ maxWidth: '300px' }} />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* ── About Section ── */}
      <div id="about">
        <section className="page-header">
          <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
            <SkeletonBlock width="110px" height="28px" />
          </div>
        </section>
        <section className="about-section">
          <div className="container">
            <div className="about-content">
              <SkeletonBlock width="100%" height="16px" style={{ marginBottom: '12px' }} />
              <SkeletonBlock width="95%" height="16px" style={{ marginBottom: '12px' }} />
              <SkeletonBlock width="85%" height="16px" style={{ marginBottom: '12px' }} />
              <SkeletonBlock width="60%" height="16px" style={{ marginBottom: '40px' }} />
            </div>
            <div className="about-image">
              <SkeletonBlock width="100%" height="100%" rounded="image" />
            </div>
          </div>
        </section>
      </div>

      {/* ── Contact Section ── */}
      <div id="contact">
        <section className="contact-section">
          <div className="container">
            <div className="contact-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <SkeletonBlock width="360px" height="20px" style={{ marginBottom: '24px', maxWidth: '90%' }} />
              <SkeletonBlock width="140px" height="14px" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
