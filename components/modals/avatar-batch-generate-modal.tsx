'use client'
import { useModal } from '@/store/modal-store'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { ScrollArea } from '../ui/scroll-area'
import { useAvatarOption } from '../hooks/use-avatar-options'
import { highlightJSON } from '@/lib'
import { Button } from '../ui/button'
import { AvatarGenerator } from '../avatar-generator'

export const AvatarBatchGenerateModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const isModalOpen = isOpen && type === 'batch-generate'

  const { avatarList = [] } = data

  console.log('avatarList', avatarList)

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[960px]">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">批量生成</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <div></div>
            <div className="flex gap-x-2">
              <Button variant="ghost">换一批</Button>
              <Button variant="secondary">下载全部</Button>
            </div>
          </div>
          <div className="h-[75vh] bg-[#1d2026] rounded-[0.8rem]">
            <ScrollArea className="h-full w-full p-4">
              <div className="h-full w-full flex-1 flex gap-4 flex-wrap">
                {avatarList!.map((opt, i) => (
                  <div key={i}>
                    <AvatarGenerator avatarOption={opt} />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
