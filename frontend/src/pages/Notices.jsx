import React, { useEffect, useState } from 'react'
import { noticeAPI } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import { PlusCircle, Bell, Calendar, User, AlertCircle, Megaphone, Clock, Pin } from 'lucide-react'
import { Link } from 'react-router-dom'

const Notices = () => {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const res = await noticeAPI.list()
      setItems(res.data.data || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const canCreate = user && (user.role === 'admin' || user.role === 'faculty')

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-400/30'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30'
      case 'low': return 'text-green-400 bg-green-500/20 border-green-400/30'
      default: return 'text-blue-400 bg-blue-500/20 border-blue-400/30'
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return <AlertCircle className="w-4 h-4" />
      case 'medium': return <Bell className="w-4 h-4" />
      case 'low': return <Pin className="w-4 h-4" />
      default: return <Megaphone className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen animate-fade-in relative overflow-hidden">
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5"></div>
          <div className="absolute inset-0 grid-bg"></div>
        </div>
        <div className="flex items-center justify-center min-h-screen relative z-10">
          <div className="card-premium p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading notices...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen animate-fade-in relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5"></div>
        <div className="absolute inset-0 grid-bg"></div>
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb floating-orb-1"></div>
        <div className="floating-orb floating-orb-2"></div>
        <div className="floating-orb floating-orb-3"></div>
        <div className="floating-orb floating-orb-4"></div>
        <div className="floating-orb floating-orb-5"></div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl font-black gradient-text mb-4 animate-text-glow">Notices</h1>
              <p className="text-xl text-gray-300">
                Stay updated with the latest announcements and important information
              </p>
            </div>
            {canCreate && (
              <Link to="/notices/new" className="btn-primary">
                <PlusCircle className="h-5 w-5 mr-2" /> 
                New Notice
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card-premium p-6 hover-glow-cyan">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl shadow-lg shadow-cyan-500/25">
                  <Bell className="w-6 h-6 text-black" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Notices</p>
                  <p className="text-2xl font-bold text-white">{items.length}</p>
                </div>
              </div>
            </div>

            <div className="card-premium p-6 hover-glow-green">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg shadow-green-500/25">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">This Week</p>
                  <p className="text-2xl font-bold text-white">{items.filter(n => {
                    const noticeDate = new Date(n.date || n.createdAt)
                    const weekAgo = new Date()
                    weekAgo.setDate(weekAgo.getDate() - 7)
                    return noticeDate >= weekAgo
                  }).length}</p>
                </div>
              </div>
            </div>

            <div className="card-premium p-6 hover-glow-purple">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-3 rounded-xl shadow-lg shadow-purple-500/25">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Important</p>
                  <p className="text-2xl font-bold text-white">{items.filter(n => n.priority === 'high').length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 animate-slide-up">
          {items.length === 0 ? (
            <div className="card-premium neon-border p-12 text-center">
              <Bell className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-xl text-gray-400 mb-2">No notices available</p>
              <p className="text-gray-500">Check back later for important announcements and updates</p>
            </div>
          ) : (
            items.map((n, index) => (
              <div key={n._id} className="card-premium neon-border hover-glow-cyan" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-cyan-500/20 p-3 rounded-xl mr-4">
                        <Megaphone className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white mb-1">{n.title}</h2>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(n.date || n.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {n.createdBy?.name} ({n.createdBy?.role})
                          </div>
                        </div>
                      </div>
                    </div>
                    {n.priority && (
                      <div className={`flex items-center px-3 py-1 rounded-full border text-sm font-medium ${getPriorityColor(n.priority)}`}>
                        {getPriorityIcon(n.priority)}
                        <span className="ml-1 capitalize">{n.priority}</span>
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <p className="text-gray-300 whitespace-pre-line leading-relaxed">{n.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      Posted {new Date(n.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Notices
