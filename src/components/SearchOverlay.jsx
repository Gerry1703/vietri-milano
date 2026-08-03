import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { products } from '@/data/products'
import searchBg from '@/assets/images/collection-hero.jpg'

const ease = [0.22, 1, 0.36, 1]

/* Termini proposti quando la ricerca è ancora vuota — evita la pagina bianca
   e suggerisce i punti d'ingresso naturali della collezione. */
const RICERCHE_FREQUENTI = ['Sciarpe', 'Borse', 'Seta pura', 'Avorio', 'Nuovi arrivi']

function getSuggestions(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const seen = new Set()
  const out = []
  const add = (label, type) => {
    if (!label) return
    const key = label.toLowerCase()
    if (!key.includes(q) || seen.has(key)) return
    seen.add(key)
    out.push({ label, type })
  }

  products.forEach((p) => add(p.category, 'categoria'))
  products.forEach((p) => add(p.material, 'materiale'))
  products.forEach((p) => add(p.color, 'colore'))

  return out.slice(0, 6)
}

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const suggestions = getSuggestions(query)
  const isEmpty = !query.trim()

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

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease }}
      className="fixed inset-0 z-40 bg-white flex flex-col overflow-hidden"
    >
          {/* ── Foto: riempie tutto lo spazio libero sopra le scritte, senza altezza fissa ── */}
          <div className="relative flex-1 min-h-0 w-full overflow-hidden bg-brown-dark">
            <img
              src={searchBg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/45" />

            <button
              onClick={onClose}
              aria-label="Chiudi"
              className="absolute top-20 right-6 md:top-24 md:right-10 text-white/80 hover:text-white transition-colors duration-300 z-20"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
              <h2 className="font-jost font-light text-white uppercase tracking-[0.3em] text-xl md:text-2xl">
                Esplora la collezione
              </h2>
              <p className="font-cormorant font-light italic text-white/85 text-lg md:text-xl mt-4">
                Scopri creazioni senza tempo e lasciati ispirare.
              </p>

              <form onSubmit={handleSubmit} className="w-full max-w-lg mt-10">
                <div className="flex items-center gap-4 border-b border-white/40 focus-within:border-white transition-colors duration-300 pb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" className="text-white/70 shrink-0">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cosa stai cercando?"
                    className="w-full bg-transparent outline-none font-cormorant font-light text-white placeholder:text-white/60 text-xl md:text-2xl"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => { setQuery(''); inputRef.current?.focus() }}
                      aria-label="Cancella"
                      className="label-upper text-white/70 hover:text-white transition-colors duration-300 shrink-0"
                    >
                      Cancella
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isEmpty}
                  className="mt-6 font-inter uppercase text-[12px] tracking-[0.22em] border border-white text-white px-10 py-3 transition-colors duration-300 hover:bg-white hover:text-brown-dark disabled:opacity-30 disabled:pointer-events-none"
                >
                  Cerca
                </button>
              </form>
            </div>
          </div>

          {/* ── Termini: ricerche frequenti (vuoto) oppure suggeriti (digitando) — attaccati subito sotto la foto, senza spazio in mezzo ── */}
          <div className="shrink-0 px-6 md:px-12 pt-8 pb-10 md:pb-12">
            <div>
              <p className="label-upper text-brown-dark/40 tracking-widest2 mb-4">
                {isEmpty ? 'Ricerche frequenti' : 'Suggeriti'}
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {(isEmpty ? RICERCHE_FREQUENTI.map((label) => ({ label })) : suggestions).map((s) => (
                  <button
                    key={s.label}
                    onClick={() => goTo(s.label)}
                    className="font-cormorant font-light text-brown-dark/70 hover:text-brown-dark border-b border-transparent hover:border-brown-dark/40 transition-colors duration-300 pb-0.5"
                    style={{ fontSize: 'clamp(17px, 1.6vw, 22px)' }}
                  >
                    {s.label}
                  </button>
                ))}
                {!isEmpty && suggestions.length === 0 && (
                  <span className="font-cormorant font-light text-brown-dark/30" style={{ fontSize: 'clamp(17px, 1.6vw, 22px)' }}>
                    Nessun suggerimento — premi Cerca per vedere i risultati in Collezione
                  </span>
                )}
              </div>
            </div>
          </div>
    </motion.div>
  )
}
