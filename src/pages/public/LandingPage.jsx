import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ScanLine, ShieldCheck, Link2, ArrowRight, Boxes,
  XCircle, AlertTriangle, TrendingDown, Eye, Wifi, Brain,
  CheckCircle, Globe, Leaf, ArrowDown, Users
} from 'lucide-react'
import AnimatedSection from '../../components/ui/AnimatedSection'
import CountUp from '../../components/ui/CountUp'
import { useLanguage } from '../../i18n/LanguageContext'

import heroHoney from '../../assets/heroimage.jpg'
import beeHoneycomb from '../../assets/PHOTO-2026-09-05-04-23-45-removebg-preview.png'

function ProblemCard({ icon: Icon, title, desc, index }) {
  return (
    <AnimatedSection delay={index * 0.1} preset="fadeUp">
      <div className="group relative bg-white rounded-card border border-charcoal-100 p-6 hover:shadow-card-hover hover:border-honey-200 transition-all duration-300 h-full">
        <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
          <Icon className="h-5 w-5 text-danger" />
        </div>
        <h3 className="font-bold text-charcoal-800 font-heading mb-2 text-base">{title}</h3>
        <p className="text-sm text-charcoal-500 leading-relaxed">{desc}</p>
      </div>
    </AnimatedSection>
  )
}

function SolutionCard({ icon: Icon, title, desc, color, index }) {
  return (
    <AnimatedSection delay={index * 0.1} preset="scale">
      <div className="group relative bg-white rounded-card border border-charcoal-100 p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-bold text-charcoal-800 font-heading mb-2 text-base">{title}</h3>
        <p className="text-sm text-charcoal-500 leading-relaxed">{desc}</p>
      </div>
    </AnimatedSection>
  )
}

function StepCard({ num, icon: Icon, title, desc, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative text-center"
    >
      <span className="block text-7xl sm:text-8xl font-extrabold text-charcoal-50 font-heading leading-none select-none">{num}</span>
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.2, type: 'spring', stiffness: 200 }}
        className="w-14 h-14 rounded-2xl bg-honey-500 flex items-center justify-center mx-auto -mt-6 relative z-10 shadow-lg shadow-honey-500/20"
      >
        <Icon className="h-7 w-7 text-white" />
      </motion.div>
      <h3 className="text-xl font-bold text-charcoal-800 font-heading mt-4 mb-2">{title}</h3>
      <p className="text-sm text-charcoal-500 leading-relaxed max-w-xs mx-auto">{desc}</p>
    </motion.div>
  )
}

function StatItem({ value, label, suffix = '+', index }) {
  return (
    <AnimatedSection delay={index * 0.1} preset="scale">
      <div className="text-center">
        <div className="text-4xl sm:text-5xl font-extrabold font-heading text-honey-400">
          <CountUp target={value} suffix={suffix} />
        </div>
        <div className="text-xs uppercase tracking-wider text-charcoal-400 mt-2 font-semibold">{label}</div>
      </div>
    </AnimatedSection>
  )
}

function TrustBadge({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-charcoal-200 bg-white text-charcoal-600 text-xs font-semibold">
      <Icon className="h-4 w-4 text-honey-500" />
      {label}
    </div>
  )
}

