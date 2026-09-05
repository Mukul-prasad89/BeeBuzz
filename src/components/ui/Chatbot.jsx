import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`

const SYSTEM_PROMPT = `You are BeeBuzz AI assistant for the BeeBuzz platform — a blockchain-powered honey traceability system built for the KVIC Honey Mission of India.

Platform overview:
BeeBuzz connects beekeepers, honey manufacturers, laboratories, KVIC administrators, and consumers on a single blockchain-backed platform to ensure honey authenticity and quality.

Stakeholders:
1. Beekeeper — Registers harvests, manages hives, mints batches on Polygon blockchain
2. Manufacturer — Receives raw honey from beekeepers, processes it, generates QR codes for bottled products
3. Laboratory — Runs quality tests (moisture, purity, NMR spectroscopy) and submits results on-chain
4. KVIC Admin — Oversees clusters, approves beekeepers, monitors fraud, manages platform
5. Consumer — Scans QR codes on honey jars to verify complete origin and journey

Key features:
- QR-based honey verification with blockchain proof (Polygon network)
- Tamper-proof batch records from hive to shelf
- AI-powered disease detection for beekeeping
- FSSAI compliance testing and quality standards
- Smart hive monitoring with IoT sensors (temperature, humidity, weight)
- Direct market access eliminating middlemen
- Cluster-level oversight for KVIC

How traceability works:
1. Beekeeper harvests honey and registers batch with hive data
2. Batch is minted on Polygon blockchain with unique QR code
3. Manufacturer receives, processes, and generates QR codes per bottle
4. Lab tests the batch and submits results on-chain
5. Consumer scans QR to see the complete tamper-proof journey

Rules:
- Be helpful, concise, and friendly
- Answer questions about the platform, honey traceability, beekeeping, and verification
- If asked about something unrelated, politely redirect to BeeBuzz topics
- Use simple language, avoid jargon
- Keep responses under 3-4 sentences unless detail is needed`

async function callGemini(messages, t) {
  const contents = messages.map((msg) => ({
    role: msg.role === 'bot' ? 'model' : 'user',
    parts: [{ text: msg.text }],
  }))

  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 200 },
    }),
  })

  if (!res.ok) throw new Error('API error')
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || t('chatbot.fallback')
}

export default function Chatbot() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: t('chatbot.welcome') },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async (text) => {
    const msg = text || input.trim()
    if (!msg || isTyping) return

    const userMsg = { role: 'user', text: msg }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    try {
      const allMessages = [...messages, userMsg]
      const reply = await callGemini(allMessages, t)
      setMessages((prev) => [...prev, { role: 'bot', text: reply }])
    } catch (err) {
      console.error('Chatbot error:', err)
      setMessages((prev) => [...prev, { role: 'bot', text: t('chatbot.error') }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-honey-500 hover:bg-honey-600 text-white shadow-lg shadow-honey-500/30 flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-charcoal-200 overflow-hidden flex flex-col"
            style={{ height: '480px' }}
          >
            {/* Header */}
            <div className="bg-honey-500 px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm">{t('chatbot.title')}</h3>
                <p className="text-white/70 text-xs">{t('chatbot.powered')}</p>
              </div>
              <Sparkles className="h-4 w-4 text-white/60" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-honey-100' : 'bg-charcoal-100'}`}>
                      {msg.role === 'user' ? <User className="h-3.5 w-3.5 text-honey-600" /> : <Bot className="h-3.5 w-3.5 text-charcoal-600" />}
                    </div>
                    <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-honey-500 text-white rounded-br-md' : 'bg-charcoal-50 text-charcoal-700 rounded-bl-md'}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-full bg-charcoal-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-3.5 w-3.5 text-charcoal-600" />
                  </div>
                  <div className="bg-charcoal-50 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-charcoal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-charcoal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-charcoal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {[t('chatbot.quickReplies.verify'), t('chatbot.quickReplies.what'), t('chatbot.quickReplies.report'), t('chatbot.quickReplies.tips')].map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="px-3 py-1.5 rounded-full bg-honey-50 text-honey-700 text-xs font-medium border border-honey-200 hover:bg-honey-100 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-charcoal-100">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('chatbot.placeholder')}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-charcoal-50 text-sm text-charcoal-800 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-honey-400"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-honey-500 hover:bg-honey-600 disabled:bg-charcoal-200 text-white disabled:text-charcoal-400 flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
