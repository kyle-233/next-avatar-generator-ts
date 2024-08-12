import { Skeleton } from '@/components/ui/skeleton'

const MainLoadingPage = () => {
  return (
    <div className="flex h-full flex-col justify-center items-center py-8">
      <div className="flex items-center justify-center">
        <Skeleton className="h-[280px] w-[280px]" />
      </div>
      <div className="mt-20">
        <div className="flex items-center p-2 bg-content rounded-[2rem] gap-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
      <div className="flex items-center justify-center mt-16 gap-x-4">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default MainLoadingPage
