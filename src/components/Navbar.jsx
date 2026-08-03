import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SearchOverlay from '@/components/SearchOverlay'
import logo from '@/assets/images/logo/gv.png'

const links = [
  { label: 'Collezione',       to: '/collection' },
  { label: 'Sciarpe',          to: '/collection?cat=sciarpe' },
  { label: 'Borse',            to: '/collection?cat=borse' },
  { logo: true,                to: '/' }, // logo GV al centro del menu
  { label: 'Chi siamo',        to: '/chi-siamo' },
  { label: 'Dove ci troviamo', to: '/dove-ci-troviamo' },
]

/* Recapiti mostrati nel menu mobile (sul desktop stanno fra le icone in alto a
   sinistra, dove sul telefono non c'è spazio).
   ATTENZIONE: il numero di telefono non è ancora stato fornito — finché PHONE
   resta vuoto la riga non viene mostrata. Meglio nessun contatto che un link che
   apre il telefono su un numero incompleto (il desktop punta a `tel:+39`). */
const EMAIL = 'info@vietrimilano.com'
const PHONE = ''

// Messaggi rotanti — visibili SOLO in cima alla home (header espanso); spariscono allo scroll.
const banners = [
  'Iscriviti alla newsletter per rimanere aggiornato sulle ultime novità',
  'Spedizione e reso gratuiti in tutta Italia',
]

