import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products } from '@/data/products'

const ease = [0.22, 1, 0.36, 1]

export default function ProductDetail({ onAddToCart }) {
  const { id } = useParams()
  const p      = products.find(pr => pr.id === Number(id))

  if (!p) {
    return (
      <main className="bg-beige-light min-h-screen flex items-center justify-center">
        <p className="font-cormorant italic text-brown-mid text-2xl">Prodotto non trovato.</p>
      </main>
    )
  }

  return (
    <main className="bg-beige-light min-h-screen">
      <div className="flex flex-col md:flex-row min-h-screen pt-16 md:pt-20">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease }}
          className="md:w-1/2 md:sticky md:top-20 md:h-[calc(100vh-5rem)] overflow-hidden"
          style={{ background: '#F4F0E7' }}
        >
          <img src={p.image} alt={p.name}
            className="w-full h-full object-cover object-center"
            style={{ mixBlendMode: 'multiply' }} />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease }}
          className="md:w-1/2 flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20"
        >
          <Link to="/collection" className="label-upper text-brown-mid/50 hover:text-gold transition-colors mb-8 self-start tracking-widest2">
            ← Collezione
          </Link>

          <span className="label-upper text-gold tracking-widest2 mb-3">{p.category}</span>
          <h1 className="font-cormorant font-semibold text-brown-dark text-4xl md:text-[52px] tracking-widest2 leading-none mb-3">
            {p.name}
          </h1>
          <p className="label-upper text-brown-mid/50 mb-6 tracking-widest2">{p.material}</p>
          <p className="font-cormorant font-light italic text-brown-mid text-xl md:text-[22px] leading-[1.8] mb-8 max-w-sm">
            {p.description}
          </p>
          <p className="font-inter font-normal text-brown-dark text-2xl mb-10">{p.price}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => onAddToCart(p)} className="btn-outline-gold">
              Aggiungi al Carrello
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
