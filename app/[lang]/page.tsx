import { useTranslation } from '@/i18n'

export default async function Home({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const { t } = await useTranslation(lang)
  return <div>{t('title')}</div>
}
