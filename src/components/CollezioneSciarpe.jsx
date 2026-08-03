import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import veneziaSquare  from '@/assets/images/scarves/venezia-beige-square.png'
import veneziaPois    from '@/assets/images/scarves/sciarpa-venezia-pois.jpg'
import milanoAvorio   from '@/assets/images/scarves/sciarpa-milano-avorio.jpg'
import veneziaFlat    from '@/assets/images/scarves/venezia-beige-flat.png'
import veneziaCorner  from '@/assets/images/scarves/venezia-beige-corner.png'
import veneziaTexture from '@/assets/images/scarves/venezia-beige-texture.png'

/* Carosello "Collezioni Sciarpe" — impaginazione ispirata a prada.com:
   titolo + sottotitolo + tab, scorrimento orizzontale di card e barra di avanzamento.
   Foto della sciarpa bianca (Venezia Avorio); etichette segnaposto, facili da cambiare. */
const cards = [
  { img: veneziaSquare, name: 'Sciarpa Venezia Avorio' },
  { img: veneziaPois,   name: 'Sciarpa Venezia Pois' },
  { img: milanoAvorio,  name: 'Sciarpa Milano Avorio' },
  { img: veneziaFlat,   name: 'Sciarpa Como Avorio' },
  { img: veneziaCorner, name: 'Sciarpa Bellagio Seta' },
  { img: veneziaTexture, name: 'Sciarpa Cortina Naturale' },
]

export default function CollezioneSciarpe() {
  const scroller = useRef(null)
  const [seg, setSeg]       = useState({ w: 25, l: 0 })
  const [canLeft, setCanLeft]   = useState(false)
  const [canRight, setCanRight] = useState(true)

  const update = () => {
    const el = scroller.current
    if (!el) return
    const total = el.scrollWidth || 1
    setSeg({ w: (el.clientWidth / total) * 100, l: (el.scrollLeft / total) * 100 })
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < total - el.clientWidth - 4)
  }

  useEffect(() => {
    update()
    const el = scroller.current
    if (!el) return
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const scrollBy = (dir) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="bg-white w-full min-h-screen snap-start snap-always flex flex-col justify-start pt-[14vh] md:pt-[16vh] pb-14">
      {/* Intestazione */}
      <div className="px-6 md:px-10 text-center max-w-2xl mx-auto mb-10 md:mb-14">
        <h2 className="font-cormorant font-medium text-brown-dark text-3xl md:text-[42px] leading-tight">
          Collezioni Sciarpe
        </h2>
        <p className="font-inter font-light text-brown-mid text-[15px] leading-relaxed mt-5">
          Dalle sete che hanno definito l'eleganza di VIETRI ai nuovi disegni, passato e
          presente si incontrano dando forma a un foulard senza tempo, dal profondo spirito milanese.
        </p>
      </div>

      {/* Carosello */}
      <div className="relative">
        <div
          ref={scroller}
          className="flex gap-[2px] overflow-x-auto snap-x"
          style={{ scrollbarWidth: 'none' }}
        >
          {cards.map((c, i) => (
            <Link
              key={i}
              to="/product/11"
              className="group flex-shrink-0 snap-start w-[80%] sm:w-[47%] md:w-1/3 lg:w-1/4"
            >
              <div
                className="overflow-hidden bg-[#F5F3EF] flex items-center justify-center"
                style={{ height: 'clamp(280px, 50vh, 560px)' }}
              >
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="w-full h-full object-contain object-center transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="font-inter font-medium text-brown-dark text-sm text-center mt-5 tracking-[0.03em]">
                {c.name}
              </p>
            </Link>
          ))}
        </div>

        {/* Freccia destra */}
        {canRight && (
          <button
            onClick={() => scrollBy(1)}
            aria-label="Successivo"
            className="hidden md:flex absolute right-4 lg:right-6 top-[42%] -translate-y-1/2 text-brown-dark hover:text-brown-mid transition-colors duration-300"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
          </button>
        )}
        {/* Freccia sinistra */}
        {canLeft && (
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Precedente"
            className="hidden md:flex absolute left-4 lg:left-6 top-[42%] -translate-y-1/2 text-brown-dark hover:text-brown-mid transition-colors duration-300"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 6 9 12 15 18" /></svg>
          </button>
        )}
      </div>

      {/* Barra di avanzamento */}
      <div className="mt-12 md:mt-16 px-6 md:px-10 w-full max-w-sm mx-auto">
        <div className="relative h-px bg-brown-dark/15">
          <div
            className="absolute top-0 h-px bg-brown-dark transition-all duration-200 ease-out"
            style={{ width: `${seg.w}%`, left: `${seg.l}%` }}
          />
        </div>
      </div>
    </section>
  )
}
