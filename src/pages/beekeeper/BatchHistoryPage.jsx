import { useEffect, useState } from 'react'
import api from '../../api'
import { useLanguage } from '../../i18n/LanguageContext'
import BatchRow from '../../components/domain/BatchRow'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import EmptyState from '../../components/ui/EmptyState'
import { FileText } from 'lucide-react'

export default function BatchHistoryPage() {
  const { t } = useLanguage()
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getMyBatches().then((b) => { setBatches(b); setLoading(false) })
  }, [])

  if (loading) return <div className="page-container"><LoadingSpinner className="py-20" /></div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-heading text-charcoal-800">{t('batchHistory.title')}</h1>

      {batches.length === 0 ? (
        <EmptyState icon={FileText} title={t('batchHistory.empty')} description={t('batchHistory.emptyDesc')} />
      ) : (
        <div className="card">
          {batches.map((b) => <BatchRow key={b.batchId} batch={b} />)}
        </div>
      )}
    </div>
  )
}
