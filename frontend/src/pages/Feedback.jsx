import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Star, MessageSquare, TrendingUp, BarChart3 } from 'lucide-react'

const Feedback = () => {
  const { user } = useAuth()
  const [selectedCourse, setSelectedCourse] = useState('')
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  const [feedbackData] = useState([
    {
      id: 1,
      course: 'Data Structures',
      instructor: 'Dr. Rajesh Kumar',
      avgRating: 4.5,
      totalFeedbacks: 45,
      categories: {
        teaching: 4.6,
        content: 4.4,
        interaction: 4.3,
        assignments: 4.7
      }
    },
    {
      id: 2,
      course: 'Database Systems',
      instructor: 'Prof. Meera Sharma',
      avgRating: 4.2,
      totalFeedbacks: 38,
      categories: {
        teaching: 4.1,
        content: 4.3,
        interaction: 4.0,
        assignments: 4.4
      }
    }
  ])

  const courses = ['Data Structures', 'Database Systems', 'Machine Learning', 'Web Development']

  const renderStars = (rating, interactive = false, onRate = null) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-400'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    )
  }

  const handleSubmitFeedback = () => {
    if (selectedCourse && rating && feedback.trim()) {
      // Submit feedback logic
      setSelectedCourse('')
      setRating(0)
      setFeedback('')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Course Feedback</h1>
        <p className="text-gray-400 mt-1">
          {user?.role === 'faculty' ? 'View feedback from students' : 'Provide feedback for your courses'}
        </p>
      </div>

      {user?.role === 'student' && (
        <div className="card-black p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Submit Feedback</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="form-select w-full"
              >
                <option value="">Choose a course...</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Overall Rating</label>
              {renderStars(rating, true, setRating)}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Your Feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts about the course, teaching methodology, assignments, etc."
                className="form-input w-full h-32 resize-none"
              />
            </div>

            <button 
              onClick={handleSubmitFeedback}
              className="btn-primary"
              disabled={!selectedCourse || !rating || !feedback.trim()}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}

      <div className="card-black p-6">
        <h2 className="text-xl font-semibold text-white mb-6">
          {user?.role === 'faculty' ? 'Your Course Feedback' : 'Course Ratings'}
        </h2>
        
        <div className="space-y-6">
          {feedbackData.map(course => (
            <div key={course.id} className="border border-gray-700 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{course.course}</h3>
                  <p className="text-gray-400">Instructor: {course.instructor}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    {renderStars(Math.round(course.avgRating))}
                    <span className="text-white font-semibold">{course.avgRating}</span>
                  </div>
                  <p className="text-sm text-gray-400">{course.totalFeedbacks} reviews</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(course.categories).map(([category, rating]) => (
                  <div key={category} className="text-center">
                    <div className="text-sm text-gray-400 capitalize mb-1">{category}</div>
                    <div className="text-lg font-semibold text-white">{rating}</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(rating / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {user?.role === 'faculty' && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <button className="btn-outline flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View Detailed Feedback
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Feedback