import React from 'react'
import Navigation from './components/splash/Navigation'
import HeroSection from './components/splash/HeroSection'
import ValueProposition from './components/splash/ValueProposition'
import StatisticsSection from './components/splash/StatisticsSection'
import FeaturesShowcase from './components/splash/FeaturesShowcase'
import TestimonialsSection from './components/splash/TestimonialsSection'
import Footer from './components/splash/Footer'

export default function SplashPage({ onAuth }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navigation onAuth={onAuth} />
      <main className="pt-24 pb-20">
        <HeroSection />
        <ValueProposition />
        <StatisticsSection />
        <FeaturesShowcase />
        <TestimonialsSection />
        {/* Additional sections can be added here */}
      </main>
      <Footer />
    </div>
  )
}