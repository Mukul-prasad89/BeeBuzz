import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import DashboardBanner from '../../components/ui/DashboardBanner'
import StatGrid from '../../components/ui/StatGrid'
import {
  Users, Boxes, FileText, ScanLine, TriangleAlert,
  AlertTriangle, TrendingUp, BarChart3, Shield, Eye
} from 'lucide-react'

const tabs = [
  { id: 'overview', label: 'Platform Overview', icon: BarChart3 },
  { id: 'beekeepers', label: 'Beekeepers', icon: Users },
  { id: 'batches', label: 'All Batches', icon: FileText },
  { id: 'fraud', label: 'Fraud Detection', icon: Shield },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
]

const recentBeekeepers = [
  { name: 'Ramesh Patil', cluster: 'Jawhar', hives: 12, status: 'Active' },
  { name: 'Suresh Jadhav', cluster: 'Mokhada', hives: 8, status: 'Active' },
  { name: 'Priya Shinde', cluster: 'Vikramgad', hives: 15, status: 'Active' },
  { name: 'Anil More', cluster: 'Palghar', hives: 6, status: 'Inactive' },
]

const allBatches = [
  { id: 'BB-2847', beekeeper: 'Ramesh Patil', honey: 'Wild Forest Honey', weight: '12.5 kg', date: 'Sep 3, 2026', status: 'Verified' },
  { id: 'BB-2831', beekeeper: 'Suresh Jadhav', honey: 'Mustard Honey', weight: '8.3 kg', date: 'Sep 1, 2026', status: 'Verified' },
  { id: 'BB-2819', beekeeper: 'Priya Shinde', honey: 'Litchi Honey', weight: '6.7 kg', date: 'Aug 28, 2026', status: 'Pending' },
  { id: 'BB-2805', beekeeper: 'Anil More', honey: 'Eucalyptus Honey', weight: '4.2 kg', date: 'Aug 25, 2026', status: 'Flagged' },
]

const fraudAlerts = [
  { batch: 'BB-2805', issue: 'Moisture content above threshold (22.1%)', severity: 'High', date: 'Aug 25' },
  { batch: 'BB-2790', issue: 'Duplicate QR scan detected in different regions', severity: 'Critical', date: 'Aug 22' },
]

