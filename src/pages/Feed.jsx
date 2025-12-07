import React, { useEffect, useState, useMemo } from 'react'
import api from '../api/axios'
import PinCard from '../components/PinCard'
import SkeletonPin from '../components/SkeletonPin'
import Masonry from 'react-masonry-css'

export default function Feed({ posts, setPosts, searchTerm, selectedTag, onPostClick }) {
  const [loading, setLoading] = useState(true)

  // Masonry breakpoint columns
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  }

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

      {/* Posts Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
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
          <PinCard key={post.id} post={post} onClick={() => onPostClick(post)} />
        ))}
      </Masonry>
    </div>
  )
}