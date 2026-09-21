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
import { Analytics, CookieBanner, PrivacyPolicyPage, StructuredData } from '@components/common'
import { privacyPolicyPath } from '@lib/seoConfig'

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const isPrivacyPolicyRoute = window.location.pathname === privacyPolicyPath

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.7)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isPrivacyPolicyRoute) {
    return (
      <>
        <StructuredData />
        <Analytics />
        <PrivacyPolicyPage />
        <CookieBanner />
      </>
    )
  }

  return (
    <>
      <StructuredData />
      <Analytics />
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
      <CookieBanner />
    </>
  )
}
