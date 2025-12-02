import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import PinCard from '../components/PinCard'
import SkeletonPin from '../components/SkeletonPin'

export default function Feed({ posts, setPosts }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true);
    api.get('/posts')
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-4 mx-auto max-w-7xl">
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