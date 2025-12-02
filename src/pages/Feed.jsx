import React, { useEffect } from 'react'
import api from '../api/axios'
import PinCard from '../components/PinCard'

export default function Feed({ posts, setPosts }) {
  useEffect(() => {
    if (posts.length === 0) {
      api.get('/posts').then(res => setPosts(res.data))
    }
  }, [posts.length, setPosts])

  return (
    <div className="columns-2 md:columns-4 gap-4">
      {posts.map(post => (
        <PinCard key={post.id} post={post} />
      ))}
    </div>
  )
}