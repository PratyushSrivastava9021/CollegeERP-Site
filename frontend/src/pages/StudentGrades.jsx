import React, { useEffect, useState } from 'react'
import { gradeAPI } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { Award, BookOpen, TrendingUp, BarChart3, Target, Star, Trophy, Medal } from 'lucide-react'

const StudentGrades = () => {
  const { user } = useAuth()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const res = await gradeAPI.getByStudent(user.id || user._id)
      setRows(res.data.data || [])
    } catch (e) {
      toast.error('Failed to load grades')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (user) load() }, [user])

  const getGradeColor = (grade) => {
    switch (grade?.toUpperCase()) {
      case 'A+': case 'A': return 'text-green-400 bg-green-500/20 border-green-400/30'
      case 'B+': case 'B': return 'text-blue-400 bg-blue-500/20 border-blue-400/30'
      case 'C+': case 'C': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30'
      case 'D': return 'text-orange-400 bg-orange-500/20 border-orange-400/30'
      case 'F': return 'text-red-400 bg-red-500/20 border-red-400/30'
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30'
    }
  }

  const getGradeIcon = (grade) => {
    switch (grade?.toUpperCase()) {
      case 'A+': return <Trophy className="w-4 h-4" />
      case 'A': return <Medal className="w-4 h-4" />
      case 'B+': case 'B': return <Star className="w-4 h-4" />
      case 'C+': case 'C': return <Target className="w-4 h-4" />
      default: return <Award className="w-4 h-4" />
    }
  }

  const calculateStats = () => {
    if (rows.length === 0) return { avg: 0, total: 0, highest: 0, gpa: 0 }
    const marks = rows.map(r => r.marks || 0)
    const avg = marks.reduce((a, b) => a + b, 0) / marks.length
    const total = marks.reduce((a, b) => a + b, 0)
    const highest = Math.max(...marks)
    const gpa = avg / 10 // Assuming marks are out of 100
    return { avg: avg.toFixed(1), total, highest, gpa: gpa.toFixed(2) }
  }

  const stats = calculateStats()

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
            <p className="text-gray-300">Loading your grades...</p>
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
          <div className="text-center mb-8">
            <h1 className="text-5xl font-black gradient-text mb-4 animate-text-glow">My Grades</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Track your academic performance and celebrate your achievements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card-premium p-6 hover-glow-green">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg shadow-green-500/25">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Average</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-white">{stats.avg}%</p>
                    <TrendingUp className="w-4 h-4 text-green-400 ml-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-premium p-6 hover-glow-cyan">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl shadow-lg shadow-cyan-500/25">
                  <Trophy className="w-6 h-6 text-black" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Highest</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-white">{stats.highest}%</p>
                    <Star className="w-4 h-4 text-cyan-400 ml-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-premium p-6 hover-glow-purple">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-3 rounded-xl shadow-lg shadow-purple-500/25">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">GPA</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-white">{stats.gpa}</p>
                    <Medal className="w-4 h-4 text-purple-400 ml-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-premium p-6 hover-glow-orange">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl shadow-lg shadow-orange-500/25">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Subjects</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-white">{rows.length}</p>
                    <BookOpen className="w-4 h-4 text-orange-400 ml-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-premium neon-border animate-slide-up">
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <Award className="h-6 w-6 mr-3 text-cyan-400" />
              Academic Results
            </h3>
          </div>
          <div className="p-6">
            {rows.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-xl text-gray-400 mb-2">No grades available</p>
                <p className="text-gray-500">Your grades will appear here once published by faculty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {rows.map((r) => (
                  <div key={r._id} className="flex items-center justify-between p-6 bg-gray-800/50 rounded-2xl hover:bg-gray-700/50 transition-all">
                    <div className="flex items-center">
                      <div className="bg-cyan-500/20 p-4 rounded-xl mr-6">
                        <BookOpen className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">{r.courseId?.title}</p>
                        <p className="text-sm text-gray-400">{r.courseId?.code}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">{r.marks || 0}</p>
                        <p className="text-sm text-gray-400">Marks</p>
                      </div>
                      <div className={`flex items-center px-4 py-2 rounded-full border ${getGradeColor(r.grade)}`}>
                        {getGradeIcon(r.grade)}
                        <span className="ml-2 font-bold text-lg">{r.grade || 'N/A'}</span>
                      </div>
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

export default StudentGrades
