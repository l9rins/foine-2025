import React from 'react'

export default function Navbar({ onLogout, onOpenUpload }) {
  return (
    <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[95%] max-w-5xl z-50">
      <div className="glass-panel rounded-full px-6 py-3 flex justify-between items-center shadow-2xl bg-gray-900/60 backdrop-blur-md border border-white/10">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
            F
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-['Playfair_Display']">
            Foiné
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
            
            {/* NEW: Create Button */}
            <button 
                onClick={onOpenUpload}
                className="btn-primary flex items-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline text-sm font-medium">Create</span>
            </button>

            {/* Logout Button (Same as before) */}
            <button 
                onClick={onLogout}
                className="btn-secondary group relative"
            >
                <span className="text-sm font-medium text-gray-300 group-hover:text-red-400 transition-colors">
                    Logout
                </span>
            </button>
        </div>
      </div>
    </nav>
  )
}