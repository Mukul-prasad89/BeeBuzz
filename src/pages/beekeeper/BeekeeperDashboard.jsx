import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import DashboardBanner from '../../components/ui/DashboardBanner'
import StatGrid from '../../components/ui/StatGrid'
import {
  Package, Star, IndianRupee, TriangleAlert,
  Thermometer, Droplets, AlertTriangle, Plus,
  FileCheck, Clock, Leaf
} from 'lucide-react'

const tabs = [
  { id: 'overview', label: 'Harvest Overview', icon: Package },
  { id: 'events', label: 'Harvest Events', icon: Clock },
  { id: 'batches', label: 'Batch Minting', icon: FileCheck },
  { id: 'earnings', label: 'Earnings History', icon: IndianRupee },
  { id: 'reputation', label: 'Reputation Score', icon: Star },
  { id: 'sustainability', label: 'Sustainability', icon: Leaf },
]

const todayHarvests = [
  { name: 'Wild Forest Honey', weight: '3.2 kg', grade: 'A+', time: '09:15' },
  { name: 'Mustard Honey', weight: '5.8 kg', grade: 'A', time: '07:45' },
  { name: 'Litchi Honey', weight: '2.1 kg', grade: 'A+', time: '16:30' },
]

const qualityMetrics = [
  { label: 'Moisture Content', target: '<18%', value: '15.4%', status: 'good' },
  { label: 'Purity Score', target: '>95%', value: '97.2%', status: 'good' },
  { label: 'Color Grade', target: 'Light Amber', value: 'Light Amber', status: 'good' },
  { label: 'GPS Accuracy', target: '<5m', value: '3.1m', status: 'good' },
]

