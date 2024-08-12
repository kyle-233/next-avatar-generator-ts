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
import { Icons } from './icons'

export function LanguageSwitcher() {
  const lang = useLang()
  const country = languagesConfig[lang]
  const node: keyof typeof Icons = country.node as any
  const Icon = Icons[node]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icon className="w-5 h-[15px]" />
          <span className="sr-only">Switch Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.values(languagesConfig).map((language) => {
          const node: keyof typeof Icons = language.node as any
          const Icon = Icons[node]
          return (
            <DropdownMenuItem key={language.lang}>
              <Link
                className="w-full flex items-center"
                href={`/${language.lang}`}
              >
                <Icon className="mr-4 w-5 h-[15px]" />
                <span className="">{language.name}</span>
              </Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
