import { getRandomAvatarOption } from '@/lib'
import { SCREEN } from '@/lib/constant'
import { WrapperShape } from '@/lib/enums'
import type { AvatarOption } from '@/types'
import { create } from 'zustand'

export const SET_AVATAR_OPTION = 'SET_AVATAR_OPTION'
export const UNDO = 'UNDO'
export const REDO = 'REDO'
export const SET_SIDER_STATUS = 'SET_SIDER_STATUS'

interface StoreProps {
  history: {
    past: AvatarOption[]
    present: AvatarOption
    future: AvatarOption[]
  }
  // isSiderCollapsed: boolean
  setState: (type: any, values: AvatarOption) => void
}

export const useStore = create<StoreProps>((set) => ({
  history: {
    past: [],
    present: getRandomAvatarOption({ wrapperShape: WrapperShape.Squircle }),
    future: [],
  },
  // isSiderCollapsed: window.innerWidth <= SCREEN.lg,
  setState: (type, values) => {
    if (type === 'SET_AVATAR_OPTION') {
      set((state) => ({
        history: {
          past: [...state.history.past, state.history.present],
          present: values,
          future: [],
        },
      }))
    } else if (type === 'UNDO') {
      set((state) => {
        if (state.history.past.length > 0) {
          const previous = state.history.past[state.history.past.length - 1]
          const newPast = state.history.past.slice(
            0,
            state.history.past.length - 1,
          )
          return {
            history: {
              past: newPast,
              present: previous,
              future: [state.history.present, ...state.history.future],
            },
          }
        }
        return state
      })
    }
  },
}))
