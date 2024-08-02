'use client'

import { useTranslation } from '@/i18n/client'
import { useParams } from 'next/navigation'

export const Header = () => {
  const params = useParams()
  const { lang } = params
  const { t } = useTranslation(lang as string, 'footer')
  return <div>Header:{t('title')}</div>
}
