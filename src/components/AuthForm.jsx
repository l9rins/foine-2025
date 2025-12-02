import React, { useState } from 'react'
import api from '../api/axios'

export default function AuthForm({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register'
      const payload = isLogin
        ? { username: formData.username, password: formData.password }
        : formData

      const res = await api.post(endpoint, payload)
      localStorage.setItem('token', res.data.token)
      onAuth()
    } catch (err) {
      alert(err.response?.data?.error || 'Error')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="glass-panel max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="glass-input w-full"
          required
        />
        {!isLogin && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="glass-input w-full"
            required
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="glass-input w-full"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-sm text-gray-300 hover:text-white"
      >
        {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
      </button>
    </div>
  )
}