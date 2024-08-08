import { LanguageSwitcher } from '@/components/language-switch'
import { ModeToggle } from '@/components/theme-toggle'

export const Footer = () => {
  return (
    <footer className="flex justify-center items-center gap-4 py-4  ">
      <LanguageSwitcher />
      <ModeToggle />
    </footer>
  )
}
