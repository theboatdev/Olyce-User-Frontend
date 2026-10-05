import HeroSection from './components/HeroSection'
import WelcomeSection from './components/WelcomeSection'
import DestinationsCarousel from './components/DestinationsCarousel'
import Testimonials from './components/Testimonials'
import EditSection from './components/EditSection'
import Footer from './components/Footer'
import { getPackages } from '../lib/data'

export default async function Page() {
  const packages = await getPackages()

  return (
    <div className="olyce-home">
      <main>
        <HeroSection />
        <WelcomeSection />
        <DestinationsCarousel destinations={packages} />
        <Testimonials />
        <EditSection />
      </main>
      <Footer />
    </div>
  )
}
