import { useEffect, useState } from 'react'
import { adminAPI } from '../utils/api'
import { noticeAPI } from '../utils/api'
import { BookOpen, Users, Megaphone, GraduationCap } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white border rounded-lg p-4 flex items-center">
    <div className={`h-10 w-10 rounded-md flex items-center justify-center ${color} text-white mr-3`}>
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  </div>
)

const Admin = () => {
  const [summary, setSummary] = useState({ students: 0, faculty: 0, courses: 0, notices: 0, enrollmentsByDay: [] })
  const [notices, setNotices] = useState([])

  const load = async () => {
    try {
      const [s, n] = await Promise.all([adminAPI.getSummary(), noticeAPI.list()])
      setSummary(s.data.data)
      setNotices((n.data.data || []).slice(0, 5))
    } catch (e) {}
  }

  useEffect(() => { load() }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={Users} title="Students" value={summary.students} color="bg-blue-600" />
        <StatCard icon={GraduationCap} title="Faculty" value={summary.faculty} color="bg-green-600" />
        <StatCard icon={BookOpen} title="Courses" value={summary.courses} color="bg-purple-600" />
        <StatCard icon={Megaphone} title="Notices" value={summary.notices} color="bg-orange-600" />
      </div>

      <div className="bg-white border rounded-lg p-4">
        <h2 className="font-semibold mb-4">Enrollments (Last 7 Days)</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={summary.enrollmentsByDay} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Recent Notices</h2>
        </div>
        <div className="p-4">
          {notices.length === 0 ? (
            <p className="text-gray-600">No notices yet.</p>
          ) : (
            <div className="space-y-3">
              {notices.map(n => (
                <div key={n._id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{n.title}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{n.description}</p>
                  </div>
                  <span className="text-sm text-gray-500">{new Date(n.date || n.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin
