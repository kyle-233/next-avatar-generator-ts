import { useTranslation } from '@/i18n'
import { AvatarActionBar } from '../../../components/ui/avatar-action-bar'
import { TRIGGER_PROBABILITY } from '@/lib/constant'
import { AvatarActionGroup } from '../../../components/avatar-action-group'
import { AvatarContent } from './_components/avatar-content'

export default async function Home({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const { t } = await useTranslation(lang)

  return (
    <div className="flex h-full flex-col justify-center items-center py-8">
      <AvatarContent />
      <div className="mt-20">
        <AvatarActionBar />
      </div>
      <AvatarActionGroup />
    </div>
  )
}
