import { useEffect, useState } from 'react'
import { adminAPI, attendanceAPI, enrollmentAPI } from '../utils/api'
import toast from 'react-hot-toast'

const FacultyMarkAttendance = () => {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [students, setStudents] = useState([])
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [statuses, setStatuses] = useState({})

  const loadCourses = async () => {
    try {
      const res = await adminAPI.listCourses()
      setCourses(res.data.data || [])
    } catch (e) {
      toast.error('Failed to load courses')
    }
  }

  const loadStudents = async (courseId) => {
    if (!courseId) return
    try {
      const res = await enrollmentAPI.getByCourse(courseId)
      const list = (res.data.data || []).map((en) => en.studentId)
      setStudents(list)
      // initialize statuses to present
      const initial = {}
      list.forEach(s => { initial[s._id] = 'present' })
      setStatuses(initial)
    } catch (e) {
      toast.error('Failed to load enrolled students')
    }
  }

  const handleMark = async () => {
    if (!selectedCourse) return toast.error('Select a course')
    const records = Object.entries(statuses).map(([studentId, status]) => ({ studentId, status }))
    try {
      await attendanceAPI.mark({ courseId: selectedCourse, date, records })
      toast.success('Attendance marked')
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to mark attendance')
    }
  }

  useEffect(() => { loadCourses() }, [])
  useEffect(() => { loadStudents(selectedCourse) }, [selectedCourse])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mark Attendance</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
          <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="border rounded px-3 py-2 w-full">
            <option value="">Select a course</option>
            {courses.map(c => (
              <option key={c._id} value={c._id}>{c.title} ({c.code})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded px-3 py-2 w-full" />
        </div>
      </div>

      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Students</h2>
        </div>
        <div className="p-4">
          {students.length === 0 ? (
            <p className="text-gray-600">No enrolled students.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s._id} className="border-b">
                      <td className="py-2 pr-4">{s.name}</td>
                      <td className="py-2 pr-4">{s.email}</td>
                      <td className="py-2 pr-4">
                        <select value={statuses[s._id]} onChange={(e) => setStatuses(prev => ({ ...prev, [s._id]: e.target.value }))} className="border rounded px-2 py-1">
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="p-4 border-t">
          <button onClick={handleMark} className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">Save Attendance</button>
        </div>
      </div>
    </div>
  )
}

export default FacultyMarkAttendance
