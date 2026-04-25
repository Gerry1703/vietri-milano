import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const materials = [
  {
    label: 'Seta Pura',
    desc: 'Tessuta a mano in Italia',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
        <path d="M20 4 C10 10, 10 30, 20 36 C30 30, 30 10, 20 4Z" />
        <path d="M8 15 C14 18, 26 18, 32 15" />
        <path d="M8 25 C14 22, 26 22, 32 25" />
      </svg>
    ),
  },
  {
    label: 'Pelle Italiana',
    desc: 'Concia naturale, grana a mano',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
        <rect x="6" y="12" width="28" height="18" rx="2" />
        <path d="M6 18 L34 18" />
        <path d="M14 18 L14 30" />
        <circle cx="20" cy="15" r="2" />
      </svg>
    ),
  },
  {
    label: 'Fatto a Mano',
    desc: 'Ogni pezzo è unico',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
        <path d="M20 8 L22 16 L30 16 L24 21 L26 30 L20 25 L14 30 L16 21 L10 16 L18 16 Z" />
      </svg>
    ),
  },
]

export default function MaterialsStrip() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-beige-light py-20 md:py-24 px-6">
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
    </section>
  )
}
