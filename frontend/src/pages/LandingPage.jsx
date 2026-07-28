import Hero from '../features/landing/Hero'
import Features from '../features/landing/Features'
import Stats from '../features/landing/Stats'
import HowItWorks from '../features/landing/HowItWorks'
import CTASection from '../features/landing/CTASection'

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <CTASection />
    </>
  )
}
