import { useEffect, useState } from 'react'
import { adminAPI, enrollmentAPI, attendanceAPI, gradeAPI } from '../utils/api'
import { BookOpen, Users, ClipboardCheck, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const Faculty = () => {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [enrollments, setEnrollments] = useState([])

  const loadCourses = async () => {
    try {
      const res = await adminAPI.listCourses()
      // In a real app, filter to courses taught by this faculty; here we list all
      setCourses(res.data.data || [])
      if ((res.data.data || []).length) setSelectedCourse(res.data.data[0]._id)
    } catch (e) {}
  }

  const loadEnrollments = async (courseId) => {
    if (!courseId) return
    try {
      const res = await enrollmentAPI.getByCourse(courseId)
      setEnrollments(res.data.data || [])
    } catch (e) {}
  }

  useEffect(() => { loadCourses() }, [])
  useEffect(() => { loadEnrollments(selectedCourse) }, [selectedCourse])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
        <div className="flex items-center gap-2">
          <Link to="/faculty/attendance" className="px-3 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 inline-flex items-center">
            <ClipboardCheck className="h-4 w-4 mr-2" /> Attendance
          </Link>
          <Link to="/faculty/grades" className="px-3 py-2 bg-secondary-100 text-secondary-900 rounded hover:bg-secondary-200 inline-flex items-center">
            <FileText className="h-4 w-4 mr-2" /> Grades
          </Link>
        </div>
      </div>

      {/* Courses */}
      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary-600" />
            <h2 className="font-semibold">Your Courses</h2>
          </div>
          <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="border rounded px-3 py-2">
            {courses.map(c => (
              <option key={c._id} value={c._id}>{c.title} ({c.code})</option>
            ))}
          </select>
        </div>
        <div className="p-4">
          {courses.length === 0 ? (
            <p className="text-gray-600">No courses assigned.</p>
          ) : (
            <ul className="list-disc list-inside text-gray-800">
              {courses.map(c => (
                <li key={c._id}>{c.title} ({c.code})</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Enrolled Students */}
      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b flex items-center gap-2">
          <Users className="h-5 w-5 text-primary-600" />
          <h2 className="font-semibold">Enrolled Students</h2>
        </div>
        <div className="p-4">
          {enrollments.length === 0 ? (
            <p className="text-gray-600">No enrolled students.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map(en => (
                    <tr key={en._id} className="border-b">
                      <td className="py-2 pr-4">{en.studentId?.name}</td>
                      <td className="py-2 pr-4">{en.studentId?.email}</td>
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

export default Faculty
