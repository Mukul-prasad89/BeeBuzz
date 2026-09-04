import { NavLink } from 'react-router-dom'
import { Home, Box, List, Plus, Hexagon, FlaskConical, Users, FileText, LayoutDashboard } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const navByRole = {
  beekeeper: [
    { to: '/beekeeper', icon: Home, label: 'Home' },
    { to: '/beekeeper/batches', icon: List, label: 'Batches' },
    { to: '/beekeeper/harvest/new', icon: Plus, label: 'New Harvest' },
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
    <aside className="hidden lg:flex flex-col w-64 bg-charcoal-800 text-white min-h-screen">
      <div className="p-6 border-b border-charcoal-700">
        <span className="font-brand text-2xl text-white">BeeBuzz</span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/beekeeper' || item.to === '/admin' || item.to === '/lab'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-honey-500/20 text-honey-400' : 'text-charcoal-300 hover:bg-charcoal-700 hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-charcoal-700">
        <p className="text-[10px] text-charcoal-500 text-center">BeeBuzz v1.0</p>
      </div>
    </aside>
  )
}
