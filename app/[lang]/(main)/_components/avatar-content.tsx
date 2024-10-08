'use client'
import { AvatarGenerator } from '@/components/avatar/avatar-generator'
import { useAvatarOption } from '@/components/hooks/use-avatar-options'
import { useCollapse } from '@/components/hooks/use-collapse'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'

export const AvatarContent = () => {
  console.time('use-hook')
  const { avatarOption } = useAvatarOption()
  console.timeEnd('use-hook')
  const { flipped } = useCollapse()
  const avatarSize = 280
  return (
    <AvatarGenerator
      avatarOption={avatarOption}
      avatarSize={avatarSize}
      className={cn(
        flipped && 'rotate-y-180', // add tailwindcss-3d package to support it
      )}
    />
  )
}
