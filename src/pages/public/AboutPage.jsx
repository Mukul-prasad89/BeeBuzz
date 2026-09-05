import { Link } from 'react-router-dom'
import {
  ShieldCheck, ScanLine, Boxes, Activity, Brain, Wifi,
  TrendingUp, Users, CheckCircle, AlertTriangle, XCircle,
  ArrowRight, Hexagon, Link2, Globe, Leaf
} from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()

  const problems = [
    {
      icon: XCircle,
      title: t('problem.counterfeit.title'),
      desc: t('problem.counterfeit.desc'),
    },
    {
      icon: AlertTriangle,
      title: t('problem.trust.title'),
      desc: t('problem.trust.desc'),
    },
    {
      icon: Users,
      title: t('problem.linkage.title'),
      desc: t('problem.linkage.desc'),
    },
    {
      icon: Boxes,
      title: t('problem.traceability.title'),
      desc: t('problem.traceability.desc'),
    },
    {
      icon: Activity,
      title: t('problem.hiveMgmt.title'),
      desc: t('problem.hiveMgmt.desc'),
    },
    {
      icon: TrendingUp,
      title: t('problem.analytics.title'),
      desc: t('problem.analytics.desc'),
    },
  ]

  const solutions = [
    {
      icon: ShieldCheck,
      title: t('solution.blockchain.title'),
      desc: t('solution.blockchain.desc'),
      color: 'bg-success/10 text-success',
    },
    {
      icon: ScanLine,
      title: t('solution.qr.title'),
      desc: t('solution.qr.desc'),
      color: 'bg-honey-100 text-honey-600',
    },
    {
      icon: Brain,
      title: t('solution.ai.title'),
      desc: t('solution.ai.desc'),
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: Wifi,
      title: t('solution.smart.title'),
      desc: t('solution.smart.desc'),
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Globe,
      title: t('solution.market.title'),
      desc: t('solution.market.desc'),
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: Leaf,
      title: t('solution.kvic.title'),
      desc: t('solution.kvic.desc'),
      color: 'bg-amber-50 text-amber-600',
    },
  ]

  const stats = [
    { value: '1,240+', label: t('about.stats.beekeepers') },
    { value: '4,800+', label: t('about.stats.hives') },
    { value: '12,500+', label: t('about.stats.batches') },
    { value: '89,000+', label: t('about.stats.scans') },
  ]
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 text-white py-20 sm:py-28">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label text-honey-400 mb-4 inline-block">{t('about.label')}</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading leading-tight text-balance">
            {t('about.heroTitle').split('\n')[0]}<br />
            <span className="text-honey-400">{t('about.heroTitle').split('\n')[1] || t('about.heroTitle')}</span>
          </h1>
          <p className="mt-6 text-lg text-charcoal-300 max-w-3xl mx-auto text-balance">
            {t('about.heroDesc')}
          </p>
        </div>
      </section>

      {/* Background / Problem Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="section-label text-danger mb-3 inline-block">{t('problem.label')}</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal-800 mb-4">
              {t('about.problemTitle')}
            </h2>
            <p className="text-charcoal-500 leading-relaxed">
              {t('about.problemDesc')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((p, i) => (
              <div key={i} className="card hover:shadow-card-hover transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-3">
                  <p.icon className="h-5 w-5 text-danger" />
                </div>
                <h3 className="font-bold text-charcoal-800 font-heading mb-1">{p.title}</h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution / Platform Offerings */}
      <section className="py-20 bg-honey-50">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="section-label text-success mb-3 inline-block">{t('solution.label')}</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal-800 mb-4">
              {t('about.solutionTitle')}
            </h2>
            <p className="text-charcoal-500 leading-relaxed">
              {t('about.solutionDesc')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((s, i) => (
              <div key={i} className="card hover:shadow-card-hover transition-shadow">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-charcoal-800 font-heading mb-1">{s.title}</h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Loop */}
      <section className="py-20 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="section-label text-honey-600 mb-3 inline-block">{t('howItWorks.label')}</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal-800 mb-4">
              {t('about.trustLoop')}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', icon: Boxes, title: t('about.steps.harvest.title'), desc: t('about.steps.harvest.desc') },
                { step: '02', icon: Link2, title: t('about.steps.mint.title'), desc: t('about.steps.mint.desc') },
                { step: '03', icon: ScanLine, title: t('about.steps.scan.title'), desc: t('about.steps.scan.desc') },
                { step: '04', icon: ShieldCheck, title: t('about.steps.trust.title'), desc: t('about.steps.trust.desc') },
              ].map((item, i) => (
                <div key={i} className="text-center relative">
                  <div className="w-14 h-14 rounded-2xl bg-honey-500 flex items-center justify-center mx-auto mb-4 text-white">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <span className="section-label text-honey-400">Step {item.step}</span>
                  <h3 className="font-bold text-charcoal-800 font-heading mt-1 mb-2">{item.title}</h3>
                  <p className="text-sm text-charcoal-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-charcoal-800 text-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold font-heading text-honey-400">{stat.value}</div>
                <div className="text-sm text-charcoal-300 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-honey-50">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal-800 mb-4">{t('about.cta.title')}</h2>
          <p className="text-charcoal-500 mb-8 max-w-md mx-auto">{t('about.cta.desc')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="btn-primary text-base px-8 py-4 flex items-center gap-2">
              {t('about.cta.getStarted')} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/scan" className="btn-secondary text-base px-8 py-4 flex items-center gap-2">
              <ScanLine className="h-4 w-4" /> {t('about.cta.verifyHoney')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
