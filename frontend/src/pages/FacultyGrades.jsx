import { useEffect, useState } from 'react'
import { adminAPI, gradeAPI, enrollmentAPI } from '../utils/api'
import toast from 'react-hot-toast'

const FacultyGrades = () => {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [students, setStudents] = useState([])
  const [grades, setGrades] = useState({})

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
      const initial = {}
      list.forEach(s => { initial[s._id] = { marks: '', grade: '' } })
      setGrades(initial)
    } catch (e) {
      toast.error('Failed to load students')
    }
  }

  const saveGrades = async () => {
    if (!selectedCourse) return toast.error('Select a course')
    try {
      const entries = Object.entries(grades)
      for (const [studentId, g] of entries) {
        if (g.marks === '' || g.grade === '') continue
        await gradeAPI.upsert({ studentId, courseId: selectedCourse, marks: Number(g.marks), grade: g.grade })
      }
      toast.success('Grades saved')
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to save grades')
    }
  }

  useEffect(() => { loadCourses() }, [])
  useEffect(() => { loadStudents(selectedCourse) }, [selectedCourse])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Enter Grades</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
          <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="border rounded px-3 py-2 w-full">
            <option value="">Select a course</option>
            {courses.map(c => (
              <option key={c._id} value={c._id}>{c.title} ({c.code})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Students</h2>
        </div>
        <div className="p-4">
          {students.length === 0 ? (
            <p className="text-gray-600">No students to grade.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Marks</th>
                    <th className="py-2 pr-4">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s._id} className="border-b">
                      <td className="py-2 pr-4">{s.name}</td>
                      <td className="py-2 pr-4">{s.email}</td>
                      <td className="py-2 pr-4">
                        <input type="number" min="0" max="100" value={grades[s._id]?.marks || ''} onChange={(e) => setGrades(prev => ({ ...prev, [s._id]: { ...prev[s._id], marks: e.target.value } }))} className="border rounded px-2 py-1 w-24" />
                      </td>
                      <td className="py-2 pr-4">
                        <select value={grades[s._id]?.grade || ''} onChange={(e) => setGrades(prev => ({ ...prev, [s._id]: { ...prev[s._id], grade: e.target.value } }))} className="border rounded px-2 py-1">
                          <option value="">Select</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="F">F</option>
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
          <button onClick={saveGrades} className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">Save Grades</button>
        </div>
      </div>
    </div>
  )
}

export default FacultyGrades
