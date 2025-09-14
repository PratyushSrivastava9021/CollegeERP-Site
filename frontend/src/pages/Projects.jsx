import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Plus, Users, Calendar, CheckCircle, Clock, AlertCircle, Folder } from 'lucide-react'

const Projects = () => {
  const { user } = useAuth()
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: 'Library Management System',
      course: 'Database Systems',
      description: 'Design and implement a complete library management system with user authentication, book catalog, and borrowing system.',
      status: 'in-progress',
      progress: 65,
      dueDate: '2024-02-15',
      teamMembers: [
        { name: 'John Doe', role: 'Team Lead', avatar: 'JD' },
        { name: 'Jane Smith', role: 'Developer', avatar: 'JS' },
        { name: 'Mike Johnson', role: 'Designer', avatar: 'MJ' }
      ],
      tasks: [
        { id: 1, title: 'Database Design', status: 'completed', assignee: 'John Doe' },
        { id: 2, title: 'User Authentication', status: 'in-progress', assignee: 'Jane Smith' },
        { id: 3, title: 'Book Catalog UI', status: 'pending', assignee: 'Mike Johnson' },
        { id: 4, title: 'Testing & Documentation', status: 'pending', assignee: 'Team' }
      ]
    },
    {
      id: 2,
      title: 'E-Commerce Website',
      course: 'Web Development',
      description: 'Build a responsive e-commerce website with shopping cart, payment integration, and admin panel.',
      status: 'planning',
      progress: 25,
      dueDate: '2024-03-01',
      teamMembers: [
        { name: 'Alice Brown', role: 'Team Lead', avatar: 'AB' },
        { name: 'Bob Wilson', role: 'Backend Dev', avatar: 'BW' }
      ],
      tasks: [
        { id: 1, title: 'Requirements Analysis', status: 'completed', assignee: 'Alice Brown' },
        { id: 2, title: 'System Architecture', status: 'in-progress', assignee: 'Bob Wilson' },
        { id: 3, title: 'Frontend Development', status: 'pending', assignee: 'Alice Brown' },
        { id: 4, title: 'Backend API', status: 'pending', assignee: 'Bob Wilson' }
      ]
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'in-progress': return 'bg-blue-500/20 text-blue-400'
      case 'planning': return 'bg-yellow-500/20 text-yellow-400'
      case 'pending': return 'bg-gray-500/20 text-gray-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'in-progress': return <Clock className="h-4 w-4" />
      case 'planning': return <AlertCircle className="h-4 w-4" />
      default: return <Folder className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Project Management</h1>
          <p className="text-gray-400 mt-1">Collaborate on group projects and track progress</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </button>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Projects List */}
        <div className="lg:col-span-2 space-y-4">
          {projects.map(project => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`card-black p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedProject?.id === project.id ? 'ring-2 ring-blue-500/50' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center space-x-1 ${getStatusColor(project.status)}`}>
                      {getStatusIcon(project.status)}
                      <span className="capitalize">{project.status.replace('-', ' ')}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                    <span className="text-blue-400">{project.course}</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{project.teamMembers.length} members</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm font-semibold text-white">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Team Members */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Team:</span>
                <div className="flex -space-x-2">
                  {project.teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-gray-800"
                      title={member.name}
                    >
                      {member.avatar}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Details */}
        <div className="space-y-6">
          {selectedProject ? (
            <>
              {/* Project Info */}
              <div className="card-black p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Project Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-400">Course:</span>
                    <p className="text-white">{selectedProject.course}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">Due Date:</span>
                    <p className="text-white">{new Date(selectedProject.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">Status:</span>
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="card-black p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Team Members</h3>
                <div className="space-y-3">
                  {selectedProject.teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-white font-medium">{member.name}</p>
                        <p className="text-sm text-gray-400">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tasks */}
              <div className="card-black p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Tasks</h3>
                <div className="space-y-3">
                  {selectedProject.tasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          task.status === 'completed' ? 'bg-green-500' :
                          task.status === 'in-progress' ? 'bg-blue-500' :
                          'bg-gray-500'
                        }`}></div>
                        <div>
                          <p className="text-white text-sm">{task.title}</p>
                          <p className="text-xs text-gray-400">{task.assignee}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(task.status)}`}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="card-black p-6 text-center">
              <Folder className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Select a project to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Projects