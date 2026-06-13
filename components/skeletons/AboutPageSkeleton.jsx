import SkeletonBlock from './SkeletonBlock'

/**
 * AboutPageSkeleton — mirrors the /about page:
 * page-header with title, about-content with text lines, about-image block.
 */
export default function AboutPageSkeleton() {
  return (
    <div className="page-enter" style={{ paddingTop: '120px' }}>
      <div id="about">
        {/* Page header */}
        <section className="page-header">
          <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
            <SkeletonBlock width="110px" height="28px" />
          </div>
        </section>

        <section className="about-section">
          <div className="container">
            {/* Text content */}
            <div className="about-content">
              <SkeletonBlock width="100%" height="16px" style={{ marginBottom: '12px' }} />
              <SkeletonBlock width="97%" height="16px" style={{ marginBottom: '12px' }} />
              <SkeletonBlock width="92%" height="16px" style={{ marginBottom: '12px' }} />
              <SkeletonBlock width="88%" height="16px" style={{ marginBottom: '12px' }} />
              <SkeletonBlock width="60%" height="16px" style={{ marginBottom: '40px' }} />
            </div>

            {/* Image placeholder */}
            <div className="about-image">
              <SkeletonBlock width="100%" height="100%" rounded="image" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
