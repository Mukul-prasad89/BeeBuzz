import { createContext, useContext, useState, useCallback } from 'react'
import en from './en'
import hi from './hi'

const translations = { en, hi }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('beebuzz-lang') || 'en'
  })

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'hi' : 'en'
      localStorage.setItem('beebuzz-lang', next)
      return next
    })
  }, [])

  const t = useCallback((key) => {
    const keys = key.split('.')
    let value = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    if (value === undefined) {
      let fallback = translations.en
      for (const k of keys) {
        fallback = fallback?.[k]
      }
      return fallback ?? key
    }
    return value
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
