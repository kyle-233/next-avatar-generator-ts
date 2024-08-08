import { SET_AVATAR_OPTION, useStore } from '@/store'
import { AvatarOption } from '@/types'

interface AvatarOptionProps {
  avatarOption: AvatarOption
  setAvatarOption: (avatarOption: AvatarOption) => void
}

export const useAvatarOption = () => {
  const { history, setState } = useStore()

  const avatarOption = history.present

  const setAvatarOption = (newOption: AvatarOption) => {
    setState(SET_AVATAR_OPTION, newOption)
  }

  return { avatarOption, setAvatarOption } as AvatarOptionProps
}
