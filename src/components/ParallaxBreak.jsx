import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import borsaFlatlay from '@/assets/images/bags/borsa-flatlay.jpg'

export default function ParallaxBreak() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height: '60vh' }}>
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: imgY }}>
        <img
          src={borsaFlatlay}
          alt="Fatto in Italia — VIETRI Milano"
          className="w-full h-full object-cover object-center scale-125"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex items-center justify-center h-full">
        <h2
          className="font-cormorant font-light text-cream uppercase tracking-[0.3em] text-center"
          style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
        >
          Fatto in Italia
        </h2>
      </div>
    </section>
  )
}
