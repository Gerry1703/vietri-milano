import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
/* Venezia — red */
import veneziaModel  from '@/assets/images/scarves/venezia-2.jpg'
import veneziaFlat   from '@/assets/images/scarves/venezia-3.jpg'
import veneziaDetail from '@/assets/images/scarves/venezia-4.jpg'
/* Capri — blue */
import capriModel    from '@/assets/images/scarves/capri-model.jpg'
import capriFlat     from '@/assets/images/scarves/capri-flat.jpg'
import capriDetail   from '@/assets/images/scarves/capri-detail.jpg'
/* Ravello — sage green */
import ravelloModel  from '@/assets/images/scarves/ravello-model.jpg'
import ravelloFlat   from '@/assets/images/scarves/ravello-flat.jpg'
import ravelloDetail from '@/assets/images/scarves/ravello-detail.jpg'

const ease = [0.22, 1, 0.36, 1]

/* Same entrance vocabulary as the bag / collection, for cohesion */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show:   { opacity: 1, y: 0, transition: { duration: 1.0, ease } },
}
const maskLine = {
  hidden: { y: '115%' },
  show:   { y: '0%', transition: { duration: 1.2, ease } },
}
const drawLine = {
  hidden: { scaleX: 0 },
  show:   { scaleX: 1, transition: { duration: 1.2, ease, delay: 0.2 } },
}
const revealImg = {
  hidden: { opacity: 0, scale: 1.06 },
  show:   { opacity: 1, scale: 1, transition: { duration: 1.3, ease } },
}

/* The three foulards on show — each with its own triptych and card details */
const looks = [
  {
    id: 'look-venezia',
    name: 'Sciarpa Venezia',
    color: 'Rosso Borgogna',
    swatch: '#8E1F2B',
    material: 'Seta pura',
    price: '€ 290',
    model: veneziaModel, flat: veneziaFlat, detail: veneziaDetail,
  },
  {
    id: 'look-capri',
    name: 'Sciarpa Capri',
    color: 'Azzurro Mediterraneo',
    swatch: '#2F6CA8',
    material: 'Twill di seta',
    price: '€ 320',
    model: capriModel, flat: capriFlat, detail: capriDetail,
  },
  {
    id: 'look-ravello',
    name: 'Sciarpa Ravello',
    color: 'Verde Salvia',
    swatch: '#8E9B66',
    material: 'Twill di seta',
    price: '€ 340',
    model: ravelloModel, flat: ravelloFlat, detail: ravelloDetail,
  },
]

const toProduct = (l) => ({
  id: l.id, name: l.name, price: l.price, image: l.flat,
  material: l.material, category: 'Sciarpe',
})

