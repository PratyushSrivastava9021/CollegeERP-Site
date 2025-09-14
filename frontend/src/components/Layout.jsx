import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useRubberBandScroll } from '../hooks/useRubberBandScroll'
import { 
  Home, 
  BookOpen, 
  User, 
  GraduationCap,
  LogOut,
  Menu,
  X,
  Search,
  Send,
  Library
} from 'lucide-react'
import { useState } from 'react'
import NotificationCenter from './NotificationCenter'

const Layout = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  useRubberBandScroll()

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
        { name: 'Academic', href: '/student/academic', icon: BookOpen },
        { name: 'Messages', href: '/messages', icon: Send },
        { name: 'Library', href: '/library', icon: Library },
        { name: 'Profile', href: '/profile', icon: User },
      ]
    }

    if (user.role === 'faculty') {
      return [
        ...baseNav,
        { name: 'Teaching', href: '/faculty/teaching', icon: GraduationCap },
        { name: 'Messages', href: '/messages', icon: Send },
        { name: 'Library', href: '/library', icon: Library },
        { name: 'Profile', href: '/profile', icon: User },
      ]
    }

    return [...baseNav, { name: 'Profile', href: '/profile', icon: User }]
  }

  const navigation = getNavigation()

  return (
    <div className="min-h-screen bg-black">
      {/* Fixed Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-700">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Left: Logo + Menu */}
          <div className="flex items-center space-x-4">
            {user && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-black" />
              </div>
              <span className="text-xl font-bold text-white hidden sm:block">College ERP</span>
            </Link>
          </div>

          {/* Right: User Actions */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors hidden sm:block">
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
                
                <NotificationCenter />
                
                <span className="text-sm text-gray-300 hidden md:block max-w-32 truncate">
                  {user.name}
                </span>
                
                <button
                  onClick={logout}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="ml-2 hidden sm:block">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      {user && (
        <aside className="fixed top-16 left-0 bottom-0 w-64 bg-gray-900 border-r border-gray-700 hidden lg:block z-40">
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </aside>
      )}

      {/* Mobile Sidebar */}
      {user && sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-900 border-r border-gray-700">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <span className="text-lg font-semibold text-white">Navigation</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className={`pt-16 min-h-screen ${user ? 'lg:pl-64' : ''}`}>
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout