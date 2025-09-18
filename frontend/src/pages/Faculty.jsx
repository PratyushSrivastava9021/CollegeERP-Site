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
    <div className="space-y-[clamp(1.5rem,4vw,2.5rem)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[clamp(1rem,3vw,1.5rem)]">
        <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold">Faculty Dashboard</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Link to="/faculty/attendance" className="px-3 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 inline-flex items-center justify-center">
            <ClipboardCheck className="h-4 w-4 mr-2" /> Attendance
          </Link>
          <Link to="/faculty/grades" className="px-3 py-2 bg-secondary-100 text-secondary-900 rounded hover:bg-secondary-200 inline-flex items-center justify-center">
            <FileText className="h-4 w-4 mr-2" /> Grades
          </Link>
        </div>
      </div>

      {/* Courses */}
      <div className="bg-white border rounded-lg">
        <div className="p-[clamp(1rem,3vw,1.5rem)] border-b flex flex-col sm:flex-row sm:items-center justify-between gap-[clamp(0.75rem,2vw,1rem)]">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary-600" />
            <h2 className="font-semibold text-[clamp(1rem,3vw,1.125rem)]">Your Courses</h2>
          </div>
          <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="border rounded px-3 py-2 w-full sm:w-auto min-w-[200px]">
            {courses.map(c => (
              <option key={c._id} value={c._id}>{c.title} ({c.code})</option>
            ))}
          </select>
        </div>
        <div className="p-[clamp(1rem,3vw,1.5rem)]">
          {courses.length === 0 ? (
            <p className="text-gray-600 text-[clamp(0.875rem,2.5vw,1rem)]">No courses assigned.</p>
          ) : (
            <ul className="list-disc list-inside text-gray-800 space-y-1">
              {courses.map(c => (
                <li key={c._id} className="text-[clamp(0.875rem,2.5vw,1rem)]">{c.title} ({c.code})</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Enrolled Students */}
      <div className="bg-white border rounded-lg">
        <div className="p-[clamp(1rem,3vw,1.5rem)] border-b flex items-center gap-2">
          <Users className="h-5 w-5 text-primary-600" />
          <h2 className="font-semibold text-[clamp(1rem,3vw,1.125rem)]">Enrolled Students</h2>
        </div>
        <div className="p-[clamp(1rem,3vw,1.5rem)]">
          {enrollments.length === 0 ? (
            <p className="text-gray-600 text-[clamp(0.875rem,2.5vw,1rem)]">No enrolled students.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-[clamp(0.75rem,2vw,0.875rem)]">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-[clamp(0.5rem,1.5vw,0.75rem)] pr-4 font-medium">Name</th>
                    <th className="py-[clamp(0.5rem,1.5vw,0.75rem)] pr-4 font-medium">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map(en => (
                    <tr key={en._id} className="border-b hover:bg-gray-50">
                      <td className="py-[clamp(0.5rem,1.5vw,0.75rem)] pr-4">{en.studentId?.name}</td>
                      <td className="py-[clamp(0.5rem,1.5vw,0.75rem)] pr-4 break-all">{en.studentId?.email}</td>
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
