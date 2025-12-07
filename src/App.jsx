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
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

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
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-purple-500/30 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-blue-600/5 rounded-full blur-[150px] animate-float"></div>
          <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-purple-600/5 rounded-full blur-[150px] animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-[50%] left-[50%] w-[40%] h-[40%] bg-pink-600/3 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10">

        {/* Floating Navbar with Search */}
        <Navbar
            onLogout={handleLogout}
            onOpenUpload={() => setIsUploadOpen(true)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            allTags={[...new Set(Array.isArray(posts) ? posts.reduce((acc, post) => acc.concat(post.tags || []), []) : [])].sort()}
        />

        {/* Modal Wrapper for UploadForm */}
        <Modal
            isOpen={isUploadOpen}
            onClose={() => setIsUploadOpen(false)}
            title="Share Inspiration"
        >
            <UploadForm onPostCreated={handlePostCreated} />
        </Modal>

        {/* Main Content - Now starts higher up */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-10">
            {/* UploadForm is GONE from here */}

            <Feed posts={posts} setPosts={setPosts} searchTerm={searchTerm} selectedTag={selectedTag} />
        </main>
        </div>
    </div>
  )
}