export default function Navbar({ onCartOpen, cartCount, favoritesCount = 0 }) {
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'

  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [banner, setBanner] = useState(0)
  const [showMapsMenu, setShowMapsMenu] = useState(false)

  const address = 'Corso Vercelli 7, Milano'
  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank', 'noopener,noreferrer')
    setShowMapsMenu(false)
  }
  const openAppleMaps = () => {
    window.open(`https://maps.apple.com/?q=${encodeURIComponent(address)}`, '_blank', 'noopener,noreferrer')
    setShowMapsMenu(false)
  }

  // Sulla home l'header parte grande e trasparente sopra la hero scura, poi al
  // primo scroll si compatta e diventa bianco. Fuori dalla home è sempre bianco.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  // Cambiando pagina si chiudono ricerca/menu: la navbar resta sempre visibile
  // e cliccabile sopra la ricerca (vedi z-index), quindi un click su una voce
  // di menu deve poter "far uscire" anche se per qualche motivo la X non basta.
  useEffect(() => {
    setSearchOpen(false)
    setMenuOpen(false)
  }, [pathname])

  // Body scroll bloccato a menu mobile aperto.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Rotazione automatica del banner (attiva anche se nascosto, così riparte già in movimento).
  useEffect(() => {
    const id = setInterval(() => setBanner((b) => (b + 1) % banners.length), 5000)
    return () => clearInterval(id)
  }, [])

  const expanded = isHomePage && !scrolled          // header grande sopra la hero
  const light = expanded                            // testo/logo chiari sopra la hero
  const textColor = light ? 'text-cream' : 'text-brown-dark'
  const hoverColor = light ? 'hover:text-white' : 'hover:text-brown-mid'

  const utilIcon = 'w-[18px] h-[18px]'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          expanded ? 'bg-transparent' : 'bg-white border-b border-brown-dark/10'
        }`}
      >
        {/* Velatura sfumata dietro l'header espanso: mantiene leggibili testo e
            logo chiari anche quando il video hero è chiaro in cima. */}
        {expanded && (
          <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-black/45 via-black/20 to-transparent pointer-events-none -z-10" />
        )}
        {/* ───────── Riga superiore: utility · logo/nav · account ───────── */}
        <div className="relative flex items-center justify-between px-5 md:px-8 h-14 md:h-16">
          {/* Utility icons — sinistra (desktop) / hamburger (mobile) */}
          <div className="flex items-center gap-5">
            <button
              aria-label="Menu"
              onClick={() => setMenuOpen(true)}
              className={`md:hidden transition-colors duration-300 ${textColor} ${hoverColor}`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <a href="#" aria-label="Lingua" className={`hidden md:block transition-colors duration-300 ${textColor} ${hoverColor}`}>
              <svg className={utilIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>
              </svg>
            </a>
            <a href="tel:+39" aria-label="Contatti" className={`hidden md:block transition-colors duration-300 ${textColor} ${hoverColor}`}>
              <svg className={utilIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>
              </svg>
            </a>
            <a href="mailto:info@vietrimilano.com" aria-label="Email" className={`hidden md:block transition-colors duration-300 ${textColor} ${hoverColor}`}>
              <svg className={utilIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="1"/><path d="m2 6 10 7L22 6"/>
              </svg>
            </a>
            <div className="relative hidden md:block">
              {showMapsMenu && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)] rounded-lg flex flex-col py-1 whitespace-nowrap text-left"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={openGoogleMaps}
                    className="px-4 py-2.5 font-inter text-[12px] text-brown-dark hover:bg-brown-dark/5 transition-colors duration-200 text-left"
                  >
                    Apri in Google Maps
                  </button>
                  <button
                    onClick={openAppleMaps}
                    className="px-4 py-2.5 font-inter text-[12px] text-brown-dark hover:bg-brown-dark/5 transition-colors duration-200 text-left"
                  >
                    Apri in Mappe
                  </button>
                </div>
              )}
              <button
                onClick={() => setShowMapsMenu((v) => !v)}
                aria-label="Dove ci troviamo"
                className={`transition-colors duration-300 ${textColor} ${hoverColor}`}
              >
                <svg className={utilIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22z"/>
                  <circle cx="12" cy="9.5" r="2.5"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Centro: quando compatto mostra la nav; il logo grande vive nella riga sotto */}
          {!expanded && (
            <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 lg:gap-8">
              {links.map((l, idx) => (
                <Link
                  key={idx}
                  to={l.to}
                  className="font-jost font-light text-[11px] uppercase tracking-[0.18em] text-brown-dark hover:text-brown-mid transition-colors duration-300 whitespace-nowrap flex items-center"
                >
                  {l.logo
                    ? <img src={logo} alt="Gerardo Vietri" className="h-5 md:h-6 w-auto" />
                    : l.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Logo piccolo al centro su mobile — solo quando l'header è compatto
              (in espanso c'è già il logo grande nella riga sotto). */}
          {!expanded && (
            <Link to="/" className="md:hidden absolute left-1/2 -translate-x-1/2 flex items-center" aria-label="Home">
              <img src={logo} alt="Gerardo Vietri" className="h-6 w-auto" />
            </Link>
          )}

          {/* Account icons — destra */}
          <div className={`flex items-center gap-5 ${textColor}`}>
            <button aria-label="Cerca" onClick={() => setSearchOpen((v) => !v)} className={`transition-colors duration-300 ${hoverColor}`}>
              <svg className={utilIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            {/* Cuore/preferiti: visibile SEMPRE, anche su telefono — è l'unico
                accesso alla wishlist. */}
            <Link to="/preferiti" aria-label="Preferiti" className={`relative block transition-colors duration-300 ${hoverColor}`}>
              <svg className={utilIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
              </svg>
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 text-[9px] font-jost">{favoritesCount}</span>
              )}
            </Link>
            <a href="#" aria-label="Account" className={`hidden md:block transition-colors duration-300 ${hoverColor}`}>
              <svg className={utilIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>
              </svg>
            </a>
            <button aria-label="Carrello" onClick={onCartOpen} className={`relative transition-colors duration-300 ${hoverColor}`}>
              <svg className={utilIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 7h12l1 13H5L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 text-[9px] font-jost">{cartCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* ───────── Logo grande centrato (solo home, in cima) ─────────
            Render condizionale semplice con fade: niente animazione height:auto
            (che si misurava male prima del caricamento dei font e tagliava il logo). */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/" className="flex flex-col items-center pt-1 pb-4" aria-label="Home">
              <img
                src={logo}
                alt="Gerardo Vietri"
                className="h-10 md:h-12 w-auto"
                style={{ filter: 'invert(1)' }}
              />
              <span className="font-cormorant font-light text-cream uppercase tracking-[0.35em] text-base md:text-lg mt-2 select-none">
                Gerardo Vietri
              </span>
            </Link>
          </motion.div>
        )}

        {/* ───────── Nav centrata (solo home in cima, sotto il logo) ───────── */}
        {expanded && (
          <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 pb-3">
            {links.map((l, idx) => (
              <Link
                key={idx}
                to={l.to}
                className={`font-jost font-light uppercase hover:text-white transition-colors duration-300 whitespace-nowrap flex items-center ${
                  l.logo
                    ? 'text-[14px] md:text-[15px] tracking-[0.24em] text-cream'
                    : 'text-[11px] tracking-[0.18em] text-cream/90'
                }`}
              >
                {l.logo ? 'Milano' : l.label}
              </Link>
            ))}
          </nav>
        )}

        {/* ───────── Banner rotante — solo in cima alla home, sparisce allo scroll ───────── */}
        {expanded && (
          <div className="relative flex items-center justify-center h-9 border-t border-cream/15">
            <button
              aria-label="Precedente"
              onClick={() => setBanner((b) => (b - 1 + banners.length) % banners.length)}
              className="absolute left-5 md:left-8 text-cream hover:text-white transition-colors duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            <AnimatePresence mode="wait">
              <motion.p
                key={banner}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="font-jost font-light text-[11px] md:text-[13px] tracking-wide text-center px-10 text-cream"
              >
                {banners[banner]}
              </motion.p>
            </AnimatePresence>

            <button
              aria-label="Successivo"
              onClick={() => setBanner((b) => (b + 1) % banners.length)}
              className="absolute right-5 md:right-8 text-cream hover:text-white transition-colors duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        )}

      </header>

      {showMapsMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowMapsMenu(false)} />
      )}

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ───────── Menu mobile a schermo intero ───────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col md:hidden"
          >
            <div className="relative h-14 px-5 flex items-center border-b border-brown-dark/10 shrink-0">
              <button aria-label="Chiudi menu" onClick={() => setMenuOpen(false)} className="text-brown-dark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
              <img src={logo} alt="Gerardo Vietri" className="absolute left-1/2 -translate-x-1/2 h-6 w-auto" />
            </div>
            <nav className="flex-1 px-6 py-6 flex flex-col gap-1 overflow-y-auto">
              {links.filter((l) => !l.logo).map((l, idx) => (
                <Link
                  key={idx}
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className="font-jost font-light text-brown-dark text-base uppercase tracking-[0.15em] h-12 flex items-center border-b border-brown-dark/8"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Contatti in fondo al menu: sul desktop sono le icone telefono/mail
                in alto a sinistra, qui in chiaro perché su telefono si tocca. */}
            <div className="shrink-0 px-6 pb-8 pt-5 border-t border-brown-dark/10">
              <h3 className="font-jost font-light text-brown-dark/40 text-[11px] uppercase tracking-[0.2em] mb-4">
                Contatti
              </h3>
              <div className="flex flex-col gap-4">
                {PHONE && (
                  <a
                    href={`tel:${PHONE.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 font-inter font-light text-brown-dark text-sm"
                  >
                    <svg className="w-[17px] h-[17px] shrink-0 text-brown-mid" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>
                    </svg>
                    {PHONE}
                  </a>
                )}
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 font-inter font-light text-brown-dark text-sm"
                >
                  <svg className="w-[17px] h-[17px] shrink-0 text-brown-mid" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="1"/><path d="m2 6 10 7L22 6"/>
                  </svg>
                  {EMAIL}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
