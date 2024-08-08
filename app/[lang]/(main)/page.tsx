import { useTranslation } from '@/i18n'
import { AvatarGenerator } from './_components/avatar-generator'
import { AvatarActionBar } from './_components/avatar-action-bar'
import { Button } from '@/components/ui/button'

export default async function Home({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const { t } = await useTranslation(lang)
  return (
    <div className="flex h-full flex-col justify-center items-center py-8">
      <AvatarGenerator />
      <div className="mt-20">
        <AvatarActionBar />
      </div>
      <div className="flex items-center justify-center mt-16 gap-x-4">
        <Button variant="secondary" className="font-bold">
          随机生成
        </Button>
        <Button variant="secondary" className="font-bold">
          下载头像
        </Button>
        <Button variant="secondary" className="font-bold">
          批量生成
        </Button>
      </div>
    </div>
  )
}
