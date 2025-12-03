import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function StatisticsSection() {
  const [hasAnimated, setHasAnimated] = useState(false)

  const [counts, setCounts] = useState({
    creators: 0,
    pins: 0,
    users: 0,
    rating: 0
  })

  const stats = [
    { key: 'creators', target: 50000, label: 'Creative Professionals', suffix: 'k+' },
    { key: 'pins', target: 200000, label: 'Pins Shared', suffix: 'k+' },
    { key: 'users', target: 120000, label: 'Daily Active Users', suffix: 'k+' },
    { key: 'rating', target: 4.9, label: 'Platform Rating', suffix: '/5', isFloat: true }
  ]

  useEffect(() => {
    if (hasAnimated) {
      const duration = 2000 // 2 seconds
      const steps = 60
      const interval = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps

        setCounts({
          creators: Math.floor(50000 * progress),
          pins: Math.floor(200000 * progress),
          users: Math.floor(120000 * progress),
          rating: parseFloat((4.9 * progress).toFixed(1))
        })

        if (step >= steps) {
          clearInterval(timer)
          setCounts({
            creators: 50000,
            pins: 200000,
            users: 120000,
            rating: 4.9
          })
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [hasAnimated])

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, onViewportEnter: () => setHasAnimated(true) }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Playfair_Display'] text-white">
            Trusted by Creators Worldwide
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join a growing community of visual storytellers who choose Foiné for their creative journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                type: 'spring',
                stiffness: 100
              }}
              viewport={{ once: true }}
              className="glass-panel p-8 text-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 font-['Playfair_Display'] bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {stat.isFloat ? counts[stat.key].toFixed(1) : counts[stat.key].toLocaleString()}{stat.suffix}
              </div>
              <div className="text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional visual element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white font-medium">4.9/5 from 10,000+ reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}