export default function Lookbook({ onAddToCart }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  /* Card follows whichever foulard's model shot is fully on screen */
  const scrollerRef = useRef(null)
  const modelRefs = useRef([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const root = scrollerRef.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.85) {
            const idx = Number(e.target.dataset.index)
            if (!Number.isNaN(idx)) setActive(idx)
          }
        })
      },
      { root, threshold: [0.6, 0.85, 1] }
    )
    modelRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const a = looks[active]

  return (
    <section
      ref={ref}
      data-nav-theme="light"
      className="relative overflow-hidden pt-10 md:pt-12 pb-12 md:pb-16"
      style={{ background: '#FFFFFF' }}
    >
      {/* Editorial header — maison register */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="flex flex-col items-center text-center mt-10 md:mt-14 mb-8 md:mb-12 px-6"
      >
        <div className="flex items-center gap-5 md:gap-10">
          <motion.span variants={drawLine} className="block h-px w-8 md:w-28 bg-gold/45 origin-right" />
          <h2
            className="font-cormorant font-light uppercase text-brown-dark whitespace-nowrap leading-none overflow-hidden pb-[0.08em]"
            style={{ fontSize: 'clamp(26px, 3.4vw, 50px)', letterSpacing: '0.08em' }}
          >
            <motion.span variants={maskLine} className="block">Lookbook</motion.span>
          </h2>
          <motion.span variants={drawLine} className="block h-px w-8 md:w-28 bg-gold/45 origin-left" />
        </div>
        <motion.p
          variants={fadeUp}
          className="font-cormorant font-light italic text-gold text-lg md:text-2xl mt-3 md:mt-4"
        >
          Il Foulard
        </motion.p>
      </motion.div>

      {/* Triptych ×3 + dynamic product card */}
      <div className="relative mx-auto max-w-screen-2xl px-4 md:px-6">
        {/* Scroll hint */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex items-center justify-end gap-3 mb-4 pr-1 text-brown-dark/55"
        >
          <span className="label-upper tracking-widest2 text-xs">Scorri</span>
          <motion.svg
            animate={{ x: [0, 7, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
          >
            <line x1="4" y1="12" x2="20" y2="12" />
            <polyline points="13 5 20 12 13 19" />
          </motion.svg>
        </motion.div>

        {/* Horizontal scroll gallery — model / flatlay / detail per foulard */}
        <motion.div
          ref={scrollerRef}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory pb-2
                     [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {looks.map((l, i) => (
            <div key={l.id} className="flex gap-3 md:gap-4 shrink-0">
              {/* Lifestyle — model (drives the card) */}
              <div
                ref={(el) => (modelRefs.current[i] = el)}
                data-index={i}
                className="snap-start shrink-0 w-[85vw] md:w-[48vw] lg:w-[40vw] overflow-hidden"
              >
                <motion.img
                  variants={revealImg}
                  src={l.model}
                  alt={`${l.name} indossata`}
                  className="w-full h-[46vh] md:h-[60vh] object-cover object-center"
                />
              </div>
              {/* Product — flatlay */}
              <div className="snap-start shrink-0 w-[85vw] md:w-[48vw] lg:w-[40vw] overflow-hidden">
                <motion.img
                  variants={revealImg}
                  src={l.flat}
                  alt={`${l.name} distesa`}
                  className="w-full h-[46vh] md:h-[60vh] object-cover object-center"
                />
              </div>
              {/* Detail — macro */}
              <div className="snap-start shrink-0 w-[85vw] md:w-[48vw] lg:w-[40vw] overflow-hidden">
                <motion.img
                  variants={revealImg}
                  src={l.detail}
                  alt={`Dettaglio ${l.name}`}
                  className="w-full h-[46vh] md:h-[60vh] object-cover object-center"
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Floating product card — swaps to the foulard currently on screen */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          transition={{ delay: 0.5 }}
          className="relative mt-6 mx-auto max-w-md
                     md:absolute md:mt-0 md:bottom-10 md:right-6 lg:right-10 md:max-w-sm
                     bg-[#FAF4EA]/95 backdrop-blur-sm border border-brown-dark/10 shadow-2xl
                     px-8 py-9 md:px-10 md:py-11 z-20"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <span className="block h-px w-8 bg-gold" />
                <p className="label-upper text-gold tracking-widest3 text-[11px]">Foulard in Seta</p>
              </div>

              {/* Name */}
              <h3
                className="font-cormorant font-light text-brown-dark leading-[1.05] mb-5"
                style={{ fontSize: 'clamp(28px, 2.4vw, 38px)' }}
              >
                {a.name}
              </h3>

              {/* Colour row + swatch */}
              <div className="flex items-center justify-between border-t border-brown-dark/10 pt-4 mb-3">
                <span className="label-upper text-brown-dark/45 tracking-widest2 text-[11px]">Colore</span>
                <div className="flex items-center gap-3">
                  <span className="font-cormorant italic text-brown-dark/80 text-lg">{a.color}</span>
                  <span
                    className="block w-5 h-5 rounded-full ring-1 ring-offset-2 ring-offset-[#FAF4EA] ring-brown-dark/30"
                    style={{ background: a.swatch }}
                  />
                </div>
              </div>

              {/* Material + price */}
              <div className="flex items-center justify-between border-t border-brown-dark/10 pt-4 mb-8">
                <span className="label-upper text-brown-dark/45 tracking-widest2 text-[11px]">{a.material}</span>
                <span className="label-upper text-brown-dark/70 tracking-widest2">{a.price}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTA — adds the foulard currently shown */}
          <button
            onClick={() => onAddToCart(toProduct(a))}
            className="group relative inline-flex w-full items-center justify-center gap-4 overflow-hidden border border-brown-dark/40 px-8 py-4"
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
      </div>
    </section>
  )
}
