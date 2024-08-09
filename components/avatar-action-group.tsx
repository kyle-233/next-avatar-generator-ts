'use client'
import { Button } from '@/components/ui/button'
import { NOT_COMPATIBLE_AGENTS, TRIGGER_PROBABILITY } from '@/lib/constant'
import {
  getRandomAvatarOption,
  getSpecialAvatarOption,
  showConfetti,
} from '@/lib'
import { useAvatarOption } from '@/components/hooks/use-avatar-options'
import { useState } from 'react'
import { useModal } from '@/store/modal-store'
import { AvatarOption } from '@/types'

export const AvatarActionGroup = () => {
  const { avatarOption, setAvatarOption } = useAvatarOption()
  const [downloading, setDownloading] = useState(false)
  const { onOpen } = useModal()

  function handleGenerate() {
    if (Math.random() <= TRIGGER_PROBABILITY) {
      let colorfulOption = getSpecialAvatarOption()
      while (JSON.stringify(colorfulOption) === JSON.stringify(avatarOption)) {
        colorfulOption = getSpecialAvatarOption()
      }
      colorfulOption.wrapperShape = avatarOption.wrapperShape
      setAvatarOption(colorfulOption)
      showConfetti()
    } else {
      const randomOption = getRandomAvatarOption(avatarOption)
      setAvatarOption(randomOption)
    }
  }

  async function handleDownload() {
    try {
      setDownloading(true)
      const avatarEle = document.getElementById('avatar-content')

      const userAgent = window.navigator.userAgent.toLowerCase()
      const notCompatible = NOT_COMPATIBLE_AGENTS.some(
        (agent) => userAgent.indexOf(agent) !== -1,
      )

      if (avatarEle) {
        const html2canvas = (await import('html2canvas')).default
        const canvas = await html2canvas(avatarEle, {
          backgroundColor: null,
        })
        const dataURL = canvas.toDataURL()

        if (notCompatible) {
          // onOpen('download', { downloadUrl: dataURL })
        } else {
          const appName = 'avatar'
          const trigger = document.createElement('a')
          trigger.href = dataURL
          trigger.download = `${appName}.png`
          trigger.click()
          setDownloading(false)
        }
      }
    } finally {
    }
  }
  async function generateMultiple(count = 5 * 6) {
    const { default: hash } = await import('object-hash')

    const avatarMap = [...Array(count)].reduce<Map<string, AvatarOption>>(
      (res) => {
        let randomAvatarOption: AvatarOption
        let hashKey: string

        do {
          randomAvatarOption = getRandomAvatarOption(avatarOption)
          hashKey = hash.sha1(randomAvatarOption)
        } while (
          randomAvatarOption.background.color === 'transparent' ||
          res.has(hashKey)
        )

        res.set(hashKey, randomAvatarOption)

        return res
      },
      new Map(),
    )

    const avatarList = Array.from(avatarMap.values())
    console.log('111')

    onOpen('batch-generate', { avatarList: avatarList })
  }
  return (
    <div className="flex items-center justify-center mt-16 gap-x-4">
      <Button
        variant="secondary"
        className="font-bold"
        onClick={handleGenerate}
      >
        随机生成
      </Button>
      <Button
        variant="secondary"
        className="font-bold"
        disabled={downloading}
        onClick={handleDownload}
      >
        {downloading ? '正在下载' : '下载头像'}
      </Button>
      <Button
        variant="secondary"
        className="font-bold"
        onClick={() => {
          generateMultiple(30)
        }}
      >
        批量生成
      </Button>
    </div>
  )
}
