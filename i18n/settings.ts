export const fallbackLng = 'zh-CN'
export const cookieName = 'acccept-language'
export const defaultNS = 'translation'
export const languagesConfig: Record<
  string,
  { lang: string; name: string; node: string }
> = {
  'zh-CN': { lang: 'zh-CN', name: '简体中文', node: 'ChinaFlag' },
  en: { lang: 'en', name: 'English', node: 'USAFlag' },
}
export const languages = Object.keys(languagesConfig)

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
