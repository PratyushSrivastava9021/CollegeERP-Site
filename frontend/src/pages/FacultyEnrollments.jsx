import { useEffect, useState } from 'react'
import { adminAPI, enrollmentAPI } from '../utils/api'
import { Users } from 'lucide-react'
import toast from 'react-hot-toast'

const FacultyEnrollments = () => {
  const [courses, setCourses] = useState([])
  const [selected, setSelected] = useState('')
  const [enrollments, setEnrollments] = useState([])

  const loadCourses = async () => {
    try {
      const res = await adminAPI.listCourses()
      setCourses(res.data.data || [])
    } catch (e) {
      toast.error('Failed to load courses')
    }
  }

  const loadEnrollments = async (courseId) => {
    if (!courseId) return
    try {
      const res = await enrollmentAPI.getByCourse(courseId)
      setEnrollments(res.data.data || [])
    } catch (e) {
      toast.error('Failed to load enrollments')
    }
  }

  useEffect(() => { loadCourses() }, [])
  useEffect(() => { loadEnrollments(selected) }, [selected])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Course Enrollments</h1>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
        <select value={selected} onChange={(e) => setSelected(e.target.value)} className="border rounded px-3 py-2 w-full md:w-80">
          <option value="">Choose a course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>{c.title} ({c.code})</option>
          ))}
        </select>
      </div>

      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary-600" />
          <h2 className="font-semibold">Enrolled Students</h2>
        </div>
        <div className="p-4">
          {enrollments.length === 0 ? (
            <p className="text-gray-600">No enrollments to show.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((en) => (
                    <tr key={en._id} className="border-b">
                      <td className="py-2 pr-4">{en.studentId?.name}</td>
                      <td className="py-2 pr-4">{en.studentId?.email}</td>
                      <td className="py-2 pr-4">{new Date(en.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FacultyEnrollments
