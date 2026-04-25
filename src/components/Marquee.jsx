import { motion } from 'framer-motion'

const text = 'SCIARPE · BORSE · VIETRI MILANO · CORSO VERCELLI · NUOVA COLLEZIONE · PELLE ITALIANA · '

export default function Marquee() {
  return (
    <div className="bg-brown-dark overflow-hidden py-3 select-none">
      <div className="flex whitespace-nowrap">
        {[0, 1].map(i => (
          <motion.span
            key={i}
            aria-hidden={i === 1}
            animate={{ x: ['0%', '-100%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="inline-block label-upper text-beige-warm tracking-widest2 pr-0"
            style={{ minWidth: '100%' }}
          >
            {text.repeat(4)}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
