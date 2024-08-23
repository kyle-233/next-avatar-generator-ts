import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const links = [
    {
      url: 'https://next-avatar-generator-ts.vercel.app',
      lastModified: new Date(),
      //   alternates: {
      //     languages: {
      //       es: 'https://next-avatar-generator-ts.vercel.app/es',
      //       'zh-CN': 'https://next-avatar-generator-ts.vercel.app/zh-CN',
      //     },
      //   },
    },
  ]
  return links
}
