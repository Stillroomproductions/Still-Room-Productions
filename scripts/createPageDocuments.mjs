/**
 * Creates the one-off page documents (Homepage, About, Contact) in Sanity.
 *
 * Why this is needed: the site queries `*[_type == "hero"][0]` and
 * `*[_type == "about"][0]`, but those documents were never created in the
 * production dataset. With nothing to find, every page fell back to the
 * hardcoded images bundled in /public — which is why the About section showed
 * a stock corridor photo that nobody could change from Sanity.
 *
 * This creates each document once, with the fixed IDs the Studio sidebar
 * expects. It uses `createIfNotExists`, so running it twice is harmless and it
 * will never overwrite content that has already been edited.
 *
 * Usage:
 *   1. Create a write token at
 *      https://www.sanity.io/manage/project/tk6o47ip/api  (Editor permissions)
 *   2. SANITY_WRITE_TOKEN=<token> node scripts/createPageDocuments.mjs
 *
 * After running, open the Studio: the Homepage and About Page entries will be
 * there, ready for images to be uploaded and hotspots set.
 */
import { createClient } from '@sanity/client'

const token = process.env.SANITY_WRITE_TOKEN

if (!token) {
  console.error(
    'Missing SANITY_WRITE_TOKEN.\n\n' +
      'Create a token with Editor permissions at\n' +
      '  https://www.sanity.io/manage/project/tk6o47ip/api\n' +
      'then run:\n' +
      '  SANITY_WRITE_TOKEN=<token> node scripts/createPageDocuments.mjs\n'
  )
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tk6o47ip',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

// IDs match the singletons defined in studio/structure.js.
const documents = [
  {
    _id: 'hero',
    _type: 'hero',
    heading: 'Still Room Productions',
    subheading:
      'Develops formally restrained film and television work about systems, procedure, memory, and moral pressure.',
  },
  {
    _id: 'about',
    _type: 'about',
    title: 'About',
    content: [
      {
        _type: 'block',
        _key: 'about-intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'about-intro-span',
            text:
              'Still Room Productions is a London-based independent production company ' +
              'developing restrained, formally precise work for film and television. Its ' +
              'projects observe people at the point where private life meets process, ' +
              'record, and procedure.',
          },
        ],
      },
    ],
  },
  {
    _id: 'contact',
    _type: 'contact',
    title: 'Contact',
    email: 'info@stillroomproductions.com',
    location: 'London, United Kingdom',
  },
]

async function run() {
  for (const doc of documents) {
    const result = await client.createIfNotExists(doc)
    const existed = result._createdAt !== result._updatedAt
    console.log(`${existed ? 'already existed' : 'created'}: ${doc._id}`)
  }
  console.log(
    '\nDone. Open the Studio to upload images and set each hotspot.\n' +
      'Until an image is uploaded there, the site keeps using its built-in fallback.'
  )
}

run().catch((err) => {
  console.error('Failed:', err.message)
  process.exit(1)
})
