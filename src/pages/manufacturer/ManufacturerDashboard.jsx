import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'
import DashboardBanner from '../../components/ui/DashboardBanner'
import StatGrid from '../../components/ui/StatGrid'
import {
  Package, Clock, CheckCircle2, QrCode, Plus,
  AlertTriangle, TriangleAlert, Factory, FileCheck,
  Box, ArrowRight, Download, Eye, FlaskConical, User
} from 'lucide-react'

const tabs = [
  { id: 'overview', label: 'Overview', icon: Package },
  { id: 'incoming', label: 'Incoming Stock', icon: Box },
  { id: 'processing', label: 'Processing', icon: Factory },
  { id: 'qr', label: 'Generate QR', icon: QrCode },
  { id: 'history', label: 'Batch History', icon: FileCheck },
]

const incomingStock = [
  { id: 'BB-2847', beekeeper: 'Ramesh Patil', honey: 'Wild Forest Honey', weight: '12.5 kg', labStatus: 'Passed', received: 'Sep 3' },
  { id: 'BB-2831', beekeeper: 'Suresh Jadhav', honey: 'Mustard Honey', weight: '8.3 kg', labStatus: 'Passed', received: 'Sep 1' },
  { id: 'BB-2819', beekeeper: 'Priya Shinde', honey: 'Litchi Honey', weight: '6.7 kg', labStatus: 'Passed', received: 'Aug 28' },
]

const processingBatches = [
  { id: 'MFG-0042', source: 'BB-2847', honey: 'Wild Forest Honey', rawWeight: '12.5 kg', processedWeight: '11.8 kg', stage: 'Filtering', progress: 60 },
  { id: 'MFG-0041', source: 'BB-2831', honey: 'Mustard Honey', rawWeight: '8.3 kg', processedWeight: '7.9 kg', stage: 'Bottling', progress: 90 },
]

const completedBatches = [
  { id: 'MFG-0040', honey: 'Eucalyptus Honey', weight: '4.0 kg', bottles: 16, qrGenerated: true, date: 'Sep 1' },
  { id: 'MFG-0039', honey: 'Multi-floral Honey', weight: '5.5 kg', bottles: 22, qrGenerated: true, date: 'Aug 29' },
]

