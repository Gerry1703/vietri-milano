import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function CartDrawer({ isOpen, onClose, items, onRemove, onUpdateQty, total, onCheckout }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[70] bg-black/40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease }}
            className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-sm bg-brown-dark flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-cream/10">
              <h2 className="label-upper text-cream tracking-widest2">Carrello</h2>
              <button onClick={onClose} className="text-cream/60 hover:text-cream transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {items.length === 0 ? (
                <p className="font-cormorant font-light italic text-cream/50 text-lg text-center mt-10">
                  Il carrello è vuoto.
                </p>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden" style={{ background: '#1a1008' }}>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center" />
                    </div>
                    <div className="flex-1">
                      <p className="font-cormorant font-normal text-cream text-lg leading-tight">{item.name}</p>
                      <p className="label-upper text-cream/50 text-[10px] mt-1">{item.material}</p>
                      <p className="font-inter font-light text-gold text-sm mt-1">{item.price}</p>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => onUpdateQty(item.id, item.qty - 1)}
                          className="w-6 h-6 border border-cream/20 text-cream/60 hover:text-cream text-xs flex items-center justify-center transition-colors"
                        >−</button>
                        <span className="font-inter font-light text-cream text-sm w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.qty + 1)}
                          className="w-6 h-6 border border-cream/20 text-cream/60 hover:text-cream text-xs flex items-center justify-center transition-colors"
                        >+</button>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="ml-auto text-cream/30 hover:text-cream/70 transition-colors text-xs label-upper"
                        >
                          Rimuovi
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-8 py-6 border-t border-cream/10">
                <div className="flex justify-between mb-6">
                  <span className="label-upper text-cream/60 tracking-widest2">Totale</span>
                  <span className="font-cormorant font-light text-cream text-xl">
                    € {total.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <button onClick={onCheckout} className="w-full btn-outline-gold py-4">
                  Procedi all'Acquisto
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
