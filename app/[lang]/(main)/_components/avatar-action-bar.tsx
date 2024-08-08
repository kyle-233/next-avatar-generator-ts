import { Button } from '@/components/ui/button'
import Image from 'next/image'
import IconBack from '@/assets/icons/icon-back.svg'
import IconNext from '@/assets/icons/icon-next.svg'
import IconFlip from '@/assets/icons/icon-flip.svg'
import IconCode from '@/assets/icons/icon-code.svg'

export const AvatarActionBar = () => {
  return (
    <div className="flex items-center p-2 bg-[#2a2f37] rounded-[2rem] gap-x-4">
      <Button variant="outline" size="icon" className="rounded-full">
        <Image
          src={IconBack}
          alt="revocation"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </Button>
      <Button variant="outline" size="icon" className="rounded-full">
        <Image
          src={IconNext}
          alt="reduction"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </Button>
      <Button variant="outline" size="icon" className="rounded-full">
        <Image
          src={IconFlip}
          alt="flip"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </Button>
      <Button variant="outline" size="icon" className="rounded-full">
        <Image
          src={IconCode}
          alt="code"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </Button>
    </div>
  )
}
