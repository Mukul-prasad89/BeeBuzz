import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'
import { useLanguage } from '../../i18n/LanguageContext'
import DashboardBanner from '../../components/ui/DashboardBanner'
import StatGrid from '../../components/ui/StatGrid'
import {
  FlaskConical, FileCheck, Clock, CheckCircle2,
  AlertTriangle, TriangleAlert, TrendingUp, Beaker, Shield
} from 'lucide-react'

const pendingBatches = [
  { id: 'BB-2847', beekeeper: 'Ramesh Patil', honey: 'Wild Forest Honey', weight: '12.5 kg', village: 'Jawhar', submitted: '2 hours ago' },
  { id: 'BB-2831', beekeeper: 'Suresh Jadhav', honey: 'Mustard Honey', weight: '8.3 kg', village: 'Mokhada', submitted: '5 hours ago' },
  { id: 'BB-2819', beekeeper: 'Priya Shinde', honey: 'Litchi Honey', weight: '6.7 kg', village: 'Vikramgad', submitted: '1 day ago' },
]

const completedTests = [
  { id: 'BB-2805', honey: 'Eucalyptus Honey', moisture: '16.8%', purity: '97.5%', nmr: 'Pass', result: 'Passed', date: 'Sep 2' },
  { id: 'BB-2798', honey: 'Multi-floral Honey', moisture: '17.2%', purity: '96.1%', nmr: 'Pass', result: 'Passed', date: 'Sep 1' },
  { id: 'BB-2790', honey: 'Wild Forest Honey', moisture: '22.1%', purity: '89.3%', nmr: 'Fail', result: 'Failed', date: 'Aug 28' },
]

