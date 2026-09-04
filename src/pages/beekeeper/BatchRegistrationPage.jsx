import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import { useToastStore } from '../../store/toastStore'
import StepWizard from '../../components/ui/StepWizard'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import ProofBox from '../../components/ui/ProofBox'
import { Check, Copy, Printer, Download } from 'lucide-react'

const honeyTypes = ['Wildflower Honey', 'Litchi Honey', 'Jamun Honey', 'Karanj Honey', 'Coriander Honey']

export default function BatchRegistrationPage() {
  const navigate = useNavigate()
  const { addToast } = useToastStore()

  const [step, setStep] = useState(0)
  const [hives, setHives] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    hiveIds: [],
    harvestDate: new Date().toISOString().split('T')[0],
    honeyType: 'Wildflower Honey',
    quantityKg: '',
    moisturePct: '',
    notes: '',
  })
  const [result, setResult] = useState(null)

  useEffect(() => {
    api.getHives().then((h) => { setHives(h); setLoading(false) })
  }, [])

  const toggleHive = (id) => {
    setForm((prev) => ({
      ...prev,
      hiveIds: prev.hiveIds.includes(id) ? prev.hiveIds.filter((h) => h !== id) : [...prev.hiveIds, id],
    }))
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await api.createBatch(form)
      setResult(res)
      setStep(2)
      addToast('Batch minted successfully!')
    } catch {
      addToast('Failed to mint batch', 'error')
    }
    setSubmitting(false)
  }

  if (loading) return <div className="page-container"><LoadingSpinner className="py-20" /></div>

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold font-heading text-charcoal-800">Register New Harvest</h1>

      <StepWizard steps={['Harvest Details', 'Review & Submit', 'Success']} currentStep={step} />

      {/* Step 0: Harvest Details */}
      {step === 0 && (
        <Card>
          <h3 className="font-bold text-charcoal-800 font-heading mb-4">Step 1: Harvest Details</h3>

          <div className="mb-4">
            <label className="section-label mb-2 block">Select Hives</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {hives.map((h) => (
                <button
                  key={h.id}
                  onClick={() => toggleHive(h.id)}
                  className={`p-3 rounded-card border-2 text-sm text-left transition-all ${
                    form.hiveIds.includes(h.id) ? 'border-honey-500 bg-honey-50' : 'border-charcoal-200 hover:border-charcoal-300'
                  }`}
                >
                  <span className="font-semibold">{h.name}</span>
                  <span className="block text-xs text-charcoal-400">{h.id}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="section-label mb-1 block">Harvest Date</label>
              <input type="date" value={form.harvestDate} onChange={(e) => setForm({ ...form, harvestDate: e.target.value })} className="input" />
            </div>
            <div>
              <label className="section-label mb-1 block">Honey Type</label>
              <select value={form.honeyType} onChange={(e) => setForm({ ...form, honeyType: e.target.value })} className="input">
                {honeyTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="section-label mb-1 block">Quantity (kg)</label>
              <input type="number" value={form.quantityKg} onChange={(e) => setForm({ ...form, quantityKg: e.target.value })} className="input" placeholder="12.5" step="0.1" />
            </div>
            <div>
              <label className="section-label mb-1 block">Moisture %</label>
              <input type="number" value={form.moisturePct} onChange={(e) => setForm({ ...form, moisturePct: e.target.value })} className="input" placeholder="17.2" step="0.1" />
            </div>
          </div>

          <div className="mb-4">
            <label className="section-label mb-1 block">Notes</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input" rows={2} placeholder="Optional notes about this harvest..." />
          </div>

          <Button onClick={() => setStep(1)} disabled={form.hiveIds.length === 0 || !form.quantityKg} className="w-full">
            Continue to Review
          </Button>
        </Card>
      )}

      {/* Step 1: Review */}
      {step === 1 && (
        <Card>
          <h3 className="font-bold text-charcoal-800 font-heading mb-4">Step 2: Review & Submit</h3>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between py-2 border-b border-charcoal-100">
              <span className="text-sm text-charcoal-500">Hives</span>
              <span className="text-sm font-medium text-charcoal-800">{form.hiveIds.join(', ')}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-charcoal-100">
              <span className="text-sm text-charcoal-500">Date</span>
              <span className="text-sm font-medium text-charcoal-800">{form.harvestDate}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-charcoal-100">
              <span className="text-sm text-charcoal-500">Honey Type</span>
              <span className="text-sm font-medium text-charcoal-800">{form.honeyType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-charcoal-100">
              <span className="text-sm text-charcoal-500">Quantity</span>
              <span className="text-sm font-medium text-charcoal-800">{form.quantityKg} kg</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-charcoal-500">Moisture</span>
              <span className="text-sm font-medium text-charcoal-800">{form.moisturePct || 'N/A'}%</span>
            </div>
          </div>

          {submitting ? (
            <div className="text-center py-8">
              <LoadingSpinner className="mb-4" />
              <p className="text-sm text-charcoal-500">Signing → Submitting → Awaiting confirmation...</p>
            </div>
          ) : (
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setStep(0)} className="flex-1">Back</Button>
              <Button onClick={handleSubmit} className="flex-1">Register & Mint on Blockchain</Button>
            </div>
          )}
        </Card>
      )}

      {/* Step 2: Success */}
      {step === 2 && result && (
        <Card>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-xl font-bold text-charcoal-800 font-heading">Batch Minted!</h3>
            <p className="text-sm text-charcoal-400 mt-1">Your honey is now on the blockchain</p>
          </div>

          <div className="text-center mb-6">
            <p className="section-label mb-1">Batch ID</p>
            <p className="text-2xl font-bold font-mono text-charcoal-800">{result.batchId}</p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-card border border-charcoal-200 shadow-card">
              <img src={result.qrCodeUrl} alt="Batch QR Code" className="w-48 h-48" />
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <a href={result.qrCodeUrl} download className="btn-secondary flex-1 flex items-center justify-center gap-2">
              <Download className="h-4 w-4" /> Download QR
            </a>
            <button onClick={() => window.print()} className="btn-secondary flex-1 flex items-center justify-center gap-2">
              <Printer className="h-4 w-4" /> Print Label
            </button>
          </div>

          <ProofBox txHash={result.txHash} blockNumber={result.blockNumber} network={result.network} timestamp={result.timestamp} />

          <div className="flex gap-3 mt-6">
            <Button variant="secondary" onClick={() => { setStep(0); setResult(null); setForm({ hiveIds: [], harvestDate: new Date().toISOString().split('T')[0], honeyType: 'Wildflower Honey', quantityKg: '', moisturePct: '', notes: '' }) }} className="flex-1">
              Register Another
            </Button>
            <Button onClick={() => navigate('/beekeeper')} className="flex-1">
              Go to Dashboard
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
