import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  ScanLine, ShieldCheck, Link2, ArrowRight, Boxes,
  XCircle, AlertTriangle, TrendingDown, Eye, Wifi, Brain,
  CheckCircle, Globe, Leaf, ArrowDown
} from 'lucide-react'
import AnimatedSection from '../../components/ui/AnimatedSection'
import CountUp from '../../components/ui/CountUp'

function FloatingHexagons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute opacity-[0.04] text-honey-500 ${i % 2 === 0 ? 'animate-float' : 'animate-float-delayed'}`}
          style={{
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 25}%`,
            fontSize: `${40 + i * 12}px`,
          }}
        >
          &#x2B21;
        </div>
      ))}
    </div>
  )
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal-400">Scroll</span>
      <ArrowDown className="h-4 w-4 text-charcoal-400 animate-scroll-bounce" />
    </div>
  )
}

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
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden bg-honey-50" style={{ minHeight: 'calc(100vh - 4rem)' }}>
        <FloatingHexagons />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, minHeight: 'calc(100vh - 4rem)' }}
          className="relative z-10 max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center"
        >
          <AnimatedSection preset="blur" delay={0.2}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-honey-500/10 border border-honey-500/20 text-honey-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-8 animate-pulse-glow">
              <span className="w-1.5 h-1.5 rounded-full bg-honey-500 animate-pulse" />
              Blockchain-Powered Honey Traceability
            </div>
          </AnimatedSection>

          <h1 className="font-extrabold text-charcoal-800 leading-[0.85] tracking-tight">
            <AnimatedSection preset="fadeUp" delay={0.3}>
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[9rem]">FROM HIVE</span>
            </AnimatedSection>
            <AnimatedSection preset="fadeUp" delay={0.5}>
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] text-gradient-honey">TO HOME</span>
            </AnimatedSection>
          </h1>

          <AnimatedSection preset="fadeUp" delay={0.7}>
            <p className="mt-8 text-base sm:text-lg text-charcoal-500 max-w-xl mx-auto leading-relaxed">
              Scan a QR code to trace the complete journey of your honey — from the <span className="text-charcoal-800 font-semibold">apiary</span> to your <span className="text-charcoal-800 font-semibold">table</span>. Tamper-proof. <span className="text-honey-600 font-semibold">On-chain.</span>
            </p>
          </AnimatedSection>

          <AnimatedSection preset="fadeUp" delay={0.9}>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link to="/scan" className="group flex items-center gap-3 bg-honey-500 hover:bg-honey-600 text-white font-bold px-8 py-4 rounded-btn text-sm uppercase tracking-wider transition-all shadow-lg shadow-honey-500/20 hover:shadow-xl hover:shadow-honey-500/30 hover:scale-[1.02] active:scale-[0.98]">
                <ScanLine className="h-5 w-5" />
                Verify Honey
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/login" className="flex items-center gap-3 border border-charcoal-300 hover:border-charcoal-500 text-charcoal-600 hover:text-charcoal-800 font-bold px-8 py-4 rounded-btn text-sm uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]">
                Beekeeper Login
              </Link>
            </div>
          </AnimatedSection>
        </motion.div>

        <ScrollIndicator />
      </section>

      {/* PROBLEM STATEMENT */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection preset="fadeUp">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-danger text-[11px] font-bold uppercase tracking-[0.2em] mb-4">The Problem</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-charcoal-800">Why India&apos;s Honey<br />Industry Needs a Fix</h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: XCircle, title: 'Counterfeit Honey', desc: 'Adulterated and fake honey floods the market, undermining genuine beekeepers and putting consumer health at risk.' },
              { icon: AlertTriangle, title: 'Low Consumer Trust', desc: 'Buyers have no way to verify if honey is pure, ethically sourced, or truly from the claimed region and beekeeper.' },
              { icon: TrendingDown, title: 'Weak Market Linkage', desc: 'Rural beekeepers lack direct access to premium markets and fair pricing, relying on middlemen who take heavy cuts.' },
              { icon: Eye, title: 'Zero Traceability', desc: 'No system exists to track honey from hive to shelf — KVIC cannot verify authenticity or monitor quality at scale.' },
              { icon: Wifi, title: 'Poor Hive Management', desc: 'Beekeepers rely on traditional methods with no data on hive health, leading to colony losses and low yields.' },
              { icon: Brain, title: 'No Predictive Analytics', desc: 'Without yield predictions and demand data, beekeepers cannot plan harvests or optimize production cycles.' },
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
              <span className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-success text-[11px] font-bold uppercase tracking-[0.2em] mb-4">Our Platform</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-charcoal-800">What BeeBuzz Offers</h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: ShieldCheck, title: 'Blockchain Traceability', desc: 'Every batch is minted on-chain with a unique QR code. Consumers scan to see the complete, tamper-proof journey.', color: 'bg-green-50 text-success' },
              { icon: ScanLine, title: 'QR-Based Verification', desc: 'One scan reveals beekeeper identity, harvest details, lab test results, and blockchain proof — instant trust.', color: 'bg-honey-100 text-honey-600' },
              { icon: Brain, title: 'AI Disease Detection', desc: 'IoT sensors stream hive data to our AI engine which detects diseases before they spread across the apiary.', color: 'bg-purple-50 text-purple-600' },
              { icon: Wifi, title: 'Smart Beekeeping', desc: 'Real-time monitoring of temperature, humidity, and hive weight with automated alerts and yield predictions.', color: 'bg-blue-50 text-blue-600' },
              { icon: Globe, title: 'Direct Market Access', desc: 'Verified beekeepers connect directly with buyers and retailers, eliminating middlemen and earning fair prices.', color: 'bg-green-50 text-green-600' },
              { icon: Leaf, title: 'KVIC Integration', desc: 'Built to support KVIC Honey Mission — enabling cluster-level oversight, quality assurance, and livelihood promotion.', color: 'bg-amber-50 text-amber-600' },
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
              <span className="section-label text-honey-500 mb-3 inline-block">How It Works</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-charcoal-800">Three Steps to Trust</h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-3 gap-8 lg:gap-16 relative">
            <div className="hidden sm:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-honey-200 via-honey-400 to-honey-200" />

            {[
              { num: '01', icon: Boxes, title: 'Harvest', desc: 'Beekeeper registers batch with hive data, harvest details, and quality metrics.' },
              { num: '02', icon: Link2, title: 'Mint', desc: 'Batch is minted on Polygon blockchain with a unique QR code for every jar.' },
              { num: '03', icon: ShieldCheck, title: 'Verify', desc: 'Consumer scans the QR to see the tamper-proof journey from apiary to jar.' },
            ].map((step, i) => (
              <StepCard key={i} {...step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 sm:py-24 bg-charcoal-800 text-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection preset="fadeUp">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">Trusted by Thousands</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatItem value="1240" label="Beekeepers" index={0} />
            <StatItem value="4800" label="Hives Monitored" index={1} />
            <StatItem value="12500" label="Batches Minted" index={2} />
            <StatItem value="89000" label="Consumer Scans" index={3} />
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-12 bg-white border-y border-charcoal-100">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection preset="fadeUp">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <TrustBadge icon={ShieldCheck} label="Blockchain Secured" />
              <TrustBadge icon={CheckCircle} label="KVIC Approved" />
              <TrustBadge icon={Globe} label="Polygon Network" />
              <TrustBadge icon={Leaf} label="100% Authentic" />
              <TrustBadge icon={ScanLine} label="QR Verified" />
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
              Verify Your Honey<br />
              <span className="text-gradient-honey">Right Now</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection preset="fadeUp" delay={0.2}>
            <p className="text-charcoal-500 mb-10 max-w-md mx-auto">
              Scan the QR code on your honey jar to see its complete blockchain-verified journey.
            </p>
          </AnimatedSection>
          <AnimatedSection preset="scale" delay={0.4}>
            <Link to="/scan" className="group inline-flex items-center gap-3 bg-honey-500 hover:bg-honey-600 text-white font-bold px-10 py-5 rounded-btn text-sm uppercase tracking-wider transition-all shadow-xl shadow-honey-500/20 hover:shadow-2xl hover:shadow-honey-500/30 hover:scale-[1.03] active:scale-[0.98]">
              <ScanLine className="h-5 w-5" />
              Scan QR Code
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
