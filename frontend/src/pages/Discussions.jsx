import { useState } from 'react'
import { MessageSquare, Plus, ThumbsUp, Reply, Search, Filter, Eye, Clock, User } from 'lucide-react'

const Discussions = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCourse, setFilterCourse] = useState('all')
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: 'Help with Data Structures Assignment',
      content: 'I need help understanding binary trees implementation...',
      author: 'John Doe',
      course: 'Data Structures',
      replies: 5,
      likes: 12,
      views: 45,
      createdAt: '2 hours ago',
      lastActivity: '30 minutes ago',
      tags: ['binary-trees', 'algorithms', 'help-needed'],
      isAnswered: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Database Normalization Question',
      content: 'Can someone explain 3NF with examples?',
      author: 'Jane Smith',
      course: 'Database Systems',
      replies: 8,
      likes: 15,
      views: 67,
      createdAt: '4 hours ago',
      lastActivity: '1 hour ago',
      tags: ['normalization', 'database-design'],
      isAnswered: true,
      priority: 'medium'
    }
  ])

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Discussion Forums</h1>
          <p className="text-gray-300 mt-1 text-sm sm:text-base">Ask questions, share knowledge, and collaborate with peers</p>
        </div>
        <button className="btn-primary flex items-center justify-center w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          New Discussion
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 w-full"
            />
          </div>
        </div>
        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          className="form-select bg-gray-800 border-gray-600 text-white w-full sm:w-auto"
        >
          <option value="all">All Courses</option>
          <option value="Data Structures">Data Structures</option>
          <option value="Database Systems">Database Systems</option>
          <option value="Machine Learning">Machine Learning</option>
        </select>
      </div>

      <div className="space-y-4">
        {discussions.filter(discussion => {
          const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase())
          const matchesCourse = filterCourse === 'all' || discussion.course === filterCourse
          return matchesSearch && matchesCourse
        }).map(discussion => (
          <div key={discussion.id} className="card-black p-6 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                      {discussion.course}
                    </span>
                    {discussion.isAnswered && (
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                        Answered
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      discussion.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                      discussion.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {discussion.priority} priority
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">{discussion.createdAt}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{discussion.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{discussion.content}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {discussion.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{discussion.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Reply className="h-4 w-4" />
                      <span>{discussion.replies} replies</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{discussion.likes} likes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{discussion.views} views</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>Last activity: {discussion.lastActivity}</span>
                  </div>
                </div>
              </div>
              <MessageSquare className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Discussions