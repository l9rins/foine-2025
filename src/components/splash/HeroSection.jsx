import React from 'react'
import { motion } from 'framer-motion'

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl mx-auto relative z-10"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-['Lexend']"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100">
            Discover.
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
            Share.
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Inspire.
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          A premium social platform for creative professionals to share, discover, and celebrate visual inspiration.
          Where aesthetics meet community.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-8 mb-12 text-sm md:text-base"
        >
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white font-['Lexend']">50k+</div>
            <div className="text-gray-400">Creators</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white font-['Lexend']">200k+</div>
            <div className="text-gray-400">Pins Shared</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white font-['Lexend']">120k+</div>
            <div className="text-gray-400">Daily Active</div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="btn-primary text-lg px-8 py-4">
            Start Creating Now
          </button>
          <button className="px-8 py-4 rounded-xl border-2 border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 text-lg font-medium">
            Explore Gallery
          </button>
        </motion.div>
      </motion.div>

      {/* Optional: Masonry Preview Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="grid grid-cols-6 gap-2 h-full">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg"
              style={{ height: `${Math.random() * 200 + 100}px` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}