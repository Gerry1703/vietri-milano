import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import collectionHero from '@/assets/images/collection-hero.jpg'

const ease = [0.22, 1, 0.36, 1]

export default function CollectionGrid() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: 'calc(100vh - 5rem)' }}
    >
      {/* Background photo — cropped to top to hide the floor */}
      <img
        src={collectionHero}
        alt="La Collezione VIETRI"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Gradient overlay — darkens left side for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />

      {/* Content — left aligned, vertically centered */}
      <div className="relative z-10 flex items-center h-full px-10 md:px-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease }}
          className="max-w-md"
        >
          <p className="label-upper text-gold tracking-widest3 mb-4">
            VIETRI Milano
          </p>

          <h2
            className="font-cormorant font-light text-beige-light leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
          >
            Scopri<br />
            <span className="italic">la Collezione</span>
          </h2>

          <p className="font-inter font-light text-beige-light/70 text-sm leading-relaxed mb-10 max-w-xs">
            Sciarpe in seta organza e borse in pelle italiana. Ogni pezzo nasce a Milano, in Corso Vercelli.
          </p>

          <Link
            to="/collection"
            className="inline-block label-upper text-beige-light border border-beige-light/60 px-8 py-3 tracking-widest2 hover:bg-beige-light hover:text-brown-dark transition-all duration-300"
          >
            Entra nella Collezione
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
