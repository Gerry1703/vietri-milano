import { useEffect, useLayoutEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar        from '@/components/Navbar'
import CartDrawer    from '@/components/CartDrawer'
import Footer        from '@/components/Footer'
import Home          from '@/pages/Home'
import Collection    from '@/pages/Collection'
import ProductDetail from '@/pages/ProductDetail'
import Favorites     from '@/pages/Favorites'
import Abbinamenti   from '@/pages/Abbinamenti'
import ChiSiamo        from '@/pages/ChiSiamo'
import DoveCiTroviamo  from '@/pages/DoveCiTroviamo'
import { useCart }   from '@/shopify/useCart'
import { useFavorites } from '@/hooks/useFavorites'
import { useAbbinamenti } from '@/hooks/useAbbinamenti'

const ease = [0.22, 1, 0.36, 1]

/* Dissolvenza SOLO in ingresso, senza `exit` e senza AnimatePresence: con
   React 19 l'animazione di uscita non si completava mai, così la pagina
   vecchia restava incollata nel DOM (e la nuova non si montava affatto) —
   restando attivo anche il suo scroll-snap, che sparava sul footer. */
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  const { items, isOpen, setIsOpen, addToCart, removeFromCart, updateQty, total, count, goToCheckout } = useCart()
  const { favoriteIds, isFavorite, toggleFavorite, count: favoritesCount } = useFavorites()
  const { abbinamenti, addAbbinamento, removeAbbinamento } = useAbbinamenti()

  // Il browser ripristina DA SOLO la vecchia posizione di scroll quando si usa
  // Indietro/Avanti (scroll restoration nativa) — e lo fa DOPO il nostro
  // scrollTo qui sotto, quindi vince lui e si "entra" in fondo alla pagina.
  // Disattivandola, l'unica fonte di verità per lo scroll resta il nostro effetto.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  // Cambiando pagina (o query di ricerca) si riparte sempre dall'alto: React
  // Router, a differenza di una navigazione classica, non lo fa da solo.
  //
  // L'ORDINE DELLE DUE OPERAZIONI QUI SOTTO È CRITICO.
  //
  // 1) Lo scroll-snap a sezioni serve SOLO alla home, e va spento PRIMA di
  //    scorrere: con `scroll-snap-type: y mandatory` ancora attivo il browser
  //    è obbligato ad atterrare su un punto di ancoraggio, e fuori dalla home
  //    l'unico che resta è il footer — quindi ignora la richiesta di andare a 0
  //    e ci sbatte sui contatti/newsletter in fondo alla pagina.
  //    Lo governiamo dalla rotta (unico proprietario) e non con la pulizia allo
  //    smontaggio di Home, che non è garantita.
  //
  // 2) `behavior: 'instant'` è indispensabile perché global.css imposta
  //    `scroll-behavior: smooth` su html: senza, si avvia un'animazione di
  //    scorrimento che viene annullata a metà dal cambio di contenuto.
  // useLayoutEffect (non useEffect): viene eseguito subito dopo che React ha
  // aggiornato il DOM ma PRIMA che il browser disegni. Con useEffect si arriva
  // troppo tardi — il browser ha già valutato la nuova pagina con lo snap della
  // home ancora attivo e si è agganciato al footer, e a quel punto la richiesta
  // di tornare a 0 viene ignorata.
  useLayoutEffect(() => {
    const html = document.documentElement
    html.classList.toggle('snap-sections', location.pathname === '/')

    const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    toTop()
    // Rete di sicurezza: se il contenuto cresce dopo (immagini, font) e il
    // browser ne approfitta per riposizionarsi, riportiamo in cima.
    const id = setTimeout(toTop, 0)
    return () => clearTimeout(id)
  }, [location.pathname, location.search])

  return (
    <>
      <Navbar onCartOpen={() => setIsOpen(true)} cartCount={count} favoritesCount={favoritesCount} />

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><Home /></PageTransition>
        } />
        <Route path="/collection" element={
          <PageTransition>
            <Collection isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
          </PageTransition>
        } />
        <Route path="/product/:id" element={
          <PageTransition>
            <ProductDetail onAddToCart={addToCart} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
          </PageTransition>
        } />
        <Route path="/preferiti" element={
          <PageTransition>
            <Favorites
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
              onOpenCart={() => setIsOpen(true)}
              onAddAbbinamento={addAbbinamento}
            />
          </PageTransition>
        } />
        <Route path="/abbinamenti" element={
          <PageTransition>
            <Abbinamenti
              abbinamenti={abbinamenti}
              onRemoveAbbinamento={removeAbbinamento}
              onAddToCart={addToCart}
              onOpenCart={() => setIsOpen(true)}
            />
          </PageTransition>
        } />
        <Route path="/chi-siamo" element={
          <PageTransition><ChiSiamo /></PageTransition>
        } />
        <Route path="/dove-ci-troviamo" element={
          <PageTransition><DoveCiTroviamo /></PageTransition>
        } />
      </Routes>

      <Footer />

      <CartDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={items}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
        total={total}
        onCheckout={goToCheckout}
      />
    </>
  )
}
