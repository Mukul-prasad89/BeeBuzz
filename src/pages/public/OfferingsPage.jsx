import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Wifi, Thermometer, Droplets, Weight, Brain, ShieldCheck,
  Bell, Link2, QrCode, Boxes, ArrowRight, CheckCircle2,
  Activity, Eye, Zap, Database, Lock, Globe, Leaf, Cpu
} from 'lucide-react'
import AnimatedSection from '../../components/ui/AnimatedSection'

function FeatureCard({ icon: Icon, title, desc, color, index }) {
  return (
    <AnimatedSection delay={index * 0.1} preset="fadeUp">
      <div className="group bg-white rounded-2xl border border-charcoal-100 p-6 hover:shadow-lg hover:border-honey-200 transition-all duration-300 h-full">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-bold text-charcoal-800 font-heading mb-2">{title}</h3>
        <p className="text-sm text-charcoal-500 leading-relaxed">{desc}</p>
      </div>
    </AnimatedSection>
  )
}

function StepDetail({ num, icon: Icon, title, desc, details, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      <div className="flex items-start gap-6">
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-honey-500 flex items-center justify-center shadow-lg shadow-honey-500/20">
            <Icon className="h-7 w-7 text-white" />
          </div>
          {index < 2 && <div className="w-px h-16 bg-honey-200 mt-3" />}
        </div>
        <div className="flex-1 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-honey-50 text-honey-600 text-xs font-bold uppercase tracking-wider mb-3">
            Step {num}
          </div>
          <h3 className="text-xl font-bold font-heading text-charcoal-800 mb-2">{title}</h3>
          <p className="text-charcoal-500 text-sm leading-relaxed mb-4">{desc}</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {details.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-charcoal-600">
                <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function OfferingsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#fdf6ed] overflow-hidden py-20 sm:py-28">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, rgba(245,158,11,0) 65%)' }} />

        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection preset="fadeUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-honey-100 border border-honey-300 text-honey-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Zap className="h-3.5 w-3.5" />
              Our Offerings
            </div>
          </AnimatedSection>

          <AnimatedSection preset="fadeUp" delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-charcoal-800 leading-tight mb-6 max-w-3xl">
              Smart Beekeeping Meets{' '}
              <span className="text-gradient-honey">Blockchain Trust</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection preset="fadeUp" delay={0.2}>
            <p className="text-lg text-charcoal-500 max-w-2xl leading-relaxed">
              From IoT sensors in the hive to AI-powered health analysis to tamper-proof blockchain records — BeeBuzz covers the entire journey of honey with cutting-edge technology.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* IoT Monitoring */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection preset="fadeUp">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-4">IoT-Based Monitoring</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-charcoal-800 mb-4">Real-Time Hive Health Monitoring</h2>
              <p className="text-charcoal-500 max-w-2xl mx-auto">
                IoT sensors installed in every KVIC bee box continuously stream vital data to our platform, ensuring 24/7 monitoring of colony health.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[
              { icon: Thermometer, title: 'Temperature', desc: 'Continuous internal hive temperature monitoring to detect anomalies early', color: 'bg-red-50 text-red-500' },
              { icon: Droplets, title: 'Humidity', desc: 'Humidity levels tracked to prevent moisture damage and mold growth', color: 'bg-blue-50 text-blue-500' },
              { icon: Weight, title: 'Hive Weight', desc: 'Real-time weight tracking to estimate honey stores and harvest readiness', color: 'bg-amber-50 text-amber-500' },
              { icon: Activity, title: 'Sound Frequency', desc: 'Audio analysis to detect swarming signals, queenlessness, or distress', color: 'bg-green-50 text-green-500' },
            ].map((f, i) => (
              <FeatureCard key={i} {...f} index={i} />
            ))}
          </div>

          <AnimatedSection preset="fadeUp">
            <div className="bg-gradient-to-br from-blue-50 to-honey-50 rounded-2xl p-8 border border-charcoal-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Data Points/Day', value: '96' },
                    { label: 'Sensor Accuracy', value: '99.2%' },
                    { label: 'Latency', value: '<2s' },
                    { label: 'Coverage Range', value: '5km' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 text-center border border-charcoal-100">
                      <div className="text-2xl font-extrabold font-heading text-honey-500">{stat.value}</div>
                      <div className="text-xs text-charcoal-500 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-charcoal-800 mb-3">How IoT Sensors Work</h3>
                  <p className="text-sm text-charcoal-500 leading-relaxed mb-4">
                    Each KVIC bee box is equipped with a compact IoT sensor node that measures temperature, humidity, weight, and acoustic patterns every 15 minutes. Data is transmitted via LoRaWAN to our edge gateway and synced to the cloud in real-time.
                  </p>
                  <div className="space-y-2">
                    {['15-minute data intervals', 'LoRaWAN connectivity for rural areas', 'Battery life up to 2 years', 'Solar-powered option available'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-charcoal-600">
                        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* AI/ML Health Verification */}
      <section className="py-20 sm:py-28 bg-honey-50">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection preset="fadeUp">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-4">AI / ML Verification</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-charcoal-800 mb-4">Intelligent Honey Health Analysis</h2>
              <p className="text-charcoal-500 max-w-2xl mx-auto">
                Our AI/ML models analyze hive data patterns, detect diseases early, and verify honey purity — ensuring only healthy, authentic honey reaches consumers.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {[
              { icon: Brain, title: 'Disease Detection', desc: 'ML models trained on 50,000+ hive datasets detect Varroa mites, Nosema, and American Foulbrood from sensor patterns before visual symptoms appear.', color: 'bg-purple-50 text-purple-600' },
              { icon: Eye, title: 'Anomaly Detection', desc: 'Unusual temperature spikes, humidity drops, or weight changes trigger automatic alerts — catching problems hours before they become critical.', color: 'bg-red-50 text-red-500' },
              { icon: Cpu, title: 'Yield Prediction', desc: 'Predictive models forecast honey yield 30 days ahead based on weather patterns, floral bloom data, and historical harvest records.', color: 'bg-blue-50 text-blue-600' },
              { icon: ShieldCheck, title: 'Purity Verification', desc: 'NMR spectroscopy data analyzed by ML models to detect adulteration with sugar syrups, corn syrup, or artificial additives with 99.5% accuracy.', color: 'bg-green-50 text-green-600' },
              { icon: Leaf, title: 'Colony Strength Score', desc: 'Composite health score calculated from 12+ parameters — gives beekeepers a single metric to track colony wellness over time.', color: 'bg-amber-50 text-amber-600' },
              { icon: Globe, title: 'Regional Insights', desc: 'Aggregated AI analysis across clusters identifies regional threats, optimal harvest windows, and cross-pollination opportunities.', color: 'bg-cyan-50 text-cyan-600' },
            ].map((f, i) => (
              <FeatureCard key={i} {...f} index={i} />
            ))}
          </div>

          <AnimatedSection preset="fadeUp">
            <div className="bg-white rounded-2xl p-8 border border-charcoal-100">
              <h3 className="text-xl font-bold font-heading text-charcoal-800 mb-6 text-center">AI Model Pipeline</h3>
              <div className="grid sm:grid-cols-4 gap-4">
                {[
                  { step: '01', title: 'Data Ingestion', desc: 'IoT sensor data collected every 15 min' },
                  { step: '02', title: 'Feature Engineering', desc: '12 health parameters extracted & normalized' },
                  { step: '03', title: 'ML Analysis', desc: 'Disease, anomaly, and yield models run' },
                  { step: '04', title: 'Alert & Record', desc: 'Results sent to beekeeper + written on-chain' },
                ].map((s, i) => (
                  <div key={i} className="text-center p-4">
                    <div className="text-3xl font-extrabold font-heading text-honey-300 mb-2">{s.step}</div>
                    <div className="font-bold text-charcoal-800 text-sm mb-1">{s.title}</div>
                    <div className="text-xs text-charcoal-500">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Notification System */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection preset="fadeUp">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-danger text-[11px] font-bold uppercase tracking-[0.2em] mb-4">Alert System</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-charcoal-800 mb-4">Instant Alerts When Health Drops</h2>
              <p className="text-charcoal-500 max-w-2xl mx-auto">
                When the AI detects something unhealthy, the beekeeper is notified immediately. No delayed responses. No missed warnings.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection preset="fadeLeft" delay={0.1}>
              <div className="bg-red-50 rounded-2xl p-8 border border-red-100 h-full">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-danger" />
                </div>
                <h3 className="text-lg font-bold font-heading text-charcoal-800 mb-3">Unhealthy Detection</h3>
                <p className="text-sm text-charcoal-500 leading-relaxed mb-4">
                  If any sensor parameter goes abnormal or the AI model detects disease risk, the system immediately alerts the beekeeper.
                </p>
                <div className="space-y-2">
                  {[
                    'Temperature > 38°C or < 32°C',
                    'Humidity > 80% for 6+ hours',
                    'Sudden weight loss > 500g/day',
                    'AI disease confidence > 75%',
                    'Sound pattern indicating swarming',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-charcoal-600">
                      <Bell className="h-3.5 w-3.5 text-danger flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-danger">
                  <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
                  Alert via SMS, Push Notification, WhatsApp
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection preset="fadeRight" delay={0.2}>
              <div className="bg-green-50 rounded-2xl p-8 border border-green-100 h-full">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-lg font-bold font-heading text-charcoal-800 mb-3">Healthy — Proceed to Blockchain</h3>
                <p className="text-sm text-charcoal-500 leading-relaxed mb-4">
                  If all parameters are within safe ranges and the AI confirms colony health, the data is automatically recorded on the Polygon blockchain.
                </p>
                <div className="space-y-2">
                  {[
                    'All sensors within normal range',
                    'AI health score > 80/100',
                    'No disease indicators detected',
                    'Hive weight stable or increasing',
                    'Ready for harvest or monitoring',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-charcoal-600">
                      <CheckCircle2 className="h-3.5 w-3.5 text-success flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-success">
                  <ShieldCheck className="h-4 w-4" />
                  Data immutably recorded on-chain
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Blockchain Recording */}
      <section className="py-20 sm:py-28 bg-charcoal-800 text-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection preset="fadeUp">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-honey-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4">Blockchain Layer</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mb-4">Tamper-Proof Records on Polygon</h2>
              <p className="text-charcoal-400 max-w-2xl mx-auto">
                Every health check, every harvest, every lab test — permanently recorded on the Polygon blockchain. Immutable. Verifiable. Trustworthy.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Database, title: 'Health Records', desc: 'Every 15-minute IoT reading is hashed and anchored on-chain as a batch proof, creating an immutable health timeline for each hive.' },
              { icon: Lock, title: 'Immutable Audit Trail', desc: 'Once written, data cannot be altered or deleted. KVIC, labs, and consumers can verify the complete history independently.' },
              { icon: QrCode, title: 'QR Code Generation', desc: 'After health verification and processing, unique QR codes are minted per bottle — linking physical product to on-chain data.' },
            ].map((f, i) => (
              <AnimatedSection key={i} delay={i * 0.1} preset="fadeUp">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-honey-500/30 transition-colors h-full">
                  <f.icon className="h-8 w-8 text-honey-400 mb-4" />
                  <h3 className="font-bold font-heading mb-2">{f.title}</h3>
                  <p className="text-sm text-charcoal-400 leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection preset="fadeUp">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h3 className="text-lg font-bold font-heading mb-6 text-center">Complete Data Flow</h3>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {[
                  { icon: Wifi, label: 'IoT Sensors', sub: 'Data collected' },
                  { icon: Brain, label: 'AI/ML Analysis', sub: 'Health verified' },
                  { icon: Bell, label: 'Alert System', sub: 'Beekeeper notified' },
                  { icon: Link2, label: 'Blockchain', sub: 'Recorded on-chain' },
                  { icon: QrCode, label: 'QR Minted', sub: 'Consumer verifies' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-xl bg-honey-500/20 flex items-center justify-center mx-auto mb-2">
                        <step.icon className="h-6 w-6 text-honey-400" />
                      </div>
                      <div className="text-sm font-bold">{step.label}</div>
                      <div className="text-xs text-charcoal-400">{step.sub}</div>
                    </div>
                    {i < 4 && <ArrowRight className="h-5 w-5 text-charcoal-500 hidden sm:block flex-shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-honey-50">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection preset="scale">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-charcoal-800 mb-4">
              Ready to Join the{' '}
              <span className="text-gradient-honey">Network?</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection preset="fadeUp" delay={0.2}>
            <p className="text-charcoal-500 mb-10 max-w-md mx-auto">
              Start monitoring your hives with IoT, verify honey with AI, and build trust with blockchain.
            </p>
          </AnimatedSection>
          <AnimatedSection preset="scale" delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="group flex items-center gap-3 bg-honey-500 hover:bg-honey-600 text-white font-bold px-8 py-4 rounded-btn text-sm transition-all shadow-lg shadow-honey-500/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                Get Started Free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/scan" className="flex items-center gap-3 border border-charcoal-300 hover:border-charcoal-500 text-charcoal-600 hover:text-charcoal-800 font-bold px-8 py-4 rounded-btn text-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
                Try QR Verification
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
