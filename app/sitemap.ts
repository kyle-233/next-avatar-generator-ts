import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const links = [
    {
      url: 'https://avatar.overreacted.top',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://avatar.overreacted.top/es',
          'zh-CN': 'https://avatar.overreacted.top/zh-CN',
        },
      },
    },
  ]
  return links
}
