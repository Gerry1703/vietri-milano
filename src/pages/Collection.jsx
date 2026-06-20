import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '@/data/products'
import { Link } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1]

const CATEGORIES = [
  { label: 'Tutte',   value: null },
  { label: 'Sciarpe', value: 'sciarpe' },
  { label: 'Borse',   value: 'borse' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  show:   (i) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.08, ease } }),
  exit:   { opacity: 0, y: -16, transition: { duration: 0.3 } },
}

export default function Collection() {
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat')

  const filtered = cat
    ? products.filter(p => p.category.toLowerCase() === cat.toLowerCase())
    : products

  const setCategory = (value) => {
    value ? setParams({ cat: value }) : setParams({})
  }

  return (
    <main className="bg-beige-light min-h-screen pt-16 pb-24 px-6 md:px-10">
      <div className="max-w-screen-xl mx-auto">

        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="text-center mb-10"
        >
          {/* Eyebrow with drawing lines */}
          <div className="flex items-center justify-center gap-5 mb-5">
            <motion.span
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
              className="block h-px w-12 bg-gold/60 origin-right"
            />
            <p className="label-upper text-gold tracking-widest3">VIETRI Milano</p>
            <motion.span
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
              className="block h-px w-12 bg-gold/60 origin-left"
            />
          </div>

          <h1
            className="font-cormorant font-light text-brown-dark uppercase leading-none"
            style={{ fontSize: 'clamp(44px, 5.5vw, 82px)', letterSpacing: '0.08em' }}
          >
            Collezione
          </h1>
          {cat && (
            <p className="label-upper text-brown-dark/40 tracking-widest2 mt-2 text-[10px]">
              {cat}
            </p>
          )}

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="label-upper text-brown-dark/40 tracking-widest mt-3 text-[10px]"
          >
            {filtered.length} {filtered.length === 1 ? 'pezzo' : 'pezzi'}
          </motion.p>
        </motion.div>

        {/* ── Category filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
          className="flex justify-center mb-16"
        >
          <div className="flex gap-10 md:gap-14 border-b border-brown-dark/10">
            {CATEGORIES.map((c) => {
              const isActive = (cat?.toLowerCase() ?? null) === c.value
              return (
                <button
                  key={c.label}
                  onClick={() => setCategory(c.value)}
                  className="relative pb-4 label-upper text-[11px] tracking-widest2 cursor-pointer transition-colors duration-300 select-none"
                  style={{ color: isActive ? '#9C5B34' : 'rgba(59,36,21,0.45)' }}
                >
                  {c.label}
                  {isActive && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* ── Product grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cat ?? 'all'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-24 max-w-5xl mx-auto"
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="show"
              >
                <Link to={`/product/${p.id}`} className="block group cursor-pointer">
                  {/* Image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: '1/1', background: '#F4F0E7' }}
                  >
                    {/* Tag badge */}
                    {p.tag && (
                      <span className="absolute top-3 left-3 z-20 label-upper text-beige-light bg-brown-dark px-[10px] py-[5px] text-[9px] tracking-widest2">
                        {p.tag}
                      </span>
                    )}

                    {/* Product image with zoom */}
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover object-center transition-transform duration-[700ms] ease-out group-hover:scale-[1.07]"
                    />

                    {/* Description overlay — slides up on hover */}
                    <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <div className="bg-brown-dark/88 backdrop-blur-[2px] px-5 py-4">
                        <p className="font-cormorant font-light text-beige-light/90 text-[14px] md:text-[15px] leading-snug italic">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="pt-4 space-y-[6px]">
                    <h3 className="font-cormorant font-normal text-brown-dark text-[19px] md:text-[22px] leading-snug transition-colors duration-300 group-hover:text-gold">
                      {p.name}
                    </h3>
                    {p.material && (
                      <p className="label-upper text-gold/65 text-[9px] tracking-widest2">{p.material}</p>
                    )}
                    <div className="flex justify-between items-center pt-[2px]">
                      <span className="label-upper text-brown-dark/40 text-[10px]">{p.category}</span>
                      <span className="font-inter font-light text-brown-dark text-[13px]">{p.price}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom decorative spacer ── */}
        <div className="flex justify-center mt-24">
          <span className="block h-px w-16 bg-gold/30" />
        </div>
      </div>
    </main>
  )
}
