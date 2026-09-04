import { urlFor } from './sanityClient'

/**
 * RECOMMENDED IMAGE SIZES (see CONTENT-GUIDE.md for the non-technical version)
 *
 *   Slot                    Shape on site   Upload at least   Ideal
 *   ─────────────────────── ─────────────── ───────────────── ──────────────
 *   Homepage background     fills screen    1920 x 1080       2560 x 1440
 *   Work listing thumbnail  16:10 landscape 1600 x 1000       2000 x 1250
 *   Film page stills        natural         1600 wide         2400 wide
 *   Film poster (portrait)  natural, whole  1000 x 1500       1400 x 2000
 *   About photograph        3:2 landscape   1200 x 800        1800 x 1200
 *
 * Fixed-shape slots (background, thumbnail, About) crop to fit, so set a
 * hotspot on those. Stills and posters are shown at their natural shape and
 * are never cropped.
 */

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

/**
 * Intrinsic pixel dimensions of a Sanity image.
 *
 * Sanity encodes the original size in the asset reference
 * ("image-<hash>-<width>x<height>-<ext>"), so the real aspect ratio is
 * available without an extra API call. Used for images that must be shown
 * whole at their own shape — posters — where a fixed height would crop or
 * stretch them.
 *
 * Returns null when the size cannot be determined.
 */
export function imageDimensions(source) {
  const ref = source?.asset?._ref || source?._ref
  if (typeof ref !== 'string') return null
  const match = ref.match(/-(\d+)x(\d+)-/)
  if (!match) return null
  const width = Number(match[1])
  const height = Number(match[2])
  if (!width || !height) return null
  return { width, height, aspectRatio: width / height }
}

/**
 * An image to be displayed whole, at its natural aspect ratio, never cropped.
 * Used for film posters, which carry title and credit text that must not be
 * cut off. Falls back to portrait-ish defaults if the size cannot be read.
 */
export function naturalImage(source, width = 1000) {
  const src = imageUrl(source, width)
  if (!src) return null
  const dims = imageDimensions(source)
  return {
    src,
    width: dims?.width || width,
    height: dims?.height || Math.round(width * 1.5),
    isPortrait: dims ? dims.aspectRatio < 1 : true,
  }
}
