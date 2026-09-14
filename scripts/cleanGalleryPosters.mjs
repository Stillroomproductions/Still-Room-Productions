/**
 * Removes poster artwork that was placed in a film's `images` gallery before
 * the dedicated `poster` field existed.
 *
 * Those entries now show twice on a film page: once as a gallery still and
 * again in the poster section. A gallery slot is only removed when the image
 * is portrait AND its filename looks like poster artwork, so ordinary
 * portrait stills are left alone. Empty slots are dropped too.
 *
 * Usage:
 *   node scripts/cleanGalleryPosters.mjs --dataset staging [--dry-run]
 */
import { createClient } from '@sanity/client'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('Missing SANITY_WRITE_TOKEN (see .env.local).'); process.exit(1) }

const arg = (n, f) => { const i = process.argv.indexOf('--' + n); return i !== -1 && process.argv[i+1] ? process.argv[i+1] : f }
const dataset = arg('dataset', 'staging')
const dryRun = process.argv.includes('--dry-run')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tk6o47ip',
  dataset, apiVersion: '2024-01-01', useCdn: false, token,
})

async function run() {
  console.log(`dataset: ${dataset}${dryRun ? '  (dry run)' : ''}\n`)

  const projects = await client.fetch(`*[_type=="project"]|order(title asc){
    _id, title,
    images[]{ _key, asset->{ _id, originalFilename, metadata{dimensions{width,height}} } }
  }`)

  let changed = 0
  for (const p of projects) {
    const images = p.images || []
    const keep = []
    const dropped = []

    for (const img of images) {
      const a = img.asset
      if (!a?._id) { dropped.push('(empty slot)'); continue }
      const d = a.metadata?.dimensions || {}
      const isPortrait = d.width && d.height && d.height > d.width
      const looksLikePoster = /poster|one-sheet/i.test(a.originalFilename || '')
      if (isPortrait && looksLikePoster) { dropped.push(a.originalFilename); continue }
      keep.push(img)
    }

    if (!dropped.length) continue
    changed += 1
    console.log(`${p.title}:`)
    dropped.forEach((d) => console.log(`   remove  ${d}`))
    console.log(`   ${images.length} -> ${keep.length} gallery images`)

    if (!dryRun) {
      await client.patch(p._id).set({ images: keep }).commit()
    }
  }

  if (!changed) console.log('Nothing to clean — no posters found in any gallery.')
  else if (dryRun) console.log('\nDry run — nothing written.')
  else console.log(`\n${changed} project(s) updated.`)
}

run().catch((e) => { console.error('Failed:', e.message); process.exit(1) })
