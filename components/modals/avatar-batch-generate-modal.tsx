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
import { cn } from '@/lib/utils'
import { useState } from 'react'

export const AvatarBatchGenerateModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const isModalOpen = isOpen && type === 'batch-generate'

  const [making, setMaking] = useState(false)
  const [madeCount, setMadeCount] = useState(0)

  const { avatarList = [], generateMultiple } = data

  async function make() {
    if (avatarList && !making) {
      setMaking(true)
      setMadeCount(1)

      const html2canvas = (await import('html2canvas')).default

      const { default: JSZip } = await import('jszip')
      const jsZip = new JSZip()

      for (let i = 0; i <= avatarList.length; i += 1) {
        const dom = window.document.querySelector(`#avatar-${i}`)

        if (dom instanceof HTMLElement) {
          const canvas = await html2canvas(dom, {
            backgroundColor: null,
          })

          const dataUrl = canvas
            .toDataURL()
            .replace('data:image/png;base64,', '')
          jsZip.file(`${i + 1}.png`, dataUrl, { base64: true })
          setMadeCount((pre) => pre + 1)
        }
      }

      const base64 = await jsZip.generateAsync({ type: 'base64' })

      setMaking(false)
      setMadeCount(0)

      const appName = 'avatar'
      const a = window.document.createElement('a')
      a.href = 'data:application/zip;base64,' + base64
      a.download = `${appName}.zip`
      a.click()
    }
  }

  async function handleDownload(avatarIndex: number) {
    const avatarEle = window.document.querySelector(`#avatar-${avatarIndex}`)

    if (avatarEle instanceof HTMLElement) {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(avatarEle, {
        backgroundColor: null,
      })
      const dataURL = canvas.toDataURL()

      const appName = 'avatar'
      const trigger = document.createElement('a')
      trigger.href = dataURL
      trigger.download = `${appName}.png`
      trigger.click()
    }
  }

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
              <Button
                variant="ghost"
                disabled={making}
                onClick={() => {
                  generateMultiple?.()
                }}
              >
                换一批
              </Button>
              <Button variant="secondary" onClick={make}>
                下载全部
              </Button>
            </div>
          </div>
          <div className="h-[75vh] bg-[#1d2026] rounded-[0.8rem]">
            <ScrollArea className="h-full w-full p-4">
              <div className="h-full w-full flex-1 flex gap-4 flex-wrap">
                {avatarList!.map((opt, i) => (
                  <div
                    key={i}
                    className={cn(
                      'relative flex items-center justify-center group',
                      making && i + 1 > madeCount && 'opacity-50',
                    )}
                  >
                    <AvatarGenerator
                      id={`avatar-${i}`}
                      key={i}
                      avatarOption={opt}
                    />
                    <Button
                      className="hidden group-hover:block absolute bottom-4 left-1/2 font-bold cursor-pointer select-none -translate-x-1/2"
                      variant="secondary"
                      onClick={() => handleDownload(i)}
                    >
                      下载头像
                    </Button>
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
