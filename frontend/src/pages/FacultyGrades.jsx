import React, { useEffect, useState } from 'react'
import { adminAPI, gradeAPI, enrollmentAPI } from '../utils/api'
import toast from 'react-hot-toast'
import { Award, BookOpen, Save, Users, Trophy, Star, BarChart3, TrendingUp } from 'lucide-react'

const FacultyGrades = () => {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [students, setStudents] = useState([])
  const [grades, setGrades] = useState({})

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
      list.forEach(s => { initial[s._id] = { marks: '', grade: '' } })
      setGrades(initial)
    } catch (e) {
      toast.error('Failed to load students')
    }
  }

  const saveGrades = async () => {
    if (!selectedCourse) return toast.error('Select a course')
    try {
      const entries = Object.entries(grades)
      for (const [studentId, g] of entries) {
        if (g.marks === '' || g.grade === '') continue
        await gradeAPI.upsert({ studentId, courseId: selectedCourse, marks: Number(g.marks), grade: g.grade })
      }
      toast.success('Grades saved successfully')
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to save grades')
    }
  }

  const updateGrade = (studentId, field, value) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], [field]: value }
    }))
  }

  useEffect(() => { loadCourses() }, [])
  useEffect(() => { loadStudents(selectedCourse) }, [selectedCourse])

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': case 'A': return 'text-green-400 bg-green-500/20 border-green-400/30'
      case 'B+': case 'B': return 'text-blue-400 bg-blue-500/20 border-blue-400/30'
      case 'C+': case 'C': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30'
      case 'D': return 'text-orange-400 bg-orange-500/20 border-orange-400/30'
      case 'F': return 'text-red-400 bg-red-500/20 border-red-400/30'
      default: return 'text-gray-400 bg-gray-500/20 border-gray-400/30'
    }
  }

  const completedGrades = Object.values(grades).filter(g => g.marks !== '' && g.grade !== '').length
  const avgMarks = Object.values(grades).filter(g => g.marks !== '').reduce((acc, g) => acc + Number(g.marks || 0), 0) / Math.max(Object.values(grades).filter(g => g.marks !== '').length, 1)

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

      <div className="max-w-7xl mx-auto p-[clamp(1rem,3vw,1.5rem)] relative z-10">
        <div className="mb-8 animate-slide-up">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-black gradient-text mb-4 animate-text-glow">Grade Management</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Evaluate student performance and assign grades for your courses
            </p>
          </div>

          {students.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(1rem,3vw,1.5rem)] mb-[clamp(1.5rem,4vw,2rem)]">
              <div className="card-premium p-6 hover-glow-green">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg shadow-green-500/25">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Completed</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-white">{completedGrades}/{students.length}</p>
                      <TrendingUp className="w-4 h-4 text-green-400 ml-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-premium p-6 hover-glow-cyan">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl shadow-lg shadow-cyan-500/25">
                    <BarChart3 className="w-6 h-6 text-black" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Average</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-white">{avgMarks.toFixed(1)}%</p>
                      <Star className="w-4 h-4 text-cyan-400 ml-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-premium p-6 hover-glow-purple">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-3 rounded-xl shadow-lg shadow-purple-500/25">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Students</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-white">{students.length}</p>
                      <Users className="w-4 h-4 text-purple-400 ml-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-premium p-6 hover-glow-orange">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl shadow-lg shadow-orange-500/25">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Progress</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-white">{Math.round((completedGrades/students.length)*100)}%</p>
                      <Award className="w-4 h-4 text-orange-400 ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="card-premium mb-[clamp(1.5rem,4vw,2rem)] animate-slide-up hover-glow-cyan p-[clamp(1rem,3vw,1.5rem)]">
          <div className="flex items-center gap-[clamp(0.75rem,2vw,1rem)]">
            <div className="flex-1">
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
          </div>
        </div>

        <div className="card-premium neon-border animate-slide-up">
          <div className="p-[clamp(1rem,3vw,1.5rem)] border-b border-gray-800">
            <h3 className="text-[clamp(1.25rem,4vw,2rem)] font-bold text-white flex items-center">
              <Award className="h-6 w-6 mr-3 text-cyan-400" />
              Student Grades
            </h3>
          </div>
          <div className="p-[clamp(1rem,3vw,1.5rem)]">
            {students.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-xl text-gray-400 mb-2">No students to grade</p>
                <p className="text-gray-500">Select a course to view enrolled students</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-[clamp(0.75rem,2vw,1rem)] px-[clamp(0.5rem,1.5vw,1rem)] text-gray-300 font-semibold text-[clamp(0.875rem,2.5vw,1rem)]">Student</th>
                      <th className="text-left py-[clamp(0.75rem,2vw,1rem)] px-[clamp(0.5rem,1.5vw,1rem)] text-gray-300 font-semibold text-[clamp(0.875rem,2.5vw,1rem)] hidden sm:table-cell">Email</th>
                      <th className="text-center py-[clamp(0.75rem,2vw,1rem)] px-[clamp(0.5rem,1.5vw,1rem)] text-gray-300 font-semibold text-[clamp(0.875rem,2.5vw,1rem)]">Marks</th>
                      <th className="text-center py-[clamp(0.75rem,2vw,1rem)] px-[clamp(0.5rem,1.5vw,1rem)] text-gray-300 font-semibold text-[clamp(0.875rem,2.5vw,1rem)]">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr key={s._id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                        <td className="py-[clamp(0.75rem,2vw,1rem)] px-[clamp(0.5rem,1.5vw,1rem)]">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-[clamp(0.75rem,2vw,0.875rem)] font-bold text-black mr-3">
                              {s.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-medium text-white text-[clamp(0.875rem,2.5vw,1rem)]">{s.name}</span>
                          </div>
                        </td>
                        <td className="py-[clamp(0.75rem,2vw,1rem)] px-[clamp(0.5rem,1.5vw,1rem)] text-gray-300 text-[clamp(0.75rem,2vw,0.875rem)] hidden sm:table-cell break-all">{s.email}</td>
                        <td className="py-[clamp(0.75rem,2vw,1rem)] px-[clamp(0.5rem,1.5vw,1rem)] text-center">
                          <input 
                            type="number" 
                            min="0" 
                            max="100" 
                            value={grades[s._id]?.marks || ''} 
                            onChange={(e) => updateGrade(s._id, 'marks', e.target.value)}
                            className="form-input w-[clamp(4rem,8vw,6rem)] h-10 text-center text-[clamp(0.75rem,2vw,0.875rem)]" 
                            placeholder="0-100"
                          />
                        </td>
                        <td className="py-[clamp(0.75rem,2vw,1rem)] px-[clamp(0.5rem,1.5vw,1rem)] text-center">
                          <select 
                            value={grades[s._id]?.grade || ''} 
                            onChange={(e) => updateGrade(s._id, 'grade', e.target.value)}
                            className="form-select h-10 w-[clamp(4rem,8vw,6rem)] text-[clamp(0.75rem,2vw,0.875rem)]"
                          >
                            <option value="">Grade</option>
                            <option value="A+">A+</option>
                            <option value="A">A</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="C+">C+</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="F">F</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {students.length > 0 && (
              <div className="mt-[clamp(1rem,3vw,1.5rem)] flex justify-end">
                <button onClick={saveGrades} className="btn-primary">
                  <Save className="w-5 h-5 mr-2" />
                  Save Grades
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacultyGrades
