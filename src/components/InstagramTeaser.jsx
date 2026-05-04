import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import sciarpaRossaAlt  from '@/assets/images/scarves/sciarpa-rossa-alt.jpg'
import sciarpaRossaGrid from '@/assets/images/scarves/sciarpa-rossa-grid.png'
import sciarpaArancio   from '@/assets/images/scarves/sciarpa-arancio.jpg'
import sciarpaVietri    from '@/assets/images/scarves/sciarpa-vietri.png'
import venezia2         from '@/assets/images/scarves/venezia-2.png'
import venezia3         from '@/assets/images/scarves/venezia-3.png'
import venezia4         from '@/assets/images/scarves/venezia-4.png'
import borsaVerde       from '@/assets/images/bags/borsa-verde.png'
import borsaBrera       from '@/assets/images/bags/borsa-brera.png'

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
  const ref      = useRef(null)
  const scroller = useRef(null)
  const inView   = useInView(ref, { once: true, margin: '-80px' })
  const [canLeft, setCanLeft]   = useState(false)
  const [canRight, setCanRight] = useState(true)

  const updateArrows = () => {
    const el = scroller.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    updateArrows()
    const el = scroller.current
    if (!el) return
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [])

  const scrollBy = (dir) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="bg-brown-dark py-16 md:py-24 overflow-hidden">
      <div className="px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          className="flex items-baseline gap-3 mb-10"
        >
          <h2 className="label-upper text-cream text-sm tracking-widest3">
            FOLLOW
          </h2>
          <span className="label-upper text-cream text-sm tracking-widest3">
            @vietrimilano
          </span>
        </motion.div>
      </div>

      <div className="relative">
        {/* Carousel */}
        <div
          ref={scroller}
          className="flex gap-3 md:gap-4 overflow-x-auto pl-6 md:pl-10 pr-6 md:pr-10 snap-x snap-mandatory"
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
              className="flex-shrink-0 snap-start relative overflow-hidden group bg-[#1a1008]"
              style={{ width: 'clamp(220px, 22vw, 360px)', aspectRatio: '3/4' }}
            >
              <img
                src={tile.src}
                alt={tile.alt}
                className="w-full h-full object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
              />
            </motion.a>
          ))}
        </div>

        {/* Right arrow */}
        {canRight && (
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scorri a destra"
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-cream/95 hover:bg-cream text-brown-dark transition-all duration-300 z-10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        )}

        {/* Left arrow */}
        {canLeft && (
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scorri a sinistra"
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-cream/95 hover:bg-cream text-brown-dark transition-all duration-300 z-10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </button>
        )}
      </div>

      <div className="px-6 md:px-10 mt-8">
        <a
          href="https://instagram.com/vietrimilano"
          target="_blank"
          rel="noopener noreferrer"
          className="label-upper text-cream/80 hover:text-cream tracking-widest2 underline underline-offset-4 transition-colors"
        >
          Vedi tutto
        </a>
      </div>
    </section>
  )
}