export default function LabPage() {
  const { profile } = useAuthStore()
  const { addToast } = useToastStore()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('queue')
  const [activeForm, setActiveForm] = useState(null)
  const [form, setForm] = useState({ moisturePct: '', purityPct: '', hmf: '', nmrResult: 'Pass', remarks: '' })

  const firstName = profile?.name?.split(' ')[0] || 'Lab Technician'
  const registryId = profile?.registryId || 'BB-LAB-003'

  const handleSubmit = (batchId) => {
    addToast(t('lab.toast'))
    setActiveForm(null)
    setForm({ moisturePct: '', purityPct: '', hmf: '', nmrResult: 'Pass', remarks: '' })
  }

  const labTabs = [
    { id: 'queue', label: t('lab.tabs.queue'), icon: Clock },
    { id: 'completed', label: t('lab.tabs.completed'), icon: CheckCircle2 },
    { id: 'analytics', label: t('lab.tabs.analytics'), icon: TrendingUp },
    { id: 'standards', label: t('lab.tabs.standards'), icon: Shield },
  ]

  return (
    <div className="space-y-6">
      <DashboardBanner
        name={firstName}
        cluster="KVIC Certified Lab, Pune"
        registryId={registryId}
        gradient="from-honey-400 via-honey-300 to-amber-200"
        actions={
          <button className="flex items-center gap-2 bg-white text-blue-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-blue-50 transition-colors shadow-sm border border-blue-200">
            <Beaker className="h-4 w-4" /> {t('lab.newTest')}
          </button>
        }
      />

      <StatGrid stats={[
        { icon: Clock, value: '3', label: t('lab.stats.pendingTests'), color: 'bg-amber-50 text-amber-600', trend: t('lab.trends.pending') },
        { icon: CheckCircle2, value: '47', label: t('lab.stats.completedTests'), color: 'bg-green-50 text-green-600', trend: t('lab.trends.completed') },
        { icon: Shield, value: '94%', label: t('lab.stats.passRate'), color: 'bg-blue-50 text-blue-600', trend: t('lab.trends.passRate') },
        { icon: TriangleAlert, value: '2', label: t('lab.stats.failedTests'), color: 'bg-red-50 text-red-600', trend: t('lab.trends.failed') },
      ]} />

      {/* Alerts */}
      <div>
        <h2 className="text-lg font-bold font-heading text-charcoal-800 mb-3">{t('lab.alerts.title')}</h2>
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-200 border-l-4 border-l-red-400 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-charcoal-800 text-sm">{t('lab.alerts.nmrFail.title')}</p>
                <p className="text-sm text-charcoal-500">{t('lab.alerts.nmrFail.desc')}</p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-400 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <TriangleAlert className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-charcoal-800 text-sm">{t('lab.alerts.calibration.title')}</p>
                <p className="text-sm text-charcoal-500">{t('lab.alerts.calibration.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-charcoal-200">
        <div className="flex overflow-x-auto gap-0 -mb-px scrollbar-hide">
          {labTabs.map((tab) => (
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

      {activeTab === 'queue' && (
        <div className="space-y-4">
          {pendingBatches.map((batch) => (
            <div key={batch.id} className="bg-white rounded-xl border border-charcoal-100 p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-mono font-bold text-charcoal-800">{batch.id}</p>
                  <p className="text-sm text-charcoal-500">{batch.honey} - {batch.weight}</p>
                  <p className="text-xs text-charcoal-400">{t('lab.batchInfo.beekeeper')} {batch.beekeeper} - {batch.village} - Submitted {batch.submitted}</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600">{t('lab.batchInfo.pending')}</span>
              </div>

              {activeForm === batch.id ? (
                <div className="mt-4 space-y-3 border-t border-charcoal-100 pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">{t('lab.form.moisture')}</label>
                      <input type="number" value={form.moisturePct} onChange={(e) => setForm({ ...form, moisturePct: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500" placeholder="17.2" step="0.1" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">{t('lab.form.purity')}</label>
                      <input type="number" value={form.purityPct} onChange={(e) => setForm({ ...form, purityPct: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500" placeholder="98.5" step="0.1" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">{t('lab.form.hmf')}</label>
                      <input type="number" value={form.hmf} onChange={(e) => setForm({ ...form, hmf: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500" placeholder="8.3" step="0.1" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal-500 mb-1 block">{t('lab.form.nmr')}</label>
                      <div className="flex gap-2">
                        {['Pass', 'Fail'].map((r) => (
                          <button key={r} onClick={() => setForm({ ...form, nmrResult: r })} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${form.nmrResult === r ? r === 'Pass' ? 'border-green-500 bg-green-50 text-green-600' : 'border-red-500 bg-red-50 text-red-600' : 'border-charcoal-200 text-charcoal-400'}`}>
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal-500 mb-1 block">{t('lab.form.remarks')}</label>
                    <input type="text" value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-honey-500" placeholder="Any observations..." />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setActiveForm(null)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-charcoal-200 text-charcoal-600 hover:bg-charcoal-50 transition-colors">{t('lab.form.cancel')}</button>
                    <button onClick={() => handleSubmit(batch.id)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-honey-500 text-white hover:bg-honey-600 transition-colors">
                      {t('lab.form.attach')}
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setActiveForm(batch.id)} className="text-sm font-semibold text-honey-600 hover:text-honey-700">{t('lab.form.enterResults')}</button>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'completed' && (
        <div className="bg-white rounded-xl border border-charcoal-100 p-5">
          <h3 className="font-bold font-heading text-charcoal-800 mb-4">{t('lab.completedTests')}</h3>
          <div className="space-y-3">
            {completedTests.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-charcoal-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {t.result === 'Passed' ? (
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-danger flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-mono text-sm font-semibold text-charcoal-800">{t.id} - {t.honey}</p>
                    <p className="text-xs text-charcoal-500">Moisture {t.moisture} - Purity {t.purity} - NMR {t.nmr}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    t.result === 'Passed' ? 'bg-green-50 text-success' : 'bg-red-50 text-danger'
                  }`}>{t.result}</span>
                  <p className="text-[10px] text-charcoal-400 mt-1">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-charcoal-100 p-5">
            <h3 className="font-bold font-heading text-charcoal-800 mb-4">{t('lab.testVolume')}</h3>
            <div className="space-y-3">
              {[
                { label: 'Sep 2026', tested: 47, passed: 44, failed: 3 },
                { label: 'Aug 2026', tested: 52, passed: 48, failed: 4 },
                { label: 'Jul 2026', tested: 38, passed: 36, failed: 2 },
              ].map((m, i) => (
                <div key={i} className="p-3 bg-charcoal-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-charcoal-800">{m.label}</span>
                    <span className="text-xs text-charcoal-500">{m.tested} {t('lab.tested')}</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="text-success font-bold">{m.passed} passed</span>
                    <span className="text-danger font-bold">{m.failed} failed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-charcoal-100 p-5">
            <h3 className="font-bold font-heading text-charcoal-800 mb-4">{t('lab.commonIssues')}</h3>
            <div className="space-y-4">
              {[
                { label: t('lab.highMoisture'), value: '3 cases', pct: 50 },
                { label: t('lab.lowPurity'), value: '2 cases', pct: 33 },
                { label: t('lab.hmfAbove'), value: '1 case', pct: 17 },
              ].map((m, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-charcoal-700">{m.label}</span>
                    <span className="text-xs font-bold text-charcoal-600">{m.value}</span>
                  </div>
                  <div className="w-full bg-charcoal-100 rounded-full h-2">
                    <div className="bg-honey-500 rounded-full h-2" style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'standards' && (
        <div className="bg-white rounded-xl border border-charcoal-100 p-5">
          <h3 className="font-bold font-heading text-charcoal-800 mb-4">{t('lab.fssaiStandards')}</h3>
          <div className="space-y-3">
            {[
              { param: t('lab.fssaiMetrics.moisture'), limit: '≤ 20%', method: 'Refractometer', status: 'Mandatory' },
              { param: t('lab.fssaiMetrics.purity'), limit: '≤ 5%', method: 'HPLC', status: 'Mandatory' },
              { param: t('lab.fssaiMetrics.hmf'), limit: '≤ 40 mg/kg', method: 'Spectrophotometer', status: 'Mandatory' },
              { param: t('lab.fssaiMetrics.nmr'), limit: 'Pass/Fail', method: 'NMR Spectroscopy', status: 'Mandatory' },
              { param: t('lab.fssaiMetrics.diastase'), limit: '≥ 8 DN', method: 'Schade Method', status: 'Mandatory' },
              { param: t('lab.fssaiMetrics.pollen'), limit: '≥ 50,000/g', method: 'Microscopy', status: 'Recommended' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-charcoal-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-charcoal-800">{s.param}</p>
                  <p className="text-xs text-charcoal-500">{t('lab.method')} {s.method}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-charcoal-800">{s.limit}</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{s.status === 'Mandatory' ? t('lab.mandatory') : t('lab.recommended')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