export default function ManufacturerDashboard() {
  const { profile } = useAuthStore()
  const { addToast } = useToastStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [qrBatch, setQrBatch] = useState(null)
  const [qrForm, setQrForm] = useState({
    batchId: '', honeyType: '', sourceBatchId: '', rawWeight: '', processedWeight: '',
    bottleSize: '500g', numberOfBottles: '', bestBefore: '', packDate: '',
    processingMethod: '', qualityGrade: 'A', labMoisture: '', labPurity: '', labNmr: 'Pass',
  })
  const [qrGenerated, setQrGenerated] = useState(false)

  const firstName = profile?.name?.split(' ')[0] || 'Manufacturer'
  const registryId = profile?.registryId || 'BB-MFG-007'

  const handleGenerateQR = () => {
    if (!qrForm.batchId || !qrForm.honeyType || !qrForm.numberOfBottles) {
      addToast('Please fill batch ID, honey type and number of bottles', 'error')
      return
    }
    setQrGenerated(true)
    addToast('QR codes generated successfully and minted on-chain!')
  }

  const handleResetQR = () => {
    setQrGenerated(false)
    setQrForm({
      batchId: '', honeyType: '', sourceBatchId: '', rawWeight: '', processedWeight: '',
      bottleSize: '500g', numberOfBottles: '', bestBefore: '', packDate: '',
      processingMethod: '', qualityGrade: 'A', labMoisture: '', labPurity: '', labNmr: 'Pass',
    })
  }

  return (
    <div className="space-y-6">
      <DashboardBanner
        name={firstName}
        cluster="Honey Processing Unit, Nashik"
        registryId={registryId}
        gradient="from-violet-500 via-purple-400 to-fuchsia-300"
        actions={
          <button onClick={() => setActiveTab('qr')} className="flex items-center gap-2 bg-white text-purple-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-purple-50 transition-colors shadow-sm border border-purple-200">
            <QrCode className="h-4 w-4" /> Generate QR
          </button>
        }
      />

      <StatGrid stats={[
        { icon: Box, value: '3', label: 'Incoming Stock', color: 'bg-blue-50 text-blue-600', trend: 'Awaiting processing' },
        { icon: Factory, value: '2', label: 'In Processing', color: 'bg-amber-50 text-amber-600', trend: 'Filtering & bottling' },
        { icon: CheckCircle2, value: '40', label: 'Completed Batches', color: 'bg-green-50 text-green-600', trend: '+8 this month' },
        { icon: QrCode, value: '640', label: 'QR Codes Generated', color: 'bg-purple-50 text-purple-600', trend: 'All verified' },
      ]} />

      {/* Alerts */}
      <div>
        <h2 className="text-lg font-bold font-heading text-charcoal-800 mb-3">Alerts</h2>
        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-400 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <TriangleAlert className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-charcoal-800 text-sm">Storage Capacity Warning</p>
                <p className="text-sm text-charcoal-500">Raw material storage at 78% capacity. Schedule processing to free up space.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-charcoal-200">
        <div className="flex overflow-x-auto gap-0 -mb-px scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-honey-500 text-honey-600'
                  : 'border-transparent text-charcoal-500 hover:text-charcoal-700 hover:border-charcoal-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-charcoal-100 p-5">
            <h3 className="font-bold font-heading text-charcoal-800 mb-4">Incoming from Beekeepers</h3>
            <div className="space-y-3">
              {incomingStock.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-honey-50 rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-charcoal-800">{s.honey}</p>
                    <p className="text-xs text-charcoal-500">{s.id} - {s.beekeeper} - {s.weight}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-success">{s.labStatus}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-charcoal-100 p-5">
            <h3 className="font-bold font-heading text-charcoal-800 mb-4">Processing Status</h3>
            <div className="space-y-4">
              {processingBatches.map((p, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-charcoal-700">{p.honey}</span>
                    <span className="text-xs font-bold text-amber-600">{p.stage}</span>
                  </div>
                  <div className="w-full bg-charcoal-100 rounded-full h-2">
                    <div className="bg-amber-500 rounded-full h-2" style={{ width: `${p.progress}%` }} />
                  </div>
                  <p className="text-xs text-charcoal-400 mt-1">{p.rawWeight} raw → {p.processedWeight} processed</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-charcoal-100 p-5">
            <h3 className="font-bold font-heading text-charcoal-800 mb-4">Recently Completed</h3>
            <div className="space-y-3">
              {completedBatches.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-charcoal-50 rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-charcoal-800">{c.honey}</p>
                    <p className="text-xs text-charcoal-500">{c.weight} - {c.bottles} bottles - {c.date}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-success">QR Generated</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Incoming Stock Tab */}
      {activeTab === 'incoming' && (
        <div className="bg-white rounded-xl border border-charcoal-100 p-5">
          <h3 className="font-bold font-heading text-charcoal-800 mb-4">Incoming Stock from Beekeepers</h3>
          <div className="space-y-3">
            {incomingStock.map((s, i) => (
              <div key={i} className="p-4 bg-charcoal-50 rounded-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono font-bold text-charcoal-800">{s.id}</p>
                    <p className="text-sm text-charcoal-500">{s.honey} - {s.weight}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="h-3 w-3 text-charcoal-400" />
                      <span className="text-xs text-charcoal-500">{s.beekeeper}</span>
                      <span className="text-xs text-charcoal-400">Received: {s.received}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-50 text-success">{s.labStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Processing Tab */}
      {activeTab === 'processing' && (
        <div className="bg-white rounded-xl border border-charcoal-100 p-5">
          <h3 className="font-bold font-heading text-charcoal-800 mb-4">Processing Batches</h3>
          <div className="space-y-4">
            {processingBatches.map((p, i) => (
              <div key={i} className="p-4 bg-charcoal-50 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-mono font-bold text-charcoal-800">{p.id}</p>
                    <p className="text-sm text-charcoal-500">{p.honey} - Source: {p.source}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600">{p.stage}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-charcoal-500 mb-2">
                  <span>Raw: {p.rawWeight}</span>
                  <ArrowRight className="h-3 w-3 text-charcoal-400" />
                  <span>Processed: {p.processedWeight}</span>
                </div>
                <div className="w-full bg-charcoal-100 rounded-full h-2">
                  <div className="bg-amber-500 rounded-full h-2 transition-all" style={{ width: `${p.progress}%` }} />
                </div>
                <p className="text-xs text-charcoal-400 mt-1 text-right">{p.progress}% complete</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generate QR Tab */}
      {activeTab === 'qr' && (
        <div className="space-y-6">
          {!qrGenerated ? (
            <div className="bg-white rounded-xl border border-charcoal-100 p-6">
              <h3 className="font-bold font-heading text-charcoal-800 mb-1">Generate QR Code for Batch</h3>
              <p className="text-sm text-charcoal-500 mb-6">Fill in all details including lab test results and blockchain data to generate tamper-proof QR codes.</p>

              <div className="space-y-6">
                {/* Batch Details */}
                <div>
                  <h4 className="text-sm font-bold text-charcoal-700 mb-3 flex items-center gap-2">
                    <Box className="h-4 w-4 text-honey-500" /> Batch Details
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">Manufacturer Batch ID *</label>
                      <input type="text" value={qrForm.batchId} onChange={(e) => setQrForm({ ...qrForm, batchId: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500" placeholder="MFG-0042" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">Honey Type *</label>
                      <input type="text" value={qrForm.honeyType} onChange={(e) => setQrForm({ ...qrForm, honeyType: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500" placeholder="Wild Forest Honey" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">Source Batch ID (from beekeeper)</label>
                      <input type="text" value={qrForm.sourceBatchId} onChange={(e) => setQrForm({ ...qrForm, sourceBatchId: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500" placeholder="BB-2847" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">Quality Grade</label>
                      <div className="flex gap-2">
                        {['A+', 'A', 'B+', 'B'].map((g) => (
                          <button key={g} onClick={() => setQrForm({ ...qrForm, qualityGrade: g })} className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${qrForm.qualityGrade === g ? 'border-honey-500 bg-honey-50 text-honey-700' : 'border-charcoal-200 text-charcoal-400'}`}>
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Processing Details */}
                <div>
                  <h4 className="text-sm font-bold text-charcoal-700 mb-3 flex items-center gap-2">
                    <Factory className="h-4 w-4 text-honey-500" /> Processing Details
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">Raw Weight (kg)</label>
                      <input type="number" value={qrForm.rawWeight} onChange={(e) => setQrForm({ ...qrForm, rawWeight: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500" placeholder="12.5" step="0.1" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">Processed Weight (kg)</label>
                      <input type="number" value={qrForm.processedWeight} onChange={(e) => setQrForm({ ...qrForm, processedWeight: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500" placeholder="11.8" step="0.1" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">Processing Method</label>
                      <input type="text" value={qrForm.processingMethod} onChange={(e) => setQrForm({ ...qrForm, processingMethod: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500" placeholder="Cold-filtered, no heat treatment" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">Bottle Size</label>
                      <div className="flex gap-2">
                        {['250g', '500g', '1kg'].map((s) => (
                          <button key={s} onClick={() => setQrForm({ ...qrForm, bottleSize: s })} className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${qrForm.bottleSize === s ? 'border-honey-500 bg-honey-50 text-honey-700' : 'border-charcoal-200 text-charcoal-400'}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">Number of Bottles *</label>
                      <input type="number" value={qrForm.numberOfBottles} onChange={(e) => setQrForm({ ...qrForm, numberOfBottles: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500" placeholder="20" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">Pack Date</label>
                      <input type="date" value={qrForm.packDate} onChange={(e) => setQrForm({ ...qrForm, packDate: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">Best Before</label>
                      <input type="date" value={qrForm.bestBefore} onChange={(e) => setQrForm({ ...qrForm, bestBefore: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500" />
                    </div>
                  </div>
                </div>

                {/* Lab Data */}
                <div>
                  <h4 className="text-sm font-bold text-charcoal-700 mb-3 flex items-center gap-2">
                    <FlaskConical className="h-4 w-4 text-honey-500" /> Lab Test Results (from blockchain)
                  </h4>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">Moisture %</label>
                      <input type="number" value={qrForm.labMoisture} onChange={(e) => setQrForm({ ...qrForm, labMoisture: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500" placeholder="15.4" step="0.1" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">Purity %</label>
                      <input type="number" value={qrForm.labPurity} onChange={(e) => setQrForm({ ...qrForm, labPurity: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500" placeholder="97.2" step="0.1" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">NMR Result</label>
                      <div className="flex gap-2">
                        {['Pass', 'Fail'].map((r) => (
                          <button key={r} onClick={() => setQrForm({ ...qrForm, labNmr: r })} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${qrForm.labNmr === r ? r === 'Pass' ? 'border-green-500 bg-green-50 text-green-600' : 'border-red-500 bg-red-50 text-red-600' : 'border-charcoal-200 text-charcoal-400'}`}>
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <button onClick={handleGenerateQR} className="w-full py-3 rounded-xl text-sm font-bold bg-honey-500 text-white hover:bg-honey-600 transition-colors flex items-center justify-center gap-2">
                  <QrCode className="h-4 w-4" /> Generate QR Codes & Mint on Blockchain
                </button>
              </div>
            </div>
          ) : (
            /* QR Generated Success */
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-charcoal-100 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-xl font-bold font-heading text-charcoal-800 mb-2">QR Codes Generated!</h3>
                <p className="text-sm text-charcoal-500 mb-4">{qrForm.numberOfBottles} QR codes minted on blockchain for {qrForm.batchId}</p>
                <div className="flex justify-center gap-3">
                  <button className="flex items-center gap-2 bg-honey-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-honey-600 transition-colors">
                    <Download className="h-4 w-4" /> Download QR Sheet
                  </button>
                  <button onClick={handleResetQR} className="flex items-center gap-2 border border-charcoal-200 text-charcoal-600 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-charcoal-50 transition-colors">
                    <Plus className="h-4 w-4" /> Generate More
                  </button>
                </div>
              </div>

              {/* Batch Summary */}
              <div className="bg-white rounded-xl border border-charcoal-100 p-6">
                <h3 className="font-bold font-heading text-charcoal-800 mb-4">Batch Summary</h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  {[
                    { label: 'Batch ID', value: qrForm.batchId },
                    { label: 'Honey Type', value: qrForm.honeyType },
                    { label: 'Source Batch', value: qrForm.sourceBatchId },
                    { label: 'Quality Grade', value: qrForm.qualityGrade },
                    { label: 'Raw Weight', value: `${qrForm.rawWeight} kg` },
                    { label: 'Processed Weight', value: `${qrForm.processedWeight} kg` },
                    { label: 'Bottle Size', value: qrForm.bottleSize },
                    { label: 'Number of Bottles', value: qrForm.numberOfBottles },
                    { label: 'Pack Date', value: qrForm.packDate },
                    { label: 'Best Before', value: qrForm.bestBefore },
                    { label: 'Processing Method', value: qrForm.processingMethod },
                    { label: 'Moisture / Purity / NMR', value: `${qrForm.labMoisture}% / ${qrForm.labPurity}% / ${qrForm.labNmr}` },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-charcoal-50 rounded-lg">
                      <span className="text-charcoal-500">{item.label}</span>
                      <span className="font-semibold text-charcoal-800">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR Preview */}
              <div className="bg-white rounded-xl border border-charcoal-100 p-6">
                <h3 className="font-bold font-heading text-charcoal-800 mb-4">QR Code Preview</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                  {[...Array(Math.min(10, parseInt(qrForm.numberOfBottles) || 0))].map((_, i) => (
                    <div key={i} className="aspect-square bg-charcoal-50 rounded-xl flex items-center justify-center border border-charcoal-200">
                      <div className="text-center">
                        <QrCode className="h-12 w-12 text-charcoal-400 mx-auto" />
                        <p className="text-[10px] text-charcoal-400 mt-1 font-mono">{qrForm.batchId}-{String(i + 1).padStart(3, '0')}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {parseInt(qrForm.numberOfBottles) > 10 && (
                  <p className="text-center text-sm text-charcoal-500 mt-4">... and {parseInt(qrForm.numberOfBottles) - 10} more QR codes</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Batch History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-xl border border-charcoal-100 p-5">
          <h3 className="font-bold font-heading text-charcoal-800 mb-4">Completed Batches</h3>
          <div className="space-y-3">
            {completedBatches.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-charcoal-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                  <div>
                    <p className="font-mono text-sm font-semibold text-charcoal-800">{c.id} - {c.honey}</p>
                    <p className="text-xs text-charcoal-500">{c.weight} - {c.bottles} bottles - {c.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-50 text-success">QR Generated</span>
                  <button className="p-2 text-charcoal-400 hover:text-charcoal-600 hover:bg-charcoal-100 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
