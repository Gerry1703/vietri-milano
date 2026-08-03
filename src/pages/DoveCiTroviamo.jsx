import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]
const ADDRESS = 'Corso Vercelli 7, Milano'

export default function DoveCiTroviamo() {
  const [showMapsMenu, setShowMapsMenu] = useState(false)

  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`, '_blank', 'noopener,noreferrer')
    setShowMapsMenu(false)
  }
  const openAppleMaps = () => {
    window.open(`https://maps.apple.com/?q=${encodeURIComponent(ADDRESS)}`, '_blank', 'noopener,noreferrer')
    setShowMapsMenu(false)
  }

  return (
    <main className="bg-white">
      {/* ── Testata: breadcrumb + titolo, stesso linguaggio delle altre pagine. ── */}
      <section className="flex flex-col items-center px-6 pt-24 md:pt-28 pb-14">
        <nav className="font-inter text-[10px] uppercase tracking-[0.18em] text-brown-dark/40 mb-8">
          <Link to="/" className="hover:text-brown-dark transition-colors duration-300">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-brown-dark/70">Dove ci troviamo</span>
        </nav>

        <h1
          className="font-cormorant font-normal uppercase text-brown-dark text-center leading-none"
          style={{ fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '0.42em', paddingLeft: '0.42em' }}
        >
          Dove ci troviamo
        </h1>
      </section>

      {/* ── Info negozio + mappa, due colonne su desktop. ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-t border-brown-dark/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          className="flex flex-col justify-center px-8 md:px-16 py-16 md:py-24 order-2 md:order-1"
        >
          <p className="label-upper text-brown-dark/50 tracking-widest2 mb-6">Il Negozio</p>

          <h2
            className="font-cormorant font-light text-brown-dark leading-[1.2] mb-8"
            style={{ fontSize: 'clamp(24px, 2.8vw, 32px)' }}
          >
            Corso Vercelli 7<br />20145 Milano
          </h2>

          <dl className="space-y-5 mb-10">
            <div>
              <dt className="label-upper text-brown-dark/40 tracking-widest2 mb-1.5">Orari</dt>
              <dd className="font-inter font-light text-brown-mid text-[14px] leading-relaxed">
                Lun–Dom 10:00–19:30
              </dd>
            </div>
            <div>
              <dt className="label-upper text-brown-dark/40 tracking-widest2 mb-1.5">Email</dt>
              <dd className="font-inter font-light text-brown-mid text-[14px] leading-relaxed">
                <a href="mailto:info@vietrimilano.com" className="hover:text-brown-dark transition-colors duration-300">
                  info@vietrimilano.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="label-upper text-brown-dark/40 tracking-widest2 mb-1.5">Instagram</dt>
              <dd className="font-inter font-light text-brown-mid text-[14px] leading-relaxed">
                <a
                  href="https://instagram.com/vietrimilano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brown-dark transition-colors duration-300"
                >
                  @vietrimilano
                </a>
              </dd>
            </div>
          </dl>

          <div className="relative inline-block w-fit">
            {showMapsMenu && (
              <div
                className="absolute bottom-full left-0 mb-3 z-20 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)] rounded-lg flex flex-col py-1 whitespace-nowrap text-left"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={openGoogleMaps}
                  className="px-4 py-2.5 font-inter text-[12px] text-brown-dark hover:bg-brown-dark/5 transition-colors duration-200 text-left"
                >
                  Apri in Google Maps
                </button>
                <button
                  onClick={openAppleMaps}
                  className="px-4 py-2.5 font-inter text-[12px] text-brown-dark hover:bg-brown-dark/5 transition-colors duration-200 text-left"
                >
                  Apri in Mappe
                </button>
              </div>
            )}
            <button
              onClick={() => setShowMapsMenu((v) => !v)}
              className="font-inter uppercase text-[12px] tracking-[0.22em] border border-brown-dark text-brown-dark px-10 py-4 transition-colors duration-300 hover:bg-brown-dark hover:text-white"
            >
              Come raggiungerci
            </button>
          </div>
        </motion.div>

        {/* ── Mappa incorporata, nessuna chiave API richiesta. ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease }}
          className="order-1 md:order-2 h-[45vh] md:h-auto md:min-h-[520px] bg-[#F5F3EF]"
        >
          <iframe
            title="Mappa — Corso Vercelli 7, Milano"
            src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
            className="w-full h-full border-0 grayscale-[15%] contrast-[1.02]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </section>

      {showMapsMenu && (
        <div className="fixed inset-0 z-10" onClick={() => setShowMapsMenu(false)} />
      )}

      <div className="h-20 md:h-24" />
    </main>
  )
}
