import sciarpaRossaHero from '@/assets/images/scarves/sciarpa-rossa-hero.jpg'
import sciarpaRossaGrid from '@/assets/images/scarves/sciarpa-rossa-grid.png'
import sciarpaRossaAlt  from '@/assets/images/scarves/sciarpa-rossa-alt.jpg'
import sciarpaArancio   from '@/assets/images/scarves/sciarpa-arancio.jpg'
import sciarpaVietri    from '@/assets/images/scarves/sciarpa-vietri.png'
import borsaVerde       from '@/assets/images/bags/borsa-verde.png'
import borsaCognac      from '@/assets/images/bags/borsa-cognac.jpg'
import borsaBrera       from '@/assets/images/bags/borsa-brera.png'
import borsaFlatlay     from '@/assets/images/bags/borsa-flatlay.jpg'

export const products = [
  {
    id: 1,
    name: 'Sciarpa Venezia',
    category: 'Sciarpe',
    material: 'Seta pura',
    price: '€ 290',
    image: sciarpaRossaGrid,
    tag: 'NEW',
    description: 'Seta leggera come un respiro. Tinta in rosso borgogna, drappeggiata a mano.',
  },
  {
    id: 2,
    name: 'Sciarpa Bellagio',
    category: 'Sciarpe',
    material: 'Seta pura',
    price: '€ 290',
    image: sciarpaRossaAlt,
    tag: null,
    description: 'Stessa anima, luce diversa. La seta cambia con chi la indossa.',
  },
  {
    id: 3,
    name: 'Sciarpa Cortina',
    category: 'Sciarpe',
    material: 'Lana & seta',
    price: '€ 320',
    image: sciarpaArancio,
    tag: null,
    description: 'Jacquard arancio bruciato. Calore che non pesa.',
  },
  {
    id: 4,
    name: 'Sciarpa Vietri',
    category: 'Sciarpe',
    material: 'Seta pura',
    price: '€ 310',
    image: sciarpaVietri,
    tag: 'NEW',
    description: 'Stampa botanica su seta naturale. Fiori, foglie e il marchio VIETRI Milano tessuto nel tempo.',
  },
  {
    id: 5,
    name: 'Borsa Navigli',
    category: 'Borse',
    material: 'Pelle grana italiana',
    price: '€ 780',
    image: borsaVerde,
    tag: 'NEW',
    description: 'Pelle lime in grana italiana. Un nodo come firma, non come chiusura.',
  },
  {
    id: 6,
    name: 'Borsa Brera',
    category: 'Borse',
    material: 'Camoscio italiano',
    price: '€ 920',
    image: borsaBrera,
    tag: null,
    description: 'Camoscio azzurro polvere, morbido al tatto. Il nodo, unica chiusura necessaria.',
  },
  {
    id: 7,
    name: 'Cofanetto Vercelli',
    category: 'Borse',
    material: 'Camoscio & seta',
    price: '€ 1.050',
    image: borsaFlatlay,
    tag: 'ESCLUSIVO',
    description: 'Clutch in camoscio sabbia con foulard abbinato. Due pezzi, un solo gesto.',
  },
]

export const featuredProduct = products[4]

export const heroImages = {
  primary:   sciarpaRossaHero,
  secondary: borsaCognac,
}
