import { Link } from 'react-router-dom'
import { products } from '@/data/products'

/* Pagina Abbinamenti — combo di prodotti creati dalla Wishlist (localStorage,
   vedi src/hooks/useAbbinamenti.js). Stesso linguaggio visivo della Wishlist. */
export default function Abbinamenti({ abbinamenti = [], onRemoveAbbinamento, onAddToCart, onOpenCart }) {
  const combos = abbinamenti
    .map((a) => ({ ...a, items: products.filter((p) => a.productIds.includes(p.id)) }))
    .filter((a) => a.items.length > 0)

  const handleBuyCombo = (items) => {
    if (!onAddToCart || items.length === 0) return
    items.forEach((p) => onAddToCart(p))
    if (onOpenCart) onOpenCart()
  }

  return (
    <main className="bg-white min-h-screen pb-24">
      <section className="min-h-[30vh] flex flex-col items-center px-6 pt-28 md:pt-32">
        <h1
          className="font-cormorant font-normal uppercase text-brown-dark text-center leading-none"
          style={{ fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '0.42em', paddingLeft: '0.42em' }}
        >
          Abbinamenti
        </h1>
        <p className="label-upper text-brown-dark/40 tracking-widest2 mt-6">
          {combos.length === 0
            ? 'Nessun abbinamento creato'
            : `${combos.length} ${combos.length === 1 ? 'abbinamento' : 'abbinamenti'}`}
        </p>
      </section>

      {combos.length === 0 ? (
        <div className="text-center px-6 pb-10">
          <p className="font-cormorant italic text-brown-mid text-xl mb-8">
            Seleziona dei prodotti nella tua Wishlist e crea il tuo primo abbinamento.
          </p>
          <Link
            to="/preferiti"
            className="inline-block font-inter uppercase text-[12px] tracking-[0.22em] border border-brown-dark text-brown-dark px-10 py-4 transition-colors duration-300 hover:bg-brown-dark hover:text-white"
          >
            Vai alla Wishlist
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center border-y border-brown-dark/10 py-5 mb-10 px-6">
            <Link
              to="/preferiti"
              className="font-inter uppercase text-[11px] tracking-[0.18em] text-brown-dark/70 hover:text-brown-dark transition-colors duration-300"
            >
              Torna alla Wishlist
            </Link>
          </div>

          <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex flex-col gap-16">
          {combos.map((combo) => (
            <div key={combo.id} className="relative border-t border-brown-dark/10 pt-8">
              <button
                onClick={() => onRemoveAbbinamento && onRemoveAbbinamento(combo.id)}
                aria-label="Rimuovi abbinamento"
                className="absolute top-6 right-0 text-brown-dark/50 hover:text-brown-dark transition-colors duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 max-w-3xl">
                {combo.items.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} className="block">
                    <div className="overflow-hidden bg-[#F5F3EF]" style={{ aspectRatio: '4 / 5' }}>
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-[700ms] ease-out hover:scale-[1.04]"
                      />
                    </div>
                    <p className="font-cormorant font-semibold text-black text-[13px] uppercase tracking-[0.14em] mt-3 text-center">{p.name}</p>
                    <p className="font-inter font-medium text-black/80 text-[11px] mt-1 text-center">{p.price}</p>
                  </Link>
                ))}
              </div>

              <button
                onClick={() => handleBuyCombo(combo.items)}
                className="mt-6 font-inter uppercase text-[11px] tracking-[0.18em] text-brown-dark/70 hover:text-brown-dark transition-colors duration-300"
              >
                Acquista l'abbinamento ({combo.items.length})
              </button>
            </div>
          ))}
          </div>
        </div>
      )}
    </main>
  )
}