export default function LandingPage() {
  const { t } = useLanguage()

  return (
    <div>
      {/* HERO + STATS */}
      <section className="relative bg-[#fdf6ed] flex flex-col" style={{ height: '100vh' }}>
        {/* Golden glow behind right half */}
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none" style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(245,158,11,0.35) 0%, rgba(245,158,11,0.15) 40%, rgba(245,158,11,0) 70%)' }} />

        {/* Main hero content - fills viewport minus stats */}
        <div className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 h-full items-center">
            {/* Left Content */}
            <div className="relative z-10 py-24 sm:py-12 lg:py-12 lg:pl-20 text-center lg:text-left">
              <AnimatedSection preset="blur" delay={0.2}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-honey-100 border border-honey-300 text-honey-700 text-xs font-bold uppercase tracking-wider mb-6 mx-auto lg:mx-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-honey-500" />
                  {t('hero.badge')}
                </div>
              </AnimatedSection>

              <AnimatedSection preset="fadeUp" delay={0.3}>
                <h1 className="font-extrabold leading-[0.9] tracking-tight mb-6">
                  <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-[#3d2b1f]">{t('hero.titleLine1')}</span>
                  <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-gradient-honey">{t('hero.titleLine2')}</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection preset="fadeUp" delay={0.5}>
                <p className="text-base sm:text-lg text-charcoal-500 max-w-md leading-relaxed mb-8 mx-auto lg:mx-0">
                  {t('hero.desc')}
                </p>
              </AnimatedSection>

              <AnimatedSection preset="fadeUp" delay={0.7}>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link to="/signup" className="group flex items-center gap-3 bg-honey-500 hover:bg-honey-600 text-white font-bold px-8 py-4 rounded-btn text-sm transition-all shadow-lg shadow-honey-500/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                    <Users className="h-5 w-5" />
                    {t('hero.joinNetwork')}
                  </Link>
                  <Link to="/offerings" className="flex items-center gap-3 border border-charcoal-300 hover:border-charcoal-500 text-charcoal-600 hover:text-charcoal-800 font-bold px-8 py-4 rounded-btn text-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
                    {t('hero.exploreOfferings')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Content - Honey Image */}
            <motion.div
              className="relative flex items-center justify-center h-full"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img
                src={heroHoney}
                alt="Honey dipper with honeycomb"
                className="w-full max-w-xl object-contain drop-shadow-2xl relative z-10"
              />
            </motion.div>
          </div>
        </div>

        {/* Bee image floating top-left */}
        <motion.img
          src={beeHoneycomb}
          alt="Bee on honeycomb"
          className="absolute top-4 left-4 hidden lg:block w-32 h-32 lg:w-44 lg:h-44 object-contain opacity-80 pointer-events-none"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Wavy divider - overlaps hero content and stats bar */}
        <div className="relative w-full overflow-hidden leading-none z-20 -mb-px">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative block w-full h-[60px] sm:h-[80px]" preserveAspectRatio="none">
            <path d="M0,40 C180,100 360,0 540,50 C720,100 900,10 1080,60 C1260,110 1350,30 1440,50 L1440,120 L0,120 Z" fill="#3d2b1f"/>
          </svg>
        </div>

        {/* Stats Bar - flows naturally below hero */}
        <div className="relative w-full bg-[#3d2b1f] z-10">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: '6', label: t('stats.certifiedApiaries'), suffix: '+' },
                { value: '120', label: t('stats.monitoredHives'), suffix: '+' },
                { value: '4', label: t('stats.fssaiBatches'), suffix: ' Batches', noCount: true },
                { value: '100', label: t('stats.adulterationFree'), suffix: '%', noCount: true },
              ].map((stat, i) => (
                <AnimatedSection key={i} delay={i * 0.1} preset="scale">
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-extrabold font-heading text-honey-400">
                      {stat.noCount ? (
                        <span>{stat.value}{stat.suffix}</span>
                      ) : (
                        <CountUp target={stat.value} suffix={stat.suffix} />
                      )}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-white/60 mt-2 font-semibold">{stat.label}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM STATEMENT */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection preset="fadeUp">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-danger text-[11px] font-bold uppercase tracking-[0.2em] mb-4">{t('problem.label')}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-charcoal-800">{t('problem.title')}</h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: XCircle, title: t('problem.counterfeit.title'), desc: t('problem.counterfeit.desc') },
              { icon: AlertTriangle, title: t('problem.trust.title'), desc: t('problem.trust.desc') },
              { icon: TrendingDown, title: t('problem.linkage.title'), desc: t('problem.linkage.desc') },
              { icon: Eye, title: t('problem.traceability.title'), desc: t('problem.traceability.desc') },
              { icon: Wifi, title: t('problem.hiveMgmt.title'), desc: t('problem.hiveMgmt.desc') },
              { icon: Brain, title: t('problem.analytics.title'), desc: t('problem.analytics.desc') },
            ].map((p, i) => (
              <ProblemCard key={i} {...p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-20 sm:py-28 bg-honey-50">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection preset="fadeUp">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-success text-[11px] font-bold uppercase tracking-[0.2em] mb-4">{t('solution.label')}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-charcoal-800">{t('solution.title')}</h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: ShieldCheck, title: t('solution.blockchain.title'), desc: t('solution.blockchain.desc'), color: 'bg-green-50 text-success' },
              { icon: ScanLine, title: t('solution.qr.title'), desc: t('solution.qr.desc'), color: 'bg-honey-100 text-honey-600' },
              { icon: Brain, title: t('solution.ai.title'), desc: t('solution.ai.desc'), color: 'bg-purple-50 text-purple-600' },
              { icon: Wifi, title: t('solution.smart.title'), desc: t('solution.smart.desc'), color: 'bg-blue-50 text-blue-600' },
              { icon: Globe, title: t('solution.market.title'), desc: t('solution.market.desc'), color: 'bg-green-50 text-green-600' },
              { icon: Leaf, title: t('solution.kvic.title'), desc: t('solution.kvic.desc'), color: 'bg-amber-50 text-amber-600' },
            ].map((s, i) => (
              <SolutionCard key={i} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection preset="fadeUp">
            <div className="text-center mb-16">
              <span className="section-label text-honey-500 mb-3 inline-block">{t('howItWorks.label')}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-charcoal-800">{t('howItWorks.title')}</h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-3 gap-8 lg:gap-16 relative">
            <div className="hidden sm:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-honey-200 via-honey-400 to-honey-200" />

            {[
              { num: '01', icon: Boxes, title: t('howItWorks.harvest.title'), desc: t('howItWorks.harvest.desc') },
              { num: '02', icon: Link2, title: t('howItWorks.mint.title'), desc: t('howItWorks.mint.desc') },
              { num: '03', icon: ShieldCheck, title: t('howItWorks.verify.title'), desc: t('howItWorks.verify.desc') },
            ].map((step, i) => (
              <StepCard key={i} {...step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-12 bg-white border-y border-charcoal-100">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection preset="fadeUp">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <TrustBadge icon={ShieldCheck} label={t('trustBadges.blockchain')} />
              <TrustBadge icon={CheckCircle} label={t('trustBadges.kvic')} />
              <TrustBadge icon={Globe} label={t('trustBadges.polygon')} />
              <TrustBadge icon={Leaf} label={t('trustBadges.authentic')} />
              <TrustBadge icon={ScanLine} label={t('trustBadges.qr')} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 sm:py-28 bg-honey-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`absolute opacity-[0.03] text-honey-500 ${i % 2 === 0 ? 'animate-float' : 'animate-float-delayed'}`}
              style={{ right: `${5 + i * 20}%`, top: `${10 + i * 20}%`, fontSize: `${60 + i * 20}px` }}
            >
              &#x2B21;
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection preset="scale">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-charcoal-800 mb-4">
              {t('cta.finalTitle').split('\n')[0]}<br />
              <span className="text-gradient-honey">{t('cta.finalTitle').split('\n')[1] || ''}</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection preset="fadeUp" delay={0.2}>
            <p className="text-charcoal-500 mb-10 max-w-md mx-auto">
              {t('cta.finalDesc')}
            </p>
          </AnimatedSection>
          <AnimatedSection preset="scale" delay={0.4}>
            <Link to="/scan" className="group inline-flex items-center gap-3 bg-honey-500 hover:bg-honey-600 text-white font-bold px-10 py-5 rounded-btn text-sm uppercase tracking-wider transition-all shadow-xl shadow-honey-500/20 hover:shadow-2xl hover:shadow-honey-500/30 hover:scale-[1.03] active:scale-[0.98]">
              <ScanLine className="h-5 w-5" />
              {t('cta.scanQr')}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
