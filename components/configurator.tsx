'use client'
import { AVATAR_LAYER, SETTINGS } from '@/lib/constant'
import { ScrollArea } from './ui/scroll-area'
import { cn, fetchSvg } from '@/lib/utils'
import { useAvatarOption } from './hooks/use-avatar-options'
import { BeardShape, WidgetShape, WidgetType, WrapperShape } from '@/lib/enums'
import { useMounted } from './hooks/use-mounted'
import { useEffect, useState } from 'react'
import { previewData } from '@/lib/dynamic-data'
import Image from 'next/image'
import { ColorWheel } from './color-wheel'

export const Configurator = () => {
  const { avatarOption, setAvatarOption } = useAvatarOption()

  const [sections, setSections] = useState<
    {
      widgetType: WidgetType
      widgetList: {
        widgetType: WidgetType
        widgetShape: WidgetShape
        svgRaw: string
      }[]
    }[]
  >([])

  const isMounted = useMounted()

  useEffect(() => {
    ;(async () => {
      const sectionList = Object.values(WidgetType)
      const a = await Promise.all(
        sectionList.map((section) => {
          return getWidgets(section)
        }),
      )
      setSections(() => {
        return sectionList.map((li, i) => {
          return {
            widgetType: li,
            widgetList: a[i],
          }
        })
      })
    })()
  }, [])

  async function getWidgets(widgetType: WidgetType) {
    const list = SETTINGS[`${widgetType}Shape`]
    const promises: Promise<string>[] = list.map(async (widget: string) => {
      if (widget !== 'none' && previewData?.[widgetType]?.[widget]) {
        const response: any = await fetchSvg(widgetType, widget)
        return await response.text()
      }
      return 'X'
    })
    const svgRawList = await Promise.all(promises).then((raw) => {
      return raw.map((svgRaw, i) => {
        return {
          widgetType,
          widgetShape: list[i],
          svgRaw,
        }
      })
    })
    return svgRawList
  }

  if (!isMounted) {
    return null
  }

  function switchWrapperShape(wrapperShape: WrapperShape) {
    if (wrapperShape !== avatarOption!.wrapperShape) {
      setAvatarOption({ ...avatarOption!, wrapperShape })
    }
  }

  function switchBorderColor(borderColor: string) {
    if (borderColor !== avatarOption.background.borderColor) {
      setAvatarOption({
        ...avatarOption,
        background: { ...avatarOption.background, borderColor },
      })
    }
  }

  function switchBgColor(bgColor: string) {
    if (bgColor !== avatarOption.background.color) {
      setAvatarOption({
        ...avatarOption,
        background: { ...avatarOption.background, color: bgColor },
      })
    }
  }

  function getWidgetColor(type: string) {
    if (
      type === WidgetType.Face ||
      type === WidgetType.Tops ||
      type === WidgetType.Clothes
    ) {
      return avatarOption.widgets[type]?.fillColor
    } else return ''
  }

  function switchWidget(widgetType: WidgetType, widgetShape: WidgetShape) {
    if (widgetShape && avatarOption.widgets?.[widgetType]) {
      setAvatarOption({
        ...avatarOption,
        widgets: {
          ...avatarOption.widgets,
          [widgetType]: {
            ...avatarOption.widgets?.[widgetType],
            shape: widgetShape,
            ...(widgetShape === BeardShape.Scruff
              ? { zIndex: AVATAR_LAYER['mouth'].zIndex - 1 }
              : undefined),
          },
        },
      })
    }
  }

  function setWidgetColor(widgetType: WidgetType, fillColor: string) {
    if (avatarOption.widgets?.[widgetType]) {
      setAvatarOption({
        ...avatarOption,
        widgets: {
          ...avatarOption.widgets,
          [widgetType]: {
            ...avatarOption.widgets?.[widgetType],
            fillColor,
          },
        },
      })
    }
  }

  return (
    <ScrollArea className="h-full w-full">
      <div>
        <div className="py-7 px-4">
          <div className="mb-6 font-bold leading-6">{'头像形状'}</div>
          <div>
            <ul className="list-none flex items-center">
              {SETTINGS.wrapperShape.map((shape) => (
                <li
                  key={shape}
                  title={shape}
                  className="py-[0.4rem] px-2"
                  onClick={() => switchWrapperShape(shape)}
                >
                  <div
                    className={cn(
                      ' inline-block w-6 h-6 bg-[#a4b2c1] transition-all duration-200',
                      shape === 'circle' && 'rounded-full',
                      shape === 'square' && 'rounded-none',
                      shape === 'squircle' && 'rounded-3xl',
                      shape === avatarOption!.wrapperShape && 'bg-[#6967fe]',
                    )}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-7 px-4">
          <div className="mb-6 font-bold leading-6">{'边框颜色'}</div>
          <div>
            <ColorWheel
              colors={SETTINGS.borderColor}
              onClick={(color) => switchBorderColor(color)}
              activeColor={avatarOption!.background.borderColor}
            />
          </div>
        </div>

        <div className="py-7 px-4">
          <div className="mb-6 font-bold leading-6">{'背景颜色'}</div>
          <div>
            <ColorWheel
              colors={SETTINGS.backgroundColor}
              onClick={(color) => switchBgColor(color)}
              activeColor={avatarOption!.background.color}
            />
          </div>
        </div>

        {sections.map((s) => (
          <div className="py-7 px-4" key={s.widgetType}>
            <div className="mb-6 font-bold leading-6">{s.widgetType}</div>
            <div>
              {(s.widgetType === WidgetType.Tops ||
                s.widgetType === WidgetType.Face ||
                s.widgetType === WidgetType.Clothes) && (
                <details
                  className="my-4 mx-2"
                  open={s.widgetType === WidgetType.Face}
                >
                  <summary className="text-[#677f98] text-[13px] cursor-pointer select-none">
                    {'颜色'}
                  </summary>
                  <ColorWheel
                    colors={
                      SETTINGS[
                        s.widgetType === WidgetType.Face
                          ? 'skinColors'
                          : 'commonColors'
                      ]
                    }
                    onClick={(color) => setWidgetColor(s.widgetType, color)}
                    activeColor={getWidgetColor(s.widgetType)!}
                  />
                  {/* <ul className="flex items-center flex-wrap">
                    {SETTINGS[
                      s.widgetType === WidgetType.Face
                        ? 'skinColors'
                        : 'commonColors'
                    ].map((fillColor) => (
                      <li
                        key={fillColor}
                        className="relative z-[1] w-[calc(100%/7)] py-3 px-0 cursor-pointer transition-all duration-200"
                        onClick={() => setWidgetColor(s.widgetType, fillColor)}
                      >
                        <div
                          className={cn(
                            'relative box-content inline-block w-[1.3rem] h-[1.3rem] my-0 mx-auto text-[16px] z-[100] rounded-full shadow-[0_0_0.05em_0.2em_#1f2329] transition-all duration-200 before:absolute before:top-1/2 before:left-1/2 before:-z-[999] before:w-full before:h-full before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 before:opacity-50 before:transition-all before:duration-150 before:bg-inherit after:absolute after:top-1/2 after:left-1/2 after:z-[3] after:text-[#1f2329] after:w-full after:h-full after:text-[1.5rem] after:-translate-x-1/2 after:-translate-y-1/2 after:opacity-0 after:scale-50 after:transition-all after:duration-150 after:content-["√"] after:font-bold after:text-center before:content-[""]',
                            fillColor === getWidgetColor(s.widgetType) &&
                              'before:w-[160%] before:h-[160%] after:opacity-100',
                          )}
                          style={{ background: fillColor }}
                        />
                      </li>
                    ))}
                  </ul> */}
                </details>
              )}
              <ul className="list-none grid grid-cols-4 gap-2">
                {s.widgetList.map((it) => {
                  return (
                    <li
                      key={it.widgetShape}
                      className={cn(
                        'flex items-center justify-center w-full h-20 p-4 rounded-md cursor-pointer transition-all duration-200 hover:bg-[#1f2329]',
                        it.widgetShape ===
                          avatarOption.widgets?.[s.widgetType]?.shape &&
                          'bg-[#2c323a]',
                      )}
                      onClick={() => switchWidget(s.widgetType, it.widgetShape)}
                      dangerouslySetInnerHTML={{ __html: it.svgRaw }}
                    />
                  )
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
