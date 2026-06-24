import { client } from '../../../lib/sanityClient'
import { NextResponse } from 'next/server'

export async function GET() {
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
