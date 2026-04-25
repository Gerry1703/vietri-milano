import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const words = 'VIENI A TROVARCI'.split(' ')

export default function StoreBanner() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="bg-brown-dark flex flex-col items-center justify-center text-center px-6 py-24 md:py-32"
      style={{ minHeight: '50vh' }}
    >
      {/* Animated word-by-word heading */}
      <h2
        className="font-cormorant font-light text-cream uppercase tracking-[0.2em] flex flex-wrap justify-center gap-x-5 gap-y-2"
        style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
      >
        {words.map((word, i) => (
          <motion.span
            key={word + i}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.15, ease }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {/* Map pin */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.7, ease }}
        className="flex items-center gap-3 mt-10"
      >
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" stroke="#B8975A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 1C4.69 1 2 3.69 2 7c0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6Z" />
          <circle cx="8" cy="7" r="2" />
        </svg>
        <p className="label-upper text-gold tracking-widest2">
          Corso Vercelli, Milano &nbsp;·&nbsp; Lun–Sab 10:00–19:30
        </p>
      </motion.div>
    </section>
  )
}
