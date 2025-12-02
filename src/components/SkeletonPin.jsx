import React from 'react'

export default function SkeletonPin() {
  // We randomize heights slightly to mimic the masonry look even in loading state
  const randomHeight = Math.floor(Math.random() * (300 - 200 + 1) + 200)

  return (
    <div className="mb-4 break-inside-avoid">
      <div 
        className="w-full bg-gray-800/50 rounded-xl animate-pulse" 
        style={{ height: `${randomHeight}px` }}
      ></div>
      <div className="mt-2 space-y-2">
        <div className="h-4 bg-gray-800/50 rounded w-3/4 animate-pulse"></div>
        <div className="h-3 bg-gray-800/30 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
  )
}