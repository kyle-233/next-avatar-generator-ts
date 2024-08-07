'use client'
import { Aside } from '@/components/aside'
import { Header } from './header'
import { Footer } from './footer'
import { useCollapse } from '@/components/hooks/use-collapse'
import { cn } from '@/lib/utils'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isCollapsed, setIsCollapsed } = useCollapse()
  return (
    <main className="h-full w-full flex overflow-hidden">
      <section
        className={cn(
          'flex-1 flex flex-col h-full transition-all duration-200',
          isCollapsed ? 'w-full' : 'pr-80',
        )}
      >
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </section>
      <Aside />
    </main>
  )
}

export default MainLayout
