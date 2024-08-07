'use client'

import { LanguageSwitcher } from '@/components/language-switch'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n/client'
import { languages } from '@/i18n/settings'
import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Trans } from 'react-i18next'

export const Header = () => {
  const params = useParams()
  const { lang } = params
  const { t } = useTranslation(lang as string, 'footer')
  return (
    <header className="py-4 px-8 flex items-center justify-between">
      <Link className="flex items-center" href={'/'}>
        <Image
          src={'/_next/mascot.svg'}
          alt="Color Avatar Logo"
          width={40}
          height={40}
        />
        <span className="ml-4 text-2xl font-bold tracking-wide">
          Color Avatar
        </span>
      </Link>
      <Button variant="ghost">
        <Github className="w-6 h-6 mr-2" />
        <span className="text-lg font-bold">GitHub</span>
      </Button>
    </header>
  )
}
