import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Clock, Play, Plus, CheckCircle, XCircle, Award, Users, BarChart3, Calendar, Filter } from 'lucide-react'

const Quizzes = () => {
  const { user } = useAuth()
  const [filter, setFilter] = useState('all')
  const [quizzes] = useState([
    {
      id: 1,
      title: 'Data Structures Basics',
      course: 'Data Structures',
      questions: 15,
      duration: 30,
      maxMarks: 50,
      attempts: 2,
      status: 'available',
      dueDate: '2024-01-20',
      bestScore: null,
      instructor: 'Dr. Rajesh Kumar',
      totalStudents: 45,
      avgScore: null,
      difficulty: 'Medium',
      topics: ['Trees', 'Graphs', 'Sorting']
    },
    {
      id: 2,
      title: 'Database Normalization',
      course: 'Database Systems',
      questions: 10,
      duration: 20,
      maxMarks: 30,
      attempts: 1,
      status: 'completed',
      dueDate: '2024-01-15',
      bestScore: 28,
      instructor: 'Prof. Meera Sharma',
      totalStudents: 42,
      avgScore: 24.5,
      difficulty: 'Easy',
      topics: ['Normalization', 'ER Diagrams'],
      completedAt: '2024-01-14T16:45:00Z',
      timeSpent: '18 minutes'
    }
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-500/20 text-green-400'
      case 'completed': return 'bg-blue-500/20 text-blue-400'
      case 'overdue': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Quizzes & Assessments</h1>
          <p className="text-gray-300 mt-1 text-sm sm:text-base">
            {user?.role === 'faculty' ? 'Create and manage quizzes for your courses' : 'Take quizzes and track your performance'}
          </p>
        </div>
        {user?.role === 'faculty' && (
          <button className="btn-primary flex items-center justify-center w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create Quiz
          </button>
        )}
      </div>

      <div className="flex space-x-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-select bg-gray-800 border-gray-600 text-white"
        >
          <option value="all">All Quizzes</option>
          <option value="available">Available</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <div className="grid gap-6">
        {quizzes.filter(quiz => filter === 'all' || quiz.status === filter).map(quiz => (
          <div key={quiz.id} className="card-black p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-white">{quiz.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(quiz.status)}`}>
                    {quiz.status}
                  </span>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-300 mb-3">
                  <span className="text-blue-400">{quiz.course}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{quiz.duration} minutes</span>
                  </div>
                  <span>{quiz.questions} questions</span>
                  <span>Max: {quiz.maxMarks} marks</span>
                  <span>Due: {new Date(quiz.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-400 mb-3">
                  <span>By: {quiz.instructor}</span>
                  <span className={`px-2 py-1 rounded-full ${
                    quiz.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    quiz.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {quiz.difficulty}
                  </span>
                  {user?.role === 'faculty' && <span>{quiz.totalStudents} students</span>}
                  {quiz.avgScore && <span>Class avg: {quiz.avgScore}/{quiz.maxMarks}</span>}
                </div>
                {quiz.topics && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {quiz.topics.map(topic => (
                      <span key={topic} className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
                {quiz.bestScore && (
                  <div className="flex items-center space-x-2 mb-3">
                    <Award className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-white">
                      Best Score: <span className="text-green-400 font-semibold">{quiz.bestScore}/{quiz.maxMarks}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-300">Attempts remaining: {quiz.attempts}</span>
                {quiz.timeSpent && (
                  <span className="text-gray-400">Completed in: {quiz.timeSpent}</span>
                )}
                {quiz.completedAt && (
                  <span className="text-gray-400">Submitted: {new Date(quiz.completedAt).toLocaleDateString()}</span>
                )}
              </div>
              <div className="flex space-x-3">
                {user?.role === 'student' && quiz.status === 'available' && (
                  <button className="btn-primary flex items-center">
                    <Play className="h-4 w-4 mr-2" />
                    Start Quiz
                  </button>
                )}
                {user?.role === 'student' && quiz.status === 'completed' && (
                  <button className="btn-outline">View Results</button>
                )}
                {user?.role === 'faculty' && (
                  <>
                    <button className="btn-outline">View Responses</button>
                    <button className="btn-outline">Edit Quiz</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Quizzes