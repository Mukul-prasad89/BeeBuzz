import { Link } from 'react-router-dom'
import { ScanLine, ShieldCheck, Link2, ArrowRight, QrCode, Boxes, Users } from 'lucide-react'

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-honey-50" style={{ minHeight: 'calc(100vh - 4rem)' }}>
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - 4rem)' }}>
          {/* Tagline badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey-500/10 border border-honey-500/20 text-honey-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-honey-500 animate-pulse" />
            Blockchain-Powered Honey Traceability
          </div>

          {/* Massive heading */}
          <h1 className="font-extrabold text-charcoal-800 leading-[0.85] tracking-tight text-center">
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl">FROM HIVE</span>
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-honey-500">TO HOME</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-base sm:text-lg text-charcoal-500 max-w-xl mx-auto leading-relaxed">
            Scan a QR code to trace the complete journey of your honey — from the <span className="text-charcoal-800 font-semibold">apiary</span> to your <span className="text-charcoal-800 font-semibold">table</span>. Tamper-proof. <span className="text-honey-600 font-semibold">On-chain.</span>
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link to="/scan" className="group flex items-center gap-3 bg-honey-500 hover:bg-honey-600 text-white font-bold px-8 py-4 rounded-btn text-sm uppercase tracking-wider transition-all shadow-lg shadow-honey-500/20">
              <ScanLine className="h-5 w-5" />
              Verify Honey
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="flex items-center gap-3 border border-charcoal-300 hover:border-charcoal-500 text-charcoal-600 hover:text-charcoal-800 font-bold px-8 py-4 rounded-btn text-sm uppercase tracking-wider transition-all">
              Beekeeper Login
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-label text-honey-500 mb-3 inline-block">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-charcoal-800">Three Steps to Trust</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
            {[
              { num: '01', icon: Boxes, title: 'Harvest', desc: 'Beekeeper registers batch with hive data, harvest details, and quality metrics.' },
              { num: '02', icon: Link2, title: 'Mint', desc: 'Batch is minted on Polygon blockchain with a unique QR code for every jar.' },
              { num: '03', icon: ShieldCheck, title: 'Verify', desc: 'Consumer scans the QR to see the tamper-proof journey from apiary to jar.' },
            ].map((step, i) => (
              <div key={i} className="relative group">
                <span className="block text-6xl font-extrabold text-charcoal-100 font-heading group-hover:text-honey-100 transition-colors">{step.num}</span>
                <div className="w-12 h-12 rounded-xl bg-honey-500 flex items-center justify-center mb-4 -mt-4 relative z-10">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-charcoal-800 font-heading mb-2">{step.title}</h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-charcoal-800 text-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: '1,240+', label: 'Beekeepers' },
            { value: '4,800+', label: 'Hives Monitored' },
            { value: '12,500+', label: 'Batches Minted' },
            { value: '89,000+', label: 'Consumer Scans' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-honey-400">{stat.value}</div>
              <div className="text-xs uppercase tracking-wider text-charcoal-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-honey-50">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-charcoal-800 mb-4">Verify Your Honey</h2>
          <p className="text-charcoal-500 mb-8 max-w-md mx-auto">Scan the QR code on your honey jar to see its complete blockchain-verified journey.</p>
          <Link to="/scan" className="inline-flex items-center gap-3 bg-honey-500 hover:bg-honey-600 text-white font-bold px-10 py-4 rounded-btn text-sm uppercase tracking-wider transition-all shadow-lg shadow-honey-500/20">
            <ScanLine className="h-5 w-5" />
            Scan QR Code
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
