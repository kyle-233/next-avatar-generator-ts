'use client'
import Scruff from '@/assets/widgets/beard/scruff.svg'
import { useMounted } from '@/components/hooks/use-mounted'
import Image from 'next/image'
import { Children } from 'react'
const TestPage = () => {
  Children.toArray(Scruff)
  console.log('Scruff', Scruff(), Children.toArray(Scruff()))
  const isMounted = useMounted()
  if (!isMounted) {
    return null
  }
  return (
    <div>
      Test
      <Scruff />
      {/* <Image src={Scruff} width={90} height={90} alt="test" /> */}
    </div>
  )
}

export default TestPage
