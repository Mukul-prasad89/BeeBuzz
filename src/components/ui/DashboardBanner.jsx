import { MapPin, Wifi } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

export default function DashboardBanner({ name, cluster, registryId, actions, gradient = 'from-honey-400 via-honey-300 to-amber-200' }) {
  const { t } = useLanguage()
  const getGreeting = () => {
    const h = new Date().getHours()
    if (h < 12) return t('dashboardBanner.morning')
    if (h < 17) return t('dashboardBanner.afternoon')
    return t('dashboardBanner.evening')
  }

  return (
    <div className={`bg-gradient-to-r ${gradient} rounded-2xl p-6 sm:p-8 text-charcoal-800 relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 right-32 w-40 h-40 bg-white/20 rounded-full translate-y-1/2" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-charcoal-600 text-sm font-medium mb-1">{t('dashboardBanner.welcomeBack')}</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-charcoal-800">
            {getGreeting()}, {name}
          </h1>
          <div className="flex items-center gap-3 mt-2 text-charcoal-600 text-sm">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {cluster}</span>
            <span className="text-charcoal-400">-</span>
            <span>{t('dashboardBanner.registryId')} {registryId}</span>
            <span className="flex items-center gap-1 text-green-600">
              <Wifi className="h-3.5 w-3.5" /> {t('dashboardBanner.online')}
            </span>
          </div>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  )
}
