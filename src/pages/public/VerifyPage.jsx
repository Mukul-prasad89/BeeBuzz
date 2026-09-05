import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../api'
import VerifyBanner from '../../components/domain/VerifyBanner'
import TimelineStepper from '../../components/ui/TimelineStepper'
import ProofBox from '../../components/ui/ProofBox'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import Badge from '../../components/ui/Badge'
import { User, MapPin, Calendar, Hexagon, ArrowLeft } from 'lucide-react'
import { formatDate } from '../../utils/formatters'
import { useLanguage } from '../../i18n/LanguageContext'

export default function VerifyPage() {
  const { batchId } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    setLoading(true)
    api.verifyBatch(batchId).then((res) => {
      setData(res)
      setLoading(false)
    })
  }, [batchId])

  if (loading) return <div className="page-container"><LoadingSpinner className="py-20" /></div>
  if (!data) return null

  return (
    <div className="page-container max-w-2xl">
      <Link to="/scan" className="inline-flex items-center gap-1 text-sm text-honey-600 hover:text-honey-700 mb-6">
        <ArrowLeft className="h-4 w-4" /> {t('landing.backToScanner')}
      </Link>

      <VerifyBanner status={data.status} scanCount={data.scanCount} lastVerifiedAt={data.lastVerifiedAt} />

      {data.status === 'verified' && (
        <div className="mt-8 space-y-6">
          {/* Product Card */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-honey-100 flex items-center justify-center text-3xl">🍯</div>
              <div className="flex-1">
                <h3 className="font-bold text-charcoal-800 font-heading">{data.product.honeyType}</h3>
                <p className="text-sm text-charcoal-400 font-mono mt-0.5">{batchId}</p>
                <div className="flex gap-3 mt-2">
                  <Badge variant="success">{data.product.weightKg} kg</Badge>
                  <Badge variant="info">{data.product.season}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="card">
            <h3 className="section-label mb-4">{t('landing.traceJourney')}</h3>
            <TimelineStepper steps={data.timeline} />
          </div>

          {/* Beekeeper Card */}
          <div className="card">
            <h3 className="section-label mb-3">Beekeeper</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-honey-500 flex items-center justify-center text-white font-bold">
                {data.beekeeper.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-charcoal-800">{data.beekeeper.name}</p>
                <div className="flex items-center gap-3 text-xs text-charcoal-400 mt-0.5">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {data.beekeeper.village}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {t('landing.since')} {data.beekeeper.since}</span>
                </div>
                <p className="text-[10px] text-charcoal-400 mt-0.5">{data.beekeeper.cluster}</p>
              </div>
            </div>
          </div>

          {/* Proof Box */}
          <ProofBox {...data.proof} />

          {/* Footer */}
          <p className="text-center text-xs text-charcoal-400 py-4">
            {t('landing.poweredBy')}
          </p>
        </div>
      )}
    </div>
  )
}
