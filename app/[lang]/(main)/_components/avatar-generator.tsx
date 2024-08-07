'use client'
import { getRandomAvatarOption } from '@/lib'
import { cn } from '@/lib/utils'
import { AvatarBackground } from './avatar-background'
import { AvatarBorder } from './avatar-border'
import { Avatar } from './avatar'
import { useAvatarOption } from '@/components/hooks/use-avatar-options'
import { useMounted } from '@/components/hooks/use-mounted'

export const AvatarGenerator = () => {
  const { avatarOption } = useAvatarOption()
  const isMounted = useMounted()
  const avatarSize = 280

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          'relative overflow-hidden w-[280px] h-[280px] transition-all duration-200',
          avatarOption.wrapperShape === 'circle' && 'rounded-full',
          avatarOption.wrapperShape === 'square' && 'rounded-none',
          avatarOption.wrapperShape === 'squircle' && 'rounded-3xl',
        )}
      >
        <AvatarBackground />
        <Avatar avatarOption={avatarOption} avatarSize={avatarSize} />
        <AvatarBorder />
      </div>
    </div>
  )
}
