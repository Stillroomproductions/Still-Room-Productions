/**
 * Sets the homepage background and About photograph in Sanity, so both stop
 * relying on files bundled in the code.
 *
 * Only fills a field that is currently empty — an image chosen later in the
 * Studio is never overwritten. Pass --force to replace.
 *
 * Usage: node scripts/setPageImages.mjs [--force]
 */
import { createClient } from '@sanity/client'
import fs from 'fs'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('Missing SANITY_WRITE_TOKEN.'); process.exit(1) }
const force = process.argv.includes('--force')
const dsIdx = process.argv.indexOf('--dataset')
const dataset = dsIdx !== -1 && process.argv[dsIdx + 1]
  ? process.argv[dsIdx + 1]
  : (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tk6o47ip',
  dataset,
  apiVersion: '2024-01-01', useCdn: false, token,
})

// Hotspots are centred; adjust in the Studio at any time.
const TARGETS = [
  { id: 'hero',  field: 'heroImage', file: '_unused-images/_52A6947_jpg.jpeg',
    label: 'Homepage background' },
  { id: 'about', field: 'image',     file: '_unused-images/_52A6982.jpg',
    label: 'About photograph' },
]

async function run() {
  console.log(`dataset: ${dataset}
`)
  for (const t of TARGETS) {
    if (!fs.existsSync(t.file)) { console.log(`${t.label}: source file missing — skipped`); continue }
    const doc = await client.fetch(`*[_id==$id][0]{_id, "has": defined(${t.field})}`, { id: t.id })
    if (!doc) { console.log(`${t.label}: document "${t.id}" not found — skipped`); continue }
    if (doc.has && !force) { console.log(`${t.label}: already set — skipped`); continue }

    const asset = await client.assets.upload('image', fs.createReadStream(t.file), {
      filename: t.file.split(/[\/]/).pop(),
    })
    await client.patch(t.id).set({
      [t.field]: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
    }).commit()
    const d = asset.metadata?.dimensions || {}
    console.log(`${t.label}: set (${d.width}x${d.height})`)
  }
  console.log('\nDone. Set the hotspot on each in the Studio to choose framing.')
}
run().catch((e) => { console.error('Failed:', e.message); process.exit(1) })
