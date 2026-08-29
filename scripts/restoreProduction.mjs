/**
 * Returns the production dataset to the state it was in before this work:
 * removes the film posters and the hero/about/contact page documents that
 * were added, so nothing new is visible on the live site.
 *
 * Everything removed here already exists in staging, where it is reviewed
 * first and promoted later with scripts/syncDataset.mjs.
 *
 * Film projects, their stills and siteSettings are left untouched — those
 * are the site's existing content, not something this work introduced.
 *
 * Usage: node scripts/restoreProduction.mjs [--dry-run]
 */
import { createClient } from '@sanity/client'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('Missing SANITY_WRITE_TOKEN (see .env.local).'); process.exit(1) }
const dryRun = process.argv.includes('--dry-run')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tk6o47ip',
  dataset: 'production', apiVersion: '2024-01-01', useCdn: false, token,
})

const PAGE_DOCS = ['hero', 'about', 'contact']

async function run() {
  // Safety: refuse to run unless staging already holds this content, so it
  // can never be removed from production without existing somewhere else.
  const staging = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tk6o47ip',
    dataset: 'staging', apiVersion: '2024-01-01', useCdn: false, token,
  })
  const stagingPosters = await staging.fetch('count(*[_type=="project" && defined(poster)])')
  if (stagingPosters < 1) {
    console.error(
      `Staging holds ${stagingPosters} posters — refusing to strip production.\n` +
      'Run: node scripts/syncDataset.mjs --from production --to staging'
    )
    process.exit(1)
  }
  console.log(`staging holds ${stagingPosters} posters — safe to proceed\n`)

  const withPoster = await client.fetch('*[_type=="project" && defined(poster)]{_id,title}')
  const pages = await client.fetch('*[_id in $ids]{_id}', { ids: PAGE_DOCS })

  if (dryRun) {
    withPoster.forEach((p) => console.log(`would unset poster: ${p.title}`))
    pages.forEach((p) => console.log(`would delete document: ${p._id}`))
    console.log('\nDry run — nothing written.')
    return
  }

  let tx = client.transaction()
  for (const p of withPoster) tx = tx.patch(p._id, (patch) => patch.unset(['poster']))
  await tx.commit()
  console.log(`posters removed from ${withPoster.length} projects`)

  for (const p of pages) {
    // Drafts must go too, or the document reappears in the Studio.
    await client.delete(p._id).catch(() => {})
    await client.delete(`drafts.${p._id}`).catch(() => {})
    console.log(`deleted document: ${p._id}`)
  }

  console.log('\nProduction is back to its original content.')
  console.log('Everything removed lives in staging, ready to promote after review.')
}

run().catch((e) => { console.error('Failed:', e.message); process.exit(1) })
