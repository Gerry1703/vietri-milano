import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gvLogo from '@/assets/images/logo/gv.png'

const ease = [0.22, 1, 0.36, 1]

const materials = [
  {
    label: 'Da oltre 50 anni',
    desc: 'Esperienza nel settore',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
        <circle cx="20" cy="20" r="14" />
        <path d="M20 12 L20 20 L26 24" />
      </svg>
    ),
  },
  {
    label: 'Prima Qualità',
    desc: 'Materiali pregiati e selezionati',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
        <path d="M20 6 L23.5 15 L33 15 L25.5 21 L28.5 31 L20 25 L11.5 31 L14.5 21 L7 15 L16.5 15 Z" />
      </svg>
    ),
  },
  {
    label: 'Based in Milan',
    desc: 'Corso Vercelli, Milano',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
        <path d="M20 34 C20 34, 30 24, 30 16 A10 10 0 1 0 10 16 C10 24, 20 34, 20 34 Z" />
        <circle cx="20" cy="16" r="3.5" />
      </svg>
    ),
  },
]

export default function MaterialsStrip() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const dividerRef = useRef(null)
  const dividerInView = useInView(dividerRef, { once: true, margin: '-40px' })

  return (
    <section ref={ref} data-nav-theme="light" className="relative z-10 pt-12 md:pt-16 pb-20 md:pb-24 px-6" style={{ background: '#FFFFFF' }}>
      <div className="max-w-screen-md mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
        {materials.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: i * 0.2, ease }}
            className="flex flex-col items-center gap-4"
          >
            <div className="text-brown-dark">{m.icon}</div>
            <h3 className="label-upper text-brown-dark tracking-widest2 text-xs">{m.label}</h3>
            <p className="font-cormorant font-light italic text-brown-mid text-lg leading-relaxed">{m.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Boundary divider — the line itself splits cream (above) from white (below) */}
      <div
        ref={dividerRef}
        className="absolute left-0 right-0 bottom-0 translate-y-1/2 z-10 flex items-center gap-5 px-6 md:px-10"
      >
        <motion.span
          initial={{ scaleX: 0 }}
          animate={dividerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, ease, delay: 0.15 }}
          className="h-px flex-1 bg-brown-dark/20 origin-right"
        />
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={dividerInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease }}
          className="relative flex items-center justify-center shrink-0"
        >
          <span className="block w-9 h-9 rotate-45 border border-gold/70" />
          <img src={gvLogo} alt="" aria-hidden="true" className="absolute w-[18px] h-auto" />
        </motion.span>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={dividerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, ease, delay: 0.15 }}
          className="h-px flex-1 bg-brown-dark/20 origin-left"
        />
      </div>
    </section>
  )
}
