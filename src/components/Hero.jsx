import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const ref = useRef(null)
  const videoRef = useRef(null)
  const reduceMotion = useReducedMotion()

  // Scroll-linked "retreat": as the collection rises over the hero, the text
  // scales down a touch and a veil dims the scene — giving depth, not a flat cover.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const textScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 0.94])
  const dim       = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 0.55])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // React doesn't render the `muted` HTML attribute; force it so iOS/Safari
    // allow inline autoplay (it gates on the muted attribute being present).
    v.muted = true
    v.defaultMuted = true
    v.setAttribute('muted', '')
    const attempt = () => v.play().catch(() => {})
    if (v.readyState >= 3) {
      attempt()
    } else {
      v.addEventListener('canplay', attempt, { once: true })
    }
    return () => v.removeEventListener('canplay', attempt)
  }, [])

  return (
    <section ref={ref} data-nav-theme="dark" className="sticky top-0 h-screen overflow-hidden z-0">
      {/* Video background — deliberately NOT inside a transformed container:
          Safari fails to paint <video> when an ancestor has a transform. */}
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
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Content */}
      <motion.div
        style={{ scale: textScale }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 origin-center"
      >
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
          className="label-upper text-gold mt-4 tracking-widest3 text-sm"
        >
          MILANO
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <motion.div
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-cream/60 origin-top"
        />
      </div>

      {/* Darkening veil — fades in as the collection panel covers the hero */}
      <motion.div
        style={{ opacity: dim }}
        className="absolute inset-0 bg-black pointer-events-none z-20"
      />
    </section>
  )
}
