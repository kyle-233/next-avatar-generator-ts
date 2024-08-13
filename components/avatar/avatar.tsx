'use client'
import { AVATAR_LAYER, NONE } from '@/lib/constant'
import { widgetData } from '@/lib/dynamic-data'
import { WidgetType } from '@/lib/enums'
import { AvatarOption } from '@/types'
import React, { useEffect, useState } from 'react'
import { Skeleton } from '../ui/skeleton'

export const Avatar = ({
  avatarOption,
  avatarSize,
}: {
  avatarOption: AvatarOption
  avatarSize: number
}) => {
  const [content, setContent] = useState<React.ReactSVGElement | string>('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getContent = async () => {
      console.time('import-file')
      const sortedList = Object.entries(avatarOption.widgets).sort(
        ([prevShape, prev], [nextShape, next]) => {
          const ix =
            prev.zIndex ?? (AVATAR_LAYER as any)[prevShape]?.zIndex ?? 0
          const iix =
            next.zIndex ?? (AVATAR_LAYER as any)[nextShape]?.zIndex ?? 0
          return ix - iix
        },
      )
      const promises: Promise<string>[] = sortedList.map(
        async ([widgetType, opt]) => {
          if (
            opt.shape !== NONE &&
            (widgetData as any)?.[widgetType]?.[opt.shape]
          ) {
            return (await (widgetData as any)[widgetType][opt.shape]()).default
          }
          return ''
        },
      )
      let skinColor: string | undefined
      const svgRawListPromise = await Promise.all(promises).then(
        async (raw) => {
          return await raw.map(
            async (svgRawFn: (() => Record<string, any>) | string, i) => {
              const [widgetType, widget] = sortedList[i]
              let widgetFillColor = widget.fillColor

              if (widgetType === WidgetType.Face) {
                skinColor = widgetFillColor
              }
              if (skinColor && widgetType === WidgetType.Ear) {
                widgetFillColor = skinColor
              }

              if (svgRawFn) {
                const svgRawChildren = (svgRawFn as any)?.()
                React.Children.toArray(svgRawChildren.props.children)

                const getChildrenContent: (innerChildren: any) => any = (
                  innerChildren: any,
                ) => {
                  if (!innerChildren) return ''
                  return React.Children.map(
                    innerChildren,
                    (innerChild: any) => {
                      const fill = innerChild?.props?.fill
                      const props: Record<string, any> = {}
                      if (fill === '$fillColor') {
                        props.fill = widgetFillColor || 'transparent'
                      }
                      return React.cloneElement(
                        innerChild,
                        props,
                        getChildrenContent(innerChild?.props?.children),
                      )
                    },
                  )
                }

                const childrenContent = getChildrenContent(
                  svgRawChildren.props.children,
                )
                const newSvg = React.createElement(
                  'g',
                  {
                    id: `color-avatar-${sortedList[i][0]}`,
                    key: `color-avatar-${sortedList[i][0]}`,
                  },
                  childrenContent,
                )
                return newSvg
              }
              return ''
            },
          )
        },
      )
      const svgRawList = await Promise.all(svgRawListPromise)
      const gContent = React.createElement(
        'g',
        {
          transform: 'translate(100, 65)',
        },
        svgRawList,
      )
      const svgContent = React.createElement(
        'svg',
        {
          width: avatarSize,
          height: avatarSize,
          viewBox: `0 0 ${avatarSize / 0.7} ${avatarSize / 0.7}`,
          preserveAspectRatio: 'xMidYMax meet',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        gContent,
      )
      console.timeEnd('import-file')
      return svgContent
    }
    setLoading(true)
    console.time('async')
    console.time('start')
    getContent().then((res) => {
      setContent(res)
      console.timeEnd('async')
      setLoading(false)
    })
    console.timeEnd('start')
  }, [avatarSize, avatarOption.widgets])

  return (
    <div className="relative z-2 w-full h-full">
      {loading ? <Skeleton className="w-full h-full" /> : content}
    </div>
  )
}
