import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Users, Clock, MapPin, Plus, Search, Filter } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api } from '../utils/api'
import toast from 'react-hot-toast'

const Courses = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('')

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await api.get('/courses')
      setCourses(response.data.data || [])
    } catch (error) {
      toast.error('Failed to fetch courses')
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const departments = [...new Set(courses.map(course => course.department))]
  const semesters = [...new Set(courses.map(course => course.semester))]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = !selectedDepartment || course.department === selectedDepartment
    const matchesSemester = !selectedSemester || course.semester === selectedSemester
    
    return matchesSearch && matchesDepartment && matchesSemester
  })

  const handleEnroll = async (courseId) => {
    try {
      await api.post(`/courses/${courseId}/enroll`)
      toast.success('Successfully enrolled in course!')
      fetchCourses() // Refresh courses
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to enroll')
    }
  }

  return (
    <div className="space-y-[clamp(1.5rem,4vw,2.5rem)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[clamp(1rem,3vw,1.5rem)]">
        <div>
          <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold text-white">Available Courses</h1>
          <p className="text-gray-400 mt-[clamp(0.25rem,1vw,0.5rem)] text-[clamp(0.875rem,2.5vw,1rem)]">
            Discover and enroll in courses
          </p>
        </div>
        {user?.role === 'faculty' && (
          <Link
            to="/courses/create"
            className="btn-primary flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-[clamp(1rem,3vw,1.5rem)] border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[clamp(0.75rem,2vw,1rem)]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="">All Semesters</option>
            {semesters.map(semester => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>

          <button className="btn-outline flex items-center justify-center">
            <Filter className="h-4 w-4 mr-2" />
            Advanced
          </button>
        </div>
      </div>

      {/* Course Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(1rem,3vw,1.5rem)]">
          {filteredCourses.map((course) => (
            <div key={course._id} className="bg-gray-800 rounded-xl p-[clamp(1rem,3vw,1.5rem)] border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[clamp(1rem,3vw,1.25rem)] font-bold text-white mb-1">{course.title}</h3>
                  <p className="text-cyan-400 font-mono text-[clamp(0.875rem,2.5vw,1rem)]">{course.code}</p>
                </div>
                <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full text-[clamp(0.75rem,2vw,0.875rem)] font-medium">
                  {course.credits} Credits
                </span>
              </div>

              <p className="text-gray-300 text-[clamp(0.875rem,2.5vw,1rem)] mb-4 line-clamp-2">
                {course.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-400 text-[clamp(0.75rem,2vw,0.875rem)]">
                  <Users className="h-4 w-4 mr-2 text-cyan-400" />
                  <span>{course.instructor?.name || 'TBA'}</span>
                </div>
                {course.schedule && course.schedule.length > 0 && (
                  <div className="flex items-center text-gray-400 text-[clamp(0.75rem,2vw,0.875rem)]">
                    <Clock className="h-4 w-4 mr-2 text-cyan-400" />
                    <span>{course.schedule[0].day} {course.schedule[0].startTime}-{course.schedule[0].endTime}</span>
                  </div>
                )}
                {course.schedule && course.schedule.length > 0 && (
                  <div className="flex items-center text-gray-400 text-[clamp(0.75rem,2vw,0.875rem)]">
                    <MapPin className="h-4 w-4 mr-2 text-cyan-400" />
                    <span>{course.schedule[0].room}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400 text-[clamp(0.75rem,2vw,0.875rem)]">
                  {course.department}
                </span>
                <span className="text-gray-400 text-[clamp(0.75rem,2vw,0.875rem)]">
                  {course.semester} {course.year}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-[clamp(0.75rem,2vw,0.875rem)] mb-1">
                  <span className="text-gray-400">Enrollment</span>
                  <span className="text-white">{course.enrolledCount || 0}/{course.maxStudents}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((course.enrolledCount || 0) / course.maxStudents) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2">
                <Link 
                  to={`/courses/${course._id}`}
                  className="flex-1 bg-gray-700 text-white text-center py-2 rounded-lg font-medium hover:bg-gray-600 transition-all duration-300 text-[clamp(0.875rem,2.5vw,1rem)]"
                >
                  View Details
                </Link>
                {user?.role === 'student' && (
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-center py-2 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 text-[clamp(0.875rem,2.5vw,1rem)]"
                  >
                    Enroll
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No courses found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  )
}

export default Courses