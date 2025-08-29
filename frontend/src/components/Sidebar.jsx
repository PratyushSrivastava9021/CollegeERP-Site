import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Home, 
  BookOpen, 
  Users, 
  User, 
  Settings, 
  GraduationCap,
  Calendar,
  BarChart3
} from 'lucide-react'
import { hasPermission } from '../utils/helpers'

const Sidebar = () => {
  const { user } = useAuth()
  const location = useLocation()

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      current: location.pathname === '/dashboard',
    },
    {
      name: 'Courses',
      href: '/courses',
      icon: BookOpen,
      current: location.pathname.startsWith('/courses'),
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      current: location.pathname === '/profile',
    },
    ...(hasPermission(user, 'admin') ? [
      {
        name: 'Users',
        href: '/users',
        icon: Users,
        current: location.pathname === '/users',
      },
    ] : []),
  ]

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <GraduationCap className="h-6 w-6 text-primary-600" />
          <span className="text-lg font-semibold text-gray-900">Menu</span>
        </div>
        
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.current
                    ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-medium">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
