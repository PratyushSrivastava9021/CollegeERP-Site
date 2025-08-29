import { useState } from 'react'
import { noticeAPI } from '../utils/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const NewNotice = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description) return toast.error('Title and description are required')
    setLoading(true)
    try {
      await noticeAPI.create({ title, description, date })
      toast.success('Notice created')
      navigate('/notices')
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to create notice')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">New Notice</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded px-3 py-2 w-full md:w-60" />
        </div>
        <button disabled={loading} className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50">
          {loading ? 'Saving...' : 'Create Notice'}
        </button>
      </form>
    </div>
  )
}

export default NewNotice
