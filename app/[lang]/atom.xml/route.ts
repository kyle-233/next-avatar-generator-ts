import { generateFeed } from '@/lib/feed'
import { metadata } from '../layout'

export async function GET() {
  const feed = generateFeed(metadata)
  return new Response(feed.atom1(), {
    headers: {
      'content-type': 'application/xhtml+xml',
    },
  })
}
