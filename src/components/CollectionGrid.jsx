import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import collectionHero from '@/assets/images/collection-hero.jpg'

const ease = [0.22, 1, 0.36, 1]

/* Staggered orchestration for the whole text block */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.5 } },
}

/* Lines that rise from behind an overflow-hidden mask (luxury "curtain" reveal) */
const maskLine = {
  hidden: { y: '115%' },
  show:   { y: '0%', transition: { duration: 1.7, ease } },
}

/* Soft fade-up for secondary elements */
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show:   { opacity: 1, y: 0, transition: { duration: 1.5, ease } },
}

/* Gold hairline that draws from the left */
const drawLine = {
  hidden: { scaleX: 0 },
  show:   { scaleX: 1, transition: { duration: 1.6, ease, delay: 0.3 } },
}

export default function CollectionGrid() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  /* Scroll-linked parallax: image drifts & zooms, content lifts and fades */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY        = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const imageScale    = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const contentY      = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      data-nav-theme="dark"
      className="relative z-10 w-full overflow-hidden bg-brown-dark"
      style={{ height: '100vh', boxShadow: '0 -24px 60px -22px rgba(0,0,0,0.55)' }}
    >
      {/* Background — scroll parallax + slow cinematic Ken Burns zoom-in */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: imageY, scale: imageScale }}
      >
        <motion.img
          src={collectionHero}
          alt="La Collezione VIETRI"
          initial={{ scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease }}
          className="w-full h-full object-cover object-bottom"
        />
      </motion.div>

      {/* Cinematic overlays — left darkening for legibility + bottom depth + grain vignette */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex items-center h-full px-10 md:px-20"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="max-w-lg"
        >
          {/* Eyebrow label with drawing gold line */}
          <div className="flex items-center gap-4 mb-7">
            <motion.span
              variants={drawLine}
              className="block h-px w-12 bg-gold origin-left"
            />
            <motion.p variants={fadeUp} className="label-upper text-gold tracking-widest3">
              VIETRI Milano
            </motion.p>
          </div>

          {/* Heading — two mask-revealed lines */}
          <h2
            className="font-cormorant font-light text-beige-light leading-[1.04] mb-8"
            style={{ fontSize: 'clamp(46px, 5.6vw, 84px)' }}
          >
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={maskLine} className="block">Scopri</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span variants={maskLine} className="block italic text-gold/95">
                la Collezione
              </motion.span>
            </span>
          </h2>

          <motion.p
            variants={fadeUp}
            className="font-inter font-light text-beige-light/75 text-[15px] leading-relaxed mb-11 max-w-sm"
          >
            Sciarpe in seta organza e borse in pelle italiana. Ogni pezzo nasce a
            Milano, in Corso Vercelli.
          </motion.p>

          {/* CTA — fill-up hover + arrow that advances */}
          <motion.div variants={fadeUp}>
            <Link
              to="/collection"
              className="group relative inline-flex items-center gap-4 overflow-hidden border border-beige-light/50 px-10 py-4"
            >
              <span className="absolute inset-0 bg-beige-light translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative label-upper tracking-widest2 text-beige-light transition-colors duration-500 group-hover:text-brown-dark">
                Entra nella Collezione
              </span>
              <svg
                className="relative w-4 h-4 text-beige-light transition-all duration-500 group-hover:translate-x-1 group-hover:text-brown-dark"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue — pulsing vertical line, bottom-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-10 md:left-20 z-10 flex flex-col items-center gap-3"
      >
        <span className="label-upper text-beige-light/50 text-[10px] tracking-widest2 [writing-mode:vertical-rl] rotate-180">
          Scroll
        </span>
        <motion.span
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="block w-px h-10 bg-beige-light/60 origin-top"
        />
      </motion.div>
    </section>
  )
}
