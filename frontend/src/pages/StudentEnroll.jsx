import { useEffect, useState } from 'react'
import { courseAPI, enrollmentAPI } from '../utils/api'
import { BookOpen, PlusCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const StudentEnroll = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

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

  const handleEnroll = async (course) => {
    try {
      await enrollmentAPI.enroll({ studentId: user.id || user._id, courseId: course._id })
      toast.success('Enrolled successfully')
    } catch (e) {
      const msg = e.response?.data?.message || 'Failed to enroll'
      toast.error(msg)
    }
  }

  useEffect(() => { loadCourses() }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((c) => (
          <div key={c._id} className="border rounded-lg p-4 bg-white">
            <div className="flex items-center space-x-3 mb-2">
              <div className="h-10 w-10 bg-primary-100 rounded flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-sm text-gray-600">{c.code} • {c.credits} credits</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{c.department} • {c.semester} {c.year}</p>
            <button onClick={() => handleEnroll(c)} className="inline-flex items-center px-3 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentEnroll
