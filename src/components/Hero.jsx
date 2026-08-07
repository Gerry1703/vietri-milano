import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // React non rende l'attributo `muted`: lo forzo così iOS/Safari permettono
    // l'autoplay inline.
    v.muted = true
    v.defaultMuted = true
    v.setAttribute('muted', '')
    const attempt = () => v.play().catch(() => {})
    if (v.readyState >= 3) attempt()
    else v.addEventListener('canplay', attempt, { once: true })
    return () => v.removeEventListener('canplay', attempt)
  }, [])

  return (
    <section data-nav-theme="dark" className="relative h-svh md:h-screen w-full overflow-hidden snap-start snap-always">
      {/* Video di sfondo */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        >
          <source src="/vietri-hero-boomerang.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Contenuto centrale */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
          className="font-jost font-light text-cream tracking-wide leading-tight"
          style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}
        >
          Radici Mediterranee
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease }}
          className="font-jost font-light text-cream/90 text-sm md:text-base tracking-[0.1em] mt-3"
        >
          Nuova Collezione
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease }}
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12 mt-9"
        >
          {[
            { label: 'Collezione Sciarpe', to: '/collection?cat=sciarpe' },
            { label: 'Collezione Borse',   to: '/collection?cat=borse' },
          ].map((cta) => (
            <Link
              key={cta.label}
              to={cta.to}
              className="group font-jost font-light text-cream text-[13px] uppercase tracking-[0.2em]"
            >
              {cta.label}
              <span className="block h-px bg-cream/70 mt-1.5 origin-left transition-transform duration-500 group-hover:scale-x-110" />
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Dots di paginazione — destra */}
      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`w-[6px] h-[6px] rounded-full ${i === 0 ? 'bg-cream' : 'bg-cream/40'}`}
          />
        ))}
      </div>

      {/* Freccia scroll — basso.
          Il centraggio orizzontale (classe Tailwind -translate-x-1/2) e il
          rimbalzo verticale (Framer Motion) vivono su due div separati: sono
          entrambi transform sulla stessa proprietà CSS, e se stanno sullo
          stesso elemento lo style inline che Framer Motion scrive per animare
          sovrascrive per intero la classe invece di aggiungersi — la freccia
          restava sempre spostata a destra di metà della sua larghezza. */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 text-cream/80">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
