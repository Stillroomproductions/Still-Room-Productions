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
  const assets = docs.filter((d) => d._type === 'sanity.imageAsset' || d._type === 'sanity.fileAsset')
  const content = docs.filter((d) => !d._type.startsWith('sanity.'))
  console.log(`${from}: ${content.length} content documents, ${assets.length} assets`)

  if (dryRun) {
    for (const d of content) console.log(`  would copy ${d._type.padEnd(14)} ${d._id}`)
    console.log(`  would re-upload ${assets.length} asset files`)
    console.log('\nDry run - nothing written.')
    return
  }

  // Re-upload each asset binary into the target dataset and remember its new
  // id, so references in the content documents can be repointed.
  const idMap = new Map()
  let n = 0
  for (const asset of assets) {
    n += 1
    // Only reuse an asset whose binary actually resolves in the target
    // dataset. An asset document can exist there without its file (for
    // example if a previous sync copied documents only), and reusing that
    // would leave every image 404ing.
    const existing = await dst.fetch(
      '*[_type==$t && originalFilename==$f && size==$s][0]{_id, url}',
      { t: asset._type, f: asset.originalFilename || '', s: asset.size || 0 }
    )
    // The asset document's own `url` can still point at the source dataset
    // (it is copied verbatim), so checking that proves nothing. What matters
    // is whether the binary exists at the path the image builder will
    // construct for THIS dataset.
    const cdnPath = existing?._id
      ? `https://cdn.sanity.io/images/${projectId}/${to}/` +
        existing._id.replace(/^image-/, '').replace(/-(\w+)$/, '.$1')
      : null
    const usable = cdnPath
      ? await fetch(cdnPath, { method: 'HEAD' }).then((r) => r.ok).catch(() => false)
      : false
    if (existing && usable) {
      idMap.set(asset._id, existing._id)
      process.stdout.write(`\r  assets: ${n}/${assets.length} (reused)   `)
      continue
    }
    const res = await fetch(asset.url)
    if (!res.ok) throw new Error(`could not download ${asset._id}: HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    const uploaded = await dst.assets.upload(
      asset._type === 'sanity.fileAsset' ? 'file' : 'image',
      buf,
      { filename: asset.originalFilename || undefined }
    )
    idMap.set(asset._id, uploaded._id)
    process.stdout.write(`\r  assets: ${n}/${assets.length} (uploaded) `)
  }
  if (assets.length) console.log('')

  // Repoint every asset reference at the id it has in the target dataset.
  const remap = (value) => {
    if (Array.isArray(value)) return value.map(remap)
    if (value && typeof value === 'object') {
      const out = {}
      for (const [k, v] of Object.entries(value)) {
        out[k] = k === '_ref' && typeof v === 'string' && idMap.has(v) ? idMap.get(v) : remap(v)
      }
      return out
    }
    return value
  }

  let tx = dst.transaction()
  for (const doc of content) {
    // eslint-disable-next-line no-unused-vars
    const { _createdAt, _updatedAt, _rev, ...rest } = doc
    tx = tx.createOrReplace(remap(rest))
  }
  await tx.commit()
  console.log(`${to}: ${content.length} content documents written`)
}

run().catch((e) => { console.error('Failed:', e.message); process.exit(1) })
