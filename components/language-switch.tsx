'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLang } from './hooks/use-lang'
import Link from 'next/link'
import { languagesConfig } from '@/i18n/settings'
import { Trans } from 'react-i18next'
import { useTranslation } from '@/i18n/client'
import Image from 'next/image'
import { useMounted } from './hooks/use-mounted'

export function LanguageSwitcher() {
  const lang = useLang()
  const isMounted = useMounted()
  const { t } = useTranslation(lang)

  // if (isMounted) {
  //   return null
  // }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trans i18nKey="languageSwitcher" t={t}>
            <Image
              src={languagesConfig[lang].imageSrc}
              alt={languagesConfig[lang].lang}
              width={20}
              height={15}
            />
            <span className="sr-only">Switch Language</span>
          </Trans>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.values(languagesConfig).map((language) => (
          <DropdownMenuItem key={language.lang}>
            <Link
              className="w-full flex items-center"
              href={`/${language.lang}`}
            >
              <Image
                src={language.imageSrc}
                alt={language.lang}
                width={20}
                height={15}
                className="mr-4"
              />
              <span className="">{language.name}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
