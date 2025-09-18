import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
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
  ChevronRight,
  Play,
  ArrowRight,
  MessageSquare,
  Library
} from 'lucide-react'
import { formatRole, formatDepartment, formatDate } from '../utils/helpers'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate() // ADD THIS
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [todaysClasses, setTodaysClasses] = useState([])
  
  // Get today's day name
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })

  useEffect(() => {
    if (user?.role === 'student') {
      loadEnrolledCourses()
    } else {
      setLoading(false)
    }
    loadTodaysClasses()
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

  const loadTodaysClasses = () => {
    const studentClasses = {
      'Monday': [
        { time: '09:00 - 10:30', subject: 'Data Structures', teacher: 'Dr. Rajesh Kumar', room: 'Lab 1', type: 'Lab' },
        { time: '14:00 - 15:30', subject: 'Technical Writing', teacher: 'Dr. Kavita Joshi', room: 'Room 101', type: 'Lecture' }
      ],
      'Tuesday': [
        { time: '11:00 - 12:30', subject: 'Machine Learning', teacher: 'Dr. Anita Verma', room: 'Lab 2', type: 'Lab' }
      ],
      'Wednesday': [
        { time: '09:00 - 10:30', subject: 'Database Systems', teacher: 'Prof. Meera Sharma', room: 'Room 205', type: 'Lecture' },
        { time: '14:00 - 15:30', subject: 'Data Structures', teacher: 'Dr. Rajesh Kumar', room: 'Room 205', type: 'Tutorial' }
      ],
      'Thursday': [
        { time: '11:00 - 12:30', subject: 'Web Development', teacher: 'Prof. Suresh Reddy', room: 'Lab 3', type: 'Lab' }
      ],
      'Friday': [
        { time: '09:00 - 10:30', subject: 'Software Engineering', teacher: 'Dr. Vikram Gupta', room: 'Room 301', type: 'Lecture' },
        { time: '14:00 - 15:30', subject: 'Database Systems', teacher: 'Prof. Meera Sharma', room: 'Lab 1', type: 'Lab' }
      ]
    }
    
    const facultyClasses = {
      'Monday': [
        { time: '09:00 - 10:30', subject: 'Data Structures', class: 'CSE-3A', room: 'Lab 1', students: 45, type: 'Lab' },
        { time: '14:00 - 15:30', subject: 'Algorithm Design', class: 'CSE-3B', room: 'Room 205', students: 38, type: 'Lecture' }
      ],
      'Tuesday': [
        { time: '11:00 - 12:30', subject: 'Database Systems', class: 'CSE-4A', room: 'Lab 2', students: 42, type: 'Lab' }
      ],
      'Wednesday': [
        { time: '09:00 - 10:30', subject: 'Data Structures', class: 'CSE-3A', room: 'Lab 1', students: 45, type: 'Lab' },
        { time: '16:00 - 17:30', subject: 'Research Methodology', class: 'CSE-4B', room: 'Room 301', students: 35, type: 'Seminar' }
      ],
      'Thursday': [
        { time: '11:00 - 12:30', subject: 'Database Systems', class: 'CSE-4A', room: 'Lab 2', students: 42, type: 'Lab' },
        { time: '14:00 - 15:30', subject: 'Algorithm Design', class: 'CSE-3B', room: 'Room 205', students: 38, type: 'Tutorial' }
      ],
      'Friday': [
        { time: '09:00 - 10:30', subject: 'Research Methodology', class: 'CSE-4B', room: 'Room 301', students: 35, type: 'Lecture' }
      ]
    }
    
    const classes = user?.role === 'student' ? studentClasses : facultyClasses
    setTodaysClasses(classes[today] || [])
  }

  const handleViewSchedule = () => {
    if (user?.role === 'student') {
      navigate('/student/timetable')
    } else if (user?.role === 'faculty') {
      navigate('/faculty/timetable')
    }
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
    <div style={{display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 3vh, 2rem)'}}>
      {/* Welcome Section */}
      <div className="card-black rounded-2xl sm:rounded-3xl text-white animate-slide-up relative overflow-hidden" style={{padding: 'clamp(1rem, 4vw, 2rem)'}}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
          <div className="h-16 w-16 sm:h-20 sm:w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl">
            <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
          </div>
          <div>
            <h1 className="font-bold text-white" style={{fontSize: 'clamp(1.5rem, 4vw, 2rem)'}}>Welcome back, {user?.name}!</h1>
            <p className="text-gray-300 mt-2" style={{fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)'}}>
              Here's what's happening with your academic journey today.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{gap: 'clamp(1rem, 3vw, 1.5rem)'}}>
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card-black rounded-2xl animate-slide-up group hover:shadow-2xl hover:shadow-cyan-500/10" style={{padding: 'clamp(1rem, 3vw, 1.5rem)', animationDelay: `${index * 0.1}s`}}>
              <div className="flex items-center">
                <div className={`p-4 rounded-xl ${stat.color} text-white shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-400 uppercase tracking-wide" style={{fontSize: 'clamp(0.75rem, 2vw, 0.875rem)'}}>{stat.name}</p>
                  <p className="font-bold text-white mt-1" style={{fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'}}>{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="card-black rounded-2xl animate-slide-up">
        <div className="border-b border-gray-800" style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
          <h2 className="font-bold text-white" style={{fontSize: 'clamp(1.125rem, 3vw, 1.25rem)'}}>Quick Actions</h2>
        </div>
        <div style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{gap: 'clamp(0.75rem, 2vw, 1rem)'}}>
            <button 
              onClick={handleBrowseCourses}
              className="flex items-center justify-between p-4 glass-black rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-black shadow-lg">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="font-semibold text-white ml-3" style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>Courses</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </button>
            <button 
              onClick={() => navigate(user?.role === 'student' ? '/student/academic' : '/faculty/teaching')}
              className="flex items-center justify-between p-4 glass-black rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white shadow-lg">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="font-semibold text-white ml-3" style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>{user?.role === 'student' ? 'Academic' : 'Teaching'}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-green-400 transition-colors" />
            </button>
            <button 
              onClick={() => navigate('/messages')}
              className="flex items-center justify-between p-4 glass-black rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white shadow-lg">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className="font-semibold text-white ml-3" style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>Messages</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
            </button>
            
            <button 
              onClick={() => navigate('/library')}
              className="flex items-center justify-between p-4 glass-black rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white shadow-lg">
                  <Library className="h-5 w-5" />
                </div>
                <span className="font-semibold text-white ml-3" style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>Library</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-orange-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Enrolled Courses (for students) */}
      {user?.role === 'student' && enrolledCourses.length > 0 && (
        <div className="card-black rounded-2xl animate-slide-up">
          <div className="border-b border-gray-800" style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
            <h2 className="font-bold text-white" style={{fontSize: 'clamp(1.125rem, 3vw, 1.25rem)'}}>Your Enrolled Courses</h2>
          </div>
          <div style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vh, 1.5rem)'}}>
              {enrolledCourses.map((course, index) => (
                <div key={course._id} className="glass-black rounded-xl hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer animate-slide-up neon-border" style={{padding: 'clamp(1rem, 3vw, 1.5rem)', animationDelay: `${index * 0.1}s`}}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-14 w-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                        <BookOpen className="h-7 w-7 text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white" style={{fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'}}>{course.title}</h3>
                        <p className="text-cyan-400 font-medium" style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>{course.code} • {course.credits} credits</p>
                        <p className="text-gray-400" style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>
                          {course.semester} {course.year} • {course.department}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white" style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>
                        {course.instructor?.name}
                      </p>
                      <p className="text-gray-400" style={{fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'}}>Instructor</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Today's Classes */}
      <div className="card-black rounded-2xl animate-slide-up">
        <div className="border-b border-gray-800" style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-white" style={{fontSize: 'clamp(1.125rem, 3vw, 1.25rem)'}}>Today's Classes - {today}</h2>
            <button 
              onClick={handleViewSchedule}
              className="btn-outline text-sm flex items-center"
            >
              View Full Schedule
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
        <div style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
          {todaysClasses.length > 0 ? (
            <div style={{display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vh, 1.5rem)'}}>
              {todaysClasses.map((classItem, index) => (
                <div key={index} className="glass-black rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] neon-border" style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white" style={{fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'}}>{classItem.subject}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-cyan-400 font-medium" style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>{classItem.time}</span>
                          <span className="text-gray-400" style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>•</span>
                          <span className="text-gray-400" style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>{classItem.room}</span>
                          <span className="text-gray-400" style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>•</span>
                          <span className={`px-2 py-1 rounded-full ${
                            classItem.type === 'Lab' ? 'bg-green-500/20 text-green-400' :
                            classItem.type === 'Lecture' ? 'bg-blue-500/20 text-blue-400' :
                            classItem.type === 'Tutorial' ? 'bg-purple-500/20 text-purple-400' :
                            'bg-orange-500/20 text-orange-400'
                          }`}>
                            {classItem.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {user?.role === 'student' ? (
                        <>
                          <p className="font-bold text-white" style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>{classItem.teacher}</p>
                          <p className="text-gray-400" style={{fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'}}>Instructor</p>
                        </>
                      ) : (
                        <>
                          <p className="font-bold text-white" style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>{classItem.class}</p>
                          <p className="text-gray-400" style={{fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'}}>{classItem.students} students</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No classes scheduled for today</p>
              <button 
                onClick={handleViewSchedule}
                className="btn-primary mt-4 flex items-center mx-auto"
              >
                View Full Schedule
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card-black rounded-2xl animate-slide-up">
        <div className="border-b border-gray-800" style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
          <h2 className="font-bold text-white" style={{fontSize: 'clamp(1.125rem, 3vw, 1.25rem)'}}>Recent Activity</h2>
        </div>
        <div style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vh, 1.5rem)'}}>
            <div className="flex items-center space-x-4 p-4 glass-black rounded-xl neon-border">
              <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white" style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>Successfully logged in</p>
                <p className="text-gray-400 font-medium" style={{fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'}}>{formatDate(new Date())}</p>
              </div>
            </div>
            {user?.lastLogin && (
              <div className="flex items-center space-x-4 p-4 glass-black rounded-xl neon-border">
                <div className="h-10 w-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <Clock className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="font-bold text-white" style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}>Last login</p>
                  <p className="text-gray-400 font-medium" style={{fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'}}>{formatDate(user.lastLogin)}</p>
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