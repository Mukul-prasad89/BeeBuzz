import { useEffect, useState } from 'react'
import api from '../../api'
import StatCard from '../../components/ui/StatCard'
import Card from '../../components/ui/Card'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, Boxes, FileText, ScanLine, AlertTriangle, Check, FlaskConical } from 'lucide-react'
import { timeAgo } from '../../utils/formatters'

const activityIcons = { minted: FileText, verified: Check, tested: FlaskConical }
const activityColors = { minted: 'text-honey-500', verified: 'text-success', tested: 'text-blue-500' }

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [clusters, setClusters] = useState([])
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.getAdminStats(), api.getAdminClusters(), api.getAdminActivity()]).then(([s, c, a]) => {
      setStats(s)
      setClusters(c)
      setActivity(a)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="page-container"><LoadingSpinner className="py-20" /></div>

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold font-heading text-charcoal-800">KVIC Admin Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Beekeepers" value={stats?.beekeepers || 0} icon={Users} />
        <StatCard label="Active Hives" value={stats?.activeHives || 0} icon={Boxes} />
        <StatCard label="Batches Minted" value={stats?.batchesMinted || 0} icon={FileText} />
        <StatCard label="Consumer Scans" value={stats?.consumerScans?.toLocaleString() || 0} icon={ScanLine} />
        <StatCard label="Fraud Alerts" value={stats?.fraudAlerts || 0} icon={AlertTriangle} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Cluster Chart */}
        <Card>
          <h3 className="section-label mb-4">Cluster Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clusters}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D6D3D1" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#78716C' }} />
                <YAxis tick={{ fontSize: 11, fill: '#78716C' }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="beekeepers" fill="#F59E0B" name="Beekeepers" radius={[4, 4, 0, 0]} />
                <Bar dataKey="hives" fill="#D97706" name="Hives" radius={[4, 4, 0, 0]} />
                <Bar dataKey="batches" fill="#B45309" name="Batches" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Activity Feed */}
        <Card>
          <h3 className="section-label mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {activity.map((a, i) => {
              const Icon = activityIcons[a.type] || Check
              return (
                <div key={i} className="flex items-start gap-3">
                  <Icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${activityColors[a.type]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-charcoal-700">{a.detail}</p>
                    <p className="text-xs text-charcoal-400">{timeAgo(a.timestamp)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Cluster Table */}
      <Card>
        <h3 className="section-label mb-4">Cluster Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-charcoal-200">
                <th className="text-left py-2 text-xs font-semibold text-charcoal-500">Cluster</th>
                <th className="text-right py-2 text-xs font-semibold text-charcoal-500">Beekeepers</th>
                <th className="text-right py-2 text-xs font-semibold text-charcoal-500">Hives</th>
                <th className="text-right py-2 text-xs font-semibold text-charcoal-500">Batches</th>
              </tr>
            </thead>
            <tbody>
              {clusters.map((c, i) => (
                <tr key={i} className="border-b border-charcoal-100 last:border-0">
                  <td className="py-3 font-medium text-charcoal-800">{c.name}</td>
                  <td className="py-3 text-right text-charcoal-600">{c.beekeepers}</td>
                  <td className="py-3 text-right text-charcoal-600">{c.hives}</td>
                  <td className="py-3 text-right text-charcoal-600">{c.batches}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
