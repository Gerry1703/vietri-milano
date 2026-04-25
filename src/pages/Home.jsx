import Hero           from '@/components/Hero'
import Marquee        from '@/components/Marquee'
import EditorialIntro from '@/components/EditorialIntro'
import CollectionGrid from '@/components/CollectionGrid'
import FeaturedProduct from '@/components/FeaturedProduct'
import ParallaxBreak  from '@/components/ParallaxBreak'
import MaterialsStrip from '@/components/MaterialsStrip'
import InstagramTeaser from '@/components/InstagramTeaser'
import StoreBanner    from '@/components/StoreBanner'
import Newsletter     from '@/components/Newsletter'

export default function Home({ onAddToCart }) {
  return (
    <main>
      <Hero />
      <Marquee />
      <EditorialIntro />
      <CollectionGrid />
      <FeaturedProduct onAddToCart={onAddToCart} />
      <ParallaxBreak />
      <MaterialsStrip />
      <InstagramTeaser />
      <StoreBanner />
      <Newsletter />
    </main>
  )
}
