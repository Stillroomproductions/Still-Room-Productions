import SkeletonBlock from './SkeletonBlock'

/**
 * ContactPageSkeleton — mirrors the /contact page:
 * contact-section with email and location text skeletons, centered.
 */
export default function ContactPageSkeleton() {
  return (
    <div className="page-enter" style={{ paddingTop: '120px' }}>
      <div id="contact">
        <section className="contact-section">
          <div className="container">
            <div
              className="contact-content"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                textAlign: 'center',
              }}
            >
              {/* Email skeleton */}
              <SkeletonBlock
                width="380px"
                height="22px"
                style={{ marginBottom: '24px', maxWidth: '90%' }}
              />
              {/* Location skeleton */}
              <SkeletonBlock
                width="150px"
                height="14px"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
