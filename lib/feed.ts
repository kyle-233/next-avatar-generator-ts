import { Feed, type FeedOptions } from 'feed'
import type { Metadata } from 'next'

export function generateFeed(metadata: Metadata) {
  const site_url = 'https://avatar.overreacted.top/'

  const feedOptions: FeedOptions = {
    author: {
      name: 'Kyle Lou',
      email: 'kylelu417@gmail.com',
      link: site_url,
    },
    description: metadata.description!,
    favicon: `${site_url}/mascot.svg`,
    feedLinks: { atom: `${site_url}atom.xml`, rss: `${site_url}rss.xml` },
    generator: 'Feed for Node.js',
    id: site_url,
    image: 'https://github.com/kyle-233.png',
    copyright: 'All rights reserved 2024, Kyle Lou',
    link: site_url,
    title: metadata.title as string,
  }

  const feed = new Feed(feedOptions)

  //   for (const post of posts) {
  //     feed.addItem({
  //       date: new Date(post.date),
  //       description: post.spoiler,
  //       id: `${site_url}${post.slug}/`,
  //       link: `${site_url}${post.slug}/`,
  //       title: post.title,
  //     })
  //   }

  return feed
}
