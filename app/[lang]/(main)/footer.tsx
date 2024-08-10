import { LanguageSwitcher } from '@/components/language-switch'
import { ModeToggle } from '@/components/theme-toggle'
import { Separator } from '@/components/ui/separator'

export const Footer = () => {
  return (
    <footer className="flex justify-center items-center gap-4 py-4  ">
      <LanguageSwitcher />
      <Separator orientation="vertical" className="h-4 w-[2px] rounded-sm" />
      <ModeToggle />
    </footer>
  )
}
