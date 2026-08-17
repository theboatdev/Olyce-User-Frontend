import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import DestinationsCarousel from './components/DestinationsCarousel'
import Testimonials from './components/Testimonials'
import EditSection from './components/EditSection'
import Footer from './components/Footer'
import { getPackages } from '../lib/data'

export default async function Page() {
  const packages = await getPackages();

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <DestinationsCarousel destinations={packages} />
        <Testimonials />
        <EditSection />
      </main>
      <Footer />
    </>
  )
}
