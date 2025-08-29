import { useEffect, useState } from 'react'
import { noticeAPI } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import { PlusCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const Notices = () => {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const res = await noticeAPI.list()
      setItems(res.data.data || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const canCreate = user && (user.role === 'admin' || user.role === 'faculty')

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notices</h1>
        {canCreate && (
          <Link to="/notices/new" className="inline-flex items-center px-3 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">
            <PlusCircle className="h-4 w-4 mr-2" /> New Notice
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-600">No notices yet.</p>
        ) : (
          items.map(n => (
            <div key={n._id} className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{n.title}</h2>
                <span className="text-sm text-gray-500">{new Date(n.date || n.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="mt-2 text-gray-700 whitespace-pre-line">{n.description}</p>
              <p className="mt-2 text-sm text-gray-500">By {n.createdBy?.name} ({n.createdBy?.role})</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Notices
