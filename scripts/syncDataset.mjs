/**
 * Copies every document from one dataset to another, so staging can start as
 * a real mirror of the live site's content.
 *
 * Images are NOT re-uploaded: both datasets belong to the same project and
 * share one asset store, so the asset references simply resolve.
 *
 * By default it refuses to write to "production" — the whole point of
 * staging is that live content is not touched by accident. Pass
 * --allow-production only for a deliberate, reviewed staging -> live promotion.
 *
 * Usage:
 *   node scripts/syncDataset.mjs --from production --to staging
 *   node scripts/syncDataset.mjs --from staging --to production --allow-production
 */
import { createClient } from '@sanity/client'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('Missing SANITY_WRITE_TOKEN (see .env.local).'); process.exit(1) }

const arg = (name, fallback) => {
  const i = process.argv.indexOf('--' + name)
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback
}
const from = arg('from', 'production')
const to = arg('to', 'staging')
const allowProduction = process.argv.includes('--allow-production')
const dryRun = process.argv.includes('--dry-run')

if (from === to) { console.error('--from and --to must differ.'); process.exit(1) }
if (to === 'production' && !allowProduction) {
  console.error(
    'Refusing to write to production.\n' +
    'This would overwrite live content. If that is genuinely intended, re-run\n' +
    'with --allow-production.'
  )
  process.exit(1)
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tk6o47ip'
const mk = (dataset) => createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: false, token })
const src = mk(from)
const dst = mk(to)

async function run() {
  // Skip drafts and Sanity's own system documents.
  const docs = await src.fetch('*[!(_id in path("drafts.**")) && !(_id in path("_.**"))]')
  console.log(`${from}: ${docs.length} documents found`)

  if (dryRun) {
    for (const d of docs) console.log(`  would copy ${d._type.padEnd(14)} ${d._id}`)
    console.log('\nDry run — nothing written.')
    return
  }

  let tx = dst.transaction()
  for (const doc of docs) {
    // eslint-disable-next-line no-unused-vars
    const { _createdAt, _updatedAt, _rev, ...rest } = doc
    tx = tx.createOrReplace(rest)
  }
  await tx.commit()
  console.log(`${to}: ${docs.length} documents written`)
  console.log('\nImages are shared across datasets in the same project, so they resolve as-is.')
}

run().catch((e) => { console.error('Failed:', e.message); process.exit(1) })
