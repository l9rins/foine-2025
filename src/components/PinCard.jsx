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
            onClick={(e) => {
              e.stopPropagation()
              // Share functionality could go here
              navigator.share?.({
                title: post.title,
                text: post.description,
                url: window.location.href
              })
            }}
            className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-white/20 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Enhanced Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag.id} className="px-2 py-1 text-xs bg-white/20 backdrop-blur-sm rounded-full text-white">
                #{tag.name}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-full text-white">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <h3 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {post.title}
        </h3>

        <p className="text-gray-300 text-sm line-clamp-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          {post.description}
        </p>

        {/* Bottom Actions */}
        <div className="flex justify-between items-center mt-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatDate(post.createdAt || post.created_at)}
          </div>

          <button
            onClick={handleLike}
            className={`relative p-2 rounded-full backdrop-blur-md border transition-all duration-300 overflow-hidden group/like ${
              liked
                ? 'bg-red-500/90 text-white border-red-400/50 shadow-lg shadow-red-500/25'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10'
            }`}
          >
            <div className="relative z-10 flex items-center gap-1">
              <span className="text-sm">{liked ? '❤️' : '🤍'}</span>
              <span className="text-xs font-medium">{likes}</span>
            </div>
            {/* Subtle glow effect */}
            <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
              liked ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-100' : 'opacity-0'
            }`} />
            {/* Pulse effect on like */}
            <div className={`absolute inset-0 rounded-full bg-red-500/30 animate-ping ${liked ? 'opacity-75' : 'opacity-0'}`} />
          </button>
        </div>
      </div>
    </div>
  )
}