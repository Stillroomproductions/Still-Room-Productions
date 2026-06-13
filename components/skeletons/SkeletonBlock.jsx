/**
 * SkeletonBlock — Reusable shimmer skeleton placeholder.
 * Pure CSS, no external libraries.
 *
 * Props:
 *   width   — CSS width value (default: '100%')
 *   height  — CSS height value (default: '20px')
 *   className — additional class names
 *   style   — additional inline styles
 *   rounded — 'text' | 'image' (default: 'text', controls border-radius)
 */
export default function SkeletonBlock({
  width = '100%',
  height = '20px',
  className = '',
  style = {},
  rounded = 'text',
}) {
  const radiusClass = rounded === 'image' ? 'skeleton-image' : 'skeleton-text'

  return (
    <div
      className={`skeleton-block ${radiusClass} ${className}`}
      style={{
        width,
        height,
        ...style,
      }}
      aria-hidden="true"
    />
  )
}
