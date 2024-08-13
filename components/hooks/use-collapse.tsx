import { create } from 'zustand'

interface CollapseProps {
  isCollapsed: boolean | null
  setIsCollapsed: () => void
  flipped: boolean
  onFlipped: () => void
}

export const useCollapse = create<CollapseProps>((set) => ({
  isCollapsed: false,
  setIsCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  flipped: false,
  onFlipped: () => set((state) => ({ flipped: !state.flipped })),
}))
