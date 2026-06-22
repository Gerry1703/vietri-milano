import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import sciarpaRossaAlt  from '@/assets/images/scarves/sciarpa-rossa-alt.png'
import sciarpaRossaGrid from '@/assets/images/scarves/sciarpa-rossa-grid.png'
import sciarpaArancio   from '@/assets/images/scarves/sciarpa-arancio.png'
import sciarpaVietri    from '@/assets/images/scarves/sciarpa-vietri.png'
import venezia2         from '@/assets/images/scarves/venezia-2.jpg'
import venezia3         from '@/assets/images/scarves/venezia-3.jpg'
import venezia4         from '@/assets/images/scarves/venezia-4.jpg'
import borsaVerde       from '@/assets/images/bags/borsa-verde.png'
import borsaBrera       from '@/assets/images/bags/borsa-brera.png'
import gvLogo           from '@/assets/images/logo/gv.png'

const ease = [0.22, 1, 0.36, 1]

/* Same editorial entrance vocabulary as the Lookbook, for cohesion */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
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

const tiles = [
  { src: venezia4,         alt: 'Sciarpa Venezia indossata' },
  { src: borsaBrera,       alt: 'Borsa Brera'               },
  { src: sciarpaRossaGrid, alt: 'Sciarpa Venezia'           },
  { src: borsaVerde,       alt: 'Borsa Navigli'             },
  { src: venezia2,         alt: 'Dettaglio seta'            },
  { src: sciarpaArancio,   alt: 'Sciarpa Cortina'           },
  { src: sciarpaVietri,    alt: 'Sciarpa Vietri'            },
  { src: venezia3,         alt: 'Sciarpa Venezia piegata'   },
  { src: sciarpaRossaAlt,  alt: 'Sciarpa Bellagio'          },
]

const N = tiles.length

/* Signed shortest distance from the active index, with wrap-around */
function rel(i, index) {
  let d = i - index
  if (d >  N / 2) d -= N
  if (d < -N / 2) d += N
  return d
}

/* Restrained hand-of-cards fan: centre upright & largest, sides splay out
   around a low pivot (transformOrigin bottom) with small rotations. */
function fanState(d) {
  const a = Math.abs(d)
  const s = Math.sign(d)
  if (a === 0)
    return { x: '0%',          y: '0%',  rotate: 0,      scale: 1,    opacity: 1,    zIndex: 50, filter: 'blur(0px) brightness(1)',     pe: 'auto' }
  if (a === 1)
    return { x: `${s * 40}%`,  y: '4%',  rotate: s * 7,  scale: 0.84, opacity: 0.62, filter: 'blur(0.4px) brightness(0.95)', zIndex: 30, pe: 'auto' }
  if (a === 2)
    return { x: `${s * 70}%`,  y: '11%', rotate: s * 13, scale: 0.68, opacity: 0.28, filter: 'blur(1.4px) brightness(0.9)',  zIndex: 10, pe: 'auto' }
  return   { x: `${s * 92}%`,  y: '17%', rotate: s * 18, scale: 0.6,  opacity: 0,    filter: 'blur(3px) brightness(0.85)',   zIndex: 0,  pe: 'none' }
}

export default function InstagramTeaser() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [index, setIndex] = useState(0)

  const wrap = (i) => ((i % N) + N) % N
  const go   = (i) => setIndex(wrap(i))
  const next = () => setIndex((v) => wrap(v + 1))
  const prev = () => setIndex((v) => wrap(v - 1))

  const onDragEnd = (_e, info) => {
    if (info.offset.x < -60 || info.velocity.x < -350) next()
    else if (info.offset.x > 60 || info.velocity.x > 350) prev()
  }

  return (
    <section
      ref={ref}
      data-nav-theme="light"
      className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex flex-col items-center justify-between pt-12 md:pt-16 pb-2 md:pb-3 overflow-x-clip"
      style={{ background: '#FFFFFF' }}
    >
      {/* Header — centred, maison register (mirrors the Lookbook) */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="flex flex-col items-center text-center px-6"
      >
        <div className="flex items-center gap-5 md:gap-10">
          <motion.span variants={drawLine} className="block h-px w-8 md:w-24 bg-gold/45 origin-right" />
          <h2
            className="font-cormorant font-light uppercase text-brown-dark whitespace-nowrap leading-none overflow-hidden pb-[0.08em]"
            style={{ fontSize: 'clamp(26px, 3.4vw, 50px)', letterSpacing: '0.08em' }}
          >
            <motion.span variants={maskLine} className="block">Instagram</motion.span>
          </h2>
          <motion.span variants={drawLine} className="block h-px w-8 md:w-24 bg-gold/45 origin-left" />
        </div>
        <motion.p
          variants={fadeUp}
          className="font-cormorant font-light italic text-gold text-lg md:text-2xl mt-3 md:mt-4"
        >
          @vietrimilano
        </motion.p>
      </motion.div>

      {/* Fan carousel stage */}
      <div
        className="relative w-full flex items-center justify-center select-none"
        style={{ height: 'clamp(430px, 60vh, 600px)' }}
      >
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          drag="x"
          dragSnapToOrigin
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragEnd={onDragEnd}
          style={{ touchAction: 'pan-y' }}
        >
          {tiles.map((tile, i) => {
            const d = rel(i, index)
            const f = fanState(d)
            const isCenter = d === 0
            return (
              <motion.div
                key={i}
                className="absolute inset-0 m-auto overflow-hidden"
                style={{
                  width: 'clamp(218px, 23vw, 320px)',
                  aspectRatio: '4 / 5',
                  transformOrigin: '50% 100%',
                  zIndex: f.zIndex,
                  pointerEvents: f.pe,
                  boxShadow: isCenter ? '0 36px 72px -28px rgba(59,36,21,0.45)' : 'none',
                  cursor: isCenter ? 'default' : 'pointer',
                }}
                animate={{ x: f.x, y: f.y, rotate: f.rotate, scale: f.scale, opacity: f.opacity, filter: f.filter }}
                transition={{ duration: 0.7, ease }}
                onClick={() => { if (!isCenter) go(i) }}
              >
                {isCenter ? (
                  <a
                    href="https://instagram.com/vietrimilano"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block w-full h-full"
                    draggable={false}
                  >
                    <img
                      src={tile.src}
                      alt={tile.alt}
                      draggable={false}
                      className="w-full h-full object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                    />
                  </a>
                ) : (
                  <img
                    src={tile.src}
                    alt={tile.alt}
                    draggable={false}
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Discreet side controls */}
        <button
          onClick={prev}
          aria-label="Post precedente"
          className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-40 text-brown-dark/40 hover:text-brown-dark transition-colors"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 6 9 12 15 18" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Post successivo"
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-40 text-brown-dark/40 hover:text-brown-dark transition-colors"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>

      {/* Footer — the GV monogram as a signature */}
      <motion.img
        src={gvLogo}
        alt="Gerardo Vietri"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 0.9, y: 0 } : {}}
        transition={{ duration: 1.1, delay: 0.3, ease }}
        className="w-auto select-none"
        style={{ height: 'clamp(26px, 3.4vw, 52px)' }}
      />
    </section>
  )
}
