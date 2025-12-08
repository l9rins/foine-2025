import React, { useState } from 'react'
import api from '../api/axios'

export default function PinCard({ post, onClick }) {
  const [likes, setLikes] = useState(post.likeCount || 0)
  const [liked, setLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleLike = async (e) => {
    e.stopPropagation()
    try {
      // Toggle like state locally for immediate feedback
      setLiked(!liked)
      setLikes(prev => liked ? prev - 1 : prev + 1)

      // Here you would make an API call to update the like
      // await api.post(`/posts/${post.id}/like`)
    } catch (err) {
      // Revert on error
      setLiked(!liked)
      setLikes(prev => liked ? prev + 1 : prev - 1)
      console.error('Like failed:', err)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return date.toLocaleDateString()
  }

  return (
    <div
      className="group relative mb-4 break-inside-avoid rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:rotate-x-2 hover:scale-102 hover:shadow-2xl hover:shadow-blue-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Image with Enhanced Zoom Effect */}
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-auto object-cover transform transition-all duration-700 group-hover:scale-110 border border-gray-700/30"
        />

        {/* Image Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick Actions Overlay */}
        <div className={`absolute top-3 right-3 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <button
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-md border transition-all duration-300 overflow-hidden ${
              liked
                ? 'bg-red-500/90 text-white border-red-400/50 shadow-lg shadow-red-500/25'
                : 'bg-black/50 text-white border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10'
            }`}
          >
            <span className="text-sm">{liked ? '❤️' : '🤍'}</span>
          </button>
        </div>
      </div>

      {/* Enhanced Content Overlay - Bottom Gradient Only */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">

        {/* Author Info */}
        <div className="flex items-center gap-2 mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-sm">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="text-white text-xs font-medium">@user</span>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-sm leading-tight mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-100 line-clamp-2">
          {post.title}
        </h3>

        {/* Like Count */}
        <div className="flex items-center gap-1 text-xs text-gray-300 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-150">
          <span>{likes} likes</span>
        </div>
      </div>
    </div>
  )
}