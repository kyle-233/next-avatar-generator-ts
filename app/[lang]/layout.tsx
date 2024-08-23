import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import '../globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { dir } from 'i18next'
import { languages } from '@/i18n/settings'
import { cn } from '@/lib/utils'
import { ModalProvider } from '@/components/providers/modal-provider'
import { siteConfig } from '@/config/site'
import { Analytics } from '@/components/analytics'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['avatar random generate', 'random', 'avatar', 'generate'],
  authors: [
    {
      name: 'kyle',
      url: 'https://github.com/kyle-233',
    },
  ],
  creator: 'kyle',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  alternates: {
    types: {
      'application/atom+xml':
        'https://next-avatar-generator-ts.vercel.app/atom.xml',
      'application/rss+xml':
        'https://next-avatar-generator-ts.vercel.app/rss.xml',
    },
  },
  // twitter: {
  // 	card: 'summary_large_image',
  // 	title: siteConfig.name,
  // 	description: siteConfig.description,
  // 	images: [`${siteConfig.url}/og.jpg`],
  // 	creator: 'kyle-233',
  // },
  // icons: {
  // 	icon: '/icon.png',
  // },
}

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode
  params: {
    lang: string
  }
}>) {
  return (
    <html lang={lang} dir={dir(lang)} suppressHydrationWarning>
      <body className={cn('text-common', font.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ModalProvider />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
