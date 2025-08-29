import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Calendar,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const Home = () => {
  const { user } = useAuth()

  const features = [
    {
      icon: BookOpen,
      title: 'Course Management',
      description: 'Browse and enroll in courses, track your progress, and manage your academic journey.',
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Efficient user management system for students, teachers, and administrators.',
    },
    {
      icon: Calendar,
      title: 'Academic Calendar',
      description: 'Stay updated with important dates, deadlines, and academic schedules.',
    },
    {
      icon: GraduationCap,
      title: 'Student Portal',
      description: 'Comprehensive student portal with all the tools you need for success.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <GraduationCap className="h-20 w-20 mx-auto mb-6 text-primary-200" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              College ERP System
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Streamline your academic institution with our comprehensive Enterprise Resource Planning system.
              Manage courses, students, and administrative tasks with ease.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need for academic excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive ERP system provides all the tools and features needed to manage
              academic institutions efficiently and effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students and educators who are already using our system
            to streamline their academic experience.
          </p>
          {!user && (
            <Link
              to="/register"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
            >
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
