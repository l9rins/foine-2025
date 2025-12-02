import React, { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    // Backdrop with blur and dark overlay
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl transition-all duration-300">
      
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg transform transition-all duration-300 scale-95 animate-in fade-in zoom-in-95">
        <div className="glass-panel border-gray-600/50 shadow-2xl relative overflow-hidden">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-600/50">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <button 
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors hover:bg-gray-700/50 p-2 rounded-xl"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Body */}
            <div>
                {children}
            </div>
        </div>
      </div>
    </div>
  )
}