import { type MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [
      'https://avatar.overreacted.top/atom.xml',
      'https://avatar.overreacted.top/rss.xml',
      'https://avatar.overreacted.top/sitemap.xml',
    ],
  }
}
