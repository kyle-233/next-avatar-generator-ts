import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchSvg = async (widgetType: string, widget: string) => {
  try {
    const importFn = () =>
      import(`@/assets/preview/${widgetType}/${widget}.svg`)
    const importData = (await importFn()).default
    console.log('response', importData)
    const response = await fetch(`http://localhost:3001/${importData.src}`)
    console.log('response', response)
    return response
  } catch (e) {
    console.log('in', e)
    return e
  }
}
