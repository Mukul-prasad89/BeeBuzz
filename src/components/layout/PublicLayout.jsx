import { Outlet, Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import Toast from '../ui/Toast'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/scan', label: 'Verify' },
  { to: '/contact', label: 'Contact' },
]

export default function PublicLayout() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-honey-50 flex flex-col">
      {/* Navbar */}
      <header className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="font-brand font-bold text-3xl tracking-tight text-charcoal-800">
            Bee<span className="text-honey-500">Buzz</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 rounded-full border border-charcoal-200 bg-white/50 backdrop-blur-sm">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-honey-600 bg-honey-50'
                    : 'text-charcoal-500 hover:text-charcoal-800 hover:bg-charcoal-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="btn-secondary btn-sm">Login</Link>
            <Link to="/signup" className="btn-primary btn-sm">Sign Up</Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-charcoal-600 hover:bg-charcoal-50 rounded-lg">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-charcoal-100 bg-white px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-honey-600 bg-honey-50'
                    : 'text-charcoal-500 hover:text-charcoal-800 hover:bg-charcoal-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2 border-t border-charcoal-100">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary btn-sm flex-1 text-center">Login</Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} className="btn-primary btn-sm flex-1 text-center">Sign Up</Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-charcoal-800 text-charcoal-300">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <h3 className="font-heading font-bold text-white text-lg mb-3">Bee<span className="text-honey-400">Buzz</span></h3>
              <p className="text-sm text-charcoal-400 leading-relaxed">Blockchain-powered honey traceability and smart beekeeping for rural India.</p>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-semibold text-charcoal-200 uppercase tracking-wider mb-3">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-sm text-charcoal-400 hover:text-honey-400 transition-colors">Home</Link>
                <Link to="/about" className="block text-sm text-charcoal-400 hover:text-honey-400 transition-colors">About</Link>
                <Link to="/scan" className="block text-sm text-charcoal-400 hover:text-honey-400 transition-colors">Verify Honey</Link>
                <Link to="/contact" className="block text-sm text-charcoal-400 hover:text-honey-400 transition-colors">Contact</Link>
              </div>
            </div>
            {/* For */}
            <div>
              <h4 className="text-xs font-semibold text-charcoal-200 uppercase tracking-wider mb-3">For</h4>
              <div className="space-y-2">
                <Link to="/login" className="block text-sm text-charcoal-400 hover:text-honey-400 transition-colors">Beekeeper Login</Link>
                <Link to="/login" className="block text-sm text-charcoal-400 hover:text-honey-400 transition-colors">KVIC Admin</Link>
                <Link to="/login" className="block text-sm text-charcoal-400 hover:text-honey-400 transition-colors">Laboratory</Link>
              </div>
            </div>
            {/* Contact */}
            <div>
              <h4 className="text-xs font-semibold text-charcoal-200 uppercase tracking-wider mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-charcoal-400">
                <p>KVIC Honey Mission</p>
                <p>Gramodaya, Mumbai 400004</p>
                <p>support@beebuzz.in</p>
                <p>+91 22 2657 4455</p>
              </div>
            </div>
          </div>
          <div className="border-t border-charcoal-700 mt-8 pt-6 text-center">
            <p className="text-xs text-charcoal-500">Powered by BeeBuzz — KVIC Honey Mission. Blockchain-based Honey Traceability & Smart Beekeeping.</p>
          </div>
        </div>
      </footer>
      <Toast />
    </div>
  )
}
