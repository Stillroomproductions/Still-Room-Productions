import { client } from '../../../lib/sanityClient'
import { NextResponse } from 'next/server'

/**
 * Development-only helper for listing project slugs.
 *
 * This previously carried a comment saying it was protected, but had no
 * actual environment check, so it was reachable on the live site and listed
 * every project title — including films not yet announced. The check below
 * is the protection that comment described.
 */
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const projects = await client.fetch(`
      *[_type == "project"]{
        title,
        "slug": slug.current
      }
    `)

    return NextResponse.json({ projects })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
