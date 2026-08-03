import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'vietri-favorites'

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/* Preferiti persistiti in localStorage — nessun backend, stesso spirito
   ottimistico del carrello (src/shopify/useCart.js). */
export function useFavorites() {
  const [ids, setIds] = useState(readStored)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)) } catch { /* storage non disponibile */ }
  }, [ids])

  const isFavorite = useCallback((id) => ids.includes(id), [ids])

  const toggleFavorite = useCallback((id) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  return { favoriteIds: ids, isFavorite, toggleFavorite, count: ids.length }
}
