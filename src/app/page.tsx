import {
  Hero,
  Services,
  Steps,
  About,
  Clients,
  Team,
  CTABanner,
  Footer,
} from '@sections/index'
import { FloatingNavigation, TornEdge } from '@components/common'

export default function HomePage() {
  return (
    <main id="conteudo" className="bg-ato-white text-ato-black overflow-x-hidden">
      <FloatingNavigation />
      <Hero />
      <About />
      <TornEdge topColor="#ffffff" bottomColor="#0CBF0C" variant={1} />
      <Clients />
      <TornEdge topColor="#0CBF0C" bottomColor="#080808" variant={2} />
      <Steps />
      <TornEdge topColor="#080808" bottomColor="#ffffff" variant={1} />
      <Services />
      <Team />
      <CTABanner />
      <Footer />
    </main>
  )
}
