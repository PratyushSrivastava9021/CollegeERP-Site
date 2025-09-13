import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom' // ADD THIS IMPORT
import { courseAPI } from '../utils/api'
import { 
  BookOpen, 
  Users, 
  Calendar, 
  TrendingUp,
  Clock,
  MapPin,
  User,
  GraduationCap,
  ChevronRight // ADD THIS IMPORT
} from 'lucide-react'
import { formatRole, formatDepartment, formatDate } from '../utils/helpers'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate() // ADD THIS
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.role === 'student') {
      loadEnrolledCourses()
    } else {
      setLoading(false)
    }
  }, [user])

  const loadEnrolledCourses = async () => {
    try {
      const response = await courseAPI.getEnrolledCourses()
      setEnrolledCourses(response.data.data.courses)
    } catch (error) {
      console.error('Error loading enrolled courses:', error)
    } finally {
      setLoading(false)
    }
  }

  // ADD THESE CLICK HANDLERS
  const handleBrowseCourses = () => {
    navigate('/courses')
  }

  const handleUpdateProfile = () => {
    navigate('/profile')
  }

  const handleViewSchedule = () => {
    // You can navigate to a schedule page or show a modal
    alert('Schedule feature coming soon!')
  }

  const stats = [
    {
      name: 'Total Courses',
      value: enrolledCourses.length,
      icon: BookOpen,
      color: 'bg-blue-500',
    },
    {
      name: 'Role',
      value: formatRole(user?.role),
      icon: User,
      color: 'bg-green-500',
    },
    {
      name: 'Department',
      value: formatDepartment(user?.department) || 'N/A',
      icon: MapPin,
      color: 'bg-purple-500',
    },
    {
      name: 'Member Since',
      value: formatDate(user?.createdAt),
      icon: Calendar,
      color: 'bg-orange-500',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card-black rounded-3xl p-8 text-white animate-slide-up relative overflow-hidden neon-border">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
        <div className="flex items-center space-x-6 relative z-10">
          <div className="h-20 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse-glow">
            <GraduationCap className="h-10 w-10 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Welcome back, {user?.name}!</h1>
            <p className="text-gray-300 mt-2 text-lg">
              Here's what's happening with your academic journey today.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card-black rounded-2xl p-6 animate-slide-up group hover:shadow-2xl hover:shadow-cyan-500/10" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex items-center">
                <div className={`p-4 rounded-xl ${stat.color} text-white shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">{stat.name}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="card-black rounded-2xl animate-slide-up">
        <div className="card-header border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Quick Actions</h2>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button 
              onClick={handleBrowseCourses}
              className="flex items-center justify-between p-6 glass-black rounded-xl hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 transform hover:scale-105 group neon-border"
            >
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-black shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-white ml-4">Browse Courses</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
            </button>
            <button 
              onClick={handleUpdateProfile}
              className="flex items-center justify-between p-6 glass-black rounded-xl hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 transform hover:scale-105 group neon-border"
            >
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
                  <User className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-white ml-4">Update Profile</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-green-400 transition-colors duration-300" />
            </button>
            <button 
              onClick={handleViewSchedule}
              className="flex items-center justify-between p-6 glass-black rounded-xl hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:scale-105 group neon-border"
            >
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                  <Calendar className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-white ml-4">View Schedule</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Enrolled Courses (for students) */}
      {user?.role === 'student' && enrolledCourses.length > 0 && (
        <div className="card-black rounded-2xl animate-slide-up">
          <div className="card-header border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">Your Enrolled Courses</h2>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {enrolledCourses.map((course, index) => (
                <div key={course._id} className="glass-black rounded-xl p-6 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer animate-slide-up neon-border" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-14 w-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                        <BookOpen className="h-7 w-7 text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{course.title}</h3>
                        <p className="text-sm text-cyan-400 font-medium">{course.code} • {course.credits} credits</p>
                        <p className="text-sm text-gray-400">
                          {course.semester} {course.year} • {course.department}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">
                        {course.instructor?.name}
                      </p>
                      <p className="text-sm text-gray-400">Instructor</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="card-black rounded-2xl animate-slide-up">
        <div className="card-header border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Recent Activity</h2>
        </div>
        <div className="card-content">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 glass-black rounded-xl neon-border">
              <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Successfully logged in</p>
                <p className="text-xs text-gray-400 font-medium">{formatDate(new Date())}</p>
              </div>
            </div>
            {user?.lastLogin && (
              <div className="flex items-center space-x-4 p-4 glass-black rounded-xl neon-border">
                <div className="h-10 w-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <Clock className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Last login</p>
                  <p className="text-xs text-gray-400 font-medium">{formatDate(user.lastLogin)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard