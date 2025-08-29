import { useEffect, useState } from 'react'
import { attendanceAPI } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const StudentAttendance = () => {
  const { user } = useAuth()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const res = await attendanceAPI.getByStudent(user.id || user._id)
      setRows(res.data.data || [])
    } catch (e) {
      toast.error('Failed to load attendance')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (user) load() }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Attendance</h1>
      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Records</h2>
        </div>
        <div className="p-4">
          {rows.length === 0 ? (
            <p className="text-gray-600">No attendance records.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Course</th>
                    <th className="py-2 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r._id} className="border-b">
                      <td className="py-2 pr-4">{new Date(r.date).toLocaleDateString()}</td>
                      <td className="py-2 pr-4">{r.courseId?.title} ({r.courseId?.code})</td>
                      <td className="py-2 pr-4 capitalize">{r.status}</td>
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

export default StudentAttendance
