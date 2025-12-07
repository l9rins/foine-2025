import React from 'react'

export default function PostDetailModal({ post, onClose }) {
  if (!post) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-4xl w-full max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-white/20 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-2/3 relative">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-auto max-h-[70vh] object-contain bg-black"
            />
          </div>

          {/* Details Section */}
          <div className="lg:w-1/3 p-6 flex flex-col">
            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-4 font-['Lexend']">
              {post.title}
            </h2>

            {/* Description */}
            <div className="flex-1 mb-6">
              <p className="text-gray-300 leading-relaxed">
                {post.description}
              </p>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-auto">
              <button className="flex-1 btn-primary flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share
              </button>
              <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors duration-200">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}