import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../utils/api'
import { BookOpen, Save, X, Plus, Minus } from 'lucide-react'
import toast from 'react-hot-toast'

const CreateCourse = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    description: '',
    credits: 3,
    department: '',
    semester: 'Fall',
    year: new Date().getFullYear(),
    maxStudents: 50,
    schedule: [{ day: 'Monday', startTime: '09:00', endTime: '10:30', room: '' }],
    syllabus: '',
    prerequisites: ['']
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleScheduleChange = (index, field, value) => {
    const newSchedule = [...formData.schedule]
    newSchedule[index][field] = value
    setFormData(prev => ({ ...prev, schedule: newSchedule }))
  }

  const addScheduleSlot = () => {
    setFormData(prev => ({
      ...prev,
      schedule: [...prev.schedule, { day: 'Monday', startTime: '09:00', endTime: '10:30', room: '' }]
    }))
  }

  const removeScheduleSlot = (index) => {
    if (formData.schedule.length > 1) {
      const newSchedule = formData.schedule.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, schedule: newSchedule }))
    }
  }

  const handlePrerequisiteChange = (index, value) => {
    const newPrerequisites = [...formData.prerequisites]
    newPrerequisites[index] = value
    setFormData(prev => ({ ...prev, prerequisites: newPrerequisites }))
  }

  const addPrerequisite = () => {
    setFormData(prev => ({
      ...prev,
      prerequisites: [...prev.prerequisites, '']
    }))
  }

  const removePrerequisite = (index) => {
    if (formData.prerequisites.length > 1) {
      const newPrerequisites = formData.prerequisites.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, prerequisites: newPrerequisites }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const courseData = {
        ...formData,
        instructor: user.id,
        createdBy: user.id,
        prerequisites: formData.prerequisites.filter(p => p.trim() !== '')
      }

      await api.post('/courses', courseData)
      toast.success('Course created successfully!')
      navigate('/courses')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create course')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-[clamp(1.5rem,4vw,2.5rem)]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold text-white">Create New Course</h1>
          <p className="text-gray-400 mt-[clamp(0.25rem,1vw,0.5rem)] text-[clamp(0.875rem,2.5vw,1rem)]">
            Add a new course to the curriculum
          </p>
        </div>
        <button
          onClick={() => navigate('/courses')}
          className="btn-outline flex items-center"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-[clamp(1.5rem,4vw,2rem)]">
        {/* Basic Information */}
        <div className="bg-gray-800 rounded-lg p-[clamp(1rem,3vw,1.5rem)] border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-cyan-400" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Course Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Course Code</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="e.g., CS101"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Credits</label>
              <input
                type="number"
                name="credits"
                value={formData.credits}
                onChange={handleInputChange}
                min="1"
                max="10"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              >
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Academic Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                min="2020"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Maximum Students</label>
              <input
                type="number"
                name="maxStudents"
                value={formData.maxStudents}
                onChange={handleInputChange}
                min="1"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-gray-800 rounded-lg p-[clamp(1rem,3vw,1.5rem)] border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Schedule</h2>
            <button
              type="button"
              onClick={addScheduleSlot}
              className="btn-outline flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Slot
            </button>
          </div>
          
          {formData.schedule.map((slot, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 p-4 bg-gray-700 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Day</label>
                <select
                  value={slot.day}
                  onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Start Time</label>
                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">End Time</label>
                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Room</label>
                <input
                  type="text"
                  value={slot.room}
                  onChange={(e) => handleScheduleChange(index, 'room', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white"
                  placeholder="Room 101"
                />
              </div>
              
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeScheduleSlot(index)}
                  className="btn-outline text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                  disabled={formData.schedule.length === 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Prerequisites */}
        <div className="bg-gray-800 rounded-lg p-[clamp(1rem,3vw,1.5rem)] border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Prerequisites</h2>
            <button
              type="button"
              onClick={addPrerequisite}
              className="btn-outline flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Prerequisite
            </button>
          </div>
          
          {formData.prerequisites.map((prerequisite, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={prerequisite}
                onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Enter prerequisite course"
              />
              <button
                type="button"
                onClick={() => removePrerequisite(index)}
                className="btn-outline text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                disabled={formData.prerequisites.length === 1}
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Syllabus */}
        <div className="bg-gray-800 rounded-lg p-[clamp(1rem,3vw,1.5rem)] border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Syllabus</h2>
          <textarea
            name="syllabus"
            value={formData.syllabus}
            onChange={handleInputChange}
            rows="6"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Enter detailed course syllabus..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {loading ? 'Creating...' : 'Create Course'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateCourse