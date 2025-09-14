import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { FileText, Plus, Calendar, Clock, CheckCircle, AlertCircle, Upload, Download, Eye, Filter, Search } from 'lucide-react'

const Assignments = () => {
  const { user } = useAuth()
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Binary Tree Implementation',
      course: 'Data Structures',
      dueDate: '2024-01-15',
      assignedDate: '2024-01-01',
      status: 'pending',
      description: 'Implement binary tree with insert, delete, and search operations',
      maxMarks: 100,
      submittedMarks: null,
      instructor: 'Dr. Rajesh Kumar',
      submissionType: 'Code + Report',
      attempts: 3,
      usedAttempts: 0,
      files: [],
      instructions: 'Submit both source code and a detailed report explaining your implementation.'
    },
    {
      id: 2,
      title: 'Database Design Project',
      course: 'Database Systems',
      dueDate: '2024-01-20',
      assignedDate: '2024-01-05',
      status: 'submitted',
      description: 'Design a complete database for library management system',
      maxMarks: 150,
      submittedMarks: 135,
      instructor: 'Prof. Meera Sharma',
      submissionType: 'SQL Files + Documentation',
      attempts: 2,
      usedAttempts: 1,
      submittedAt: '2024-01-19T14:30:00Z',
      feedback: 'Good implementation but missing some normalization aspects.',
      files: ['library_schema.sql', 'documentation.pdf'],
      instructions: 'Create normalized database schema with proper relationships and constraints.'
    }
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      case 'submitted': return 'bg-green-500/20 text-green-400'
      case 'overdue': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'submitted': return <CheckCircle className="h-4 w-4" />
      case 'overdue': return <AlertCircle className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || assignment.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Assignments</h1>
          <p className="text-gray-300 mt-1 text-sm sm:text-base">
            {user?.role === 'faculty' ? 'Manage course assignments' : 'View and submit assignments'}
          </p>
        </div>
        {user?.role === 'faculty' && (
          <button className="btn-primary flex items-center justify-center w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create Assignment
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 w-full"
            />
          </div>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-select bg-gray-800 border-gray-600 text-white w-full sm:w-auto"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="submitted">Submitted</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredAssignments.map(assignment => (
          <div key={assignment.id} className="card-black p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-white">{assignment.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full flex items-center space-x-1 ${getStatusColor(assignment.status)}`}>
                    {getStatusIcon(assignment.status)}
                    <span className="capitalize">{assignment.status}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
                  <span className="text-blue-400">{assignment.course}</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                  <span>Max Marks: {assignment.maxMarks}</span>
                  {assignment.instructor && <span>By: {assignment.instructor}</span>}
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-400 mb-3">
                  <span>Assigned: {new Date(assignment.assignedDate).toLocaleDateString()}</span>
                  <span>Type: {assignment.submissionType}</span>
                  <span>Attempts: {assignment.usedAttempts}/{assignment.attempts}</span>
                </div>
                <p className="text-gray-300 mb-4">{assignment.description}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                {assignment.submittedMarks && (
                  <div className="text-sm">
                    <span className="text-gray-300">Score: </span>
                    <span className="text-green-400 font-semibold">
                      {assignment.submittedMarks}/{assignment.maxMarks}
                    </span>
                    <span className="text-gray-400 ml-2">({Math.round((assignment.submittedMarks/assignment.maxMarks)*100)}%)</span>
                  </div>
                )}
                {assignment.feedback && (
                  <div className="text-sm text-yellow-400">
                    Feedback Available
                  </div>
                )}
                {assignment.files && assignment.files.length > 0 && (
                  <div className="text-sm text-blue-400">
                    {assignment.files.length} file(s) submitted
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {user?.role === 'student' && assignment.status === 'pending' && (
                  <button className="btn-primary flex items-center justify-center">
                    <Upload className="h-4 w-4 mr-2" />
                    Submit
                  </button>
                )}
                {user?.role === 'student' && assignment.status === 'submitted' && (
                  <>
                    <button className="btn-outline flex items-center justify-center">
                      <Eye className="h-4 w-4 mr-2" />
                      View Submission
                    </button>
                    {assignment.feedback && (
                      <button className="btn-outline flex items-center justify-center">
                        <Download className="h-4 w-4 mr-2" />
                        Feedback
                      </button>
                    )}
                  </>
                )}
                {user?.role === 'faculty' && (
                  <button className="btn-outline">View Submissions ({assignment.submissionCount || 0})</button>
                )}
                <button className="btn-outline">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Assignments