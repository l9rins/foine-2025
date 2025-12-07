import React, { useEffect, useState, useMemo } from 'react'
import api from '../api/axios'
import PinCard from '../components/PinCard'
import SkeletonPin from '../components/SkeletonPin'

export default function Feed({ posts, setPosts, searchTerm, selectedTag }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    api.get('/posts')
      .then(res => {
        console.log('API Response received');
        console.log('Response data:', res.data);
        console.log('Is array?', Array.isArray(res.data));
        
        let postsData = [];
        if (Array.isArray(res.data)) {
          postsData = res.data;
        } else if (res.data && Array.isArray(res.data.data)) {
          postsData = res.data.data;
        } else if (res.data && Array.isArray(res.data.posts)) {
          postsData = res.data.posts;
        } else if (res.data && typeof res.data === 'object' && Object.keys(res.data).length > 0) {
          // If it's an object, try to find an array property
          const possibleArrays = Object.values(res.data).filter(val => Array.isArray(val));
          if (possibleArrays.length > 0) {
            postsData = possibleArrays[0];
          }
        }
        
        console.log('Final posts data:', postsData);
        setPosts(postsData);
      })
      .catch(err => {
        console.error('API Error:', err);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Get unique tags from all posts
  const allTags = useMemo(() => {
    const tags = new Set()
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => tags.add(tag.name))
      }
    })
    return Array.from(tags).sort()
  }, [posts])

  // Filter posts based on search and tag
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchTerm === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesTag = selectedTag === '' ||
        (post.tags && post.tags.some(tag => tag.name === selectedTag))

      return matchesSearch && matchesTag
    })
  }, [posts, searchTerm, selectedTag])

  return (
    <div className="space-y-6">
      {/* Results count - more visible */}
      {!loading && (searchTerm || selectedTag) && (
        <div className="text-center py-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-white text-sm font-medium">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
              {searchTerm && <span className="text-blue-300"> for "{searchTerm}"</span>}
              {selectedTag && <span className="text-purple-300"> with #{selectedTag}</span>}
            </p>
          </div>
        </div>
      )}

      {/* Posts Grid - Now starts higher up */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-4 mx-auto max-w-7xl">
        {/* Show Skeletons while loading */}
        {loading && (
          <>
              {[...Array(8)].map((_, i) => (
                  <SkeletonPin key={i} />
              ))}
          </>
        )}

        {/* Show Filtered Posts when loaded */}
        {!loading && filteredPosts.map(post => (
          <PinCard key={post.id} post={post} />
        ))}

        {/* Enhanced Empty State */}
        {!loading && filteredPosts.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center text-gray-400 py-20 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-['Lexend']">
              {searchTerm || selectedTag ? 'No matches found' : 'No inspiration yet'}
            </h3>
            <p className="text-lg mb-6 max-w-md">
              {searchTerm || selectedTag
                ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
                : 'Be the first to share your creative vision with the world!'
              }
            </p>
            {!searchTerm && !selectedTag && (
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="btn-primary flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create First Post
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}