export default function AdminDashboard() {
  const { profile } = useAuthStore()
  const [activeTab, setActiveTab] = useState('overview')

  const firstName = profile?.name?.split(' ')[0] || 'Admin'
  const registryId = profile?.registryId || 'BB-ADM-001'

  return (
    <div className="space-y-6">
      <DashboardBanner
        name={firstName}
        cluster="KVIC HQ, Mumbai"
        registryId={registryId}
        gradient="from-green-500 via-green-400 to-emerald-300"
        actions={
          <button className="flex items-center gap-2 bg-white text-green-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-green-50 transition-colors shadow-sm border border-green-200">
            <Eye className="h-4 w-4" /> View Reports
          </button>
        }
      />

      <StatGrid stats={[
        { icon: Users, value: '1,247', label: 'Registered Beekeepers', color: 'bg-blue-50 text-blue-600', trend: '+23 this month' },
        { icon: Boxes, value: '4,832', label: 'Active Hives', color: 'bg-green-50 text-green-600', trend: '+180 this quarter' },
        { icon: FileText, value: '12,547', label: 'Batches Minted', color: 'bg-purple-50 text-purple-600', trend: '+342 this month' },
        { icon: ScanLine, value: '89,210', label: 'Consumer Scans', color: 'bg-honey-50 text-honey-600', trend: '+5,200 this week' },
      ]} />

      {/* Alerts */}
      <div>
        <h2 className="text-lg font-bold font-heading text-charcoal-800 mb-3">System Alerts</h2>
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-200 border-l-4 border-l-red-400 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-charcoal-800 text-sm">Suspicious Activity Detected</p>
                <p className="text-sm text-charcoal-500">Batch BB-2790 shows duplicate QR scan from two different regions within 2 hours.</p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-400 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <TriangleAlert className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-charcoal-800 text-sm">Quality Threshold Breach</p>
                <p className="text-sm text-charcoal-500">Batch BB-2805 moisture content (22.1%) exceeds the 18% limit. Lab re-test recommended.</p>
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

      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-charcoal-100 p-5">
            <h3 className="font-bold font-heading text-charcoal-800 mb-4">Cluster Performance</h3>
            <div className="space-y-3">
              {[
                { name: 'Jawhar', beekeepers: 342, hives: 1280, batches: 3200 },
                { name: 'Mokhada', beekeepers: 218, hives: 860, batches: 2100 },
                { name: 'Vikramgad', beekeepers: 189, hives: 720, batches: 1850 },
                { name: 'Palghar', beekeepers: 156, hives: 580, batches: 1400 },
              ].map((c, i) => (
                <div key={i} className="p-3 bg-charcoal-50 rounded-lg">
                  <p className="text-sm font-semibold text-charcoal-800">{c.name} Cluster</p>
                  <div className="flex gap-4 mt-1 text-xs text-charcoal-500">
                    <span>{c.beekeepers} beekeepers</span>
                    <span>{c.hives} hives</span>
                    <span>{c.batches} batches</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-charcoal-100 p-5">
            <h3 className="font-bold font-heading text-charcoal-800 mb-4">Monthly Growth</h3>
            <div className="space-y-4">
              {[
                { label: 'New Beekeepers', value: '+23', target: '+20/month', good: true },
                { label: 'Hive Registrations', value: '+180', target: '+150/month', good: true },
                { label: 'Batches Minted', value: '+342', target: '+300/month', good: true },
                { label: 'Consumer Scans', value: '+5,200', target: '+4,000/week', good: true },
              ].map((m, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-charcoal-700">{m.label}</span>
                    <span className="text-xs font-bold text-success bg-green-50 px-2 py-0.5 rounded-full">{m.value}</span>
                  </div>
                  <p className="text-xs text-charcoal-400">Target: {m.target}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-charcoal-100 p-5">
            <h3 className="font-bold font-heading text-charcoal-800 mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-charcoal-700">Blockchain Uptime</span>
                <span className="text-xl font-extrabold font-heading text-success">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-charcoal-700">Avg Verification Time</span>
                <span className="text-xl font-extrabold font-heading text-charcoal-800">2.3s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-charcoal-700">Active IoT Sensors</span>
                <span className="text-xl font-extrabold font-heading text-charcoal-800">3,841</span>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
                <p className="text-sm font-bold text-green-700">All Systems Operational</p>
                <p className="text-xs text-green-600">No downtime in the last 90 days</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'beekeepers' && (
        <div className="bg-white rounded-xl border border-charcoal-100 p-5">
          <h3 className="font-bold font-heading text-charcoal-800 mb-4">Registered Beekeepers</h3>
          <div className="space-y-3">
            {recentBeekeepers.map((b, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-charcoal-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-honey-500 flex items-center justify-center text-white font-bold text-sm">
                    {b.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal-800">{b.name}</p>
                    <p className="text-xs text-charcoal-500">{b.cluster} - {b.hives} hives</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  b.status === 'Active' ? 'bg-green-50 text-success' : 'bg-charcoal-100 text-charcoal-500'
                }`}>{b.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'batches' && (
        <div className="bg-white rounded-xl border border-charcoal-100 p-5">
          <h3 className="font-bold font-heading text-charcoal-800 mb-4">All Batches</h3>
          <div className="space-y-3">
            {allBatches.map((b, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-charcoal-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-charcoal-800">{b.id} - {b.honey}</p>
                  <p className="text-xs text-charcoal-500">{b.beekeeper} - {b.weight} - {b.date}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  b.status === 'Verified' ? 'bg-green-50 text-success' :
                  b.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                  'bg-red-50 text-danger'
                }`}>{b.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'fraud' && (
        <div className="bg-white rounded-xl border border-charcoal-100 p-5">
          <h3 className="font-bold font-heading text-charcoal-800 mb-4">Fraud Detection Alerts</h3>
          <div className="space-y-3">
            {fraudAlerts.map((f, i) => (
              <div key={i} className={`p-4 rounded-xl border-l-4 ${
                f.severity === 'Critical' ? 'bg-red-50 border-red-400' : 'bg-amber-50 border-amber-400'
              }`}>
                <div className="flex items-start gap-3">
                  <Shield className={`h-5 w-5 mt-0.5 flex-shrink-0 ${f.severity === 'Critical' ? 'text-red-500' : 'text-amber-500'}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-charcoal-800 text-sm">{f.batch}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        f.severity === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                      }`}>{f.severity}</span>
                    </div>
                    <p className="text-sm text-charcoal-500 mt-1">{f.issue}</p>
                    <p className="text-xs text-charcoal-400 mt-1">Detected: {f.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-charcoal-100 p-5">
            <h3 className="font-bold font-heading text-charcoal-800 mb-4">Honey Production Trend</h3>
            <div className="space-y-3">
              {[
                { month: 'Sep 2026', value: '4,200 kg', pct: 85 },
                { month: 'Aug 2026', value: '5,800 kg', pct: 100 },
                { month: 'Jul 2026', value: '3,900 kg', pct: 67 },
                { month: 'Jun 2026', value: '2,100 kg', pct: 36 },
              ].map((m, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-charcoal-700">{m.month}</span>
                    <span className="text-xs font-bold text-charcoal-600">{m.value}</span>
                  </div>
                  <div className="w-full bg-charcoal-100 rounded-full h-2">
                    <div className="bg-honey-500 rounded-full h-2" style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-charcoal-100 p-5">
            <h3 className="font-bold font-heading text-charcoal-800 mb-4">Top Honey Varieties</h3>
            <div className="space-y-3">
              {[
                { name: 'Wild Forest Honey', batches: 3200, pct: 28 },
                { name: 'Mustard Honey', batches: 2800, pct: 24 },
                { name: 'Litchi Honey', batches: 2100, pct: 18 },
                { name: 'Eucalyptus Honey', batches: 1800, pct: 15 },
                { name: 'Multi-floral Honey', batches: 1600, pct: 14 },
              ].map((h, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-charcoal-700">{h.name}</span>
                    <span className="text-xs font-bold text-charcoal-600">{h.batches.toLocaleString()} batches</span>
                  </div>
                  <div className="w-full bg-charcoal-100 rounded-full h-2">
                    <div className="bg-honey-400 rounded-full h-2" style={{ width: `${h.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
