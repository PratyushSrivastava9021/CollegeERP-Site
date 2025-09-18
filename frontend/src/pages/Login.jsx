import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const getRedirectPath = (role) => {
    if (from) return from
    if (role === 'admin') return '/admin'
    if (role === 'faculty') return '/faculty'
    return '/student'
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    
    try {
      const result = await login(data.email, data.password)
      
      if (result.success) {
        toast.success('Login successful!')
        const path = getRedirectPath(result.role || result.user?.role)
        navigate(path, { replace: true })
      } else {
        toast.error(result.message || 'Login failed')
      }
    } catch (error) {
      toast.error('An error occurred during login')
      console.error('Login error details:', error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5"></div>
        <div className="absolute inset-0 grid-bg"></div>
      </div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb floating-orb-1"></div>
        <div className="floating-orb floating-orb-2"></div>
        <div className="floating-orb floating-orb-3"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center animate-slide-up">
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl mb-8 animate-pulse-glow hover-glow-cyan">
            <Lock className="h-10 w-10 text-black" />
          </div>
          <h2 className="text-5xl font-black gradient-text mb-4 animate-text-glow">
            Welcome Back
          </h2>
          <p className="text-xl text-gray-300">
            Sign in to access your{' '}
            <span className="text-cyan-400 font-semibold">dashboard</span>
          </p>
          <p className="mt-4 text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-300 hover:underline"
            >
              Create one here
            </Link>
          </p>
        </div>

        <form className="form-container space-y-8 animate-slide-up hover-glow-cyan" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8">
            {/* Email Field */}
            <div className="space-y-3">
              <label htmlFor="email" className="block text-sm font-bold text-white uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-cyan-400 group-focus-within:text-cyan-300 transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`form-input pl-12 h-14 text-base ${
                    errors.email ? 'border-red-400/50 focus:border-red-400 focus:ring-red-500/20' : 'focus:border-cyan-400 focus:ring-cyan-500/20'
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <div className="flex items-center mt-3 text-sm text-red-400 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                  <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <label htmlFor="password" className="block text-sm font-bold text-white uppercase tracking-wider">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-cyan-400 group-focus-within:text-cyan-300 transition-colors" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className={`form-input pl-12 pr-12 h-14 text-base ${
                    errors.password ? 'border-red-400/50 focus:border-red-400 focus:ring-red-500/20' : 'focus:border-cyan-400 focus:ring-cyan-500/20'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300 transform hover:scale-110"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center mt-3 text-sm text-red-400 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                  <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full text-lg font-black h-14 hover-glow-cyan transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="loading-spinner h-6 w-6"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>Sign In</span>
                  <Lock className="h-5 w-5" />
                </span>
              )}
            </button>
          </div>

          <div className="text-center pt-6 border-t border-gray-800">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 font-semibold text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login