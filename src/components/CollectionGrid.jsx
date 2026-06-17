import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { products } from '@/data/products'
import { Link } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1]
const SCROLL_DURATION = 36

export default function CollectionGrid() {
  const headingRef = useRef(null)
  const headingIn  = useInView(headingRef, { once: true, margin: '-80px' })

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(i => (i + 1) % products.length)
    }, SCROLL_DURATION * 1000 / products.length)
    return () => clearInterval(interval)
  }, [])

  const active = products[activeIndex]

  return (
    <section className="bg-beige-light min-h-screen px-6 md:px-10 overflow-hidden">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-[1fr_1fr] gap-12 md:gap-0 items-center min-h-screen">
        {/* Left — fixed text panel */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          <p className="label-upper text-gold tracking-widest2 mb-4">La Collezione</p>
          <h2 className="font-cormorant font-light text-brown-dark text-5xl md:text-[56px] leading-[1.1]">
            Sei pezzi.<br />
            <span className="italic text-gold">Una sola firma.</span>
          </h2>
          <p className="font-inter font-light text-brown-dark/70 text-base mt-6 max-w-sm leading-relaxed">
            Sciarpe in seta organza, borse in pelle italiana. Ogni pezzo nasce a Milano, in Corso Vercelli.
          </p>
          <Link
            to="/collection"
            className="inline-block label-upper text-brown-dark border-b border-brown-dark mt-8 pb-1 tracking-widest2 hover:text-gold hover:border-gold transition-colors"
          >
            Scopri tutto
          </Link>

          <div className="flex items-center gap-4 mt-16 pt-6 border-t border-brown-dark/15 max-w-sm">
            <div>
              <p className="font-cormorant text-brown-dark text-lg">{active.name}</p>
              <p className="label-upper text-beige-warm text-[11px] mt-1">{active.category}</p>
            </div>
            <span className="font-inter font-light text-brown-dark/50 text-sm ml-auto">
              {String(activeIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
            </span>
          </div>
        </motion.div>

        {/* Right — two-column auto-scrolling products */}
        <div className="relative h-screen overflow-hidden flex gap-6">
          {[0, 1].map(col => {
            const colProducts = products.filter((_, i) => i % 2 === col)
            return (
              <div key={col} className="flex-1 relative overflow-hidden">
                <motion.div
                  className="flex flex-col"
                  style={{ marginTop: col === 1 ? '9rem' : '0rem' }}
                  animate={{ y: ['0%', '-50%'] }}
                  transition={{ duration: SCROLL_DURATION + col * 6, repeat: Infinity, ease: 'linear' }}
                >
                  {/* Two identical sets stacked seamlessly. Each set carries its
                      own trailing gap (pb-10) so -50% lands pixel-perfect. */}
                  {[0, 1].map(loop => (
                    <div key={loop} aria-hidden={loop === 1} className="flex flex-col gap-10 pb-10">
                      {colProducts.map(p => (
                        <div key={`${loop}-${p.id}`} className="w-full">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-auto object-contain drop-shadow-xl"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
            )
          })}

          {/* Top & bottom fade — products dissolve into the page background */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 md:h-56 bg-gradient-to-b from-beige-light to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 md:h-56 bg-gradient-to-t from-beige-light to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}
