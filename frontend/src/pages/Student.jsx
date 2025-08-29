import { useEffect, useState } from 'react'
import { courseAPI, attendanceAPI, gradeAPI, noticeAPI } from '../utils/api'
import { useAuth } from '../context/AuthContext'

const Student = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [attendance, setAttendance] = useState([])
  const [grades, setGrades] = useState([])
  const [notices, setNotices] = useState([])

  const load = async () => {
    try {
      const [c, a, g, n] = await Promise.all([
        courseAPI.getEnrolledCourses(),
        attendanceAPI.getByStudent(user.id || user._id),
        gradeAPI.getByStudent(user.id || user._id),
        noticeAPI.list(),
      ])
      setCourses(c.data.data.courses || [])
      setAttendance(a.data.data || [])
      setGrades(g.data.data || [])
      setNotices((n.data.data || []).slice(0, 5))
    } catch (e) {}
  }

  useEffect(() => { if (user) load() }, [user])

  const attendanceSummary = courses.map(course => {
    const records = attendance.filter(r => r.courseId?._id === course._id)
    const present = records.filter(r => r.status === 'present').length
    return { course, present, total: records.length }
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>

      {/* Enrolled Courses */}
      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold">My Courses</h2>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {courses.map(c => (
            <div key={c._id} className="border rounded p-3">
              <p className="font-medium">{c.title}</p>
              <p className="text-sm text-gray-600">{c.code} • {c.credits} credits</p>
            </div>
          ))}
          {courses.length === 0 && <p className="text-gray-600">No enrolled courses.</p>}
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Attendance Summary</h2>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {attendanceSummary.map((s) => (
            <div key={s.course._id} className="border rounded p-3">
              <p className="font-medium">{s.course.title}</p>
              <p className="text-sm text-gray-600">{s.present}/{s.total} Present</p>
            </div>
          ))}
          {attendanceSummary.length === 0 && <p className="text-gray-600">No attendance records.</p>}
        </div>
      </div>

      {/* Grade Report */}
      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Grades</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          {grades.length === 0 ? (
            <p className="text-gray-600">No grades yet.</p>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-4">Course</th>
                  <th className="py-2 pr-4">Marks</th>
                  <th className="py-2 pr-4">Grade</th>
                </tr>
              </thead>
              <tbody>
                {grades.map(g => (
                  <tr key={g._id} className="border-b">
                    <td className="py-2 pr-4">{g.courseId?.title} ({g.courseId?.code})</td>
                    <td className="py-2 pr-4">{g.marks}</td>
                    <td className="py-2 pr-4">{g.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Notices */}
      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Recent Notices</h2>
        </div>
        <div className="p-4 space-y-3">
          {notices.length === 0 ? (
            <p className="text-gray-600">No notices.</p>
          ) : (
            notices.map(n => (
              <div key={n._id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{n.title}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{n.description}</p>
                </div>
                <span className="text-sm text-gray-500">{new Date(n.date || n.createdAt).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Student
