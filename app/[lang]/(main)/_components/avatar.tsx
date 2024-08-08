'use client'
import { useOrigin } from '@/components/hooks/use-origin'
import { AVATAR_LAYER, NONE } from '@/lib/constant'
import { widgetData } from '@/lib/dynamic-data'
import { WidgetType } from '@/lib/enums'
import { AvatarOption } from '@/types'
import { useEffect, useState } from 'react'

export const Avatar = ({
  avatarOption,
  avatarSize,
}: {
  avatarOption: AvatarOption
  avatarSize: number
}) => {
  const [content, setContent] = useState('')
  const origin = useOrigin()
  useEffect(() => {
    const getContent = async () => {
      const sortedList = Object.entries(avatarOption.widgets).sort(
        ([prevShape, prev], [nextShape, next]) => {
          const ix = prev.zIndex ?? AVATAR_LAYER[prevShape]?.zIndex ?? 0
          const iix = next.zIndex ?? AVATAR_LAYER[nextShape]?.zIndex ?? 0
          return ix - iix
        },
      )
      const promises: Promise<string>[] = sortedList.map(
        async ([widgetType, opt]) => {
          if (opt.shape !== NONE && widgetData?.[widgetType]?.[opt.shape]) {
            return (await widgetData[widgetType][opt.shape]()).default
          }
          return ''
        },
      )
      let skinColor: string | undefined
      const svgRawListPromise = await Promise.all(promises).then(
        async (raw) => {
          return await raw.map(async (svgRawObject, i) => {
            const [widgetType, widget] = sortedList[i]
            let widgetFillColor = widget.fillColor

            if (widgetType === WidgetType.Face) {
              skinColor = widgetFillColor
            }
            if (skinColor && widgetType === WidgetType.Ear) {
              widgetFillColor = skinColor
            }

            if (svgRawObject.src) {
              const svgRawResponse = await fetch(
                `${origin}/${svgRawObject.src}`,
              )
              const svgRaw = await svgRawResponse.text()

              const content = svgRaw
                .slice(svgRaw.indexOf('>', svgRaw.indexOf('<svg')) + 1)
                .replace('</svg>', '')
                .replaceAll('$fillColor', widgetFillColor || 'transparent')

              return `
                      <g id="vue-color-avatar-${sortedList[i][0]}">
                        ${content}
                      </g>
                    `
            }
            return ''
          })
        },
      )
      const svgRawList = await Promise.all(svgRawListPromise)
      const svgContent = `
        <svg
            width="${avatarSize}"
            height="${avatarSize}"
            viewBox="0 0 ${avatarSize / 0.7} ${avatarSize / 0.7}"
            preserveAspectRatio="xMidYMax meet"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g transform="translate(100, 65)">
                ${svgRawList.join('')}
            </g>
        </svg>
        `
      return svgContent
    }
    getContent().then((res) => {
      setContent(res)
    })
  }, [avatarSize, avatarOption.widgets])

  return (
    <div
      className="relative z-2 w-full h-full"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
