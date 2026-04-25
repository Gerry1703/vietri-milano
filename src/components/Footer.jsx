import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-brown-dark text-cream py-16 md:py-20 px-6 md:px-10">
      {/* Wordmark */}
      <div className="text-center mb-14">
        <p className="font-cormorant font-light text-cream tracking-widest4 text-4xl md:text-5xl uppercase select-none">
          VIETRI
        </p>
      </div>

      {/* 3-column grid */}
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center md:text-left mb-14">
        <div>
          <h3 className="label-upper text-gold tracking-widest2 mb-5">Il Negozio</h3>
          <p className="font-inter font-light text-cream/60 text-sm leading-loose">
            Corso Vercelli, Milano<br />
            Lun–Sab 10:00–19:30
          </p>
        </div>

        <div>
          <h3 className="label-upper text-gold tracking-widest2 mb-5">Collezioni</h3>
          <nav className="flex flex-col gap-2">
            {[['Sciarpe', '/collection?cat=sciarpe'], ['Borse', '/collection?cat=borse'], ['Novità', '/collection']].map(([l, to]) => (
              <Link key={l} to={to} className="font-inter font-light text-cream/60 hover:text-cream text-sm transition-colors duration-300">
                {l}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="label-upper text-gold tracking-widest2 mb-5">Contatti</h3>
          <p className="font-inter font-light text-cream/60 text-sm leading-loose">
            info@vietrimilano.com<br />
            @vietrimilano
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-screen-lg mx-auto">
        <div className="w-full h-px bg-gold/30 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="label-upper text-cream/30 text-[10px] tracking-widest2">
            © 2025 VIETRI Milano
          </p>
          <p className="label-upper text-cream/30 text-[10px] tracking-widest2">
            P.IVA XXXXXXXX
          </p>
        </div>
      </div>
    </footer>
  )
}
