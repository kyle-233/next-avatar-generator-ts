'use client'
import { Aside } from '@/components/aside'
import { Header } from './header'
import { Footer } from './footer'
import { useCollapse } from '@/components/hooks/use-collapse'
import { cn } from '@/lib/utils'
import { BackgroundGradient } from '@/components/background-gradient'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isCollapsed, setIsCollapsed } = useCollapse()
  return (
    <main className="h-full w-full flex overflow-hidden">
      <section
        className={cn(
          'flex-1 h-full transition-all duration-200',
          isCollapsed ? 'w-full' : 'pr-80',
        )}
      >
        <div className="h-full scale-100">
          <div className="relative z-[110] flex flex-col h-full overflow-auto">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <BackgroundGradient />
        </div>
      </section>
      <Aside />
    </main>
  )
}

export default MainLayout
