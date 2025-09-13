import React, { useEffect, useState } from 'react'
import { adminAPI, attendanceAPI, enrollmentAPI } from '../utils/api'
import toast from 'react-hot-toast'
import { Calendar, Users, CheckCircle2, XCircle, Clock, Save, BookOpen, TrendingUp, BarChart3 } from 'lucide-react'

const FacultyMarkAttendance = () => {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [students, setStudents] = useState([])
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [statuses, setStatuses] = useState({})

  const loadCourses = async () => {
    try {
      const res = await adminAPI.listCourses()
      setCourses(res.data.data || [])
    } catch (e) {
      toast.error('Failed to load courses')
    }
  }

  const loadStudents = async (courseId) => {
    if (!courseId) return
    try {
      const res = await enrollmentAPI.getByCourse(courseId)
      const list = (res.data.data || []).map((en) => en.studentId)
      setStudents(list)
      const initial = {}
      list.forEach(s => { initial[s._id] = 'present' })
      setStatuses(initial)
    } catch (e) {
      toast.error('Failed to load enrolled students')
    }
  }

  const handleMark = async () => {
    if (!selectedCourse) return toast.error('Select a course')
    const records = Object.entries(statuses).map(([studentId, status]) => ({ studentId, status }))
    try {
      await attendanceAPI.mark({ courseId: selectedCourse, date, records })
      toast.success('Attendance marked successfully')
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to mark attendance')
    }
  }

  const updateAttendance = (studentId, status) => {
    setStatuses(prev => ({ ...prev, [studentId]: status }))
  }

  useEffect(() => { loadCourses() }, [])
  useEffect(() => { loadStudents(selectedCourse) }, [selectedCourse])

  const presentCount = Object.values(statuses).filter(s => s === 'present').length
  const absentCount = Object.values(statuses).filter(s => s === 'absent').length
  const lateCount = Object.values(statuses).filter(s => s === 'late').length

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
            <h1 className="text-5xl font-black gradient-text mb-4 animate-text-glow">Mark Attendance</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Track and manage student attendance across all your classes
            </p>
          </div>

          {students.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="card-premium p-6 hover-glow-green">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg shadow-green-500/25">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Present</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-white">{presentCount}</p>
                      <TrendingUp className="w-4 h-4 text-green-400 ml-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-premium p-6 hover-glow-red">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl shadow-lg shadow-red-500/25">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Absent</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-white">{absentCount}</p>
                      <BarChart3 className="w-4 h-4 text-red-400 ml-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-premium p-6 hover-glow-yellow">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-3 rounded-xl shadow-lg shadow-yellow-500/25">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Late</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-white">{lateCount}</p>
                      <Clock className="w-4 h-4 text-yellow-400 ml-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-premium p-6 hover-glow-cyan">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl shadow-lg shadow-cyan-500/25">
                    <Users className="w-6 h-6 text-black" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-white">{students.length}</p>
                      <Users className="w-4 h-4 text-cyan-400 ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="card-premium mb-8 animate-slide-up hover-glow-cyan p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Course</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <select 
                  value={selectedCourse} 
                  onChange={(e) => setSelectedCourse(e.target.value)} 
                  className="form-select pl-12 h-14 text-base"
                >
                  <option value="">Select a course</option>
                  {courses.map(c => (
                    <option key={c._id} value={c._id}>{c.title} ({c.code})</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  className="form-input pl-12 h-14 text-base" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-premium neon-border animate-slide-up">
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <Users className="h-6 w-6 mr-3 text-cyan-400" />
              Students - {date}
            </h3>
          </div>
          <div className="p-6">
            {students.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-xl text-gray-400 mb-2">No students enrolled</p>
                <p className="text-gray-500">Select a course to view enrolled students</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-4 px-4 text-gray-300 font-semibold">Student</th>
                      <th className="text-left py-4 px-4 text-gray-300 font-semibold">Email</th>
                      <th className="text-center py-4 px-4 text-gray-300 font-semibold">Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr key={s._id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-black mr-3">
                              {s.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-medium text-white">{s.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-300">{s.email}</td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => updateAttendance(s._id, 'present')}
                              className={`p-3 rounded-xl transition-all ${
                                statuses[s._id] === 'present' 
                                  ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                                  : 'bg-gray-800 text-gray-400 hover:bg-green-500/10 hover:text-green-400'
                              }`}
                            >
                              <CheckCircle2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => updateAttendance(s._id, 'absent')}
                              className={`p-3 rounded-xl transition-all ${
                                statuses[s._id] === 'absent' 
                                  ? 'bg-red-500/20 text-red-400 border border-red-400/30' 
                                  : 'bg-gray-800 text-gray-400 hover:bg-red-500/10 hover:text-red-400'
                              }`}
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => updateAttendance(s._id, 'late')}
                              className={`p-3 rounded-xl transition-all ${
                                statuses[s._id] === 'late' 
                                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30' 
                                  : 'bg-gray-800 text-gray-400 hover:bg-yellow-500/10 hover:text-yellow-400'
                              }`}
                            >
                              <Clock className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {students.length > 0 && (
              <div className="mt-6 flex justify-end">
                <button onClick={handleMark} className="btn-primary">
                  <Save className="w-5 h-5 mr-2" />
                  Save Attendance
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacultyMarkAttendance
