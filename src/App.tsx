import { useEffect, useState } from 'react'
import {
  Navigation,
  Hero,
  Services,
  Steps,
  About,
  Clients,
  Works,
  Team,
  CTABanner,
  Footer
} from '@sections/index'

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.7)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="bg-ato-white text-ato-black overflow-x-hidden">
      <Navigation isFloating={isScrolled} />
      <Hero />
      <About />
      <Clients />
      <Steps />
      <Services />
      <Team />
      {false && <Works />}
      <CTABanner />
      <Footer />
    </main>
  )
}
