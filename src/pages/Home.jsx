import Hero           from '@/components/Hero'
import CollectionGrid from '@/components/CollectionGrid'
import FeaturedProduct from '@/components/FeaturedProduct'
import Lookbook       from '@/components/Lookbook'
import MaterialsStrip from '@/components/MaterialsStrip'
import InstagramTeaser from '@/components/InstagramTeaser'
import StoreBanner    from '@/components/StoreBanner'
import Newsletter     from '@/components/Newsletter'

export default function Home({ onAddToCart }) {
  return (
    <main>
      {/* Sticky reveal: the hero stays pinned while the collection scrolls up over it */}
      <div className="relative">
        <Hero />
        <CollectionGrid />
      </div>
      <Lookbook onAddToCart={onAddToCart} />
      <FeaturedProduct onAddToCart={onAddToCart} />
      <MaterialsStrip />
      <InstagramTeaser />
      <StoreBanner />
      <Newsletter />
    </main>
  )
}
