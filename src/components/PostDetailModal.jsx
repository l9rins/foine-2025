import React from 'react'

export default function PostDetailModal({ post, onClose }) {
  if (!post) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-4xl w-full max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">

        <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
          {/* Image Section */}
          <div className="lg:w-2/3 relative bg-black">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Details Section */}
          <div className="lg:w-1/3 flex flex-col h-full max-h-[90vh] lg:max-h-none">
            {/* Header */}
            <div className="relative px-6 py-5 border-b border-gray-700/50">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
              <div className="flex justify-between items-start gap-4">
                <h2 className="text-xl font-bold text-white font-['Lexend'] leading-tight pr-8">
                  {post.title}
                </h2>
                <button
                  onClick={onClose}
                  className="group relative p-2 rounded-xl text-gray-400 hover:text-white transition-all duration-300 hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-500/25 flex-shrink-0"
                >
                  <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div className="absolute inset-0 rounded-xl bg-red-500/0 group-hover:bg-red-500/10 transition-colors duration-300"></div>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 py-6 overflow-y-auto bg-gradient-to-b from-transparent to-black/5">
              {/* Author Section */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Posted by</p>
                  <p className="text-white font-medium">@user</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Description
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {post.description || 'No description provided.'}
                </p>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span
                        key={tag.id}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-200"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="px-6 py-4 border-t border-gray-700/50 bg-gray-900/50">
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
              <div className="flex gap-3">
                <button className="flex-1 btn-primary flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share
                </button>
                <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 border border-white/10">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}