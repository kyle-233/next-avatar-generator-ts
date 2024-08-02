export const fallbackLng = 'cn'
export const cookieName = 'acccept-language'
export const defaultNS = 'translation'
export const languagesConfig: Record<
  string,
  { lang: string; imageSrc: string }
> = {
  cn: { lang: 'cn', imageSrc: '/_next/CHN.svg' },
  en: { lang: 'en', imageSrc: '/_next/USA.svg' },
  de: { lang: 'de', imageSrc: '/_next/DEU.svg' },
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
