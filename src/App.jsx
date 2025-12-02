import React, { useState, useEffect } from 'react'
import AuthForm from './components/AuthForm'
import UploadForm from './components/UploadForm'
import Feed from './pages/Feed'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import SplashPage from './SplashPage'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [posts, setPosts] = useState([])
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) setIsAuthenticated(true)
  }, [])

  const handleAuth = () => setIsAuthenticated(true)

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev])
    setIsUploadOpen(false) // Close modal on success
  }

  if (!isAuthenticated) {
    return <SplashPage onAuth={handleAuth} />
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-purple-500/30">
        {/* The Radial Gradient Background Effect */}
        <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
        </div>

        {/* Floating Navbar */}
        <Navbar 
            onLogout={handleLogout} 
            onOpenUpload={() => setIsUploadOpen(true)} 
        />

        {/* Modal Wrapper for UploadForm */}
        <Modal 
            isOpen={isUploadOpen} 
            onClose={() => setIsUploadOpen(false)}
            title="Share Inspiration"
        >
            <UploadForm onPostCreated={handlePostCreated} />
        </Modal>

        {/* Main Content - Now cleaner! */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-10">
            {/* UploadForm is GONE from here */}
            
            <Feed posts={posts} setPosts={setPosts} />
        </main>
    </div>
  )
}
