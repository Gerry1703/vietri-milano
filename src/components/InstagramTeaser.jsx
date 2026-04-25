import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import sciarpaRossaAlt from '@/assets/images/scarves/sciarpa-rossa-alt.jpg'
import borsaVerde      from '@/assets/images/bags/borsa-verde.jpg'
import sciarpaArancio  from '@/assets/images/scarves/sciarpa-arancio.jpg'
import borsaCognac     from '@/assets/images/bags/borsa-cognac.jpg'

const ease = [0.22, 1, 0.36, 1]

const tiles = [
  { src: sciarpaRossaAlt, alt: 'Sciarpa Bellagio' },
  { src: borsaVerde,      alt: 'Borsa Navigli'   },
  { src: sciarpaArancio,  alt: 'Sciarpa Cortina'  },
  { src: borsaCognac,     alt: 'Borsa Brera'      },
]

export default function InstagramTeaser() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-beige-light py-16 md:py-20 px-6 md:px-10">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          className="flex items-baseline gap-4 mb-10"
        >
          <h2 className="font-cormorant font-light text-brown-dark text-4xl md:text-[48px] tracking-widest2 uppercase">
            Seguici
          </h2>
          <span className="font-cormorant font-light text-gold text-3xl md:text-[40px] tracking-wide">
            @vietrimilano
          </span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {tiles.map((tile, i) => (
            <motion.a
              key={tile.alt}
              href="https://instagram.com/vietrimilano"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: i * 0.12, ease }}
              className="block relative overflow-hidden group"
              style={{ aspectRatio: '1/1', background: '#1a1008' }}
            >
              <img
                src={tile.src}
                alt={tile.alt}
                className="w-full h-full object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ border: '2px solid #B8975A' }} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
