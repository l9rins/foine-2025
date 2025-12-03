import React, { useState, useEffect } from 'react'

export default function Navbar({ onLogout, onOpenUpload, searchTerm, setSearchTerm, selectedTag, setSelectedTag, allTags }) {
  const [user, setUser] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    // Get user info from localStorage or API
    const token = localStorage.getItem('token')
    if (token) {
      try {
        // Decode JWT to get user info (basic implementation)
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser({
          username: payload.sub || payload.username || 'User',
          email: payload.email || ''
        })
      } catch (e) {
        setUser({ username: 'User' })
      }
    }
  }, [])

  return (
    <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl z-50 relative">
      <div className="glass-panel rounded-full px-4 md:px-6 py-3 md:py-4 shadow-2xl bg-gray-900/60 backdrop-blur-md border border-white/10">
        <div className="flex justify-between items-center gap-2 md:gap-6">

          {/* Logo Section */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-base md:text-lg shadow-lg">
              F
            </div>
            <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-['Lexend'] hidden sm:block">
              Foiné
            </span>
          </div>

          {/* Search Bar - Hidden on very small screens */}
          <div className="flex-1 max-w-xs md:max-w-md mx-2 md:mx-4 hidden sm:block">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input pl-9 pr-4 py-2 w-full text-sm"
              />
            </div>
          </div>

          {/* Tag Filter - Hidden on small screens */}
          <div className="relative flex-shrink-0 hidden md:block">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="glass-input appearance-none pr-8 pl-3 py-2 text-sm min-w-[120px]"
            >
              <option value="">All Tags</option>
              {allTags?.map(tag => (
                <option key={tag} value={tag}>#{tag}</option>
              ))}
            </select>
            <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {/* Create Button */}
            <button
                onClick={onOpenUpload}
                className="btn-primary flex items-center gap-2 group"
            >
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline text-sm font-medium">Create</span>
            </button>

            {/* User Menu */}
            <div className="relative" id="user-menu">
              <button 
                className="flex items-center gap-2 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                {/* User Avatar */}
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                  {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-300">
                  {user?.username || 'User'}
                </span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown Menu - Positioned outside glass-panel to avoid overflow:hidden clipping */}
      <div 
        className={`absolute right-4 top-full mt-2 w-48 glass-panel rounded-xl py-2 transition-all duration-200 transform ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <div className="px-4 py-2 border-b border-white/10">
          <p className="text-sm font-medium text-white">{user?.username}</p>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>
        <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </nav>
  )
}