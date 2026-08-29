import SkeletonBlock from './SkeletonBlock'

/**
 * FilmDetailSkeleton — mirrors the film detail / project detail page:
 * back-link, page title, hero image (21:9), and content grid (synopsis + sidebar meta).
 * Reused for both /work/[slug] and /projects/[slug].
 */
export default function FilmDetailSkeleton() {
  return (
    <div className="page-standalone">
      {/* Page header */}
      <section className="page-header">
        <div className="container">
          {/* Back link skeleton */}
          <SkeletonBlock width="120px" height="14px" style={{ marginBottom: '40px' }} />
          {/* Title skeleton */}
          <SkeletonBlock width="320px" height="36px" style={{ margin: '0 auto' }} />
        </div>
      </section>

      <div className="film-detail">
        <div className="container">
          {/* Hero image skeleton (21:9 aspect ratio) */}
          <div className="film-detail-hero">
            <SkeletonBlock width="100%" height="100%" rounded="image" />
          </div>

          {/* Content grid: main synopsis + sidebar */}
          <div className="film-detail-content">
            {/* Main column — Synopsis */}
            <div className="film-detail-main">
              <SkeletonBlock width="130px" height="22px" style={{ marginBottom: '24px' }} />
              <SkeletonBlock width="100%" height="14px" style={{ marginBottom: '10px' }} />
              <SkeletonBlock width="96%" height="14px" style={{ marginBottom: '10px' }} />
              <SkeletonBlock width="92%" height="14px" style={{ marginBottom: '10px' }} />
              <SkeletonBlock width="80%" height="14px" style={{ marginBottom: '20px' }} />
              <SkeletonBlock width="100%" height="14px" style={{ marginBottom: '10px' }} />
              <SkeletonBlock width="70%" height="14px" />
            </div>

            {/* Sidebar — Meta details */}
            <aside className="film-detail-sidebar">
              <dl className="film-detail-meta">
                {/* Status */}
                <SkeletonBlock width="60px" height="10px" style={{ marginBottom: '6px' }} />
                <SkeletonBlock width="90px" height="14px" style={{ marginBottom: '24px' }} />

                {/* Director */}
                <SkeletonBlock width="70px" height="10px" style={{ marginBottom: '6px' }} />
                <SkeletonBlock width="140px" height="14px" style={{ marginBottom: '24px' }} />

                {/* Producer */}
                <SkeletonBlock width="70px" height="10px" style={{ marginBottom: '6px' }} />
                <SkeletonBlock width="130px" height="14px" style={{ marginBottom: '24px' }} />

                {/* Year */}
                <SkeletonBlock width="40px" height="10px" style={{ marginBottom: '6px' }} />
                <SkeletonBlock width="50px" height="14px" style={{ marginBottom: '24px' }} />

                {/* Format */}
                <SkeletonBlock width="60px" height="10px" style={{ marginBottom: '6px' }} />
                <SkeletonBlock width="90px" height="14px" />
              </dl>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
