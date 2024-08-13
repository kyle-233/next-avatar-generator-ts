'use client'
import { AVATAR_LAYER, SETTINGS } from '@/lib/constant'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { useAvatarOption } from '@/components/hooks/use-avatar-options'
import { BeardShape, WidgetShape, WidgetType, WrapperShape } from '@/lib/enums'
import { useMounted } from '@/components/hooks/use-mounted'
import React, { ComponentType, useEffect, useState } from 'react'
import { previewData } from '@/lib/dynamic-data'
import { ColorWheel } from '@/components/color/color-wheel'
import { useTranslation } from '@/i18n/client'
import { useParams } from 'next/navigation'
import dynamic, { LoaderComponent } from 'next/dynamic'

export const Configurator = () => {
  const { avatarOption, setAvatarOption } = useAvatarOption()
  const params = useParams()
  const { lang } = params
  const { t } = useTranslation(lang as string)

  const [sections, setSections] = useState<
    {
      widgetType: WidgetType
      widgetList: {
        widgetType: WidgetType
        widgetShape: WidgetShape
        svgRaw: string | React.ComponentType<any>
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
    const promises: Promise<ComponentType | string>[] = list.map(
      async (widget: string) => {
        if (widget !== 'none' && previewData?.[widgetType]?.[widget]) {
          // return (
          //   await (() => import(`@/assets/preview/${widgetType}/${widget}.svg`))()
          // ).default
          return dynamic(
            previewData?.[widgetType]?.[widget] as () => LoaderComponent<{}>,
          )
        }
        return 'X'
      },
    )
    const svgRawList = await Promise.all(promises).then((raw) => {
      return raw.map((SvgRaw, i) => {
        // const svgRaw = SvgRaw !== 'X' && SvgRaw?.()
        return {
          widgetType,
          widgetShape: list[i],
          svgRaw:
            SvgRaw === 'X'
              ? 'X'
              : // : React.cloneElement(<SvgRaw />, {
                //     viewBox: `0 0 ${svgRaw?.props?.width} ${svgRaw?.props?.height}`,
                //   }),
                SvgRaw,
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
          <div className="mb-6 font-bold leading-6">{t('avatar-shape')}</div>
          <div>
            <ul className="list-none flex items-center">
              {SETTINGS.wrapperShape.map((shape) => (
                <li
                  key={shape}
                  title={t(shape)}
                  className="py-[0.4rem] px-2"
                  onClick={() => switchWrapperShape(shape)}
                >
                  <div
                    className={cn(
                      ' inline-block w-6 h-6 bg-[#a4b2c1] transition-all duration-200',
                      shape === 'circle' && 'rounded-full',
                      shape === 'square' && 'rounded-none',
                      shape === 'squircle' && 'rounded-md',
                      shape === avatarOption!.wrapperShape && 'bg-[#6967fe]',
                    )}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-7 px-4">
          <div className="mb-6 font-bold leading-6">{t('border-color')}</div>
          <div>
            <ColorWheel
              colors={SETTINGS.borderColor}
              onClick={(color) => switchBorderColor(color)}
              activeColor={avatarOption!.background.borderColor}
            />
          </div>
        </div>

        <div className="py-7 px-4">
          <div className="mb-6 font-bold leading-6">
            {t('background-color')}
          </div>
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
            <div className="mb-6 font-bold leading-6">{t(s.widgetType)}</div>
            <div>
              {(s.widgetType === WidgetType.Tops ||
                s.widgetType === WidgetType.Face ||
                s.widgetType === WidgetType.Clothes) && (
                <details
                  className="my-4 mx-2"
                  open={s.widgetType === WidgetType.Face}
                >
                  <summary className="text-[13px] cursor-pointer select-none">
                    {t('colors')}
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
                </details>
              )}
              <ul className="list-none grid grid-cols-4 gap-2">
                {s.widgetList.map((it) => {
                  const Svg = it.svgRaw
                  return (
                    <li
                      key={it.widgetShape}
                      className={cn(
                        'flex items-center justify-center w-full h-20 p-4 rounded-md cursor-pointer transition-all duration-200 hover:bg-content-foreground',
                        it.widgetShape ===
                          avatarOption.widgets?.[s.widgetType]?.shape &&
                          'bg-content',
                      )}
                      onClick={() => switchWidget(s.widgetType, it.widgetShape)}
                      // dangerouslySetInnerHTML={{ __html: it.svgRaw }}
                    >
                      {
                        it.svgRaw === 'X' ? (
                          'X'
                        ) : (
                          // <Image
                          //   fill
                          //   src={it.svgRaw}
                          //   alt={`${it.widgetType} ${it.widgetShape}`}
                          // />
                          // <>{it.svgRaw}</>
                          <Svg />
                        )
                        // { Svg }
                        // 1
                      }
                    </li>
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
