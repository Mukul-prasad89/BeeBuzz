import { useEffect, useState } from 'react'
import api from '../../api'
import { useToastStore } from '../../store/toastStore'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

export default function AdminBeekeepersPage() {
  const { addToast } = useToastStore()
  const [beekeepers, setBeekeepers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getAdminBeekeepers().then((b) => { setBeekeepers(b); setLoading(false) })
  }, [])

  const handleApprove = async (id) => {
    await api.approveBeekeeper(id)
    setBeekeepers((prev) => prev.map((b) => b.id === id ? { ...b, status: 'Verified' } : b))
    addToast('Beekeeper approved!')
  }

  if (loading) return <div className="page-container"><LoadingSpinner className="py-20" /></div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-heading text-charcoal-800">Beekeepers</h1>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-charcoal-200">
              <th className="text-left py-3 text-xs font-semibold text-charcoal-500">Name</th>
              <th className="text-left py-3 text-xs font-semibold text-charcoal-500">Village</th>
              <th className="text-left py-3 text-xs font-semibold text-charcoal-500">Phone</th>
              <th className="text-right py-3 text-xs font-semibold text-charcoal-500">Hives</th>
              <th className="text-right py-3 text-xs font-semibold text-charcoal-500">Batches</th>
              <th className="text-center py-3 text-xs font-semibold text-charcoal-500">Status</th>
              <th className="text-center py-3 text-xs font-semibold text-charcoal-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {beekeepers.map((bk) => (
              <tr key={bk.id} className="border-b border-charcoal-100 last:border-0">
                <td className="py-3 font-medium text-charcoal-800">{bk.name}</td>
                <td className="py-3 text-charcoal-600">{bk.village}</td>
                <td className="py-3 text-charcoal-600 font-mono">{bk.phone}</td>
                <td className="py-3 text-right text-charcoal-600">{bk.hives}</td>
                <td className="py-3 text-right text-charcoal-600">{bk.batches}</td>
                <td className="py-3 text-center">
                  <Badge variant={bk.status === 'Verified' ? 'success' : 'warning'}>{bk.status}</Badge>
                </td>
                <td className="py-3 text-center">
                  {bk.status === 'Pending' && (
                    <Button size="sm" onClick={() => handleApprove(bk.id)}>Approve</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
