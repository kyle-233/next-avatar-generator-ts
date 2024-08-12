'use client'

import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCollapse } from '@/components/hooks/use-collapse'
import { Configurator } from './_components/configurator'

export default function AsidePage() {
  const { isCollapsed, setIsCollapsed } = useCollapse()
  return (
    <div
      className={cn(
        'fixed top-0 right-0 z-999 h-full transition-all duration-200',
        isCollapsed && ' translate-x-full',
      )}
    >
      <div className="h-full w-80">
        <Configurator />
      </div>
      <div
        className="absolute top-2/4 left-0 w-5 hover:w-6 h-16 cursor-pointer flex items-center justify-center bg-content -translate-x-full -translate-y-1/2 transition-all rounded-l-md duration-200 group"
        onClick={() => {
          setIsCollapsed()
        }}
      >
        {isCollapsed && (
          <ChevronLeft className="w-5 h-5 group-hover:w-6 group-hover:h-6 transition-all duration-200" />
        )}
        {!isCollapsed && (
          <ChevronRight className="w-5 h-5 group-hover:w-6 group-hover:h-6 transition-all duration-200" />
        )}
      </div>
    </div>
  )
}

// export default AsidePage
