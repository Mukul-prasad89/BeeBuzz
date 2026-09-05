import { NavLink } from 'react-router-dom'
import { Home, Box, List, Plus, FlaskConical, Users, FileText, LayoutDashboard, Factory } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const navByRole = {
  beekeeper: [
    { to: '/beekeeper', icon: Home, label: 'Home' },
    { to: '/beekeeper/batches', icon: List, label: 'Batches' },
    { to: '/beekeeper/harvest/new', icon: Plus, label: 'New Harvest' },
  ],
  manufacturer: [
    { to: '/manufacturer', icon: Home, label: 'Dashboard' },
    { to: '/manufacturer/incoming', icon: Box, label: 'Incoming Stock' },
    { to: '/manufacturer/process', icon: Factory, label: 'Processing' },
    { to: '/manufacturer/qr', icon: Plus, label: 'Generate QR' },
  ],
  admin: [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/beekeepers', icon: Users, label: 'Beekeepers' },
    { to: '/admin/batches', icon: FileText, label: 'Batches' },
  ],
  lab: [
    { to: '/lab', icon: FlaskConical, label: 'Lab' },
  ],
}

export default function Sidebar() {
  const { role } = useAuthStore()
  const items = navByRole[role] || []

  return (
    <aside className="hidden lg:flex flex-col w-60 bg-white/70 backdrop-blur-xl border-r border-charcoal-200 shadow-[2px_0_12px_rgba(245,158,11,0.06)]">
      <div className="px-6 h-16 flex items-center border-b border-honey-200/50 flex-shrink-0">
        <span className="font-brand text-2xl text-charcoal-800">Bee<span className="text-honey-500">Buzz</span></span>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/beekeeper' || item.to === '/admin' || item.to === '/lab' || item.to === '/manufacturer'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-honey-500/15 text-honey-700 shadow-sm border border-honey-300/50'
                  : 'text-charcoal-500 hover:bg-white/80 hover:text-charcoal-800 hover:border hover:border-charcoal-200/50'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
