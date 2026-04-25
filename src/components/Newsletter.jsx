import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function Newsletter() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [email, setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    // TODO: connect to Klaviyo
    setSubmitted(true)
  }

  return (
    <section ref={ref} className="bg-cream py-20 md:py-28 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease }}
        className="max-w-lg mx-auto"
      >
        <h2
          className="font-cormorant font-light text-brown-dark uppercase tracking-widest2 leading-tight"
          style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
        >
          Entra nel Mondo Vietri
        </h2>
        <p className="font-inter font-light text-brown-mid text-base mt-4 mb-10 leading-relaxed">
          Ricevi le novità e le storie dei nostri pezzi.
        </p>

        {submitted ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-cormorant italic text-gold text-xl"
          >
            Grazie. Benvenuta nel mondo VIETRI.
          </motion.p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-stretch">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="la tua email"
              required
              className="flex-1 bg-transparent border-b border-brown-dark/30 focus:border-brown-dark outline-none font-inter font-light text-brown-dark text-sm pb-2 placeholder:text-brown-dark/30 tracking-wide transition-colors duration-300"
            />
            <button type="submit" className="btn-outline-gold whitespace-nowrap">
              Iscriviti
            </button>
          </form>
        )}
      </motion.div>
    </section>
  )
}
