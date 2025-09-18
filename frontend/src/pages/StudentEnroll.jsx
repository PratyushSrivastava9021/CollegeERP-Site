import { useEffect, useState } from 'react'
import { courseAPI, enrollmentAPI } from '../utils/api'
import { BookOpen, PlusCircle, Clock, Users, Award, GraduationCap, X, TrendingUp, Star } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import ModalPortal from '../components/ModalPortal'

const StudentEnroll = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const loadCourses = async () => {
    try {
      const res = await courseAPI.getCourses()
      setCourses(res.data.data.courses || res.data.data || [])
    } catch (e) {
      toast.error('Failed to load courses')
    } finally {
      setLoading(false)
    }
  }

  const handleEnrollClick = (course) => {
    setSelectedCourse(course)
    setShowConfirmModal(true)
  }

  const handleConfirmEnroll = async () => {
    if (!selectedCourse) return
    
    try {
      await enrollmentAPI.enroll({ studentId: user.id || user._id, courseId: selectedCourse._id })
      toast.success(`Successfully enrolled in ${selectedCourse.title}!`)
      setSelectedCourse(null)
    } catch (e) {
      const msg = e.response?.data?.message || 'Failed to enroll'
      toast.error(msg)
    }
  }

  useEffect(() => { loadCourses() }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="loading-spinner h-12 w-12 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen animate-fade-in relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5"></div>
        <div className="absolute inset-0 grid-bg"></div>
      </div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb floating-orb-1"></div>
        <div className="floating-orb floating-orb-2"></div>
        <div className="floating-orb floating-orb-3"></div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Enhanced Header */}
        <div className="mb-8 animate-slide-up">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-black gradient-text mb-4 animate-text-glow">
              Available Courses
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Browse and enroll in courses for your{' '}
              <span className="text-cyan-400 font-semibold">academic journey</span>
            </p>
            <div className="mt-4 text-sm text-gray-400">
              {courses.length} courses available
            </div>
          </div>
        </div>
        
        {/* Enhanced Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div 
              key={course._id} 
              className="card-premium neon-border hover-glow-cyan animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/25 flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-lg mb-1 truncate">{course.title}</h3>
                    <p className="text-sm font-bold text-cyan-400 mb-2">{course.code}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Award className="h-3 w-3 text-purple-400" />
                        <span>{course.credits} credits</span>
                      </div>
                      <span>•</span>
                      <span className="text-green-400">{course.department}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Semester:</span>
                    <span className="text-blue-400 font-semibold">{course.semester} {course.year}</span>
                  </div>
                  {course.instructor && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Instructor:</span>
                      <span className="text-white font-medium truncate ml-2">{course.instructor}</span>
                    </div>
                  )}
                  {course.schedule && (
                    <div className="flex items-center space-x-1 text-xs text-gray-300 bg-gray-800/50 px-3 py-2 rounded-lg">
                      <Clock className="h-3 w-3 text-green-400" />
                      <span>{course.schedule}</span>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => handleEnrollClick(course)} 
                  className="btn-primary w-full flex items-center justify-center group"
                >
                  <PlusCircle className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* No Courses */}
      {courses.length === 0 && (
        <div className="text-center py-16">
          <div className="card-premium w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 hover-glow-cyan">
            <BookOpen className="h-12 w-12 text-cyan-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No courses available</h3>
          <p className="text-gray-400 mb-6">Check back later for new course offerings.</p>
        </div>
      )}
      
      {/* Modal Portal */}
      <ModalPortal isOpen={showConfirmModal && !!selectedCourse}>
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          style={{ zIndex: 999999 }}
        >
          <div className="card-premium max-w-md w-full animate-slide-up hover-glow-cyan p-8">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <GraduationCap className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Confirm Enrollment</h3>
              <p className="text-gray-300">{selectedCourse?.title}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Course Code:</span>
                <span className="font-semibold text-white">{selectedCourse?.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Credits:</span>
                <span className="font-semibold text-white">{selectedCourse?.credits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Department:</span>
                <span className="font-semibold text-white">{selectedCourse?.department}</span>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-6 text-center">
              Are you sure you want to enroll in this course? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirmModal(false)
                  setSelectedCourse(null)
                }}
                className="flex-1 btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmEnroll}
                className="flex-1 btn-primary"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </ModalPortal>
    </div>
  )
}

export default StudentEnroll