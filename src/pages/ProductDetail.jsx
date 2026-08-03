import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '@/data/products'

const ease = [0.22, 1, 0.36, 1]

/* Sezione dettaglio espandibile (Come pulirla / Materiale / Provenienza). */
function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-t border-brown-dark/12">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="label-upper text-brown-dark tracking-widest2 text-[11px]">{title}</span>
        <span className="text-brown-dark/50 text-lg leading-none font-light group-hover:text-brown-dark transition-colors">
          {open ? '−' : '+'}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <p className="font-inter font-light text-brown-mid text-[13px] leading-[1.7] pb-6">
              {children}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* Pagina prodotto — colonna info STICKY a sinistra, foto che scorrono a destra.
   Descrizione in grande + dettagli ricchi (pulizia, materiale, provenienza). */
export default function ProductDetail({ onAddToCart, isFavorite, onToggleFavorite }) {
  const { id } = useParams()
  const p      = products.find(pr => pr.id === Number(id))

  if (!p) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <p className="font-cormorant italic text-brown-mid text-2xl">Prodotto non trovato.</p>
      </main>
    )
  }

  const favorited = isFavorite ? isFavorite(p.id) : false

  const images  = [p.image, ...(p.gallery || [])]
  const related = products.filter(pr => pr.category === p.category && pr.id !== p.id).slice(0, 4)
  const isScarf = p.category === 'Sciarpe'

  const details = {
    pulizia: p.care || (isScarf
      ? 'Lavaggio a secco professionale. Non lavare in acqua né candeggiare. Stirare a bassa temperatura sul rovescio, interponendo un panno di cotone. Riporre arrotolata, al riparo da luce diretta e umidità.'
      : 'Pulire con un panno morbido e asciutto. Evitare il contatto con acqua, alcool e creme. Conservare nella dust bag fornita, lontano da fonti di calore e dalla luce diretta.'),
    materiale: p.composition || (isScarf
      ? `${p.material}. 90 × 90 cm. Orlo rullato e cucito a mano.`
      : `${p.material}. Ferramenta dorata, fodera interna in tessuto.`),
    provenienza: p.origin || (isScarf
      ? 'Tessuta e stampata a Como, cuore storico della seta italiana, dove ogni foulard nasce dalle mani di artigiani specializzati.'
      : 'Realizzata interamente a mano in Italia da maestri pellettieri, secondo tecniche tramandate.'),
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="flex flex-col md:flex-row">
        {/* ── Colonna info — sticky a SINISTRA su desktop ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease }}
          className="order-2 md:order-1 md:w-[46%] md:sticky md:top-[92px] md:self-start px-6 md:px-10 lg:px-16 pt-10 md:pt-[120px] pb-16"
        >
          <Link
            to="/collection"
            className="group label-upper text-brown-dark hover:text-brown-mid transition-colors duration-300 tracking-widest2 inline-flex items-center gap-2 mb-8 border-b border-brown-dark/25 hover:border-brown-dark pb-1"
          >
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Collezione
          </Link>

          {p.tag && (
            <p className="label-upper text-brown-dark/40 tracking-widest2 mb-3">{p.tag}</p>
          )}
          <h1 className="font-cormorant font-normal text-brown-dark text-4xl md:text-[46px] leading-[1.05]">
            {p.name}
          </h1>
          {p.color && (
            <p className="font-cormorant italic text-brown-mid text-xl md:text-2xl mt-2">{p.color}</p>
          )}
          <p className="font-inter font-normal text-brown-dark text-xl mt-5">{p.price}</p>

          <div className="flex gap-3 mt-8">
            <button
              onClick={() => onAddToCart(p)}
              className="flex-1 font-inter uppercase text-[12px] tracking-[0.22em] border border-brown-dark text-brown-dark py-4 transition-colors duration-300 hover:bg-brown-dark hover:text-white"
            >
              Aggiungi al Carrello
            </button>
            <button
              onClick={() => onToggleFavorite && onToggleFavorite(p.id)}
              aria-label={favorited ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
              aria-pressed={favorited}
              className="shrink-0 w-[52px] flex items-center justify-center border border-brown-dark text-brown-dark transition-colors duration-300 hover:bg-brown-dark hover:text-white"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill={favorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
              </svg>
            </button>
          </div>

          {/* Descrizione in grande */}
          <p className="font-cormorant font-light italic text-brown-mid text-2xl md:text-[27px] leading-[1.55] mt-12 mb-8">
            {p.description}
          </p>

          {/* Dettagli ricchi */}
          <div className="border-b border-brown-dark/12">
            <Accordion title="Come pulirla">{details.pulizia}</Accordion>
            <Accordion title="Materiale">{details.materiale}</Accordion>
            <Accordion title="Provenienza">{details.provenienza}</Accordion>
          </div>
        </motion.div>

        {/* ── Foto che scorrono — a DESTRA. Partono dall'alto, senza spazi
               sopra: così la prima foto può solo salire, non scendere
               lasciando vuoto (stesso comportamento del sito live). ── */}
        <div className="order-1 md:order-2 md:w-[54%] flex flex-col gap-[3px]">
          {images.map((src, i) => (
            <div key={i} className="w-full overflow-hidden bg-[#F5F3EF]" style={{ aspectRatio: '4 / 5' }}>
              <img
                src={src}
                alt={`${p.name} — ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Potrebbe interessarti ── */}
      {related.length > 0 && (
        <section className="px-6 md:px-10 pb-20 md:pb-28 border-t border-brown-dark/10 pt-16 md:pt-20">
          <p className="label-upper text-brown-dark/40 tracking-widest2 text-center mb-10">
            Potrebbe Interessarti
          </p>
          <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {related.map((r) => (
              <Link key={r.id} to={`/product/${r.id}`} className="group block">
                <div className="overflow-hidden bg-[#F5F3EF]" style={{ aspectRatio: '2 / 3' }}>
                  <img
                    src={r.image}
                    alt={r.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p className="font-inter font-light text-brown-dark/70 text-[11px] uppercase tracking-[0.14em] mt-3 text-center">
                  {r.name}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
