import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products } from '@/data/products'
import { Link } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1]

export default function Collection() {
  const [params] = useSearchParams()
  const cat      = params.get('cat')

  const filtered = cat
    ? products.filter(p => p.category.toLowerCase() === cat.toLowerCase())
    : products

  return (
    <main className="bg-beige-light min-h-screen pt-28 pb-20 px-6 md:px-10">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="text-center mb-14"
        >
          <h1 className="font-cormorant font-light text-brown-dark text-5xl md:text-[68px] tracking-widest2 uppercase">
            {cat ? cat : 'Collezione'}
          </h1>
          <p className="label-upper text-gold mt-3 tracking-widest2">VIETRI Milano</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: i * 0.1, ease }}
            >
              <Link to={`/product/${p.id}`} className="block group">
                <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#1a1008' }}>
                  {p.tag && (
                    <span className="absolute top-3 left-3 z-10 label-upper text-gold bg-brown-dark/80 px-2 py-1 text-[10px]">
                      {p.tag}
                    </span>
                  )}
                  <img src={p.image} alt={p.name}
                    className="w-full h-full object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]" />
                  <div className="absolute inset-0 bg-brown-dark/0 group-hover:bg-brown-dark/50 transition-all duration-[600ms] flex items-center justify-center">
                    <span className="label-upper text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300">Scopri →</span>
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="font-cormorant font-normal text-brown-dark text-[22px]">{p.name}</h3>
                  <div className="flex justify-between mt-1">
                    <span className="label-upper text-beige-warm text-[11px]">{p.category}</span>
                    <span className="font-inter font-light text-brown-dark text-sm">{p.price}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
