import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { featuredProduct } from '@/data/products'

const ease = [0.22, 1, 0.36, 1]

/* Same entrance vocabulary as the collection, for cohesion */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.2 } },
}
const maskLine = {
  hidden: { y: '115%' },
  show:   { y: '0%', transition: { duration: 1.2, ease } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show:   { opacity: 1, y: 0, transition: { duration: 1.0, ease } },
}
const drawLine = {
  hidden: { scaleX: 0 },
  show:   { scaleX: 1, transition: { duration: 1.2, ease, delay: 0.2 } },
}

export default function FeaturedProduct({ onAddToCart }) {
  const p = featuredProduct
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  /* Gentle parallax float for the bag */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bagY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  /* Split the name into two lines for the curtain reveal */
  const [firstWord, ...rest] = p.name.split(' ')
  const restName = rest.join(' ')

  return (
    <section
      ref={ref}
      data-nav-theme="light"
      className="relative flex flex-col md:flex-row min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] md:h-[calc(100vh-5rem)] overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      {/* Left: the bag floating on a soft cream stage */}
      <div className="md:w-1/2 relative flex items-center justify-center min-h-[78vw] md:min-h-0 overflow-hidden">
        {/* Soft halo lifting the bag off the cream */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(closest-side at 50% 44%, rgba(255,255,255,0.75), rgba(255,255,255,0) 72%)' }}
        />
        <motion.img
          src={p.image}
          alt={p.name}
          style={{ y: bagY, filter: 'drop-shadow(0 34px 44px rgba(50,25,8,0.28))' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.3, ease }}
          className="relative w-[72%] md:w-[68%] max-w-[520px] object-contain"
        />
      </div>

      {/* Right: editorial text */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="md:w-1/2 flex flex-col justify-center px-10 md:px-16 lg:px-24 py-16"
      >
        {/* Eyebrow with drawing gold hairline */}
        <div className="flex items-center gap-4 mb-7">
          <motion.span variants={drawLine} className="block h-px w-12 bg-gold origin-left" />
          <motion.p variants={fadeUp} className="label-upper text-gold tracking-widest3">
            Pezzo in Evidenza
          </motion.p>
        </div>

        {/* Name — two mask-revealed lines (curtain) */}
        <h2
          className="font-cormorant font-light text-brown-dark leading-[1.05] mb-6"
          style={{ fontSize: 'clamp(40px, 4.6vw, 68px)' }}
        >
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span variants={maskLine} className="block">{firstWord}</motion.span>
          </span>
          {restName && (
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span variants={maskLine} className="block italic text-gold">{restName}</motion.span>
            </span>
          )}
        </h2>

        {/* Material whisper */}
        <motion.p variants={fadeUp} className="label-upper text-brown-dark/45 tracking-widest2 mb-7">
          {p.material}
        </motion.p>

        {/* Italic description */}
        <motion.p
          variants={fadeUp}
          className="font-cormorant font-light italic text-brown-dark/80 text-xl md:text-[23px] leading-[1.7] mb-9 max-w-sm"
        >
          {p.description}
        </motion.p>

        {/* Whispered price */}
        <motion.p variants={fadeUp} className="label-upper text-brown-dark/55 tracking-widest2 mb-10">
          {p.price}
        </motion.p>

        {/* Single CTA — fill-up hover, same as the collection */}
        <motion.div variants={fadeUp}>
          <button
            onClick={() => onAddToCart(p)}
            className="group relative inline-flex items-center gap-4 overflow-hidden border border-brown-dark/40 px-10 py-4"
          >
            <span className="absolute inset-0 bg-brown-dark translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative label-upper tracking-widest2 text-brown-dark transition-colors duration-500 group-hover:text-beige-light">
              Aggiungi al Carrello
            </span>
            <svg
              className="relative w-4 h-4 text-brown-dark transition-all duration-500 group-hover:translate-x-1 group-hover:text-beige-light"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
