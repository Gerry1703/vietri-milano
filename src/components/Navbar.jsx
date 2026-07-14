import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SearchOverlay from '@/components/SearchOverlay'

const ease = [0.22, 1, 0.36, 1]

const links = [
  { label: 'Collezione', to: '/collection' },
  { label: 'Sciarpe',    to: '/collection?cat=sciarpe' },
  { label: 'Borse',      to: '/collection?cat=borse' },
]

export default function Navbar({ onCartOpen, cartCount }) {
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'
  const navH = 80

  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const initialTheme = isHomePage ? 'dark' : 'light'
  const [theme, setTheme] = useState(initialTheme)
  const themeRef = useRef(initialTheme)

  // Reset theme synchronously before paint to avoid white-on-white flash on navigation.
  useLayoutEffect(() => {
    const reset = isHomePage ? 'dark' : 'light'
    themeRef.current = reset
    setTheme(reset)
  }, [isHomePage, pathname])

  // Set up scroll / IntersectionObserver listeners after paint.
  useEffect(() => {
    if (isHomePage) {
      // On the home page the hero is sticky and sections overlap — scroll position
      // is more reliable than IntersectionObserver for detecting which layer is on top.
      const onScroll = () => {
        const next = window.scrollY >= window.innerHeight * 0.85 ? 'light' : 'dark'
        if (next !== themeRef.current) {
          themeRef.current = next
          setTheme(next)
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    // On other pages use IntersectionObserver — no sticky overlap issues.
    const sections = document.querySelectorAll('[data-nav-theme]')
    if (!sections.length) return
    let io
    const build = () => {
      if (io) io.disconnect()
      const bottom = Math.max(0, window.innerHeight - navH - 1)
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return
            const next = e.target.getAttribute('data-nav-theme')
            if (next !== themeRef.current) {
              themeRef.current = next
              setTheme(next)
            }
          })
        },
        { rootMargin: `-${navH}px 0px -${bottom}px 0px`, threshold: 0 }
      )
      sections.forEach((s) => io.observe(s))
    }
    build()
    window.addEventListener('resize', build)
    return () => {
      if (io) io.disconnect()
      window.removeEventListener('resize', build)
    }
  }, [isHomePage, pathname])

  const lightSurface = theme === 'light'
  const textClass = lightSurface
    ? 'text-brown-dark/80 hover:text-brown-dark'
    : 'text-cream/80 hover:text-cream'
  const wordmarkClass = lightSurface ? 'text-brown-dark' : 'text-cream'

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500 bg-transparent">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* Wordmark */}
          <Link to="/" className={`font-cormorant font-light tracking-widest4 text-xl md:text-2xl select-none transition-colors duration-300 ${wordmarkClass}`}>
            VIETRI
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-5">
            {/* Home — solo fuori dalla home */}
            {!isHomePage && (
              <Link to="/" aria-label="Home" className={`transition-colors duration-300 ${textClass}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
                  <polyline points="9 21 9 12 15 12 15 21"/>
                </svg>
              </Link>
            )}

            {/* Search */}
            <button aria-label="Cerca" onClick={() => setSearchOpen(true)} className={`transition-colors duration-300 ${textClass}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            {/* Cart */}
            <button
              aria-label="Carrello"
              onClick={onCartOpen}
              className={`relative transition-colors duration-300 ${textClass}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gold text-brown-dark text-[9px] font-inter font-light flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Menu */}
            <button
              aria-label="Menu"
              className={`transition-colors duration-300 ${textClass}`}
              onClick={() => setMenuOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-[60] bg-beige-warm flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-beige-light/60 hover:text-beige-light transition-colors"
              aria-label="Chiudi menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div className="flex flex-col items-center gap-10">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setMenuOpen(false)}
                    className="font-cormorant font-light text-beige-light text-4xl tracking-widest2 hover:text-gold transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="absolute bottom-10 label-upper text-beige-light/40"
            >
              Corso Vercelli, Milano
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
