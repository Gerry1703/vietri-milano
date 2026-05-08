import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const ref = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    const attempt = () => v.play().catch(() => {})
    if (v.readyState >= 3) {
      attempt()
    } else {
      v.addEventListener('canplay', attempt, { once: true })
    }
    return () => v.removeEventListener('canplay', attempt)
  }, [])

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        >
          <source src="/vietri-hero-boomerang.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease }}
          className="font-cormorant font-light text-cream uppercase tracking-widest4 leading-none"
          style={{ fontSize: 'clamp(48px, 12vw, 160px)' }}
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
