import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar        from '@/components/Navbar'
import CartDrawer    from '@/components/CartDrawer'
import Footer        from '@/components/Footer'
import Home          from '@/pages/Home'
import Collection    from '@/pages/Collection'
import ProductDetail from '@/pages/ProductDetail'
import { useCart }   from '@/shopify/useCart'

const ease = [0.22, 1, 0.36, 1]

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  const { items, isOpen, setIsOpen, addToCart, removeFromCart, updateQty, total, count, goToCheckout } = useCart()

  return (
    <>
      <Navbar onCartOpen={() => setIsOpen(true)} cartCount={count} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition><Home onAddToCart={addToCart} /></PageTransition>
          } />
          <Route path="/collection" element={
            <PageTransition><Collection /></PageTransition>
          } />
          <Route path="/product/:id" element={
            <PageTransition><ProductDetail onAddToCart={addToCart} /></PageTransition>
          } />
        </Routes>
      </AnimatePresence>

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
