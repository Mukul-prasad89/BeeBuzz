import { useEffect, useState } from 'react'
import api from '../../api'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import Badge from '../../components/ui/Badge'
import { truncateHash, formatDate } from '../../utils/formatters'

const statusBadge = {
  'On-chain ✓': 'success',
  'Quality Verified': 'success',
  'Pending test': 'warning',
  'Tampered': 'danger',
}

export default function AdminBatchesPage() {
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    api.getAdminBatches(search, filter).then((b) => { setBatches(b); setLoading(false) })
  }, [search, filter])

  if (loading) return <div className="page-container"><LoadingSpinner className="py-20" /></div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-heading text-charcoal-800">All Batches</h1>

      {/* Filters */}
      <div className="flex gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search batch ID or honey type..."
          className="input flex-1"
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input w-48">
          <option value="">All Status</option>
          <option value="On-chain ✓">On-chain</option>
          <option value="Quality Verified">Quality Verified</option>
          <option value="Pending test">Pending Test</option>
        </select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-charcoal-200">
              <th className="text-left py-3 text-xs font-semibold text-charcoal-500">Batch ID</th>
              <th className="text-left py-3 text-xs font-semibold text-charcoal-500">Honey Type</th>
              <th className="text-left py-3 text-xs font-semibold text-charcoal-500">Date</th>
              <th className="text-left py-3 text-xs font-semibold text-charcoal-500">Tx Hash</th>
              <th className="text-center py-3 text-xs font-semibold text-charcoal-500">Status</th>
              <th className="text-right py-3 text-xs font-semibold text-charcoal-500">Scans</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((b) => (
              <tr key={b.batchId} className="border-b border-charcoal-100 last:border-0">
                <td className="py-3 font-mono font-semibold text-charcoal-800">{b.batchId}</td>
                <td className="py-3 text-charcoal-600">{b.honeyType}</td>
                <td className="py-3 text-charcoal-600">{formatDate(b.date)}</td>
                <td className="py-3 font-mono text-xs text-charcoal-500">{truncateHash(b.txHash || 'N/A')}</td>
                <td className="py-3 text-center">
                  <Badge variant={statusBadge[b.status] || 'neutral'}>{b.status}</Badge>
                </td>
                <td className="py-3 text-right text-charcoal-600">{b.scanCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
