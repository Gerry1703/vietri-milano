import { motion } from 'framer-motion'

const text = 'SCIARPE · BORSE · VIETRI MILANO · CORSO VERCELLI · NUOVA COLLEZIONE · PELLE ITALIANA · '

export default function Marquee() {
  return (
    <div className="bg-brown-dark overflow-hidden py-3 select-none">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        style={{ width: 'max-content' }}
      >
        {[0, 1].map(i => (
          <span
            key={i}
            aria-hidden={i === 1}
            className="inline-block label-upper text-beige-warm tracking-widest2"
          >
            {text.repeat(6)}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
