/**
 * Turns a YouTube or Vimeo link into an embeddable player URL.
 *
 * Editors paste whatever the share button gives them, which varies a lot:
 * youtu.be short links, URLs carrying ?t= or ?share=, Vimeo channel paths,
 * and sometimes an already-embeddable URL. The previous implementation split
 * on "/" and took the last segment, so any query string ended up inside the
 * video id and the embed silently failed to load.
 *
 * Returns null when the link is not a recognised YouTube or Vimeo URL, so
 * callers can hide the section rather than render a broken iframe.
 */

/** Video ids are alphanumeric with - and _ (YouTube) or digits (Vimeo). */
const YOUTUBE_ID = /^[\w-]{6,}$/
const VIMEO_ID = /^\d+$/

function parseUrl(raw) {
  try {
    return new URL(String(raw).trim())
  } catch {
    return null
  }
}

export function getEmbedUrl(raw) {
  if (!raw) return null
  const url = parseUrl(raw)
  if (!url) return null

  const host = url.hostname.replace(/^www\./, '').toLowerCase()
  // Non-empty path segments, so a trailing slash does not produce a blank id.
  const parts = url.pathname.split('/').filter(Boolean)

  // ── YouTube ──────────────────────────────────────────────────────────
  if (host === 'youtu.be') {
    const id = parts[0]
    return id && YOUTUBE_ID.test(id) ? youtubeEmbed(id) : null
  }

  if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
    // /watch?v=ID
    const v = url.searchParams.get('v')
    if (v && YOUTUBE_ID.test(v)) return youtubeEmbed(v)

    // /embed/ID, /v/ID, /shorts/ID, /live/ID
    if (['embed', 'v', 'shorts', 'live'].includes(parts[0])) {
      const id = parts[1]
      return id && YOUTUBE_ID.test(id) ? youtubeEmbed(id) : null
    }
    return null
  }

  // ── Vimeo ────────────────────────────────────────────────────────────
  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    // The id is the last purely numeric segment: this covers vimeo.com/ID,
    // /channels/name/ID, /groups/name/videos/ID and player.vimeo.com/video/ID.
    const numeric = parts.filter((p) => VIMEO_ID.test(p))
    const id = numeric[numeric.length - 1]
    if (!id) return null

    // An unlisted Vimeo video needs its private hash to play.
    const hash = url.searchParams.get('h') || (VIMEO_ID.test(parts[parts.length - 1]) ? null : parts[parts.length - 1])
    const query = new URLSearchParams({ autoplay: '0', title: '0', byline: '0', portrait: '0' })
    if (hash && !VIMEO_ID.test(hash) && /^[a-z0-9]+$/i.test(hash)) query.set('h', hash)
    return `https://player.vimeo.com/video/${id}?${query.toString()}`
  }

  return null
}

/** autoplay=0 and rel=0 keep it quiet and stop unrelated suggestions. */
function youtubeEmbed(id) {
  const query = new URLSearchParams({ autoplay: '0', rel: '0', modestbranding: '1' })
  return `https://www.youtube-nocookie.com/embed/${id}?${query.toString()}`
}
