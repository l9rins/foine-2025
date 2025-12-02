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
    <div className="glass-panel mb-4 break-inside-avoid">
      <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover rounded-lg mb-2" />
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p className="text-sm text-gray-300 mb-2">{post.description}</p>
      <div className="flex items-center justify-between">
        <button
          onClick={handleLike}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            liked ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
          }`}
        >
          ❤️ {likes}
        </button>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.map(tag => (
              <span key={tag.id} className="text-xs bg-blue-600 px-2 py-1 rounded">
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}