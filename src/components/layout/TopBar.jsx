import { LogOut, Hexagon } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function TopBar() {
  const { profile, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white border-b border-charcoal-200 sticky top-0 z-40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <span className="font-brand text-2xl text-charcoal-800">BeeBuzz</span>
        <div className="flex items-center gap-4">
          {profile && (
            <>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-charcoal-800">{profile.name}</p>
                <p className="text-[10px] text-charcoal-400 uppercase tracking-wide">{profile.role}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-honey-500 flex items-center justify-center text-white font-bold text-sm">
                {profile.name?.charAt(0)}
              </div>
            </>
          )}
          <button onClick={handleLogout} className="p-2 text-charcoal-400 hover:text-charcoal-600 hover:bg-charcoal-50 rounded-full transition-colors" title="Logout">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
