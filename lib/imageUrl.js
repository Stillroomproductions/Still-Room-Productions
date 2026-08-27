import { urlFor } from './sanityClient'

/**
 * Shared image helpers so every component crops Sanity images the same way.
 *
 * Sanity's "hotspot" is the point the editor marks as the part of the picture
 * that must stay in frame; "crop" is an optional trim around it. Previously
 * only WorkSection honoured the hotspot, so setting one in Sanity changed the
 * Work listing and was silently ignored everywhere else. These helpers give
 * every image slot the same behaviour.
 */

/** True when the value is a Sanity image object we can build a URL for. */
export function hasImageAsset(source) {
  if (!source) return false
  if (typeof source === 'string') return source.length > 0
  return Boolean(source.asset || source._ref)
}

/**
 * CSS object-position matching the image's hotspot.
 * Falls back to dead centre when no hotspot has been set in Sanity.
 */
export function hotspotPosition(source) {
  const hotspot = source?.hotspot
  if (!hotspot || typeof hotspot.x !== 'number' || typeof hotspot.y !== 'number') {
    return '50% 50%'
  }
  const clamp = (n) => Math.min(100, Math.max(0, n * 100))
  return `${clamp(hotspot.x).toFixed(1)}% ${clamp(hotspot.y).toFixed(1)}%`
}

/**
 * Build an image URL at a given width.
 *
 * Passing the raw Sanity object (not a pre-built URL) matters: the image
 * builder applies the editor's crop rectangle server-side, and `hotspotPosition`
 * then handles the focal point for whatever aspect ratio the slot forces.
 */
export function imageUrl(source, width = 1200) {
  if (!hasImageAsset(source)) return null
  const builder = urlFor(source)
  let url
  try {
    url = builder.width(width).auto('format').url()
  } catch {
    url = builder.width(width).url()
  }
  // urlFor returns an empty URL when it cannot resolve the asset; treat that
  // as "no image" so callers skip the slot instead of rendering a broken img.
  return url || null
}

/**
 * Everything a component needs to render one Sanity image correctly.
 * Returns null when there is no usable image, so callers can render a
 * placeholder instead of a broken <img>.
 */
export function sanityImage(source, width = 1200) {
  const src = imageUrl(source, width)
  if (!src) return null
  return { src, objectPosition: hotspotPosition(source) }
}
