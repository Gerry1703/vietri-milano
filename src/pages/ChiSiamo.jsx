import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import editorialModel from '@/assets/images/scarves/editorial-modella-scialle.jpg'
import capriDetail from '@/assets/images/scarves/capri-detail.jpg'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

const VALORI = [
  {
    label: 'Artigianalità',
    text: 'Ogni foulard è tagliato, stampato e orlato a mano da manifatture italiane selezionate, con tecniche tramandate da generazioni.',
  },
  {
    label: 'Materiali',
    text: 'Solo seta pura e twill di seta delle migliori filature. Nessun compromesso sulla qualità del tessuto e della stampa.',
  },
  {
    label: 'Milano',
    text: 'Il nostro showroom si trova a Corso Vercelli 7, nel cuore della città che ha ispirato ogni disegno della collezione.',
  },
]

export default function ChiSiamo() {
  return (
    <main className="bg-white">
      {/* ── Testata: breadcrumb + titolo, stesso linguaggio delle altre pagine. ── */}
      <section className="flex flex-col items-center px-6 pt-24 md:pt-28 pb-14">
        <nav className="font-inter text-[10px] uppercase tracking-[0.18em] text-brown-dark/40 mb-8">
          <Link to="/" className="hover:text-brown-dark transition-colors duration-300">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-brown-dark/70">Chi Siamo</span>
        </nav>

        <h1
          className="font-cormorant font-normal uppercase text-brown-dark text-center leading-none"
          style={{ fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '0.42em', paddingLeft: '0.42em' }}
        >
          Chi Siamo
        </h1>
      </section>

      {/* ── Foto a tutto schermo, senza testo sovrapposto: la foto è il colore. ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease }}
        className="w-full h-[62vh] md:h-[78vh] overflow-hidden bg-[#F5F3EF]"
      >
        <img
          src={editorialModel}
          alt="VIETRI Milano — manifattura della seta"
          className="w-full h-full object-cover"
          style={{ objectPosition: '50% 35%' }}
        />
      </motion.div>

      {/* ── Racconto del brand: occhiello + titolo + paragrafo, centrato. ── */}
      <section className="flex flex-col items-center text-center px-6 pt-20 md:pt-28 pb-16 md:pb-20">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="label-upper text-brown-dark/50 tracking-widest3 mb-6"
        >
          Manifattura Italiana
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="font-cormorant font-light italic text-brown-dark leading-[1.2] max-w-2xl"
          style={{ fontSize: 'clamp(24px, 3.4vw, 38px)' }}
        >
          Una storia di seta, pazienza e Milano.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="font-inter font-light text-brown-mid text-[14px] md:text-[15px] leading-[1.9] max-w-xl mt-8"
        >
          VIETRI nasce a Milano dalla volontà di raccontare l'eleganza italiana
          attraverso la seta. Ogni foulard prende forma da un disegno originale,
          stampato e rifinito a mano da manifatture che custodiscono un mestiere
          antico. Non inseguiamo le stagioni: creiamo pezzi pensati per durare,
          da indossare oggi e tramandare domani.
        </motion.p>
      </section>

      {/* ── Valori: tre colonne sobrie, solo testo, nessun colore decorativo. ── */}
      <section className="border-y border-brown-dark/10">
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-brown-dark/10">
          {VALORI.map((v) => (
            <div key={v.label} className="px-8 md:px-10 py-12 md:py-16 text-center">
              <p className="label-upper text-brown-dark tracking-widest2 mb-4">{v.label}</p>
              <p className="font-inter font-light text-brown-mid text-[13px] leading-[1.8]">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dettaglio + testo, due colonne: il processo dietro ogni pezzo. ── */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-[50vh] md:h-auto overflow-hidden bg-[#F5F3EF]">
          <img
            src={capriDetail}
            alt="Dettaglio lavorazione della seta"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col items-start justify-center px-8 md:px-16 py-16 md:py-0">
          <p className="label-upper text-brown-dark/50 tracking-widest2 mb-6">La lavorazione</p>
          <h3
            className="font-cormorant font-light text-brown-dark leading-[1.2] mb-6"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)' }}
          >
            Dal disegno alla stampa, ogni fase è seguita a mano.
          </h3>
          <p className="font-inter font-light text-brown-mid text-[14px] leading-[1.9] max-w-md">
            I nostri motivi nascono da illustrazioni originali, trasferite su
            seta con tecniche di stampa serigrafica tradizionale. La rifinitura
            a mano dell'orlo — l'ourlet roulotté — richiede anni di esperienza:
            è il dettaglio che distingue un foulard VIETRI a prima vista.
          </p>
        </div>
      </section>

      {/* ── Chiusura: invito a esplorare la collezione. ── */}
      <section className="flex flex-col items-center text-center px-6 py-20 md:py-24">
        <p className="font-cormorant font-light italic text-brown-dark text-xl md:text-2xl mb-8 max-w-lg">
          Scopri i foulard e le borse nati da questa storia.
        </p>
        <Link
          to="/collection"
          className="font-inter uppercase text-[12px] tracking-[0.22em] border border-brown-dark text-brown-dark px-10 py-4 transition-colors duration-300 hover:bg-brown-dark hover:text-white"
        >
          Vai alla Collezione
        </Link>
      </section>
    </main>
  )
}
