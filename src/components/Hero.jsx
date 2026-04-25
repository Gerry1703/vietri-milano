import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { heroImages } from '@/data/products'
import { Link } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden">
      {/* Parallax image */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: imgY }}>
        <img
          src={heroImages.primary}
          alt="VIETRI Milano — sciarpa rossa"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-black/25" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease }}
          className="font-cormorant font-light text-cream uppercase tracking-widest4 leading-none"
          style={{ fontSize: 'clamp(80px, 12vw, 160px)' }}
        >
          VIETRI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease }}
          className="label-upper text-gold mt-4 tracking-widest3"
        >
          MILANO
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9, ease }}
          className="mt-10"
        >
          <Link to="/collection" className="btn-outline-cream">
            Scopri la Collezione
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-cream/60 origin-top"
        />
      </div>
    </section>
  )
}
