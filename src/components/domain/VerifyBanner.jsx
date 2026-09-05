import { CheckCircle, XCircle, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

export default function VerifyBanner({ status, scanCount, lastVerifiedAt }) {
  const { t } = useLanguage()
  const isVerified = status === 'verified'

  return (
    <div className={`rounded-card p-8 text-center ${isVerified ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-red-500 to-red-600'} text-white`}>
      <div className="flex justify-center mb-4">
        {isVerified ? (
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
            <CheckCircle className="h-12 w-12" />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
            <XCircle className="h-12 w-12" />
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold font-heading">
        {isVerified ? t('verify.authentic') : t('verify.failed')}
      </h2>
      <p className="text-sm mt-2 opacity-90">
        {isVerified
          ? t('verify.onLedger')
          : t('verify.notFound')}
      </p>
      {isVerified && scanCount > 0 && (
        <div className="flex items-center justify-center gap-2 mt-4 text-sm opacity-80">
          <ShieldCheck className="h-4 w-4" />
          <span>{t('verify.verifiedTimes', { count: scanCount })} · {lastVerifiedAt ? t('verify.lastVerified') : t('verify.neverVerified')}</span>
        </div>
      )}
    </div>
  )
}
