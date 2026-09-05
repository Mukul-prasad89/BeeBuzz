import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../api'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'
import Button from '../../components/ui/Button'
import { User, Shield, FlaskConical, Factory, Eye, EyeOff } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

export default function SignupPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { addToast } = useToastStore()
  const { t } = useLanguage()

  const roles = [
    { id: 'beekeeper', label: t('auth.roles.beekeeper'), icon: User, desc: t('auth.roles.beekeeperDesc') },
    { id: 'manufacturer', label: t('auth.roles.manufacturer'), icon: Factory, desc: t('auth.roles.manufacturerDesc') },
    { id: 'admin', label: t('auth.roles.admin'), icon: Shield, desc: t('auth.roles.adminDesc') },
    { id: 'lab', label: t('auth.roles.laboratory'), icon: FlaskConical, desc: t('auth.roles.labDesc') },
  ]

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'beekeeper' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.password) return
    setLoading(true)
    try {
      const res = await api.signup(form)
      login(res.token, res.profile, form.role)
      addToast(`Welcome to BeeBuzz, ${form.name}!`)
      navigate(form.role === 'beekeeper' ? '/beekeeper' : form.role === 'manufacturer' ? '/manufacturer' : form.role === 'admin' ? '/admin' : '/lab')
    } catch {
      addToast('Signup failed', 'error')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-honey-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold font-heading text-charcoal-800">Bee<span className="text-honey-500">Buzz</span></h1>
          <p className="text-sm text-charcoal-500 mt-3">{t('auth.signup.title')}</p>
        </div>

        <div className="card">
          <form onSubmit={handleSignup}>
            <h2 className="text-lg font-bold text-charcoal-800 font-heading mb-4">Sign Up</h2>

            <div className="mb-4">
              <label className="section-label mb-1 block">{t('auth.signup.fullName')}</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={t('auth.signup.namePlaceholder')}
                className="input"
                autoFocus
                required
              />
            </div>

            <div className="mb-4">
              <label className="section-label mb-1 block">{t('auth.signup.email')}</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={t('auth.signup.emailPlaceholder')}
                className="input"
                required
              />
            </div>

            <div className="mb-4">
              <label className="section-label mb-1 block">{t('auth.signup.phone')}</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder={t('auth.signup.phonePlaceholder')}
                className="input font-mono"
                maxLength={10}
                required
              />
            </div>

            <div className="mb-4">
              <label className="section-label mb-1 block">{t('auth.signup.password')}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder={t('auth.signup.passwordPlaceholder')}
                  className="input pr-10"
                  minLength={6}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="section-label mb-2 block">{t('auth.signup.selectRole')}</label>
              <div className="space-y-2">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setForm({ ...form, role: r.id })}
                    className={`w-full flex items-center gap-3 p-3 rounded-card border-2 transition-all text-left ${
                      form.role === r.id ? 'border-honey-500 bg-honey-50' : 'border-charcoal-200 hover:border-charcoal-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      form.role === r.id ? 'bg-honey-500 text-white' : 'bg-charcoal-100 text-charcoal-500'
                    }`}>
                      <r.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-charcoal-800">{r.label}</p>
                      <p className="text-xs text-charcoal-400">{r.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading || !form.name || !form.email || form.phone.length < 10 || form.password.length < 6}>
              {loading ? t('auth.signup.creatingAccount') : t('auth.signup.createAccount')}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-charcoal-500 mt-6">
          {t('auth.signup.hasAccount')} <Link to="/login" className="text-honey-600 hover:text-honey-700 font-semibold">{t('nav.signIn')}</Link>
        </p>
      </div>
    </div>
  )
}
