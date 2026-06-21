import { useRef } from 'react'
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

export default function InstagramTeaser() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      data-nav-theme="light"
      className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex flex-col justify-between py-12 md:py-16 overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      {/* Header — minimal: one small handle, one line */}
      <div className="px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          <p className="label-upper text-gold/70 tracking-widest3 text-xs">@vietrimilano</p>
        </motion.div>
      </div>

      {/* Carousel — images on white, scroll only, no frames */}
      <div
        className="w-full flex gap-6 md:gap-10 overflow-x-auto pl-6 md:pl-10 pr-6 md:pr-10 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {tiles.map((tile, i) => (
          <motion.a
            key={i}
            href="https://instagram.com/vietrimilano"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: i * 0.08, ease }}
            className="flex-shrink-0 snap-start relative overflow-hidden group"
            style={{ aspectRatio: '4/5', height: 'clamp(170px, 44vh, 420px)' }}
          >
            <img
              src={tile.src}
              alt={tile.alt}
              className="w-full h-full object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
            />
          </motion.a>
        ))}
      </div>

      {/* Single quiet CTA */}
      <div className="px-6 md:px-10 mt-7 md:mt-9">
        <a
          href="https://instagram.com/vietrimilano"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 label-upper text-brown-dark/60 hover:text-brown-dark tracking-widest2 transition-colors"
        >
          <span className="border-b border-brown-dark/20 group-hover:border-brown-dark pb-1 transition-colors">Vai al profilo</span>
          <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      {/* Discreet GV monogram signature */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, delay: 0.3, ease }}
        className="mt-10 md:mt-14 flex items-center justify-center select-none w-full"
      >
        <img
          src={gvLogo}
          alt="Gerardo Vietri"
          className="w-auto select-none opacity-90"
          style={{ height: 'clamp(26px, 3.4vw, 52px)' }}
        />
      </motion.div>
    </section>
  )
}
