import React, { useState, useEffect } from 'react'
import AuthForm from './components/AuthForm'
import UploadForm from './components/UploadForm'
import Feed from './pages/Feed'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [posts, setPosts] = useState([])

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
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center p-6">
        <AuthForm onAuth={handleAuth} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Foiné</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          Logout
        </button>
      </header>
      <main>
        <UploadForm onPostCreated={handlePostCreated} />
        <Feed posts={posts} setPosts={setPosts} />
      </main>
    </div>
  )
}
