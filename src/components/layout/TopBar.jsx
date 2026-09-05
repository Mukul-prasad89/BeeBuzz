import { LogOut, Bell, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

export default function TopBar() {
  const { profile, logout } = useAuthStore()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className={`sticky top-0 z-40 h-16 border-b transition-all duration-200 ${
      scrolled
        ? 'bg-white/80 backdrop-blur-xl border-honey-200/50 shadow-sm'
        : 'bg-white/60 backdrop-blur-md border-charcoal-100'
    }`}>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-3 ml-auto">
          {/* Notification Bell */}
          <button className="relative p-2.5 text-charcoal-400 hover:text-charcoal-600 hover:bg-charcoal-50 rounded-xl transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full" />
          </button>

          {/* User */}
          {profile && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2.5 hover:bg-charcoal-50 rounded-xl px-3 py-2 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-honey-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {profile.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-charcoal-800 leading-tight">{profile.name}</p>
                  <p className="text-[10px] text-charcoal-400 capitalize">{profile.role}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-charcoal-400 hidden sm:block" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white/90 backdrop-blur-xl rounded-xl border border-charcoal-200/50 shadow-lg py-1 z-50">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-charcoal-600 hover:bg-charcoal-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    {t('topbar.logout')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
