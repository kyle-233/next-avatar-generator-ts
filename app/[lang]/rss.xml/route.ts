import { generateFeed } from '@/lib/feed'
import { metadata } from '../layout'

export async function GET() {
  const feed = generateFeed(metadata)
  return new Response(feed.rss2(), {
    headers: { 'Content-Type': 'application/xhtml+xml' },
  })
}
