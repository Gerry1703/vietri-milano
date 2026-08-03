import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { products } from '@/data/products'

/* Pagina Wishlist — elenca i prodotti salvati dall'utente (localStorage,
   vedi src/hooks/useFavorites.js). Stesso linguaggio visivo della Collezione. */
export default function Favorites({ favoriteIds = [], onToggleFavorite, onAddToCart, onOpenCart, onAddAbbinamento }) {
  const navigate = useNavigate()
  const items = products.filter((p) => favoriteIds.includes(p.id))

  const [selectMode, setSelectMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const [showSelectHint, setShowSelectHint] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  const toggleSelectMode = () => {
    setSelectMode((v) => !v)
    setSelectedIds([])
  }

  const toggleSelected = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const buyTargets = selectMode && selectedIds.length > 0
    ? items.filter((p) => selectedIds.includes(p.id))
    : items

  const handleBuy = () => {
    if (!onAddToCart || buyTargets.length === 0) return
    buyTargets.forEach((p) => onAddToCart(p))
    if (onOpenCart) onOpenCart()
  }

  const handleCreaAbbinamento = () => {
    if (selectMode && selectedIds.length === 0) {
      setShowSelectHint(true)
      return
    }
    if (!onAddAbbinamento || buyTargets.length === 0) return
    onAddAbbinamento(buyTargets.map((p) => p.id))
    navigate('/abbinamenti')
  }

  const handleSaveWishlist = async () => {
    const url = `${window.location.origin}/preferiti?ids=${favoriteIds.join(',')}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      /* clipboard non disponibile */
    }
  }

  const getShareUrl = () => {
    return `${window.location.origin}/preferiti?ids=${favoriteIds.join(',')}`
  }

  const shareOnInstagram = () => {
    const url = getShareUrl()
    window.open(`https://instagram.com/`, '_blank')
    setTimeout(() => {
      try {
        navigator.clipboard.writeText(url)
      } catch {}
    }, 100)
  }

  const shareOnFacebook = () => {
    const url = getShareUrl()
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400')
  }

  const shareOnWhatsApp = () => {
    const url = getShareUrl()
    const text = encodeURIComponent(`Guarda la mia wishlist VIETRI Milano: ${url}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const shareViaEmail = () => {
    const url = getShareUrl()
    const subject = encodeURIComponent('La mia Wishlist VIETRI Milano')
    const body = encodeURIComponent(`Guarda i miei prodotti preferiti: ${url}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  const copyLink = async () => {
    const url = getShareUrl()
    try {
      await navigator.clipboard.writeText(url)
      alert('Link copiato!')
    } catch {
      alert('Errore nella copia')
    }
  }

  return (
    <main className="bg-white min-h-screen pb-24">
      <section className="min-h-[30vh] flex flex-col items-center px-6 pt-28 md:pt-32">
        <h1
          className="font-cormorant font-normal uppercase text-brown-dark text-center leading-none"
          style={{ fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '0.42em', paddingLeft: '0.42em' }}
        >
          Wishlist
        </h1>
        <p className="label-upper text-brown-dark/40 tracking-widest2 mt-6">
          {items.length === 0
            ? 'Nessun prodotto salvato'
            : `${items.length} ${items.length === 1 ? 'prodotto' : 'prodotti'}`}
        </p>
      </section>

      {items.length === 0 ? (
        <div className="text-center px-6 pb-10">
          <p className="font-cormorant italic text-brown-mid text-xl mb-8">
            Salva le tue sciarpe e borse preferite per ritrovarle qui.
          </p>
          <Link
            to="/collection"
            className="inline-block font-inter uppercase text-[12px] tracking-[0.22em] border border-brown-dark text-brown-dark px-10 py-4 transition-colors duration-300 hover:bg-brown-dark hover:text-white"
          >
            Vai alla Collezione
          </Link>
        </div>
      ) : (
        <div>
          {/* Barra azioni */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-y border-brown-dark/10 py-5 mb-10 px-6">
            <button
              onClick={handleSaveWishlist}
              className="font-inter uppercase text-[11px] tracking-[0.18em] text-brown-dark/70 hover:text-brown-dark transition-colors duration-300"
            >
              Salva wishlist
            </button>
            <span className="hidden md:block w-px h-3 bg-brown-dark/15" />
            <div className="relative">
              {showShareModal && (
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)] rounded-full flex items-center gap-1 px-3 py-2 whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={shareOnFacebook}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-brown-dark/10 transition-colors text-brown-dark"
                    aria-label="Condividi su Facebook"
                    title="Facebook"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button
                    onClick={shareViaEmail}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-brown-dark/10 transition-colors text-brown-dark"
                    aria-label="Condividi via email"
                    title="Email"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-10 5L2 7" />
                    </svg>
                  </button>
                  <button
                    onClick={shareOnInstagram}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-brown-dark/10 transition-colors text-brown-dark"
                    aria-label="Condividi su Instagram"
                    title="Instagram"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </button>
                  <button
                    onClick={shareOnWhatsApp}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-brown-dark/10 transition-colors text-brown-dark"
                    aria-label="Condividi su WhatsApp"
                    title="WhatsApp"
                  >
                    <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M16.001 3C9.096 3 3.5 8.596 3.5 15.5c0 2.316.63 4.484 1.727 6.348L3 29l7.318-2.187A12.44 12.44 0 0 0 16.001 28C22.905 28 28.5 22.404 28.5 15.5S22.905 3 16.001 3zm0 22.75c-1.99 0-3.85-.55-5.44-1.507l-.39-.232-4.34 1.297 1.318-4.222-.254-.406a10.2 10.2 0 0 1-1.645-5.68c0-5.66 4.607-10.267 10.751-10.267 5.66 0 10.267 4.607 10.267 10.267 0 5.936-4.607 10.75-10.267 10.75zm5.616-7.65c-.308-.154-1.82-.898-2.102-1.001-.282-.103-.487-.154-.692.154-.205.308-.795 1.001-.975 1.206-.18.205-.36.23-.667.077-.308-.154-1.3-.479-2.475-1.527-.915-.816-1.533-1.824-1.713-2.132-.18-.308-.019-.474.135-.628.139-.139.308-.36.462-.54.154-.18.205-.308.308-.513.103-.205.051-.385-.026-.539-.077-.154-.692-1.667-.948-2.283-.25-.6-.505-.519-.692-.528-.18-.008-.385-.01-.59-.01-.205 0-.539.077-.821.385-.282.308-1.077 1.052-1.077 2.565 0 1.513 1.103 2.976 1.257 3.181.154.205 2.17 3.313 5.257 4.647.735.317 1.308.507 1.755.649.737.234 1.408.201 1.939.122.591-.088 1.82-.744 2.077-1.462.257-.719.257-1.335.18-1.462-.077-.128-.282-.205-.59-.36z"/>
                    </svg>
                  </button>
                  <span className="w-px h-4 bg-brown-dark/15 mx-1" />
                  <button
                    onClick={copyLink}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-brown-dark/10 transition-colors text-brown-dark"
                    aria-label="Copia link"
                    title="Copia link"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </button>
                  <span className="w-px h-4 bg-brown-dark/15 mx-1" />
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-brown-dark/10 transition-colors text-brown-dark"
                    aria-label="Chiudi"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              )}
              <button
                onClick={() => setShowShareModal((v) => !v)}
                className="font-inter uppercase text-[11px] tracking-[0.18em] text-brown-dark/70 hover:text-brown-dark transition-colors duration-300"
              >
                Condividi
              </button>
            </div>
            <span className="hidden md:block w-px h-3 bg-brown-dark/15" />
            <button
              onClick={handleBuy}
              className="font-inter uppercase text-[11px] tracking-[0.18em] text-brown-dark/70 hover:text-brown-dark transition-colors duration-300"
            >
              Acquista {buyTargets.length} {buyTargets.length === 1 ? 'prodotto' : 'prodotti'}
            </button>
            <span className="hidden md:block w-px h-3 bg-brown-dark/15" />
            <button
              onClick={handleCreaAbbinamento}
              className="font-inter uppercase text-[11px] tracking-[0.18em] text-brown-dark/70 hover:text-brown-dark transition-colors duration-300"
            >
              {selectMode ? 'Crea abbinamenti' : 'Abbinamenti'}
            </button>
            <span className="hidden md:block w-px h-3 bg-brown-dark/15" />
            <button
              onClick={toggleSelectMode}
              className={`font-inter uppercase text-[11px] tracking-[0.18em] transition-colors duration-300 ${
                selectMode ? 'text-brown-dark' : 'text-brown-dark/70 hover:text-brown-dark'
              }`}
            >
              {selectMode ? 'Annulla selezione' : 'Seleziona prodotti'}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-px gap-y-10">
            {items.map((p) => {
              const isSelected = selectedIds.includes(p.id)
              return (
                <div key={p.id} className="group relative">
                  <div className="relative">
                    {selectMode ? (
                      <button
                        onClick={() => toggleSelected(p.id)}
                        className="block w-full overflow-hidden bg-[#F5F3EF]"
                        style={{ aspectRatio: '4 / 5' }}
                        aria-label={isSelected ? 'Deseleziona' : 'Seleziona'}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className={`w-full h-full object-cover object-center transition-transform duration-[700ms] ease-out ${
                            isSelected ? '' : 'group-hover:scale-[1.04]'
                          }`}
                        />
                      </button>
                    ) : (
                      <Link to={`/product/${p.id}`} className="block overflow-hidden bg-[#F5F3EF]" style={{ aspectRatio: '4 / 5' }}>
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-center transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
                        />
                      </Link>
                    )}

                    {selectMode ? (
                      <span
                        className={`absolute top-3 right-3 z-10 w-5 h-5 flex items-center justify-center border transition-colors duration-300 pointer-events-none ${
                          isSelected ? 'bg-brown-dark border-brown-dark text-white' : 'bg-white/90 border-brown-dark/30 text-transparent'
                        }`}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </span>
                    ) : (
                      <button
                        onClick={() => onToggleFavorite && onToggleFavorite(p.id)}
                        aria-label="Rimuovi dai preferiti"
                        aria-pressed="true"
                        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center text-brown-dark/70 hover:text-brown-dark transition-colors duration-300"
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
                        </svg>
                      </button>
                    )}

                  </div>

                  <Link to={`/product/${p.id}`} className="block mt-3 px-3 text-center">
                    <p className="font-cormorant font-semibold text-black text-[14px] uppercase tracking-[0.14em]">{p.name}</p>
                    <p className="font-inter font-medium text-black/80 text-[12px] mt-1">{p.price}</p>
                  </Link>

                  {!selectMode && (
                    <button
                      onClick={() => {
                        onAddToCart && onAddToCart(p)
                        onOpenCart && onOpenCart()
                      }}
                      className="block mx-auto mt-2 font-inter text-[10px] uppercase tracking-[0.18em] text-black/50 hover:text-black transition-colors duration-300 border-b border-transparent hover:border-black/40 pb-0.5"
                    >
                      Aggiungi al carrello
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {showSelectHint && (
        <div
          className="fixed inset-0 z-[100] flex justify-center items-start pt-[24vh] bg-black/50 px-6"
          onClick={() => setShowSelectHint(false)}
        >
          <div
            className="bg-white max-w-sm w-full text-center px-8 py-10"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-cormorant font-light text-brown-dark uppercase tracking-[0.18em] text-lg md:text-xl leading-relaxed">
              Seleziona prima i prodotti<br />che vuoi abbinare
            </p>
            <button
              onClick={() => setShowSelectHint(false)}
              className="mt-8 inline-block font-inter uppercase text-[12px] tracking-[0.22em] border border-brown-dark text-brown-dark px-8 py-3 transition-colors duration-300 hover:bg-brown-dark hover:text-white"
            >
              Ho capito
            </button>
          </div>
        </div>
      )}

      {showShareModal && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowShareModal(false)}
        />
      )}
    </main>
  )
}
