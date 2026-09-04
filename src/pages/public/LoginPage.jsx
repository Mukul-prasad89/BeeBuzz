import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../api'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'
import Button from '../../components/ui/Button'
import { User, Shield, FlaskConical, Eye, EyeOff } from 'lucide-react'

const roles = [
  { id: 'beekeeper', label: 'Beekeeper', icon: User, desc: 'Monitor hives & register harvests' },
  { id: 'admin', label: 'KVIC Admin', icon: Shield, desc: 'Manage clusters & approve beekeepers' },
  { id: 'lab', label: 'Laboratory', icon: FlaskConical, desc: 'Test batches & submit results' },
]

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { addToast } = useToastStore()

  const [step, setStep] = useState('role') // role | credentials
  const [selectedRole, setSelectedRole] = useState('beekeeper')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)
    try {
      const res = await api.login(email, password, selectedRole)
      login(res.token, res.profile, selectedRole)
      addToast(`Welcome, ${res.profile.name}!`)
      navigate(selectedRole === 'beekeeper' ? '/beekeeper' : selectedRole === 'admin' ? '/admin' : '/lab')
    } catch {
      addToast('Invalid email or password', 'error')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-honey-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold font-heading text-charcoal-800">Bee<span className="text-honey-500">Buzz</span></h1>
          <p className="text-sm text-charcoal-500 mt-3">Sign in to your account</p>
        </div>

        <div className="card">
          {step === 'role' && (
            <>
              <h2 className="text-lg font-bold text-charcoal-800 font-heading mb-4">Select your role</h2>
              <div className="space-y-3">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => { setSelectedRole(r.id); setStep('credentials') }}
                    className={`w-full flex items-center gap-4 p-4 rounded-card border-2 transition-all text-left ${
                      selectedRole === r.id ? 'border-honey-500 bg-honey-50' : 'border-charcoal-200 hover:border-charcoal-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      selectedRole === r.id ? 'bg-honey-500 text-white' : 'bg-charcoal-100 text-charcoal-500'
                    }`}>
                      <r.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal-800">{r.label}</p>
                      <p className="text-xs text-charcoal-400">{r.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 'credentials' && (
            <form onSubmit={handleLogin}>
              <button type="button" onClick={() => setStep('role')} className="text-sm text-honey-600 hover:text-honey-700 mb-4">← Back</button>
              <h2 className="text-lg font-bold text-charcoal-800 font-heading mb-1">Welcome back</h2>
              <p className="text-sm text-charcoal-400 mb-4">Sign in as <span className="font-semibold text-charcoal-600">{roles.find(r => r.id === selectedRole)?.label}</span></p>

              <div className="mb-4">
                <label className="section-label mb-1 block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh@example.com"
                  className="input"
                  autoFocus
                  required
                />
              </div>

              <div className="mb-6">
                <label className="section-label mb-1 block">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input pr-10"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading || !email || !password}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-charcoal-500 mt-6">
          Don't have an account? <Link to="/signup" className="text-honey-600 hover:text-honey-700 font-semibold">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
