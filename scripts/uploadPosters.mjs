/**
 * Uploads the portrait film posters into Sanity and attaches each one to its
 * project's `poster` field.
 *
 * The filename-to-film mapping below is explicit rather than inferred, so a
 * poster can never be attached to the wrong film.
 *
 * Safe to re-run: uploading the same file returns the same asset, and a
 * project that already has a poster is skipped unless --force is passed.
 *
 * Usage:
 *   node scripts/uploadPosters.mjs <folder> [--force]
 */
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN (see .env.local).')
  process.exit(1)
}

const folder = process.argv[2]
const force = process.argv.includes('--force')
const dsIdx = process.argv.indexOf('--dataset')
const dataset = dsIdx !== -1 && process.argv[dsIdx + 1]
  ? process.argv[dsIdx + 1]
  : (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')
if (!folder || !fs.existsSync(folder)) {
  console.error('Pass the folder containing the poster files.')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tk6o47ip',
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

// filename fragment -> project slug. Explicit on purpose.
const MAP = [
  ['Poster_Assessment_', 'assessment'],
  ['Poster_Best Interests_', 'best-interests'],
  ['Poster_I-Dey_', 'i-dey'],
  ['Poster_Next Time_', 'next-time'],
  ['Poster_Not-Here_', 'not-here'],
  ['Poster_On-Record_', 'on-record'],
  ['Poster_Protocol_', 'protocol'],
  ['Poster_The-Consultation_', 'the-consultation'],
]

const files = fs.readdirSync(folder).filter((f) => /\.(jpe?g|png)$/i.test(f))

async function run() {
  console.log(`dataset: ${dataset}
`)
  for (const [fragment, slug] of MAP) {
    const file = files.find((f) => f.includes(fragment))
    if (!file) {
      console.log(`no file for ${slug} — skipped`)
      continue
    }

    const project = await client.fetch(
      `*[_type=="project" && slug.current==$slug][0]{_id,title,"hasPoster":defined(poster)}`,
      { slug }
    )
    if (!project) {
      console.log(`no project for slug "${slug}" — skipped`)
      continue
    }
    if (project.hasPoster && !force) {
      console.log(`${project.title}: already has a poster — skipped (use --force to replace)`)
      continue
    }

    const asset = await client.assets.upload('image', fs.createReadStream(path.join(folder, file)), {
      filename: file.replace(/^Copy of /, ''),
    })

    await client
      .patch(project._id)
      .set({
        poster: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
          alt: `${project.title} — film poster`,
        },
      })
      .commit()

    const { width, height } = asset.metadata?.dimensions || {}
    console.log(`${project.title}: poster set (${width}x${height})`)
  }
  console.log('\nDone.')
}

run().catch((e) => {
  console.error('Failed:', e.message)
  process.exit(1)
})
