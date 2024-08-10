'use client'
import { useAvatarOption } from '@/components/hooks/use-avatar-options'
import { useMounted } from '@/components/hooks/use-mounted'
import { cn } from '@/lib/utils'
import { AvatarOption } from '@/types'

interface AvatarBackgroundProps {
  avatarOption: AvatarOption
}

export const AvatarBackground = ({ avatarOption }: AvatarBackgroundProps) => {
  const isMounted = useMounted()
  const color = avatarOption.background.color

  if (!isMounted) {
    return null
  }
  return (
    <div
      className={cn(
        'absolute top-0 left-0 w-full h-full transition-all duration-200',
      )}
      style={{ background: color }}
    />
  )
}
