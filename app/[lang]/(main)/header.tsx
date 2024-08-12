'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
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
      {/* <Button variant="ghost">
        <Icons.github className="w-6 h-6 mr-2" />
        <span className="text-lg font-bold">GitHub</span>
      </Button> */}
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
