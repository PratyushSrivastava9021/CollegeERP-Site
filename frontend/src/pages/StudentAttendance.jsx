import React, { useEffect, useState } from 'react'
import { attendanceAPI } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { Calendar, Clock, CheckCircle2, XCircle, BarChart3, TrendingUp, AlertCircle } from 'lucide-react'

const StudentAttendance = () => {
  const { user } = useAuth()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const load = async () => {
    try {
      const res = await attendanceAPI.getByStudent(user.id || user._id)
      setRows(res.data.data || [])
    } catch (e) {
      toast.error('Failed to load attendance')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (user) load() }, [user])

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'text-green-400 bg-green-500/20 border-green-400/30'
      case 'absent': return 'text-red-400 bg-red-500/20 border-red-400/30'
      case 'late': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30'
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle2 className="w-4 h-4" />
      case 'absent': return <XCircle className="w-4 h-4" />
      case 'late': return <Clock className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
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
            <p className="text-gray-300">Loading attendance records...</p>
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

      <div className="max-w-7xl mx-auto relative z-10" style={{padding: 'clamp(1rem, 4vw, 2rem)'}}>
        <div className="animate-slide-up" style={{marginBottom: 'clamp(2rem, 6vh, 3rem)'}}>
          <div className="text-center" style={{marginBottom: 'clamp(2rem, 5vh, 3rem)'}}>
            <h1 className="text-3xl md:text-5xl font-black gradient-text mb-4 animate-text-glow">My Attendance</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Monitor your attendance record and stay on track with your academic goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6" style={{marginBottom: 'clamp(2rem, 5vh, 3rem)'}}>
            <div className="card-premium hover-glow-green" style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg shadow-green-500/25">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider">Present Today</p>
                  <div className="flex items-center">
                    <p className="text-xl md:text-2xl font-bold text-white">4/5</p>
                    <TrendingUp className="w-4 h-4 text-green-400 ml-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-premium hover-glow-cyan" style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl shadow-lg shadow-cyan-500/25">
                  <BarChart3 className="w-6 h-6 text-black" />
                </div>
                <div className="ml-4">
                  <p className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider">Overall %</p>
                  <div className="flex items-center">
                    <p className="text-xl md:text-2xl font-bold text-white">92%</p>
                    <CheckCircle2 className="w-4 h-4 text-green-400 ml-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-premium hover-glow-purple" style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-3 rounded-xl shadow-lg shadow-purple-500/25">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider">This Month</p>
                  <div className="flex items-center">
                    <p className="text-xl md:text-2xl font-bold text-white">18/20</p>
                    <TrendingUp className="w-4 h-4 text-purple-400 ml-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-premium hover-glow-orange" style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl shadow-lg shadow-orange-500/25">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider">Class Average</p>
                  <div className="flex items-center">
                    <p className="text-xl md:text-2xl font-bold text-white">88%</p>
                    <BarChart3 className="w-4 h-4 text-orange-400 ml-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-premium animate-slide-up hover-glow-cyan" style={{marginBottom: 'clamp(2rem, 5vh, 3rem)', padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <input
                type="date"
                className="form-input pl-12 h-14 text-base"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="card-premium neon-border animate-slide-up">
          <div className="border-b border-gray-800" style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
            <h3 className="text-lg md:text-2xl font-bold text-white flex items-center">
              <Calendar className="h-6 w-6 mr-3 text-cyan-400" />
              Attendance Records
            </h3>
          </div>
          <div style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
            {rows.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-lg md:text-xl text-gray-400 mb-2">No attendance records found</p>
                <p className="text-sm md:text-base text-gray-500">Your attendance records will appear here once marked by faculty</p>
              </div>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vh, 1.5rem)'}}>
                {rows.map((r) => (
                  <div key={r._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-800/50 rounded-2xl hover:bg-gray-700/50 transition-all gap-3 sm:gap-0" style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
                    <div className="flex items-center">
                      <div className="bg-cyan-500/20 p-3 rounded-xl mr-4">
                        <Calendar className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm md:text-base break-words">{r.courseId?.title} ({r.courseId?.code})</p>
                        <p className="text-xs md:text-sm text-gray-400">{new Date(r.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className={`flex items-center px-4 py-2 rounded-full border ${getStatusColor(r.status)}`}>
                      {getStatusIcon(r.status)}
                      <span className="ml-2 font-medium capitalize">{r.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentAttendance
