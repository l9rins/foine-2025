import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AuthForm from '../AuthForm'

export default function Navigation({ onAuth }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, x: "-50%" }}
        animate={{ y: 0, x: "-50%" }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-5 left-1/2 w-full max-w-6xl z-50 transition-all duration-300 ${isScrolled ? 'shadow-2xl' : ''}`}
      >
        <div className="glass-panel rounded-full px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
              F
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-['Playfair_Display']">
              Foiné
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {['Features', 'Discover', 'Community'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowAuthModal(true)}
                className="text-sm font-medium text-gray-200 hover:text-white transition-colors duration-300 px-4 py-2"
              >
                Sign In
              </button>
              <button 
                onClick={() => setShowAuthModal(true)}
                className="btn-primary"
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 glass-panel rounded-2xl p-6"
          >
            <nav className="flex flex-col gap-4">
              {['Features', 'Discover', 'Community'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-white/10">
              <button 
                onClick={() => { setShowAuthModal(true); setIsMobileMenuOpen(false); }}
                className="text-sm font-medium text-gray-200 hover:text-white transition-colors duration-300 text-left"
              >
                Sign In
              </button>
              <button 
                onClick={() => { setShowAuthModal(true); setIsMobileMenuOpen(false); }}
                className="btn-primary w-full"
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </motion.nav>
      
      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowAuthModal(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-md transform transition-all duration-300"
          >
            <div className="glass-panel border-white/20 shadow-2xl relative overflow-hidden p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white font-['Playfair_Display'] mb-2">Welcome to Foiné</h3>
                <p className="text-gray-400">Join our creative community</p>
              </div>
              <AuthForm onAuth={() => { onAuth(); setShowAuthModal(false); }} />
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}