import React, { useState } from 'react'
import api from '../api/axios'

export default function UploadForm({ onPostCreated }) {
  const [formData, setFormData] = useState({ title: '', description: '', tags: '' })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return alert('Please select an image')

    setLoading(true)
    try {
      const data = new FormData()
      data.append('title', formData.title)
      data.append('description', formData.description)
      data.append('file', file)
      if (formData.tags) {
        formData.tags.split(',').forEach(tag => data.append('tags', tag.trim()))
      }

      const res = await api.post('/posts', data)
      onPostCreated(res.data)
      setFormData({ title: '', description: '', tags: '' })
      setFile(null)
    } catch (err) {
      alert(err.response?.data?.error || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Create New Post</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="glass-input w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="glass-input w-full h-20 resize-none"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="glass-input w-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full text-sm text-gray-300"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          {loading ? 'Uploading...' : 'Create Post'}
        </button>
      </form>
    </div>
  )
}