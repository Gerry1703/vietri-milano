import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="snap-start bg-white text-black py-16 md:py-20 px-6 md:px-10 border-t border-black/10">
      {/* Wordmark */}
      <div className="text-center mb-14">
        <p className="font-cormorant font-light text-black tracking-widest4 text-4xl md:text-5xl uppercase select-none">
          VIETRI
        </p>
      </div>

      {/* 4-column grid */}
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 text-center md:text-left mb-14">
        <div>
          <h3 className="label-upper text-black/40 tracking-widest2 mb-5">Il Negozio</h3>
          <p className="font-inter font-light text-black/60 text-sm leading-loose">
            Corso Vercelli, Milano<br />
            Lun–Dom 10:00–19:30
          </p>
        </div>

        <div>
          <h3 className="label-upper text-black/40 tracking-widest2 mb-5">Collezioni</h3>
          <nav className="flex flex-col gap-2">
            {[['Sciarpe', '/collection?cat=sciarpe'], ['Borse', '/collection?cat=borse'], ['Novità', '/collection']].map(([l, to]) => (
              <Link key={l} to={to} className="font-inter font-light text-black/60 hover:text-black text-sm transition-colors duration-300">
                {l}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="label-upper text-black/40 tracking-widest2 mb-5">Contatti</h3>
          <p className="font-inter font-light text-black/60 text-sm leading-loose">
            info@vietrimilano.com<br />
            @vietrimilano
          </p>
        </div>

        <div>
          <h3 className="label-upper text-black/40 tracking-widest2 mb-5">Newsletter</h3>
          {subscribed ? (
            <p className="font-inter font-light text-black/60 text-sm leading-loose">
              Grazie per l'iscrizione.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 items-center md:items-start">
              <p className="font-inter font-light text-black/60 text-sm leading-loose">
                Iscriviti per scoprire le novità della Maison.
              </p>
              <div className="w-full flex border-b border-black/30 focus-within:border-black transition-colors duration-300">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="La tua email"
                  className="w-full bg-transparent font-inter font-light text-black text-sm py-2 outline-none placeholder:text-black/30"
                />
                <button
                  type="submit"
                  aria-label="Iscriviti"
                  className="shrink-0 font-inter uppercase text-[11px] tracking-[0.14em] text-black/60 hover:text-black transition-colors duration-300 py-2"
                >
                  Invia
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-screen-lg mx-auto">
        <div className="w-full h-px bg-black/10 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="label-upper text-black/30 text-[10px] tracking-widest2">
            © 2025 VIETRI Milano
          </p>
          <p className="label-upper text-black/30 text-[10px] tracking-widest2">
            P.IVA XXXXXXXX
          </p>
        </div>
      </div>
    </footer>
  )
}
