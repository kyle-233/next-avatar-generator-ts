import { AvatarOption } from '@/types'
import { create } from 'zustand'

export type ModalType = 'code' | 'download' | 'batch-generate'

interface ModalData {
  url?: string
  avatarList?: AvatarOption[]
}

interface ModalStore {
  type: ModalType | null
  data: ModalData
  isOpen: boolean
  onOpen: (type: ModalType, data?: ModalData) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data?: ModalData) =>
    set({ isOpen: true, type, data: data || {} }),
  onClose: () => set({ type: null, isOpen: false }),
}))
