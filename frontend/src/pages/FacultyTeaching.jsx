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
    <div className="space-y-[clamp(1.5rem,4vw,2.5rem)]">
      <div>
        <h1 className="text-[clamp(1.75rem,5vw,3rem)] font-bold text-white">Teaching Hub</h1>
        <p className="text-gray-400 mt-[clamp(0.25rem,1vw,0.5rem)] text-[clamp(0.875rem,2.5vw,1rem)]">Manage all your teaching activities and student interactions</p>
      </div>

      <div className="responsive-grid-3">
        {teachingModules.map((module, index) => {
          const Icon = module.icon
          return (
            <div
              key={index}
              onClick={() => navigate(module.path)}
              className="card-black p-[clamp(1rem,3vw,1.5rem)] hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
            >
              <div className="flex items-center space-x-[clamp(0.75rem,2vw,1rem)]">
                <div className={`p-[clamp(0.75rem,2vw,1rem)] rounded-xl bg-gradient-to-r ${module.color} shadow-lg`}>
                  <Icon className="h-[clamp(1.25rem,3vw,1.5rem)] w-[clamp(1.25rem,3vw,1.5rem)] text-white" />
                </div>
                <div>
                  <h3 className="text-[clamp(1rem,3vw,1.125rem)] font-semibold text-white">{module.title}</h3>
                  <p className="text-[clamp(0.75rem,2vw,0.875rem)] text-gray-400 mt-[clamp(0.25rem,1vw,0.5rem)]">{module.description}</p>
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