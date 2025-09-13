import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Home, 
  BookOpen, 
  User, 
  GraduationCap,
  LogOut,
  Menu,
  X,
  Sparkles,
  Search,
  Calendar,
  Award,
  Bell
} from 'lucide-react'
import { useState } from 'react'
import NotificationCenter from './NotificationCenter'

const Layout = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getNavigation = () => {
    if (!user) {
      return [{ name: 'Home', href: '/', icon: Home }]
    }

    const baseNav = [
      { name: 'Dashboard', href: '/dashboard', icon: Home },
      { name: 'Courses', href: '/courses', icon: BookOpen },
    ]

    if (user.role === 'student') {
      return [
        ...baseNav,
        { name: 'Attendance', href: '/student/attendance', icon: Calendar },
        { name: 'Grades', href: '/student/grades', icon: Award },
        { name: 'Notices', href: '/notices', icon: Bell },
        { name: 'Profile', href: '/profile', icon: User },
      ]
    }

    if (user.role === 'faculty') {
      return [
        ...baseNav,
        { name: 'Mark Attendance', href: '/faculty/attendance', icon: Calendar },
        { name: 'Manage Grades', href: '/faculty/grades', icon: Award },
        { name: 'Notices', href: '/notices', icon: Bell },
        { name: 'Profile', href: '/profile', icon: User },
      ]
    }

    return [
      ...baseNav,
      { name: 'Notices', href: '/notices', icon: Bell },
      { name: 'Profile', href: '/profile', icon: User },
    ]
  }

  const navigation = getNavigation()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Top Navigation */}
      <nav className="glass-black fixed top-0 left-0 right-0 z-50 animate-slide-up neon-border">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {user && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 lg:hidden transition-all duration-300 transform hover:scale-110"
                >
                  <Menu className="h-6 w-6" />
                </button>
              )}
              
              <Link to="/" className="flex items-center space-x-3 ml-4 lg:ml-0 group">
                <div className="h-10 w-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300 transform group-hover:scale-110 animate-pulse-glow">
                  <GraduationCap className="h-6 w-6 text-black" />
                </div>
                <span className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">College ERP</span>
                <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-lg shadow-cyan-500/25'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <button className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-all hover:scale-105 group">
                    <Search className="w-6 h-6 text-gray-300 group-hover:text-cyan-400 transition-colors" />
                  </button>
                  
                  <NotificationCenter />
                  
                  <span className="text-sm text-white/80 hidden sm:block font-medium">
                    Welcome, {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="btn-glass flex items-center text-sm font-semibold"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-white/80 hover:text-white transition-colors duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {user && (
        <div className={`lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 z-40 flex animate-fade-in">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className="relative flex flex-col flex-1 w-72 glass-black animate-slide-in-right neon-border">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full glass text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 h-0 pt-8 pb-4 overflow-y-auto">
                <nav className="mt-5 px-4 space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`group flex items-center px-4 py-3 text-base font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-lg shadow-cyan-500/25'
                            : 'text-white/80 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className="mr-4 h-6 w-6" />
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-20 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-slide-up">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Layout