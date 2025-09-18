import { useNavigate } from 'react-router-dom'
import { Clock, FileText, HelpCircle, Calendar, Award, Star, Bell, BarChart3, FolderOpen } from 'lucide-react'

const StudentAcademic = () => {
  const navigate = useNavigate()

  const academicModules = [
    {
      title: 'Timetable',
      description: 'View your weekly class schedule',
      icon: Clock,
      path: '/student/timetable',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Assignments',
      description: 'Submit and track assignments',
      icon: FileText,
      path: '/assignments',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Quizzes',
      description: 'Take online assessments',
      icon: HelpCircle,
      path: '/quizzes',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Attendance',
      description: 'Check your attendance record',
      icon: Calendar,
      path: '/student/attendance',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Grades',
      description: 'View your academic performance',
      icon: Award,
      path: '/student/grades',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Feedback',
      description: 'Rate courses and provide feedback',
      icon: Star,
      path: '/feedback',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Notices',
      description: 'Important announcements',
      icon: Bell,
      path: '/notices',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      title: 'Calendar',
      description: 'Academic calendar and events',
      icon: Calendar,
      path: '/calendar',
      color: 'from-rose-500 to-pink-500'
    },
    {
      title: 'Analytics',
      description: 'Track your academic performance',
      icon: BarChart3,
      path: '/analytics',
      color: 'from-violet-500 to-purple-500'
    },
    {
      title: 'Projects',
      description: 'Manage group projects',
      icon: FolderOpen,
      path: '/projects',
      color: 'from-emerald-500 to-teal-500'
    }
  ]

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 4vh, 2.5rem)'}}>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Academic Hub</h1>
        <p className="text-sm md:text-base text-gray-400 mt-1">Access all your academic tools and resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {academicModules.map((module, index) => {
          const Icon = module.icon
          return (
            <div
              key={index}
              onClick={() => navigate(module.path)}
              className="card-black hover:shadow-lg transition-all cursor-pointer transform hover:scale-105" style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${module.color} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white break-words">{module.title}</h3>
                  <p className="text-xs md:text-sm text-gray-400 mt-1 break-words">{module.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StudentAcademic