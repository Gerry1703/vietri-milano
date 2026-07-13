import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { products } from '@/data/products'

const ease = [0.22, 1, 0.36, 1]

function getSuggestions(query) {
  if (!query.trim()) return []
  const q = query.toLowerCase()

  const seen = new Set()
  // buckets: 0=category starts, 1=name starts, 2=color starts, 3=contains
  const buckets = [[], [], [], []]

  const add = (label, type, bucket) => {
    const key = label.toLowerCase()
    if (!key.includes(q)) return
    if (seen.has(key)) return
    seen.add(key)
    const b = key.startsWith(q) ? bucket : 3
    buckets[b].push({ label, type })
  }

  products.forEach((p) => {
    add(p.category, 'categoria', 0)
    if (p.color) add(p.color, 'colore', 2)
  })

  return [...buckets[0], ...buckets[1], ...buckets[2], ...buckets[3]].slice(0, 8)
}

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const suggestions = getSuggestions(query)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60)
    } else {
      setQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const goTo = (term) => {
    onClose()
    navigate(`/collection?search=${encodeURIComponent(term)}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    goTo(query.trim())
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease }}
          className="fixed inset-0 z-[70] bg-white flex flex-col"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 md:px-12 h-16 md:h-20 border-b border-brown-dark/8 shrink-0">
            <span className="label-upper text-brown-dark/30 tracking-widest2">Cerca</span>
            <button onClick={onClose} aria-label="Chiudi" className="text-brown-dark/30 hover:text-brown-dark transition-colors duration-200">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="px-6 md:px-12 py-8 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cosa stai cercando?"
              className="w-full bg-transparent outline-none font-cormorant font-light text-brown-dark placeholder:text-brown-dark/20"
              style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}
            />
          </form>

          {/* Suggestions */}
          <div className="px-6 md:px-12 flex-1">
            {query.trim() && suggestions.length === 0 && (
              <p className="font-cormorant italic text-brown-dark/30 text-lg">
                Nessun suggerimento per &ldquo;{query}&rdquo;
              </p>
            )}

            <AnimatePresence mode="wait">
              {suggestions.length > 0 && (
                <motion.ul
                  key={query}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="flex flex-col gap-1"
                >
                  {suggestions.map((s) => (
                    <li key={s.label}>
                      <button
                        onClick={() => goTo(s.label)}
                        className="group flex items-center gap-4 py-2 text-left w-full"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brown-dark/20 shrink-0 group-hover:text-gold transition-colors duration-200">
                          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                        <span className="font-cormorant font-light text-brown-dark/70 group-hover:text-brown-dark transition-colors duration-200" style={{ fontSize: 'clamp(18px, 2vw, 26px)' }}>
                          {s.label}
                        </span>
                        <span className="label-upper text-brown-dark/20 text-[9px] tracking-widest ml-1 group-hover:text-gold/60 transition-colors duration-200">
                          {s.type}
                        </span>
                      </button>
                    </li>
                  ))}

                  {/* Free-text search CTA */}
                  <li className="pt-4 mt-2 border-t border-brown-dark/8">
                    <button
                      onClick={handleSubmit}
                      className="group flex items-center gap-4 py-2 text-left w-full"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brown-dark/20 shrink-0 group-hover:text-gold transition-colors duration-200">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                      <span className="font-cormorant font-light text-brown-dark/40 group-hover:text-brown-dark transition-colors duration-200" style={{ fontSize: 'clamp(18px, 2vw, 26px)' }}>
                        Cerca &ldquo;{query}&rdquo; nella collezione
                      </span>
                    </button>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
