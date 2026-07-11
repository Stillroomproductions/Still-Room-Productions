import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

/**
 * On-demand revalidation endpoint for Sanity webhooks.
 *
 * When Sanity publishes/unpublishes content, this endpoint clears the ISR cache
 * for all Sanity-powered pages so fresh content is served immediately.
 *
 * Setup:
 *   1. Set REVALIDATION_SECRET in Vercel env vars (any strong random string)
 *   2. In Sanity → API → Webhooks, create a webhook pointing to:
 *      https://stillroomproductions.com/api/revalidate?secret=YOUR_SECRET
 *   3. Set trigger to: publish, unpublish
 *
 * POST /api/revalidate?secret=<REVALIDATION_SECRET>
 */
export async function POST(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  // Validate the secret to prevent unauthorized revalidation
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    // Revalidate all pages that fetch from Sanity
    revalidatePath('/', 'page')       // Homepage
    revalidatePath('/work', 'page')   // Work listing page
    revalidatePath('/work/[slug]', 'page') // All project detail pages
    revalidatePath('/about', 'page')  // About page
    revalidatePath('/contact', 'page') // Contact page

    return NextResponse.json({
      revalidated: true,
      message: 'All Sanity-powered pages revalidated',
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json(
      { message: 'Error revalidating', error: err.message },
      { status: 500 }
    )
  }
}
