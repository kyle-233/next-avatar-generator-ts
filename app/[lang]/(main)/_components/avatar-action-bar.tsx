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
import { useParams } from 'next/navigation'
import { useTranslation } from '@/i18n/client'
import { Icons } from '../../../../components/icons'

export const AvatarActionBar = () => {
  const { history, setState } = useStore()
  const { flipped, onFlipped } = useCollapse()
  const params = useParams()
  const { t } = useTranslation(params.lang as string)
  const { onOpen } = useModal()
  const canUndo = history.past.length > 0
  const canRedo = history.future.length > 0
  const menus = [
    {
      type: ActionType.Undo,
      icon: <Icons.back className="w-6 h-6 text-black dark:text-white" />,
      tip: t('revocation'),
      disabled: !canUndo,
    },
    {
      type: ActionType.Redo,
      icon: <Icons.next className="w-6 h-6 text-black dark:text-white" />,
      tip: t('reduction'),
      disabled: !canRedo,
    },
    {
      type: ActionType.Flip,
      icon: <Icons.flip className="w-6 h-6 text-black dark:text-white" />,
      tip: t('flip'),
    },
    {
      type: ActionType.Code,
      icon: <Icons.code className="w-6 h-6 text-black dark:text-white" />,
      tip: t('code'),
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
    <div className="flex items-center p-2 bg-content rounded-[2rem] gap-x-4">
      {menus.map((menu) => (
        <Button
          key={menu.type}
          variant="outline"
          size="icon"
          disabled={menu.disabled}
          className="rounded-full"
          title={menu.tip}
          onClick={() => {
            handleAction(menu.type)
          }}
        >
          {menu.icon}
        </Button>
      ))}
    </div>
  )
}
