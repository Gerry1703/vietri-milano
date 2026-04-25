import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { featuredProduct } from '@/data/products'

const ease = [0.22, 1, 0.36, 1]

export default function FeaturedProduct({ onAddToCart }) {
  const p       = featuredProduct
  const leftRef = useRef(null)
  const leftIn  = useInView(leftRef, { once: true, margin: '-80px' })

  return (
    <section className="flex flex-col md:flex-row min-h-[90vh] overflow-hidden">
      {/* Left: image */}
      <motion.div
        ref={leftRef}
        initial={{ opacity: 0, x: -60 }}
        animate={leftIn ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease }}
        className="md:w-1/2 relative overflow-hidden min-h-[60vw] md:min-h-0"
        style={{ background: '#1a1008' }}
      >
        <motion.img
          src={p.image}
          alt={p.name}
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Right: info panel */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={leftIn ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease }}
        className="md:w-1/2 bg-brown-dark flex flex-col justify-center px-10 md:px-16 lg:px-20 py-16"
      >
        <span className="label-upper text-gold tracking-widest2 mb-4">{p.category}</span>

        <h2 className="font-cormorant font-semibold text-cream leading-none tracking-widest2 text-4xl md:text-[52px] mb-4">
          {p.name}
        </h2>

        <p className="label-upper text-cream/50 mb-6 tracking-widest2">{p.material}</p>

        <p className="font-cormorant font-light italic text-cream text-xl md:text-[22px] leading-[1.8] mb-8 max-w-sm">
          {p.description}
        </p>

        <p className="font-inter font-normal text-cream text-2xl mb-10">{p.price}</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => onAddToCart(p)}
            className="btn-outline-gold"
          >
            Aggiungi al Carrello
          </button>
          {/* TODO: connect to Shopify Storefront API addToCart() */}
        </div>

        <button className="mt-6 label-upper text-cream/50 hover:text-gold transition-colors duration-300 self-start tracking-widest2">
          Vedi i Dettagli →
        </button>
      </motion.div>
    </section>
  )
}
