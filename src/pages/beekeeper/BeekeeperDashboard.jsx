import { useEffect, useState } from 'react'
import api from '../../api'
import { useAuthStore } from '../../store/authStore'
import HiveCard from '../../components/domain/HiveCard'
import AlertItem from '../../components/domain/AlertItem'
import StatCard from '../../components/ui/StatCard'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { Link } from 'react-router-dom'
import { Boxes, Heart, Droplets, FileText, IndianRupee, Plus, AlertTriangle } from 'lucide-react'

export default function BeekeeperDashboard() {
  const { profile } = useAuthStore()
  const [hives, setHives] = useState([])
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.getHives(), api.getAlerts()]).then(([h, a]) => {
      setHives(h)
      setAlerts(a)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="page-container"><LoadingSpinner className="py-20" /></div>

  const healthyHives = hives.filter((h) => h.status === 'healthy').length
  const totalWeight = hives.reduce((sum, h) => sum + h.weightKg, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-charcoal-800">
            Namaste, {profile?.name?.split(' ')[0]} 🐝
          </h1>
          <p className="text-sm text-charcoal-400">{profile?.cluster || 'Jawhar Cluster'}</p>
        </div>
        <Link to="/beekeeper/harvest/new" className="btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" /> Register Harvest
        </Link>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-honey-500" />
            <h2 className="section-label">Alerts</h2>
          </div>
          <div className="space-y-2">
            {alerts.map((a) => <AlertItem key={a.id} alert={a} />)}
          </div>
        </div>
      )}

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Hives" value={hives.length} icon={Boxes} />
        <StatCard label="Healthy" value={healthyHives} icon={Heart} trend={`${Math.round(healthyHives / hives.length * 100)}% of total`} />
        <StatCard label="Honey This Season" value={`${totalWeight.toFixed(1)} kg`} icon={Droplets} />
        <StatCard label="Batches Minted" value="5" icon={FileText} />
        <StatCard label="Total Earnings" value="₹42,500" icon={IndianRupee} />
      </div>

      {/* Hives Grid */}
      <div>
        <h2 className="section-label mb-4">Your Hives</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hives.map((hive) => <HiveCard key={hive.id} hive={hive} />)}
        </div>
      </div>
    </div>
  )
}
