import sciarpaRossaHero from '@/assets/images/scarves/hero-silk.jpg'
import sciarpaRossaGrid from '@/assets/images/scarves/sciarpa-rossa-grid.png'
import venezia2         from '@/assets/images/scarves/venezia-2.jpg'
import venezia3         from '@/assets/images/scarves/venezia-3.jpg'
import venezia4         from '@/assets/images/scarves/venezia-4.jpg'
import sciarpaRossaAlt  from '@/assets/images/scarves/sciarpa-rossa-alt.png'
import sciarpaArancio   from '@/assets/images/scarves/sciarpa-arancio.png'
import sciarpaVietri    from '@/assets/images/scarves/sciarpa-vietri.png'
import capriModel       from '@/assets/images/scarves/capri-model.jpg'
import capriFlat        from '@/assets/images/scarves/capri-flat.jpg'
import capriDetail      from '@/assets/images/scarves/capri-detail.jpg'
import ravelloModel     from '@/assets/images/scarves/ravello-model.jpg'
import ravelloFlat      from '@/assets/images/scarves/ravello-flat.jpg'
import ravelloDetail    from '@/assets/images/scarves/ravello-detail.jpg'
import portofinoModel   from '@/assets/images/scarves/portofino-model.jpg'
import portofinoFlat    from '@/assets/images/scarves/portofino-flat.jpg'
import portofinoDetail  from '@/assets/images/scarves/portofino-detail.jpg'
import borsaVerde       from '@/assets/images/bags/borsa-verde.png'
import borsaCognac      from '@/assets/images/bags/borsa-cognac.jpg'
import borsaBrera       from '@/assets/images/bags/borsa-brera.png'
import borsaFlatlay     from '@/assets/images/bags/borsa-flatlay.png'

export const products = [
  {
    id: 1,
    name: 'Sciarpa Venezia',
    category: 'Sciarpe',
    material: 'Seta pura',
    price: '€ 290',
    color: 'Rosso Borgogna',
    image: sciarpaRossaGrid,
    gallery: [venezia2, venezia3, venezia4],
    tag: 'NEW',
    description: 'Seta leggera come un respiro. Tinta in rosso borgogna, drappeggiata a mano.',
  },
  {
    id: 2,
    name: 'Sciarpa Bellagio',
    category: 'Sciarpe',
    material: 'Seta pura',
    price: '€ 290',
    color: 'Rosso Rubino',
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
    color: 'Arancio Bruciato',
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
    color: 'Avorio Botanico',
    image: sciarpaVietri,
    tag: 'NEW',
    description: 'Stampa botanica su seta naturale. Fiori, foglie e il marchio VIETRI Milano tessuto nel tempo.',
  },
  {
    id: 8,
    name: 'Sciarpa Capri',
    category: 'Sciarpe',
    material: 'Twill di seta',
    price: '€ 320',
    color: 'Azzurro Mediterraneo',
    image: capriFlat,
    gallery: [capriModel, capriFlat, capriDetail],
    tag: null,
    description: 'Twill di seta azzurro mediterraneo. La luce del mare, piegata in mano.',
  },
  {
    id: 9,
    name: 'Sciarpa Ravello',
    category: 'Sciarpe',
    material: 'Twill di seta',
    price: '€ 340',
    color: 'Verde Salvia',
    image: ravelloFlat,
    gallery: [ravelloModel, ravelloFlat, ravelloDetail],
    tag: null,
    description: 'Twill di seta verde salvia. Il verde dei giardini a picco sulla costa.',
  },
  {
    id: 10,
    name: 'Sciarpa Portofino',
    category: 'Sciarpe',
    material: 'Twill di seta',
    price: '€ 360',
    color: 'Blu Notte & Oro',
    image: portofinoFlat,
    gallery: [portofinoModel, portofinoFlat, portofinoDetail],
    tag: 'NEW',
    description: 'Twill di seta blu notte, decoro barocco in oro. Pensata per la sera.',
  },
  {
    id: 5,
    name: 'Borsa Navigli',
    category: 'Borse',
    material: 'Pelle grana italiana',
    price: '€ 780',
    color: 'Verde Lime',
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
    color: 'Azzurro Polvere',
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
    color: 'Sabbia',
    image: borsaFlatlay,
    tag: 'ESCLUSIVO',
    description: 'Clutch in camoscio sabbia con foulard abbinato. Due pezzi, un solo gesto.',
  },
]

export const featuredProduct = products.find(p => p.id === 5)

export const heroImages = {
  primary:   sciarpaRossaHero,
  secondary: borsaCognac,
}
