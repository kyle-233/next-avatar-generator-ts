import { cn } from '@/lib/utils'
import { AvatarBackground } from './avatar-background'
import { AvatarBorder } from './avatar-border'
import { Avatar } from '../app/[lang]/(main)/_components/avatar'
import { AvatarOption } from '@/types'

interface AvatarGeneratorProps {
  avatarOption: AvatarOption
  avatarSize?: number
  className?: string
  id?: string
}

export const AvatarGenerator = ({
  avatarOption,
  avatarSize = 280,
  className = '',
  id,
}: AvatarGeneratorProps) => {
  return (
    <div className="flex items-center justify-center">
      <div
        id={id || 'avatar-content'}
        className={cn(
          'relative overflow-hidden w-[280px] h-[280px] transition-all duration-200',
          avatarOption.wrapperShape === 'circle' && 'rounded-full',
          avatarOption.wrapperShape === 'square' && 'rounded-none',
          avatarOption.wrapperShape === 'squircle' && 'rounded-3xl',
          className,
        )}
      >
        <AvatarBackground avatarOption={avatarOption} />
        <Avatar avatarOption={avatarOption} avatarSize={avatarSize} />
        <AvatarBorder avatarOption={avatarOption} />
      </div>
    </div>
  )
}
