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
    <div className="space-y-[clamp(1.5rem,4vw,2.5rem)]">
      <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold">Course Enrollments</h1>

      <div>
        <label className="block text-[clamp(0.875rem,2.5vw,1rem)] font-medium text-gray-700 mb-[clamp(0.25rem,1vw,0.5rem)]">Select Course</label>
        <select value={selected} onChange={(e) => setSelected(e.target.value)} className="border rounded px-3 py-[clamp(0.5rem,1.5vw,0.75rem)] w-full md:w-80 text-[clamp(0.875rem,2.5vw,1rem)]">
          <option value="">Choose a course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>{c.title} ({c.code})</option>
          ))}
        </select>
      </div>

      <div className="bg-white border rounded-lg">
        <div className="p-[clamp(1rem,3vw,1.5rem)] border-b flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary-600" />
          <h2 className="font-semibold text-[clamp(1rem,3vw,1.125rem)]">Enrolled Students</h2>
        </div>
        <div className="p-[clamp(1rem,3vw,1.5rem)]">
          {enrollments.length === 0 ? (
            <p className="text-gray-600 text-[clamp(0.875rem,2.5vw,1rem)]">No enrollments to show.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-[clamp(0.75rem,2vw,0.875rem)]">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-[clamp(0.5rem,1.5vw,0.75rem)] pr-4 font-medium">Name</th>
                    <th className="py-[clamp(0.5rem,1.5vw,0.75rem)] pr-4 font-medium">Email</th>
                    <th className="py-[clamp(0.5rem,1.5vw,0.75rem)] pr-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((en) => (
                    <tr key={en._id} className="border-b hover:bg-gray-50">
                      <td className="py-[clamp(0.5rem,1.5vw,0.75rem)] pr-4">{en.studentId?.name}</td>
                      <td className="py-[clamp(0.5rem,1.5vw,0.75rem)] pr-4 break-all">{en.studentId?.email}</td>
                      <td className="py-[clamp(0.5rem,1.5vw,0.75rem)] pr-4 whitespace-nowrap">{new Date(en.date).toLocaleDateString()}</td>
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
