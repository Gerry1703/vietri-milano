import { useState, useRef, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { products } from '@/data/products'

/* Sciarpe — ultime foto realizzate + le due nuove (Milano Avorio, Venezia Pois)
   + Ravello e Portofino (Capri esclusa, è quella blu). */
import scMilano    from '@/assets/images/scarves/sciarpa-milano-avorio.jpg'
import scPois      from '@/assets/images/scarves/sciarpa-venezia-pois.jpg'
import scSquare    from '@/assets/images/scarves/venezia-beige-square.png'
import scFlat      from '@/assets/images/scarves/venezia-beige-flat.png'
import scCorner    from '@/assets/images/scarves/venezia-beige-corner.png'
import scTexture   from '@/assets/images/scarves/venezia-beige-texture.png'
import scHalf      from '@/assets/images/scarves/venezia-beige-halfopen.png'
import scFloating  from '@/assets/images/scarves/venezia-beige-floating.png'
import scRavello   from '@/assets/images/scarves/ravello-flat.jpg'
import scPortofino from '@/assets/images/scarves/portofino-flat.jpg'

/* Editoriale — foto grande inserita nel mix della griglia */
import editorialModel from '@/assets/images/scarves/editorial-modella-scialle.jpg'

/* Borse */
import bgBrera   from '@/assets/images/bags/borsa-brera.png'
import bgVerde   from '@/assets/images/bags/borsa-verde.png'
import bgNuovi   from '@/assets/images/bags/nuovi-arrivi-borse.jpg'

/* Ogni card punta al vero prodotto (src/data/products.js) quando esiste;
   le foto che sono solo altri scatti dello stesso prodotto Venezia Beige
   puntano tutte a quella scheda (id 11). */
const SCARVES = [
  { id: 12, img: scMilano,    name: 'Sciarpa Milano Avorio',    to: '/product/12' },
  { id: 13, img: scPois,      name: 'Sciarpa Venezia Pois',     to: '/product/13' },
  { id: 9,  img: scRavello,   name: 'Sciarpa Ravello',          to: '/product/9' },
  { id: 10, img: scPortofino, name: 'Sciarpa Portofino',        to: '/product/10' },
  { id: 11, img: scSquare,    name: 'Sciarpa Venezia Avorio',   to: '/product/11' },
  { id: 11, img: scFlat,      name: 'Sciarpa Como Avorio',      to: '/product/11' },
  { id: 11, img: scCorner,    name: 'Sciarpa Bellagio Seta',    to: '/product/11' },
  { id: 11, img: scTexture,   name: 'Sciarpa Cortina Naturale', to: '/product/11' },
  { id: 11, img: scHalf,      name: 'Sciarpa Bellagio Avorio',  to: '/product/11' },
  { id: 11, img: scFloating,  name: 'Sciarpa Venezia in Volo',  to: '/product/11' },
]

const BAGS = [
  { id: 6,  img: bgBrera, name: 'Borsa Brera',   to: '/product/6' },
  { id: 5,  img: bgVerde, name: 'Borsa Navigli', to: '/product/5' },
  { id: 14, img: bgNuovi, name: 'Borsa Cuoio',   to: '/product/14' },
]

/* Vista "Tutto": sciarpe e borse ALTERNATE, così si vedono abbinate e ci stanno più foto.
   A metà del mix si inserisce una foto grande (editoriale) che spezza il ritmo. */
const ALL = (() => {
  const out = []
  const max = Math.max(SCARVES.length, BAGS.length)
  for (let i = 0; i < max; i++) {
    if (SCARVES[i]) out.push(SCARVES[i])
    if (BAGS[i]) out.push(BAGS[i])
  }
  const mid = Math.floor(out.length / 2)
  out.splice(mid, 0, { img: editorialModel, name: 'VIETRI Milano', big: true, to: '/collection' })
  return out
})()

const TABS = [
  { key: 'tutto',   label: 'Tutto' },
  { key: 'sciarpe', label: 'Sciarpe' },
  { key: 'borse',   label: 'Borse' },
]

const SORTS = [
  { key: 'novita',      label: 'Novità' },
  { key: 'prezzo-asc',  label: 'Prezzo: crescente' },
  { key: 'prezzo-desc', label: 'Prezzo: decrescente' },
]

function priceOf(id) {
  const p = products.find((pr) => pr.id === id)
  return p ? parseInt(p.price.replace(/[^\d]/g, ''), 10) : 0
}

/* Un item combacia con la ricerca se il nome della card oppure i dati del
   prodotto collegato (categoria/colore/materiale in data/products.js)
   contengono il termine cercato. */
function matchesSearch(it, query) {
  const q = query.toLowerCase()
  if (it.name.toLowerCase().includes(q)) return true
  const p = products.find((pr) => pr.id === it.id)
  if (!p) return false
  return [p.category, p.color, p.material].some((f) => f && f.toLowerCase().includes(q))
}

export default function Collection({ isFavorite, onToggleFavorite }) {
  const [searchParams] = useSearchParams()
  const searchQuery = (searchParams.get('search') || '').trim()
  const searchActive = searchQuery.length > 0

  const catParam = searchParams.get('cat')
  const [tab, setTab] = useState(catParam === 'sciarpe' || catParam === 'borse' ? catParam : 'tutto')
  const [sort, setSort] = useState('novita')
  const [sortOpen, setSortOpen] = useState(false)
  const sortRef = useRef(null)
  const items = searchActive
    ? ALL.filter((it) => !it.big && matchesSearch(it, searchQuery))
    : tab === 'sciarpe' ? SCARVES : tab === 'borse' ? BAGS : ALL
  const sortLabel = SORTS.find((s) => s.key === sort)?.label

  // Sincronizza il tab con ?cat= quando si arriva da un link (navbar, footer...)
  // mentre si è già sulla pagina Collezione — altrimenti React Router non
  // rimonta il componente e il tab resterebbe fermo su quello precedente.
  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat === 'sciarpe' || cat === 'borse') setTab(cat)
    else if (!searchParams.get('search')) setTab('tutto')
  }, [searchParams])

  useEffect(() => {
    if (!sortOpen) return
    const onClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [sortOpen])

  const productCount = items.filter((it) => !it.big).length

  const displayItems = sort === 'novita'
    ? items
    : [...items.filter((it) => !it.big)].sort((a, b) =>
        sort === 'prezzo-asc' ? priceOf(a.id) - priceOf(b.id) : priceOf(b.id) - priceOf(a.id)
      )

  const renderCard = (it, i) => {
    const favorited = !it.big && isFavorite ? isFavorite(it.id) : false
    return (
      <Link
        key={i}
        to={it.to || '/collection'}
        className={`group relative block overflow-hidden bg-[#F5F3EF] ${it.big ? 'col-span-2 row-span-2 md:col-start-2' : ''}`}
        style={it.big ? undefined : { aspectRatio: '2 / 3' }}
      >
        <img
          src={it.img}
          alt={it.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />

        {!it.big && (
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onToggleFavorite && onToggleFavorite(it.id)
            }}
            aria-label={favorited ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
            aria-pressed={favorited}
            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center text-brown-dark/70 hover:text-brown-dark transition-colors duration-300"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill={favorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
            </svg>
          </button>
        )}

        <span className="absolute bottom-4 left-4 right-4 font-inter font-light text-brown-dark/0 group-hover:text-brown-dark/70 text-[11px] uppercase tracking-[0.14em] transition-colors duration-300">
          {it.name}
        </span>
      </Link>
    )
  }

  const noResults = searchActive && productCount === 0

  return (
    <main className="bg-white min-h-screen pb-24">
      {/* ── Testata + barra filtri, in un blocco alto almeno quanto lo schermo
             MENO l'altezza che avrà la prima riga di foto (fissa a 2:3, dipende
             solo dalla larghezza). La barra filtri è ancorata in fondo a questo
             blocco (mt-auto): lo spazio in più finisce SOPRA, tra il titolo e i
             filtri, e la riga 1 di foto comincia sempre esattamente al bordo
             dello schermo — mai un pezzo della riga 2 che sbuca sotto. ── */}
      <div className="flex flex-col min-h-[calc(100vh-75vw)] md:min-h-[calc(100vh-37.5vw)]">
      <section className="flex flex-col items-center px-6 pt-20 md:pt-24 pb-8 shrink-0">
          <nav className="font-inter text-[10px] uppercase tracking-[0.18em] text-brown-dark/40 mb-5">
            <Link to="/" className="hover:text-brown-dark transition-colors duration-300">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-brown-dark/70">Collezione</span>
          </nav>

          {searchActive ? (
            <h1 className="font-jost font-light uppercase text-brown-dark text-center tracking-[0.1em]" style={{ fontSize: 'clamp(20px, 2.4vw, 30px)' }}>
              “{searchQuery}”
            </h1>
          ) : (
            <h1
              className="font-cormorant font-normal uppercase text-brown-dark text-center leading-none"
              style={{ fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '0.42em', paddingLeft: '0.42em' }}
            >
              Collezione
            </h1>
          )}

          {searchActive ? (
            <Link
              to="/collection"
              className="font-inter uppercase text-[11px] tracking-[0.18em] text-brown-dark/50 hover:text-brown-dark transition-colors duration-300 mt-4"
            >
              Cancella ricerca ×
            </Link>
          ) : (
            <div className="flex items-center gap-10 md:gap-12 mt-6 md:mt-8">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`font-inter uppercase text-[13px] tracking-[0.22em] pb-1.5 border-b transition-colors duration-300 ${
                    tab === t.key
                      ? 'text-brown-dark border-brown-dark'
                      : 'text-brown-dark/40 border-transparent hover:text-brown-dark'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </section>

      {/* ── Barra filtra/ordina: conteggio a sinistra, ordinamento a destra.
             mt-auto la ancora in fondo al blocco: lo spazio extra va sopra. ── */}
      <div className="flex items-center justify-between py-3 px-6 md:px-10 mb-[2px] mt-auto shrink-0">
        <p className="font-inter uppercase text-[11px] tracking-[0.14em] text-brown-dark/50">
          {productCount} {productCount === 1 ? 'prodotto' : 'prodotti'}
        </p>

        <div ref={sortRef} className="relative flex items-center gap-2">
          <span className="font-inter uppercase text-[11px] tracking-[0.14em] text-brown-dark/50">
            Ordina per
          </span>
          <button
            type="button"
            onClick={() => setSortOpen((v) => !v)}
            className="flex items-center gap-2 font-inter uppercase text-[11px] tracking-[0.14em] text-brown-dark hover:text-brown-mid transition-colors duration-300"
          >
            {sortLabel}
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"/>
            </svg>
          </button>

          {sortOpen && (
            <div className="absolute bottom-full right-0 mb-3 w-48 z-20">
              {SORTS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => { setSort(s.key); setSortOpen(false) }}
                  className={`block w-full text-right px-4 py-2 font-inter uppercase text-[11px] tracking-[0.14em] transition-colors duration-300 ${
                    sort === s.key ? 'text-brown-dark' : 'text-brown-dark/50 hover:text-brown-dark'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>

      {noResults ? (
        <p className="font-cormorant font-light text-brown-dark/50 text-center py-20" style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}>
          Nessun prodotto trovato per &ldquo;{searchQuery}&rdquo;.
        </p>
      ) : (
        /* ── Griglia 4 colonne, foto 2:3 a contatto (gap minimo), didascalia in
               overlay on-hover. La foto grande resta sempre centrata a
               colonne 2-3 su desktop, indipendentemente da quante foto la
               precedono nel flusso. ── */
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] grid-flow-dense">
          {displayItems.map((it, i) => renderCard(it, i))}
        </div>
      )}
    </main>
  )
}
