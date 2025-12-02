import React, { useState } from 'react'
import api from '../api/axios'

export default function PinCard({ post }) {
  const [likes, setLikes] = useState(post.likeCount)
  const [liked, setLiked] = useState(false)

  const handleLike = async () => {
    try {
      // This would need a backend endpoint for liking
      // For now, just toggle locally
      setLiked(!liked)
      setLikes(prev => liked ? prev - 1 : prev + 1)
    } catch (err) {
      console.error('Like failed:', err)
    }
  }

  return (
    <div className="group relative mb-4 break-inside-avoid rounded-2xl overflow-hidden cursor-zoom-in transition-transform duration-300 hover:rotate-x-2 hover:scale-102">
      {/* Image with Zoom Effect */}
      <img 
        src={post.imageUrl} 
        alt={post.title} 
        className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110 border border-gray-700/30" 
      />
      
      {/* Dark Gradient Overlay (Only visible on hover) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        
        <h3 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {post.title}
        </h3>
        
        <div className="flex justify-between items-center mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          <p className="text-gray-300 text-xs line-clamp-1">{post.description}</p>
          
          <button
            onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                handleLike();
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
              liked ? 'bg-red-500/90 text-white' : 'bg-white/20 text-white hover:bg-white/40'
            }`}
          >
            {liked ? '❤️' : '🤍'} {likes}
          </button>
        </div>
      </div>
    </div>
  )
}