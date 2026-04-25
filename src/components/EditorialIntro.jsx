import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { heroImages } from '@/data/products'

const ease = [0.22, 1, 0.36, 1]

export default function EditorialIntro() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const leftRef  = useRef(null)
  const rightRef = useRef(null)
  const leftIn   = useInView(leftRef,  { once: true, margin: '-80px' })
  const rightIn  = useInView(rightRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="bg-beige-light overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[80vh]">
        {/* Left: parallax image */}
        <motion.div
          ref={leftRef}
          initial={{ opacity: 0, x: -60 }}
          animate={leftIn ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          className="md:w-[55%] relative overflow-hidden min-h-[60vw] md:min-h-0"
        >
          <motion.img
            src={heroImages.primary}
            alt="Sciarpa VIETRI Milano"
            style={{ y: imgY }}
            className="absolute inset-0 w-full h-full object-cover object-center scale-110"
          />
        </motion.div>

        {/* Right: dark panel */}
        <motion.div
          ref={rightRef}
          initial={{ opacity: 0, x: 60 }}
          animate={rightIn ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          className="md:w-[45%] bg-brown-dark flex flex-col justify-center px-10 md:px-16 py-16 md:py-20"
        >
          <p className="font-cormorant font-light italic text-cream leading-[1.85] text-2xl md:text-[28px]">
            Ogni pezzo nasce da un gesto.<br />
            Una piega nella seta,<br />
            un nodo nel cuoio.<br />
            VIETRI non produce oggetti —<br />
            custodisce intenzioni.
          </p>

          <div className="mt-10 mb-6 w-16 h-px bg-gold" />

          <p className="label-upper text-cream/50 tracking-widest2">
            Corso Vercelli, Milano
          </p>
        </motion.div>
      </div>
    </section>
  )
}
