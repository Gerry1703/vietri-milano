import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import astratta1 from '@/assets/images/editorial/astratta-1.jpg'
import astratta2 from '@/assets/images/editorial/astratta-2.jpg'

const ease = [0.22, 1, 0.36, 1]
const images = [astratta1, astratta2]

/* Banda editoriale in stile Brunello Cucinelli: sfondi astratti caldi che si
   alternano lentamente in dissolvenza, con un testo essenziale sovrapposto. */
export default function EditorialBand() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % images.length), 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative h-screen w-full snap-start snap-always overflow-hidden bg-brown-dark">
      {/* Sfondo che cambia — dissolvenza lenta + micro zoom */}
      <AnimatePresence>
        <motion.img
          key={i}
          src={images[i]}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 2.2, ease }, scale: { duration: 7, ease } }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </AnimatePresence>

      {/* Velature calde per leggibilità del testo */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

      {/* Testo editoriale centrato */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease }}
          className="label-upper text-cream/70 tracking-widest3 mb-7"
        >
          Manifattura Italiana
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, delay: 0.1, ease }}
          className="font-inter font-light text-cream leading-[1.15] max-w-3xl"
          style={{ fontSize: 'clamp(30px, 4.2vw, 58px)' }}
        >
          Dove la seta diventa luce
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="font-inter font-light text-cream/75 text-[15px] md:text-base leading-relaxed max-w-xl mt-8"
        >
          Ogni filo custodisce il tempo di mani sapienti. Una bellezza che non ha
          fretta, tessuta nel cuore di Milano.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, delay: 0.35, ease }}
          className="mt-11"
        >
          <Link
            to="/chi-siamo"
            className="label-upper tracking-widest2 text-cream border-b border-cream/40 pb-1 hover:border-cream transition-colors duration-300"
          >
            La nostra storia
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
