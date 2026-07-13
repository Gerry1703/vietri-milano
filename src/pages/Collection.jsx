import { useState } from 'react'
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

/* One tile of the mosaic: product shot by default, on hover it crossfades to the
   gallery and exposes ◀ ▶ arrows to browse the other photos in place. */
function ProductCard({ p, i }) {
  const gallery = p.gallery || []
  const hasGallery = gallery.length > 0
  const [idx, setIdx] = useState(0)

  const step = (dir) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIdx((v) => (v + dir + gallery.length) % gallery.length)
  }

  return (
    <motion.div custom={i} variants={cardVariants} initial="hidden" animate="show" className="border-r border-b border-brown-dark/10">
      <Link
        to={`/product/${p.id}`}
        onMouseLeave={() => setIdx(0)}
        className="group relative block w-full h-full overflow-hidden bg-[#FFFFFF] cursor-pointer"
      >
        {/* Tag badge */}
        {p.tag && (
          <span className="absolute top-3 left-3 md:top-4 md:left-4 z-30 label-upper text-beige-light bg-brown-dark px-[10px] py-[5px] text-[9px] tracking-widest2">
            {p.tag}
          </span>
        )}

        {/* Base product shot */}
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[700ms] ease-out ${hasGallery ? '' : 'group-hover:scale-[1.04]'}`}
        />

        {/* Hover gallery — crossfade between shots */}
        {hasGallery && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {gallery.map((g, gi) => (
              <img
                key={gi}
                src={g}
                alt={`${p.name} — foto ${gi + 1}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ opacity: gi === idx ? 1 : 0, zIndex: gi === idx ? 2 : 1 }}
              />
            ))}
          </div>
        )}

        {/* Browse arrows — only when there is more than one photo */}
        {gallery.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Foto precedente"
              onClick={step(-1)}
              className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-30 grid place-items-center w-8 h-8 rounded-full bg-white/70 text-brown-dark backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 6 9 12 15 18" /></svg>
            </button>
            <button
              type="button"
              aria-label="Foto successiva"
              onClick={step(1)}
              className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-30 grid place-items-center w-8 h-8 rounded-full bg-white/70 text-brown-dark backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
            </button>
          </>
        )}

        {/* Info — revealed on hover */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-4 md:px-6 pt-10 pb-4 md:pb-5
                        bg-gradient-to-t from-black/65 via-black/20 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <h3
            className="font-cormorant font-light text-beige-light leading-tight"
            style={{ fontSize: 'clamp(17px, 1.5vw, 24px)' }}
          >
            {p.name}
          </h3>
          {p.color && (
            <p className="font-cormorant italic text-beige-light/85 text-sm md:text-base mt-0.5">{p.color}</p>
          )}
          <div className="flex items-center justify-between mt-2 gap-3">
            {p.material && (
              <span className="label-upper text-beige-light/70 text-[9px] tracking-widest2">{p.material}</span>
            )}
            <span className="font-inter font-light text-beige-light text-[12px] md:text-[13px] ml-auto">{p.price}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function matchesSearch(p, q) {
  const s = q.toLowerCase()
  return (
    p.name.toLowerCase().includes(s) ||
    p.category.toLowerCase().includes(s) ||
    (p.material || '').toLowerCase().includes(s) ||
    (p.color || '').toLowerCase().includes(s) ||
    (p.description || '').toLowerCase().includes(s)
  )
}

export default function Collection() {
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat')
  const searchQuery = params.get('search') || ''

  const filtered = products.filter(p => {
    const catMatch = cat ? p.category.toLowerCase() === cat.toLowerCase() : true
    const searchMatch = searchQuery ? matchesSearch(p, searchQuery) : true
    return catMatch && searchMatch
  })

  const setCategory = (value) => {
    const next = new URLSearchParams(params)
    if (value) next.set('cat', value)
    else next.delete('cat')
    setParams(next)
  }

  return (
    <main className="bg-[#FFFFFF] min-h-screen pt-16 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

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
            {searchQuery
              ? `${filtered.length} ${filtered.length === 1 ? 'risultato' : 'risultati'} per "${searchQuery}"`
              : `${filtered.length} ${filtered.length === 1 ? 'pezzo' : 'pezzi'}`
            }
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

      </div>

      {/* ── Full-bleed product mosaic ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${cat ?? 'all'}-${searchQuery}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                     auto-rows-[50vw] md:auto-rows-[33.333vw] lg:auto-rows-[25vw]
                     border-l border-t border-brown-dark/10"
        >
          {filtered.map((p, i) => (
            <ProductCard key={p.id} p={p} i={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom decorative spacer ── */}
      <div className="flex justify-center mt-20 md:mt-24">
        <span className="block h-px w-16 bg-gold/30" />
      </div>
    </main>
  )
}
