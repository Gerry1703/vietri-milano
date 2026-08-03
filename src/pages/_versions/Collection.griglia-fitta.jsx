/*
  BACKUP — "griglia fitta" (luglio 2026)
  Versione della pagina Collezione con foto a contatto (gap 2px, edge-to-edge,
  didascalia in overlay solo on-hover). Salvata prima di provare la variante
  "The Row" con foto più piccole e spazio bianco tra le immagini.

  Per ripristinare: copiare il contenuto sotto in src/pages/Collection.jsx
  (questo file NON è collegato al router, è solo un riferimento).
*/

import { useState } from 'react'
import { Link } from 'react-router-dom'

/* Sciarpe — ultime foto realizzate + le due nuove (Milano Avorio, Venezia Pois) */
import scMilano   from '@/assets/images/scarves/sciarpa-milano-avorio.jpg'
import scPois     from '@/assets/images/scarves/sciarpa-venezia-pois.jpg'
import scSquare   from '@/assets/images/scarves/venezia-beige-square.png'
import scFlat     from '@/assets/images/scarves/venezia-beige-flat.png'
import scCorner   from '@/assets/images/scarves/venezia-beige-corner.png'
import scTexture  from '@/assets/images/scarves/venezia-beige-texture.png'
import scHalf     from '@/assets/images/scarves/venezia-beige-halfopen.png'
import scFloating from '@/assets/images/scarves/venezia-beige-floating.png'

/* Editoriale — foto grande inserita nel mix della griglia */
import editorialModel from '@/assets/images/scarves/editorial-modella-scialle.jpg'

/* Borse */
import bgCognac  from '@/assets/images/bags/borsa-cognac.jpg'
import bgBrera   from '@/assets/images/bags/borsa-brera.png'
import bgFlatlay from '@/assets/images/bags/borsa-flatlay.png'
import bgVerde   from '@/assets/images/bags/borsa-verde.png'
import bgNuovi   from '@/assets/images/bags/nuovi-arrivi-borse.jpg'

const SCARVES = [
  { img: scMilano,   name: 'Sciarpa Milano Avorio' },
  { img: scPois,     name: 'Sciarpa Venezia Pois' },
  { img: scSquare,   name: 'Sciarpa Venezia Avorio' },
  { img: scFlat,     name: 'Sciarpa Como Avorio' },
  { img: scCorner,   name: 'Sciarpa Bellagio Seta' },
  { img: scTexture,  name: 'Sciarpa Cortina Naturale' },
  { img: scHalf,     name: 'Sciarpa Bellagio Avorio' },
  { img: scFloating, name: 'Sciarpa Venezia in Volo' },
]

const BAGS = [
  { img: bgCognac,  name: 'Borsa Cognac' },
  { img: bgBrera,   name: 'Borsa Brera' },
  { img: bgFlatlay, name: 'Cofanetto Vercelli' },
  { img: bgVerde,   name: 'Borsa Navigli' },
  { img: bgNuovi,   name: 'Borsa Cuoio' },
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
  out.splice(mid, 0, { img: editorialModel, name: 'VIETRI Milano', big: true })
  return out
})()

const TABS = [
  { key: 'tutto',   label: 'Tutto' },
  { key: 'sciarpe', label: 'Sciarpe' },
  { key: 'borse',   label: 'Borse' },
]

export default function Collection() {
  const [tab, setTab] = useState('tutto')
  const items = tab === 'sciarpe' ? SCARVES : tab === 'borse' ? BAGS : ALL

  return (
    <main className="bg-white min-h-screen pb-24">
      {/* ── Testata: titolo grande + selettore. Occupa circa la metà alta della
             pagina, così la griglia foto parte verso metà schermo. ── */}
      <section className="min-h-[44vh] flex flex-col items-center px-6 pt-28 md:pt-32">
        <h1
          className="font-cormorant font-normal uppercase text-brown-dark text-center leading-none"
          style={{ fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '0.42em', paddingLeft: '0.42em' }}
        >
          Collezione
        </h1>

        <div className="flex items-center gap-10 md:gap-12 mt-8 md:mt-10">
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
      </section>

      {/* ── Griglia 4 colonne, foto in formato 2:3 ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px]">
        {items.map((it, i) => (
          <Link
            key={i}
            to="/collection"
            className={`group relative block overflow-hidden bg-[#F5F3EF] ${it.big ? 'col-span-2 row-span-2' : ''}`}
            style={it.big ? undefined : { aspectRatio: '2 / 3' }}
          >
            <img
              src={it.img}
              alt={it.name}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
            <span className="absolute bottom-4 left-4 right-4 font-inter font-light text-brown-dark/0 group-hover:text-brown-dark/70 text-[11px] uppercase tracking-[0.14em] transition-colors duration-300">
              {it.name}
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
