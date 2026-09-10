/**
 * Clears the homepage background and About photograph from a dataset.
 *
 * Those two images were set from existing photography as placeholders. This
 * removes them so the fields are empty and whoever manages the content
 * chooses the real images themselves.
 *
 * Only unsets the two image fields. The hero/about/contact documents stay
 * (so the pages remain editable in the Studio), and film posters are not
 * touched.
 *
 * Usage:
 *   node scripts/revertPageImages.mjs --dataset production [--dry-run]
 */
import { createClient } from '@sanity/client'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('Missing SANITY_WRITE_TOKEN (see .env.local).'); process.exit(1) }

const arg = (n, f) => { const i = process.argv.indexOf('--' + n); return i !== -1 && process.argv[i+1] ? process.argv[i+1] : f }
const dataset = arg('dataset', 'production')
const dryRun = process.argv.includes('--dry-run')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tk6o47ip',
  dataset, apiVersion: '2024-01-01', useCdn: false, token,
})

const TARGETS = [
  { id: 'hero',  field: 'heroImage', label: 'Homepage background' },
  { id: 'about', field: 'image',     label: 'About photograph' },
]

async function run() {
  console.log(`dataset: ${dataset}${dryRun ? '  (dry run)' : ''}\n`)
  for (const t of TARGETS) {
    const doc = await client.fetch(
      `*[_id==$id][0]{_id, "file": ${t.field}.asset->originalFilename}`, { id: t.id }
    )
    if (!doc) { console.log(`${t.label}: document "${t.id}" not found — skipped`); continue }
    if (!doc.file) { console.log(`${t.label}: already empty — nothing to do`); continue }

    if (dryRun) { console.log(`${t.label}: would clear (currently ${doc.file})`); continue }

    await client.patch(t.id).unset([t.field]).commit()
    console.log(`${t.label}: cleared (was ${doc.file})`)
  }
  console.log('\nDocuments kept, so both pages stay editable in the Studio.')
  console.log('Film posters were not touched.')
}

run().catch((e) => { console.error('Failed:', e.message); process.exit(1) })
