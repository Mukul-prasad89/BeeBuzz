import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import { useToastStore } from '../../store/toastStore'
import { useLanguage } from '../../i18n/LanguageContext'

export default function ContactPage() {
  const { addToast } = useToastStore()
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    addToast('Message sent! We\'ll get back to you soon.')
    setTimeout(() => setSubmitted(false), 5000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 text-white py-20">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label text-honey-400 mb-4 inline-block">{t('contact.label')}</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading">{t('contact.title')}</h1>
          <p className="mt-4 text-charcoal-300 max-w-xl mx-auto">{t('contact.desc')}</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold font-heading text-charcoal-800 mb-4">{t('contact.info.title')}</h2>
                <p className="text-sm text-charcoal-500 leading-relaxed">
                  {t('contact.info.desc')}
                </p>
              </div>

              <div className="space-y-5">
                {[
                  { icon: MapPin, label: t('contact.info.address'), value: t('contact.info.addressValue') },
                  { icon: Phone, label: t('contact.info.phone'), value: t('contact.info.phoneValue') },
                  { icon: Mail, label: t('contact.info.email'), value: t('contact.info.emailValue') },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-honey-50 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-honey-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-charcoal-400 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm text-charcoal-700 whitespace-pre-line mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="rounded-card overflow-hidden border border-charcoal-200 h-48 bg-charcoal-100 flex items-center justify-center">
                <div className="text-center text-charcoal-400">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">{t('contact.mapPlaceholder')}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="card">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="text-xl font-bold text-charcoal-800 font-heading mb-2">{t('contact.success.title')}</h3>
                    <p className="text-sm text-charcoal-500">{t('contact.success.desc')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="section-label mb-1 block">{t('contact.form.name')}</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder={t('contact.form.namePlaceholder')}
                          className="input"
                          required
                        />
                      </div>
                      <div>
                        <label className="section-label mb-1 block">{t('contact.form.email')}</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder={t('contact.form.emailPlaceholder')}
                          className="input"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="section-label mb-1 block">{t('contact.form.subject')}</label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="input"
                        required
                      >
                        <option value="">{t('contact.form.topicDefault')}</option>
                        <option value="partnership">{t('contact.form.topics.partnership')}</option>
                        <option value="beekeeper">{t('contact.form.topics.beekeeper')}</option>
                        <option value="technical">{t('contact.form.topics.tech')}</option>
                        <option value="lab">{t('contact.form.topics.lab')}</option>
                        <option value="kvic">{t('contact.form.topics.kvic')}</option>
                        <option value="other">{t('contact.form.topics.other')}</option>
                      </select>
                    </div>
                    <div>
                      <label className="section-label mb-1 block">{t('contact.form.message')}</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={t('contact.form.messagePlaceholder')}
                        className="input"
                        rows={5}
                        required
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                      <Send className="h-4 w-4" /> {t('contact.form.send')}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
