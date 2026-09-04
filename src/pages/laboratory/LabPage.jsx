import { useEffect, useState } from 'react'
import api from '../../api'
import { useToastStore } from '../../store/toastStore'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import { FlaskConical, CheckCircle } from 'lucide-react'

export default function LabPage() {
  const { addToast } = useToastStore()
  const [pending, setPending] = useState([])
  const [completed, setCompleted] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeForm, setActiveForm] = useState(null)
  const [form, setForm] = useState({ moisturePct: '', purityPct: '', hmf: '', nmrResult: 'Pass', remarks: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    Promise.all([api.getLabPendingBatches(), api.getLabCompletedTests()]).then(([p, c]) => {
      setPending(p)
      setCompleted(c)
      setLoading(false)
    })
  }, [])

  const handleSubmit = async (batchId) => {
    setSubmitting(true)
    try {
      await api.submitLabResults(batchId, form)
      setPending((prev) => prev.filter((b) => b.batchId !== batchId))
      setCompleted((prev) => [{ batchId, ...form, testedAt: new Date().toISOString() }, ...prev])
      setForm({ moisturePct: '', purityPct: '', hmf: '', nmrResult: 'Pass', remarks: '' })
      setActiveForm(null)
      addToast('Lab results submitted and attached to blockchain!')
    } catch {
      addToast('Failed to submit results', 'error')
    }
    setSubmitting(false)
  }

  if (loading) return <div className="page-container"><LoadingSpinner className="py-20" /></div>

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold font-heading text-charcoal-800">Laboratory</h1>

      {/* Pending Queue */}
      <div>
        <h2 className="section-label mb-4">Pending Test Queue ({pending.length})</h2>
        {pending.length === 0 ? (
          <EmptyState icon={FlaskConical} title="No pending batches" description="All batches have been tested" />
        ) : (
          <div className="space-y-4">
            {pending.map((batch) => (
              <Card key={batch.batchId}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-mono font-bold text-charcoal-800">{batch.batchId}</p>
                    <p className="text-sm text-charcoal-500">{batch.honeyType} · {batch.quantityKg || ''} kg</p>
                    <p className="text-xs text-charcoal-400">Beekeeper: {batch.beekeeperName} · {batch.village}</p>
                  </div>
                  <Badge variant="warning">{batch.status}</Badge>
                </div>

                {activeForm === batch.batchId ? (
                  <div className="mt-4 space-y-3 border-t border-charcoal-100 pt-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="section-label mb-1 block">Moisture %</label>
                        <input type="number" value={form.moisturePct} onChange={(e) => setForm({ ...form, moisturePct: e.target.value })} className="input" placeholder="17.2" step="0.1" />
                      </div>
                      <div>
                        <label className="section-label mb-1 block">Purity %</label>
                        <input type="number" value={form.purityPct} onChange={(e) => setForm({ ...form, purityPct: e.target.value })} className="input" placeholder="98.5" step="0.1" />
                      </div>
                      <div>
                        <label className="section-label mb-1 block">HMF Value</label>
                        <input type="number" value={form.hmf} onChange={(e) => setForm({ ...form, hmf: e.target.value })} className="input" placeholder="8.3" step="0.1" />
                      </div>
                      <div>
                        <label className="section-label mb-1 block">NMR Result</label>
                        <div className="flex gap-2">
                          {['Pass', 'Fail'].map((r) => (
                            <button key={r} onClick={() => setForm({ ...form, nmrResult: r })} className={`flex-1 py-2.5 rounded-btn text-sm font-semibold border-2 transition-all ${form.nmrResult === r ? r === 'Pass' ? 'border-success bg-green-50 text-success' : 'border-danger bg-red-50 text-danger' : 'border-charcoal-200 text-charcoal-400'}`}>
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="section-label mb-1 block">Remarks</label>
                      <input type="text" value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} className="input" placeholder="Any observations..." />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => setActiveForm(null)} className="flex-1">Cancel</Button>
                      <Button onClick={() => handleSubmit(batch.batchId)} disabled={submitting || !form.moisturePct || !form.purityPct} className="flex-1">
                        {submitting ? 'Submitting...' : 'Attach to Blockchain Record'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button size="sm" onClick={() => setActiveForm(batch.batchId)}>Enter Test Results</Button>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Completed Tests */}
      {completed.length > 0 && (
        <div>
          <h2 className="section-label mb-4">Tests Completed ({completed.length})</h2>
          <div className="card">
            {completed.map((t, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-charcoal-100 last:border-0">
                <CheckCircle className="h-5 w-5 text-success" />
                <div className="flex-1">
                  <p className="font-mono text-sm font-semibold text-charcoal-800">{t.batchId}</p>
                  <p className="text-xs text-charcoal-400">{t.honeyType} · Moisture {t.moisturePct}% · Purity {t.purityPct}% · NMR {t.nmrResult}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
