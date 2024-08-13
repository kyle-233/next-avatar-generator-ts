import { useTranslation } from '@/i18n'
import dynamic from 'next/dynamic'

const TestPage = async ({ params: { lang } }: { params: { lang: string } }) => {
  const Svg = dynamic(() => import('@/assets/widgets/ear/attached.svg'))
  const { t } = await useTranslation(lang)
  return (
    <div>
      Test
      <Svg />
    </div>
  )
}

export default TestPage
