import React, { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, children }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    // Enhanced backdrop with better blur and animation
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-8 pb-4 bg-black/80 backdrop-blur-2xl transition-all duration-500 ease-out">

      {/* Click outside to close with ripple effect */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Modal Content with enhanced animations */}
      <div className="relative w-full max-w-lg max-h-[90vh] transform transition-all duration-500 ease-out flex flex-col" style={{
        animation: isOpen ? 'modalIn 0.5s ease-out forwards' : 'modalOut 0.3s ease-in forwards'
      }}>
        <div className="glass-panel border-0 shadow-2xl relative overflow-hidden flex flex-col h-full max-h-[90vh]">

            {/* Enhanced Header with gradient accent */}
            <div className="relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
              <div className="flex justify-between items-center px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-['Lexend']">{title}</h3>
                </div>
                <button
                    onClick={onClose}
                    className="group relative p-2 rounded-xl text-gray-400 hover:text-white transition-all duration-300 hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-500/25"
                >
                  <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div className="absolute inset-0 rounded-xl bg-red-500/0 group-hover:bg-red-500/10 transition-colors duration-300"></div>
                </button>
              </div>
            </div>

            {/* Enhanced Body with better padding and subtle background */}
            <div className="px-6 py-6 bg-gradient-to-b from-transparent to-black/5 flex-1 overflow-y-auto min-h-0">
                {children}
            </div>

            {/* Subtle bottom accent */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        </div>
      </div>
    </div>
  )
}