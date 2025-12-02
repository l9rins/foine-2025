import React from 'react'
import Navigation from './components/splash/Navigation'
import HeroSection from './components/splash/HeroSection'
import ValueProposition from './components/splash/ValueProposition'
import StatisticsSection from './components/splash/StatisticsSection'

export default function SplashPage({ onAuth }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navigation onAuth={onAuth} />
      <main className="pt-24 pb-20">
        <HeroSection />
        <ValueProposition />
        <StatisticsSection />
        {/* Additional sections can be added here */}
      </main>
      {/* Footer can be added here */}
    </div>
  )
}