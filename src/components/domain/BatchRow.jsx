import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'
import { formatDate } from '../../utils/formatters'
import { useLanguage } from '../../i18n/LanguageContext'

const statusBadgeTypes = {
  'On-chain ✓': 'success',
  'Quality Verified': 'success',
  'Pending test': 'warning',
  'Transferred': 'info',
  'Tampered': 'danger',
}

const statusTranslationKeys = {
  'On-chain ✓': 'batchRow.onChain',
  'Quality Verified': 'batchRow.qualityVerified',
  'Pending test': 'batchRow.pendingTest',
  'Transferred': 'batchRow.transferred',
  'Tampered': 'batchRow.tampered',
}

export default function BatchRow({ batch, showLink = true }) {
  const { t } = useLanguage()

  return (
    <div className="flex items-center justify-between py-3 border-b border-charcoal-100 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-semibold text-charcoal-800">{batch.batchId}</span>
          <Badge variant={statusBadgeTypes[batch.status] || 'neutral'}>{t(statusTranslationKeys[batch.status] || batch.status)}</Badge>
        </div>
        <p className="text-xs text-charcoal-400 mt-0.5">
          {batch.honeyType} · {batch.quantityKg} kg · {formatDate(batch.date)}
        </p>
      </div>
      {showLink && (
        <Link to={`/verify/${batch.batchId}`} className="text-xs font-semibold text-honey-600 hover:text-honey-700 ml-4 whitespace-nowrap">
          {t('batchRow.view')}
        </Link>
      )}
    </div>
  )
}
