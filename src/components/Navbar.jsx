import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const links = [
  { label: 'Collezione', to: '/collection' },
  { label: 'Sciarpe',    to: '/collection?cat=sciarpe' },
  { label: 'Borse',      to: '/collection?cat=borse' },
]

export default function Navbar({ onCartOpen, cartCount }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const isHomePage    = pathname === '/'
  const isProductPage = pathname.startsWith('/product/')
  const useDarkText   = !isHomePage && !isProductPage && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const textClass = useDarkText
    ? 'text-brown-dark/80 hover:text-brown-dark'
    : 'text-cream/80 hover:text-cream'

  const wordmarkClass = useDarkText ? 'text-brown-dark' : 'text-cream'

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || isProductPage
            ? 'bg-[rgba(44,26,14,0.95)] backdrop-blur-[12px]'
            : useDarkText
              ? 'bg-beige-light/80 backdrop-blur-[8px]'
              : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* Wordmark */}
          <Link to="/" className={`font-cormorant font-light tracking-widest4 text-xl md:text-2xl select-none transition-colors duration-300 ${wordmarkClass}`}>
            VIETRI
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {links.map(l => (
              <Link
                key={l.label}
                to={l.to}
                className={`label-upper transition-colors duration-300 ${textClass}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <button aria-label="Cerca" className={`transition-colors duration-300 ${textClass}`}>
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

            {/* Hamburger (mobile) */}
            <button
              aria-label="Menu"
              className={`md:hidden transition-colors duration-300 ${textClass}`}
              onClick={() => setMenuOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-[60] bg-brown-dark flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-cream/60 hover:text-cream transition-colors"
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
                    className="font-cormorant font-light text-cream text-4xl tracking-widest2 hover:text-gold transition-colors duration-300"
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
              className="absolute bottom-10 label-upper text-cream/40"
            >
              Corso Vercelli, Milano
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
