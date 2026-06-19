# VIETRI Milano — Claude Code Context

## Progetto
Sito e-commerce luxury fashion per VIETRI Milano. React + Vite + Tailwind CSS + Framer Motion.
Repository: `gerry1703/vietri-milano`
Branch di sviluppo: `claude/clever-rubin-ae4ffb`

## Stack
- React + Vite
- Tailwind CSS (config in `tailwind.config.js`)
- Framer Motion (animazioni, parallax, scroll)
- React Router DOM
- Font: Cormorant Garamond (elegante/serif), Inter (sans-serif)

## Palette colori attuale
```js
// tailwind.config.js
'brown-dark':  '#3B2415'  // Espresso — navbar, accenti
'brown-mid':   '#6E4B2A'  // Tabacco
'beige-light': '#FFFFFF'  // sfondo pagina, testo su scuro
'beige-warm':  '#3B2415'  // Espresso — sfondo pannelli scuri (Marquee, FeaturedProduct, InstagramTeaser, StoreBanner, Footer, CartDrawer)
cream:         '#FFFFFF'
gold:          '#9C5B34'  // Cognac — accenti oro
```
CSS variables identiche in `src/styles/global.css`.

## Struttura pagina Home
```
Hero → Marquee → CollectionGrid → FeaturedProduct → ParallaxBreak → MaterialsStrip → InstagramTeaser → StoreBanner → Newsletter
```
EditorialIntro è stato rimosso.

## Componenti chiave e stato attuale

### CollectionGrid (`src/components/CollectionGrid.jsx`)
Sezione full-screen cinematografica con:
- Foto grotta con sciarpe su muro di pietra (`src/assets/images/collection-hero.jpg`)
- Ken Burns zoom-in (scale 1.18→1, 2.2s) all'entrata
- Parallax scroll: immagine drifta su + zoom; contenuto si alza e sfuma
- Heading "Scopri / la Collezione" con mask-reveal (overflow-hidden + y da 115%→0%)
- "la Collezione" in italic gold
- Stagger container animation (delayChildren: 0.35, staggerChildren: 0.13)
- Gold hairline che si disegna da sinistra (scaleX 0→1)
- CTA "Entra nella Collezione" con slide-up fill hover + freccia
- Scroll indicator bottom-left (testo verticale + linea pulsante)
- Height: `calc(100vh - 5rem)`

### Navbar (`src/components/Navbar.jsx`)
- Trasparente sulla home, `bg-beige-light/90 backdrop-blur` dopo scroll
- Mobile menu fullscreen `bg-beige-warm` con link `text-beige-light`
- Link: Collezione, Sciarpe, Borse

### InstagramTeaser (`src/components/InstagramTeaser.jsx`)
- `bg-beige-warm` (Espresso)
- "FOLLOW US" in Cormorant uppercase `text-beige-light`
- "@vietrimilano" in gold italic uppercase
- Carousel con 9 immagini prodotto
- Wordmark "GERARDO [GV logo] VIETRI" in fondo, `text-beige-light`

### MaterialsStrip (`src/components/MaterialsStrip.jsx`)
3 feature: "Da oltre 50 anni", "Prima Qualità", "Based in Milan — Corso Vercelli Milano"

### ParallaxBreak (`src/components/ParallaxBreak.jsx`)
Solo immagine + overlay — la scritta "Fatto in Italia" è stata rimossa.

### Pannelli scuri (bg-beige-warm = Espresso)
Marquee, FeaturedProduct, ParallaxBreak, InstagramTeaser, StoreBanner, Footer, CartDrawer
→ tutto il testo è `text-beige-light`

## Git workflow
```bash
# Prima di ogni PR:
git fetch origin main
git rebase origin/main
git push --force origin claude/clever-rubin-ae4ffb

# Push normale:
git push -u origin claude/clever-rubin-ae4ffb
```
PRs vengono squash-mergiate su `main`. Vercel deploya automaticamente da `main`.

## Immagini prodotto
- Sciarpe: `src/assets/images/scarves/`
- Borse: `src/assets/images/bags/`
- Logo GV: `src/assets/images/logo/gv.png` (usato con `filter: invert(1)` su sfondo scuro)
- Hero collezione: `src/assets/images/collection-hero.jpg`

## Note importanti
- `beige-light` e `cream` sono entrambi `#FFFFFF` (bianco) — sfondo pagina e testo su pannelli scuri
- `beige-warm` è Espresso `#3B2415` — sfondo pannelli scuri
- `gold` è Cognac `#9C5B34` — accenti
- Quando si cambiano i colori dei pannelli bisogna aggiornare sia `tailwind.config.js` che `src/styles/global.css`
- I pannelli scuri richiedono `text-beige-light` su tutti i testi interni
