'use client'
import { useAvatarOption } from '@/components/hooks/use-avatar-options'
import { useMounted } from '@/components/hooks/use-mounted'
import { cn } from '@/lib/utils'

export const AvatarBorder = () => {
  const { avatarOption } = useAvatarOption()
  const isMounted = useMounted()

  const color = avatarOption.background.borderColor
  const radius = avatarOption.wrapperShape!

  if (!isMounted) {
    return null
  }
  return (
    <div
      className={cn(
        'absolute top-0 left-0 z-3 w-full h-full border-[10px] border-solid transition-all duration-200',
        radius === 'circle' && 'rounded-full',
        radius === 'square' && 'rounded-none',
        radius === 'squircle' && 'rounded-3xl',
      )}
      style={{ borderColor: color }}
    />
  )
}
