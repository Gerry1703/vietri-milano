import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import vietriLabel from '@/assets/images/scarves/vietri-label-hero.png'

export default function ParallaxBreak() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height: '60vh' }}>
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: imgY }}>
        <img
          src={vietriLabel}
          alt="Fatto in Italia — VIETRI Milano"
          className="w-full h-full object-cover object-center scale-125"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/45" />
    </section>
  )
}
