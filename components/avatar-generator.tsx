import { cn } from '@/lib/utils'
import { AvatarBackground } from './avatar-background'
import { AvatarBorder } from './avatar-border'
import { Avatar } from './avatar'
import { AvatarOption } from '@/types'

interface AvatarGeneratorProps {
  avatarOption: AvatarOption
  avatarSize?: number
  className?: string
}

export const AvatarGenerator = ({
  avatarOption,
  avatarSize = 280,
  className = '',
}: AvatarGeneratorProps) => {
  return (
    <div className="flex items-center justify-center">
      <div
        id="avatar-content"
        className={cn(
          'relative overflow-hidden w-[280px] h-[280px] transition-all duration-200',
          avatarOption.wrapperShape === 'circle' && 'rounded-full',
          avatarOption.wrapperShape === 'square' && 'rounded-none',
          avatarOption.wrapperShape === 'squircle' && 'rounded-3xl',
          className,
        )}
      >
        <AvatarBackground />
        <Avatar avatarOption={avatarOption} avatarSize={avatarSize} />
        <AvatarBorder />
      </div>
    </div>
  )
}
