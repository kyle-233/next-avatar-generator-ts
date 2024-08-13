'use client'
import { Header } from './header'
import { Footer } from './footer'
import { useCollapse } from '@/components/hooks/use-collapse'
import { cn } from '@/lib/utils'
import { ConfettiCanvas } from '@/components/confetti-canvas'
import { BackgroundGradient } from './_components/background-gradient'

interface MainLayoutProps
  extends React.PropsWithChildren<{
    aside: React.ReactNode
  }> {}

const MainLayout = ({ children, aside }: MainLayoutProps) => {
  const { isCollapsed } = useCollapse()
  return (
    <main className="h-full w-full flex overflow-hidden">
      <section
        className={cn(
          'flex-1 h-full transition-all duration-200',
          isCollapsed ? 'w-full' : 'w-full md:pr-80',
        )}
      >
        <div className="h-full scale-100">
          <div className="relative z-[110] flex flex-col h-full overflow-auto">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <BackgroundGradient />
          <ConfettiCanvas />
        </div>
      </section>
      {/* <Aside /> */}
      {aside}
    </main>
  )
}

export default MainLayout
