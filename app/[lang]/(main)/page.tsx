import { useTranslation } from '@/i18n'
import { AvatarGenerator } from './_components/avatar-generator'

export default async function Home({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const { t } = await useTranslation(lang)
  return (
    <div className="flex h-full flex-col justify-center items-center py-8">
      <AvatarGenerator />
    </div>
  )
}
