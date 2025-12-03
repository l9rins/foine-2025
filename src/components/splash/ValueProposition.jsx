import React from 'react'
import { motion } from 'framer-motion'

export default function ValueProposition() {

  const cards = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      title: 'Premium Aesthetics',
      description: 'Experience a platform designed with pixel-perfect attention to detail. Premium dark theme with glassmorphism effects and refined typography.'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      title: 'Seamless Sharing',
      description: 'Upload, organize, and share your visual creations instantly. Integrated image hosting with CDN optimization for lightning-fast delivery.'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Vibrant Community',
      description: 'Connect with thousands of creative minds. Discover trends, get inspired, and build your portfolio in a supportive creative ecosystem.'
    }
  ]

  return (
    <section id="features" className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Playfair_Display'] text-white">
            Why Choose Foiné?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built for creators, by creators. Experience the difference of a platform that prioritizes both beauty and functionality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="glass-panel p-8 text-center group cursor-pointer"
            >
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                    {card.icon}
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-['Playfair_Display'] text-white">
                {card.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}