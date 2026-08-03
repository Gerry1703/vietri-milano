import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'vietri-abbinamenti'

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/* Abbinamenti salvati in localStorage — combo di prodotti creati dalla wishlist,
   stesso spirito di src/hooks/useFavorites.js. */
export function useAbbinamenti() {
  const [abbinamenti, setAbbinamenti] = useState(readStored)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(abbinamenti)) } catch { /* storage non disponibile */ }
  }, [abbinamenti])

  const addAbbinamento = useCallback((productIds) => {
    if (!productIds || productIds.length === 0) return
    setAbbinamenti((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, productIds },
    ])
  }, [])

  const removeAbbinamento = useCallback((id) => {
    setAbbinamenti((prev) => prev.filter((a) => a.id !== id))
  }, [])

  return { abbinamenti, addAbbinamento, removeAbbinamento }
}
