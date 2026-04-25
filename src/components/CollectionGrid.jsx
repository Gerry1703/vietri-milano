import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { products } from '@/data/products'
import { Link } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1]

function ProductCard({ product, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease }}
    >
      <Link to={`/product/${product.id}`} className="block group">
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/5', background: '#1a1008' }}>
          {product.tag && (
            <span className="absolute top-3 left-3 z-10 label-upper text-gold bg-brown-dark/80 px-2 py-1 text-[10px]">
              {product.tag}
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-brown-dark/0 group-hover:bg-brown-dark/50 transition-all duration-[600ms] flex items-center justify-center">
            <span className="label-upper text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-widest2">
              Scopri →
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="pt-4 pb-2">
          <h3 className="font-cormorant font-normal text-brown-dark text-[22px] leading-snug">{product.name}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="label-upper text-beige-warm text-[11px]">{product.category}</span>
            <span className="font-inter font-light text-brown-dark text-sm">{product.price}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function CollectionGrid() {
  const headingRef = useRef(null)
  const headingIn  = useInView(headingRef, { once: true, margin: '-80px' })

  // Row 1: [0] sciarpa-rossa-grid | [3] borsa-verde | [2] sciarpa-arancio
  // Row 2: [5] borsa-flatlay      | [1] sciarpa-rossa-alt | [4] borsa-cognac
  const row1 = [products[0], products[3], products[2]]
  const row2 = [products[5], products[1], products[4]]

  return (
    <section className="bg-beige-light py-20 md:py-28 px-6 md:px-10">
      {/* Heading */}
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 40 }}
        animate={headingIn ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease }}
        className="text-center mb-14"
      >
        <h2 className="font-cormorant font-light text-brown-dark text-5xl md:text-[68px] tracking-widest2 uppercase leading-none">
          La Collezione
        </h2>
        <p className="label-upper text-gold mt-4 tracking-widest2">Sciarpe & Borse</p>
      </motion.div>

      {/* Asymmetric grid */}
      <div className="max-w-screen-xl mx-auto">
        {/* Row 1 — 1fr 1.5fr 1fr */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] gap-4 md:gap-6 mb-4 md:mb-6">
          {row1.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        {/* Row 2 — 1.5fr 1fr 1fr */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-4 md:gap-6">
          {row2.map((p, i) => <ProductCard key={p.id} product={p} index={i + 3} />)}
        </div>
      </div>
    </section>
  )
}
