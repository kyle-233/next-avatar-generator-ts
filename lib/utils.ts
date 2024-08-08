import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchSvg = async (
  widgetType: string,
  widget: string,
  isNeedFetch: boolean = false,
) => {
  try {
    const importFn = () =>
      import(`@/assets/preview/${widgetType}/${widget}.svg`)
    const importData = (await importFn()).default
    if (isNeedFetch) {
      const response = await fetch(`http://localhost:3001/${importData.src}`)
      return await response.text()
    } else {
      return importData
    }
  } catch (e) {
    console.log('in', e)
    return e
  }
}
