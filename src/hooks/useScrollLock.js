import { useEffect } from 'react'

/* Blocca lo scorrimento della pagina sotto un pannello aperto (carrello, menu).

   Su iOS Safari `overflow: hidden` sul body NON basta: il documento continua a
   scorrere al tocco, e sotto un fondale semitrasparente si vede benissimo. L'unico
   modo affidabile è togliere il body dal flusso con `position: fixed`, compensando
   con un `top` negativo per non far saltare la pagina in cima, e rimettere tutto
   com'era alla chiusura. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return

    const body = document.body
    const scrollY = window.scrollY
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      overflow: body.style.overflow,
    }

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.overflow = 'hidden'

    return () => {
      body.style.position = prev.position
      body.style.top = prev.top
      body.style.left = prev.left
      body.style.right = prev.right
      body.style.overflow = prev.overflow
      // `instant`: global.css imposta scroll-behavior smooth, senza questo la
      // pagina tornerebbe al punto giusto con un'animazione visibile.
      window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' })
    }
  }, [locked])
}
