'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import IconBack from '@/assets/icons/icon-back.svg'
import IconNext from '@/assets/icons/icon-next.svg'
import IconFlip from '@/assets/icons/icon-flip.svg'
import IconCode from '@/assets/icons/icon-code.svg'
import { ActionType } from '@/lib/enums'
import { useStore } from '@/store'
import { useCollapse } from '@/components/hooks/use-collapse'
import { useModal } from '@/store/modal-store'

export const AvatarActionBar = () => {
  const { history, setState } = useStore()
  const { flipped, onFlipped } = useCollapse()
  const { onOpen } = useModal()
  const canUndo = history.past.length > 0
  const canRedo = history.future.length > 0
  const menus = [
    {
      type: ActionType.Undo,
      icon: IconBack,
      tip: 'revocation',
      disabled: !canUndo,
    },
    {
      type: ActionType.Redo,
      icon: IconNext,
      tip: 'reduction',
      disabled: !canRedo,
    },
    {
      type: ActionType.Flip,
      icon: IconFlip,
      tip: 'flip',
    },
    {
      type: ActionType.Code,
      icon: IconCode,
      tip: 'code',
    },
  ]

  function handleAction(actionType: ActionType) {
    if (actionType === ActionType.Undo || actionType === ActionType.Redo) {
      setState(actionType)
    } else if (actionType === ActionType.Flip) {
      onFlipped()
    } else if (actionType === ActionType.Code) {
      onOpen('code')
    }
  }
  return (
    <div className="flex items-center p-2 bg-[#2a2f37] rounded-[2rem] gap-x-4">
      {menus.map((menu) => (
        <Button
          key={menu.type}
          variant="outline"
          size="icon"
          disabled={menu.disabled}
          className="rounded-full"
          onClick={() => {
            handleAction(menu.type)
          }}
        >
          <Image
            src={menu.icon}
            alt={menu.tip}
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </Button>
      ))}
    </div>
  )
}
