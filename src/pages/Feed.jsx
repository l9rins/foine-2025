import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import PinCard from '../components/PinCard'
import SkeletonPin from '../components/SkeletonPin'

export default function Feed({ posts, setPosts }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // Only fetch if we don't have posts yet
    if (posts.length === 0) {
      setLoading(true)
      api.get('/posts')
        .then(res => {
            setPosts(res.data)
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
            setLoading(false)
        })
    } else {
        setLoading(false)
    }
  }, [posts.length, setPosts])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {/* Show Skeletons while loading */}
      {loading && (
        <>
            {[...Array(8)].map((_, i) => (
                <SkeletonPin key={i} />
            ))}
        </>
      )}

      {/* Show Actual Posts when loaded */}
      {!loading && posts.map(post => (
        <PinCard key={post.id} post={post} />
      ))}
      
      {/* Empty State Polish */}
      {!loading && posts.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center text-gray-400 py-20 text-center">
            <p className="text-xl">No inspiration yet.</p>
            <p className="text-sm">Be the first to create a post!</p>
        </div>
      )}
    </div>
  )
}