export default function BeekeeperDashboard() {
  const { profile } = useAuthStore()
  const [activeTab, setActiveTab] = useState('overview')

  const firstName = profile?.name?.split(' ')[0] || 'Beekeeper'
  const cluster = profile?.cluster || 'Jawhar Cluster, Maharashtra'
  const registryId = profile?.registryId || 'BB-BK-1042'

  return (
    <div className="space-y-6">
      <DashboardBanner
        name={firstName}
        cluster={cluster}
        registryId={registryId}
        actions={
          <>
            <Link to="/beekeeper/harvest/new" className="flex items-center gap-2 bg-white text-honey-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-honey-50 transition-colors shadow-sm border border-honey-200">
              <Plus className="h-4 w-4" /> New Harvest
            </Link>
            <button className="flex items-center gap-2 bg-danger/90 hover:bg-danger text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm">
              <TriangleAlert className="h-4 w-4" /> Report Issue
            </button>
          </>
        }
      />

      <StatGrid stats={[
        { icon: Package, value: '3', label: 'Harvests Today', color: 'bg-blue-50 text-blue-600', trend: '+2 from yesterday' },
        { icon: Star, value: '94%', label: 'Hive Health Score', color: 'bg-green-50 text-green-600', trend: '+2% this week' },
        { icon: IndianRupee, value: '₹18,500', label: 'Monthly Earnings', color: 'bg-purple-50 text-purple-600', trend: '+12% vs last month' },
        { icon: TriangleAlert, value: '2', label: 'Active Alerts', color: 'bg-amber-50 text-amber-600', trend: 'Requires attention' },
      ]} />

      {/* Active Alerts */}
      <div>
        <h2 className="text-lg font-bold font-heading text-charcoal-800 mb-3">Active Alerts</h2>
        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-400 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-charcoal-800 text-sm">Low Humidity Warning</p>
                <p className="text-sm text-charcoal-500">Humidity below 40% in Hive-03. Consider misting the entrance.</p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-400 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <TriangleAlert className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-charcoal-800 text-sm">Queen Bee Maturity</p>
                <p className="text-sm text-charcoal-500">Queen in Hive-05 is nearing end of productive cycle. Schedule replacement.</p>
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

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-charcoal-100 p-5">
            <h3 className="font-bold font-heading text-charcoal-800 mb-4">Today&apos;s Harvests</h3>
            <div className="space-y-3">
              {todayHarvests.map((h, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-honey-50 rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-charcoal-800">{h.name}</p>
                    <p className="text-xs text-charcoal-500">{h.weight} - Grade {h.grade}</p>
                  </div>
                  <span className="text-xs text-charcoal-400">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-charcoal-100 p-5">
            <h3 className="font-bold font-heading text-charcoal-800 mb-4">Hive Quality Metrics</h3>
            <div className="space-y-4">
              {qualityMetrics.map((m, i) => (
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
            <h3 className="font-bold font-heading text-charcoal-800 mb-4">Weather & Environment</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                    <Thermometer className="h-5 w-5 text-red-500" />
                  </div>
                  <span className="text-sm font-medium text-charcoal-700">Temperature</span>
                </div>
                <span className="text-xl font-extrabold font-heading text-charcoal-800">32°C</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Droplets className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium text-charcoal-700">Humidity</span>
                </div>
                <span className="text-xl font-extrabold font-heading text-charcoal-800">58%</span>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
                <p className="text-sm font-bold text-green-700">Optimal Foraging Conditions</p>
                <p className="text-xs text-green-600">Good weather for bee activity today</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="bg-white rounded-xl border border-charcoal-100 p-5">
          <h3 className="font-bold font-heading text-charcoal-800 mb-4">Recent Harvest Events</h3>
          <div className="space-y-3">
            {[
              { time: '09:15 AM', event: 'Harvest completed - Hive-01', detail: '3.2 kg Wild Forest Honey collected', type: 'success' },
              { time: '07:45 AM', event: 'Harvest completed - Hive-02', detail: '5.8 kg Mustard Honey collected', type: 'success' },
              { time: '06:30 AM', event: 'Hive inspection - Hive-03', detail: 'Low humidity alert triggered', type: 'warning' },
              { time: 'Yesterday', event: 'Batch BB-2847 minted on-chain', detail: '12.5 kg total across 3 hives', type: 'info' },
            ].map((e, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-charcoal-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  e.type === 'success' ? 'bg-success' : e.type === 'warning' ? 'bg-warning' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-charcoal-800">{e.event}</p>
                    <span className="text-xs text-charcoal-400">{e.time}</span>
                  </div>
                  <p className="text-xs text-charcoal-500 mt-0.5">{e.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'batches' && (
        <div className="bg-white rounded-xl border border-charcoal-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold font-heading text-charcoal-800">Recent Minted Batches</h3>
            <Link to="/beekeeper/harvest/new" className="text-sm font-semibold text-honey-600 hover:text-honey-700 flex items-center gap-1">
              <Plus className="h-3.5 w-3.5" /> New Batch
            </Link>
          </div>
          <div className="space-y-3">
            {[
              { id: 'BB-2847', honey: 'Wild Forest Honey', weight: '12.5 kg', date: 'Sep 3, 2026', status: 'Verified' },
              { id: 'BB-2831', honey: 'Mustard Honey', weight: '8.3 kg', date: 'Sep 1, 2026', status: 'Verified' },
              { id: 'BB-2819', honey: 'Litchi Honey', weight: '6.7 kg', date: 'Aug 28, 2026', status: 'Pending' },
            ].map((b, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-charcoal-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-charcoal-800">{b.id} - {b.honey}</p>
                  <p className="text-xs text-charcoal-500">{b.weight} - {b.date}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  b.status === 'Verified' ? 'bg-green-50 text-success' : 'bg-amber-50 text-amber-600'
                }`}>{b.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'earnings' && (
        <div className="bg-white rounded-xl border border-charcoal-100 p-5">
          <h3 className="font-bold font-heading text-charcoal-800 mb-4">Earnings History</h3>
          <div className="space-y-3">
            {[
              { month: 'September 2026', earned: '₹18,500', batches: 3, avg: '₹6,167/batch' },
              { month: 'August 2026', earned: '₹24,200', batches: 4, avg: '₹6,050/batch' },
              { month: 'July 2026', earned: '₹15,800', batches: 2, avg: '₹7,900/batch' },
            ].map((e, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-charcoal-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-charcoal-800">{e.month}</p>
                  <p className="text-xs text-charcoal-500">{e.batches} batches - avg {e.avg}</p>
                </div>
                <span className="text-lg font-extrabold font-heading text-success">{e.earned}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reputation' && (
        <div className="bg-white rounded-xl border border-charcoal-100 p-5">
          <h3 className="font-bold font-heading text-charcoal-800 mb-4">Reputation Score</h3>
          <div className="text-center py-8">
            <div className="w-24 h-24 rounded-full bg-honey-50 border-4 border-honey-400 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-extrabold font-heading text-honey-600">87</span>
            </div>
            <p className="text-lg font-bold text-charcoal-800">Excellent</p>
            <p className="text-sm text-charcoal-500 mt-1">Top 15% of beekeepers in your cluster</p>
            <div className="grid grid-cols-3 gap-4 mt-6 max-w-md mx-auto">
              <div><p className="text-lg font-bold text-charcoal-800">96%</p><p className="text-xs text-charcoal-500">On-time Delivery</p></div>
              <div><p className="text-lg font-bold text-charcoal-800">94%</p><p className="text-xs text-charcoal-500">Quality Score</p></div>
              <div><p className="text-lg font-bold text-charcoal-800">82%</p><p className="text-xs text-charcoal-500">Consumer Rating</p></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sustainability' && (
        <div className="bg-white rounded-xl border border-charcoal-100 p-5">
          <h3 className="font-bold font-heading text-charcoal-800 mb-4">Sustainability Metrics</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Colony Survival Rate', value: '92%', target: '>85%' },
              { label: 'Floral Diversity Score', value: '78%', target: '>70%' },
              { label: 'Chemical-Free Duration', value: '180 days', target: '>90 days' },
              { label: 'Hive Relocation Frequency', value: '2x/year', target: '<4x/year' },
            ].map((s, i) => (
              <div key={i} className="p-3 bg-charcoal-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-charcoal-700">{s.label}</span>
                  <span className="text-xs font-bold text-success bg-green-50 px-2 py-0.5 rounded-full">{s.value}</span>
                </div>
                <p className="text-xs text-charcoal-400 mt-1">Target: {s.target}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
