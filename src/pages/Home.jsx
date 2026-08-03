import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Hero from '@/components/Hero'
import CollezioneSciarpe from '@/components/CollezioneSciarpe'
import EditorialBand from '@/components/EditorialBand'
import nuoviArriviSciarpe from '@/assets/images/scarves/nuovi-arrivi-sciarpe.jpg'
import nuoviArriviBorse   from '@/assets/images/bags/nuovi-arrivi-borse.jpg'
import searchBg from '@/assets/images/collection-hero.jpg'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease } },
}

/* Riquadro con immagine e didascalia in overlay. Di default riempie l'altezza
   del genitore (h-full); passando `aspect` si può forzare un rapporto fisso
   (es. ritratto) invece di stirarsi sull'altezza disponibile. */
function Panel({ img, caption, to, aspect }) {
  return (
    <Link to={to} className={`group relative block overflow-hidden bg-[#F4F0E7] ${aspect || 'h-full'}`}>
      <img
        src={img}
        alt={caption}
        loading="lazy"
        className="w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 to-transparent" />
      <span className="absolute bottom-6 left-6 font-jost font-light text-cream text-[13px] tracking-[0.14em] uppercase">
        {caption}
      </span>
    </Link>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/collection?search=${encodeURIComponent(query.trim())}`)
  }

  return (
    <main>
      <Hero />

      {/* Nuovi Arrivi — due riquadri a schermo intero.
          Su mobile impilati (foto orizzontali), da md in poi affiancati. */}
      <section className="h-dvh md:h-screen w-full snap-start snap-always grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-[2px] bg-white">
        <Panel img={nuoviArriviSciarpe} caption="Nuovi Arrivi — Sciarpe" to="/collection?cat=sciarpe" />
        <Panel img={nuoviArriviBorse}   caption="Nuovi Arrivi — Borse"   to="/collection?cat=borse" />
      </section>

      {/* Collezioni Sciarpe — carosello stile Prada, foto sciarpa avorio */}
      <CollezioneSciarpe />

      {/* Esplora la collezione — stessa foto/impostazione della pagina di ricerca,
          qui come sezione fissa della home invece che overlay. */}
      <section className="relative h-dvh md:h-screen w-full snap-start snap-always overflow-hidden bg-brown-dark">
        <img
          src={searchBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/45" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-jost font-light text-white uppercase tracking-[0.3em] text-xl md:text-2xl"
          >
            Esplora la collezione
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-cormorant font-light italic text-white/85 text-lg md:text-xl mt-4"
          >
            Scopri creazioni senza tempo e lasciati ispirare.
          </motion.p>

          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            onSubmit={handleSearch}
            className="w-full max-w-lg mt-10"
          >
            <div className="flex items-center gap-4 border-b border-white/40 focus-within:border-white transition-colors duration-300 pb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" className="text-white/70 shrink-0">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cosa stai cercando?"
                className="w-full bg-transparent outline-none font-cormorant font-light text-white placeholder:text-white/60 text-xl md:text-2xl"
              />
            </div>

            <button
              type="submit"
              disabled={!query.trim()}
              className="mt-6 font-inter uppercase text-[12px] tracking-[0.22em] border border-white text-white px-10 py-3 transition-colors duration-300 hover:bg-white hover:text-brown-dark disabled:opacity-30 disabled:pointer-events-none"
            >
              Cerca
            </button>
          </motion.form>
        </div>
      </section>

      {/* Banda editoriale astratta — SEMPRE ultima sezione della home */}
      <EditorialBand />
    </main>
  )
}
