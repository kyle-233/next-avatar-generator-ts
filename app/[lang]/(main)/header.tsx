'use client'

import { Icons } from '@/components/icons'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="py-4 px-8 flex items-center justify-between">
      <Link className="flex items-center" href={'/'}>
        <Icons.logo className="w-10 h-10" />
        <span className="hidden md:inline ml-4 text-2xl font-bold tracking-wide">
          Color Avatar
        </span>
        <span className="sr-only">Color Avatar</span>
      </Link>
      <Link
        href={''}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <Icons.github className="w-6 h-6" aria-hidden="true" />
        <span className="sr-only">Github</span>
      </Link>
    </header>
  )
}
