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
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <GraduationCap className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-blue-100">
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
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions - UPDATED WITH CLICK HANDLERS */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button 
              onClick={handleBrowseCourses}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Browse Courses</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
            </button>
            <button 
              onClick={handleUpdateProfile}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center">
                <User className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Update Profile</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
            </button>
            <button 
              onClick={handleViewSchedule}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">View Schedule</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Enrolled Courses (for students) */}
      {user?.role === 'student' && enrolledCourses.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Your Enrolled Courses</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.code} • {course.credits} credits</p>
                      <p className="text-sm text-gray-500">
                        {course.semester} {course.year} • {course.department}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {course.instructor?.name}
                    </p>
                    <p className="text-sm text-gray-500">Instructor</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Successfully logged in</p>
                <p className="text-xs text-gray-500">{formatDate(new Date())}</p>
              </div>
            </div>
            {user?.lastLogin && (
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Last login</p>
                  <p className="text-xs text-gray-500">{formatDate(user.lastLogin)}</p>
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