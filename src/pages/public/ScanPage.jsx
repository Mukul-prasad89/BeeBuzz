import ScanFrame from '../../components/domain/ScanFrame'
import { useLanguage } from '../../i18n/LanguageContext'

export default function ScanPage() {
  const { t } = useLanguage()

  return (
    <div className="page-container">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold font-heading text-charcoal-800">{t('landing.scanTitle')}</h1>
        <p className="text-sm text-charcoal-500 mt-1">{t('landing.scanDesc')}</p>
      </div>
      <ScanFrame />
    </div>
  )
}
