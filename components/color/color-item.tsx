import { cn } from '@/lib/utils'

interface ColorItem {
  className?: string
  style?: Record<string, any>
  active: boolean
  color: string
}

export const ColorItem = ({
  className = '',
  style = {},
  active,
  color,
}: ColorItem) => {
  return (
    <div
      className={cn(
        'relative box-content inline-block w-[1.3rem] h-[1.3rem] my-0 mx-auto text-[16px] rounded-full cursor-pointer shadow-[0_0_0.05em_0.2em_#1f2329] transition-all duration-200 before:absolute before:top-1/2 before:left-1/2 before:-z-[999] before:w-full before:h-full before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 before:transition-all before:duration-150 before:bg-inherit before:opacity-50 after:absolute after:top-1/2 after:left-1/2 after:z-[3] after:text-[#1f2329] after:w-full after:h-full after:text-sm after:-translate-x-1/2 after:-translate-y-1/2 after:opacity-0 after:transition-all after:duration-150 after:content-["√"] after:font-bold after:text-center before:cursor-pointer',
        className,
        active && 'before:w-[160%] before:h-[160%] after:opacity-100',
        color === 'transparent' && '!bg-white',
      )}
      style={{ background: color, ...style }}
    />
  )
}
