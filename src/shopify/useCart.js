import { useState, useCallback, useRef } from 'react'
import { shopifyFetch } from './client'
import { CREATE_CART, ADD_TO_CART } from './queries'

export function useCart() {
  const [items, setItems]     = useState([])
  const [isOpen, setIsOpen]   = useState(false)
  const [checkoutUrl, setCheckoutUrl] = useState(null)
  const cartIdRef = useRef(null)

  // Ensure a Shopify cart exists, returns cartId
  const ensureCart = useCallback(async () => {
    if (cartIdRef.current) return cartIdRef.current
    const res = await shopifyFetch({ query: CREATE_CART, variables: { input: {} } })
    if (!res) return null
    const { id, checkoutUrl: url } = res.data.cartCreate.cart
    cartIdRef.current = id
    setCheckoutUrl(url)
    return id
  }, [])

  const addToCart = useCallback(async (product) => {
    // Optimistic update — show immediately
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    setIsOpen(true)

    // Sync with Shopify if variantId is available
    if (product.variantId) {
      try {
        const cartId = await ensureCart()
        if (cartId) {
          await shopifyFetch({
            query: ADD_TO_CART,
            variables: { cartId, lines: [{ merchandiseId: product.variantId, quantity: 1 }] },
          })
        }
      } catch (e) {
        console.warn('Shopify cart sync failed, using local state', e)
      }
    }
  }, [ensureCart])

  const removeFromCart = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
    // TODO: Shopify cartLinesRemove mutation
  }, [])

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.id !== id))
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
    }
    // TODO: Shopify cartLinesUpdate mutation
  }, [])

  const goToCheckout = useCallback(() => {
    if (checkoutUrl) window.location.href = checkoutUrl
  }, [checkoutUrl])

  const total = items.reduce((sum, i) => {
    const price = parseFloat(i.price.replace(/[€\s.]/g, '').replace(',', '.'))
    return sum + price * i.qty
  }, 0)

  return {
    items, isOpen, setIsOpen,
    addToCart, removeFromCart, updateQty,
    total, count: items.reduce((s, i) => s + i.qty, 0),
    goToCheckout, checkoutUrl,
  }
}
