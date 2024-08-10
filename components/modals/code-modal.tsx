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
import { useParams } from 'next/navigation'
import { useTranslation } from '@/i18n/client'

export const CodeModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const { avatarOption } = useAvatarOption()
  const isModalOpen = isOpen && type === 'code'

  const params = useParams()
  const { t } = useTranslation(params.lang as string)

  const codeJSON = JSON.stringify(avatarOption, null, 4)
  const highlightedCode = highlightJSON(codeJSON)
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">
            {t('code-modal-title')}
          </DialogTitle>
        </DialogHeader>
        <div className="relative h-[80vh] py-4 bg-[#1d2026] rounded-[0.8rem] mb-4">
          <ScrollArea className="h-full w-full">
            <pre>
              <code
                className="block px-[1.5rem] text-[#81cfef] text-[1.25rem] font-mono leading-[1.4]"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              ></code>
            </pre>
          </ScrollArea>
          <Button
            variant="secondary"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
          >
            {t('copy-code')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
