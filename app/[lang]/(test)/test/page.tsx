import { useTranslation } from '@/i18n'

const TestPage = async ({ params: { lang } }: { params: { lang: string } }) => {
  const { t } = await useTranslation(lang)
  return <div>Test</div>
}

export default TestPage
