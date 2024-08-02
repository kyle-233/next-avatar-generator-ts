'use client'

import { LanguageSwitcher } from '@/components/language-switch'
import { useTranslation } from '@/i18n/client'
import { languages } from '@/i18n/settings'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Trans } from 'react-i18next'

export const Header = () => {
  const params = useParams()
  const { lang } = params
  const { t } = useTranslation(lang as string, 'footer')
  return (
    <div>
      Header:{t('title')}
      <div>
        <LanguageSwitcher />
      </div>
    </div>
  )
}
