import SkeletonBlock from './SkeletonBlock'

/**
 * WorkPageSkeleton — mirrors the work/portfolio page:
 * page-header with title + films-section with film-entry cards.
 */
export default function WorkPageSkeleton() {
  return (
    <div className="page-standalone">
      <div id="work">
        {/* Page header */}
        <section className="page-header">
          <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
            <SkeletonBlock width="100px" height="28px" />
          </div>
        </section>

        {/* Film entries */}
        <section className="films-section">
          <div className="container">
            {[0, 1, 2].map((i) => (
              <article className="film-entry" key={i}>
                <div className="film-media-container">
                  <div className="film-image-wrapper">
                    <SkeletonBlock
                      width="100%"
                      height="100%"
                      rounded="image"
                      style={{ position: 'absolute', top: 0, left: 0 }}
                    />
                  </div>
                </div>
                <div className="film-info">
                  <SkeletonBlock width="80px" height="12px" style={{ marginBottom: '16px' }} />
                  <SkeletonBlock width="260px" height="28px" style={{ marginBottom: '20px' }} />
                  <SkeletonBlock width="100%" height="14px" style={{ marginBottom: '8px', maxWidth: '420px' }} />
                  <SkeletonBlock width="75%" height="14px" style={{ maxWidth: '320px' }} />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
