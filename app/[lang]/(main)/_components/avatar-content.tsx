'use client'
import { AvatarGenerator } from '@/components/avatar/avatar-generator'
import { useAvatarOption } from '@/components/hooks/use-avatar-options'
import { useCollapse } from '@/components/hooks/use-collapse'
import { cn } from '@/lib/utils'

export const AvatarContent = () => {
  const { avatarOption } = useAvatarOption()
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
