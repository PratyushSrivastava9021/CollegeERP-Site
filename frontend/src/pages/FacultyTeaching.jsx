import { useNavigate } from 'react-router-dom'
import { Clock, FileText, HelpCircle, Calendar, Award, Star, Bell, Users, BarChart3, FolderOpen } from 'lucide-react'

const FacultyTeaching = () => {
  const navigate = useNavigate()

  const teachingModules = [
    {
      title: 'Timetable',
      description: 'Manage your teaching schedule',
      icon: Clock,
      path: '/faculty/timetable',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Assignments',
      description: 'Create and manage assignments',
      icon: FileText,
      path: '/assignments',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Quizzes',
      description: 'Create online assessments',
      icon: HelpCircle,
      path: '/quizzes',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Attendance',
      description: 'Mark student attendance',
      icon: Calendar,
      path: '/faculty/attendance',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Grades',
      description: 'Manage student grades',
      icon: Award,
      path: '/faculty/grades',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Enrollments',
      description: 'View course enrollments',
      icon: Users,
      path: '/faculty/enrollments',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Feedback',
      description: 'View course feedback',
      icon: Star,
      path: '/feedback',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Notices',
      description: 'Create announcements',
      icon: Bell,
      path: '/notices',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      title: 'Calendar',
      description: 'Manage academic calendar',
      icon: Calendar,
      path: '/calendar',
      color: 'from-rose-500 to-pink-500'
    },
    {
      title: 'Analytics',
      description: 'Student performance analytics',
      icon: BarChart3,
      path: '/analytics',
      color: 'from-violet-500 to-purple-500'
    },
    {
      title: 'Projects',
      description: 'Monitor group projects',
      icon: FolderOpen,
      path: '/projects',
      color: 'from-emerald-500 to-teal-500'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Teaching Hub</h1>
        <p className="text-gray-400 mt-1">Manage all your teaching activities and student interactions</p>
      </div>

      <div className="responsive-grid-3">
        {teachingModules.map((module, index) => {
          const Icon = module.icon
          return (
            <div
              key={index}
              onClick={() => navigate(module.path)}
              className="card-black p-6 hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${module.color} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{module.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FacultyTeaching