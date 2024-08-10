import { ColorItem } from './color-item'

interface ColorWheelProps {
  colors: string[]
  activeColor: string
  title?: string
  onClick: (color: string) => void
}

export const ColorWheel = ({
  colors,
  activeColor,
  onClick,
  title,
}: ColorWheelProps) => {
  return (
    <ul className="list-none flex items-center flex-wrap">
      {colors.map((color) => (
        <li
          key={color}
          title={title || color}
          className="py-[0.4rem] px-2 h-fit"
          onClick={() => onClick(color)}
        >
          <ColorItem color={color} active={activeColor === color} />
        </li>
      ))}
    </ul>
  )
}
