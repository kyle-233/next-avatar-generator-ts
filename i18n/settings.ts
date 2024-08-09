export const fallbackLng = 'cn'
export const cookieName = 'acccept-language'
export const defaultNS = 'translation'
export const languagesConfig: Record<
  string,
  { lang: string; name: string; imageSrc: string }
> = {
  cn: { lang: 'cn', name: '简体中文', imageSrc: '/_next/CHN.svg' },
  en: { lang: 'en', name: 'English', imageSrc: '/_next/USA.svg' },
  // de: { lang: 'de', imageSrc: '/_next/DEU.svg' },
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
