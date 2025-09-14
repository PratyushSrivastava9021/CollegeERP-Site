import React, { useState, useEffect } from 'react'
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  Filter, 
  Search, 
  Play, 
  FileText, 
  Calendar, 
  Award,
  ChevronRight,
  Download,
  Eye,
  UserCheck,
  Bookmark,
  BookmarkCheck,
  TrendingUp,
  Brain,
  Target,
  Zap,
  CheckCircle2,
  AlertCircle,
  X,
  Plus,
  ArrowRight,
  Trophy,
  Clock3,
  User,
  GraduationCap,
  BookMarked,
  Lightbulb,
  Heart,
  MessageCircle
} from 'lucide-react'
import toast from 'react-hot-toast'
import ModalPortal from '../components/ModalPortal'

const Courses = () => {
  const [selectedSemester, setSelectedSemester] = useState('all')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [bookmarkedCourses, setBookmarkedCourses] = useState(new Set())
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [enrollmentModal, setEnrollmentModal] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const engineeringCourses = [
    {
      id: 1,
      code: 'CSE101',
      title: 'Data Structures and Algorithms',
      department: 'Computer Science',
      semester: 3,
      credits: 4,
      instructor: 'Dr. Priya Sharma',
      enrolled: 45,
      capacity: 60,
      rating: 4.8,
      duration: '16 weeks',
      difficulty: 'Intermediate',
      description: 'Master fundamental data structures, algorithmic complexity, and advanced problem-solving techniques.',
      progress: 65,
      assignments: 8,
      lectures: 32,
      isEnrolled: true,
      nextDeadline: '2 days',
      tags: ['Programming', 'Logic', 'Problem Solving'],
      prerequisites: ['Programming Fundamentals'],
      learningOutcomes: 4,
      trending: true,
      color: 'blue'
    },
    {
      id: 2,
      code: 'CSE201',
      title: 'Database Management Systems',
      department: 'Computer Science',
      semester: 4,
      credits: 3,
      instructor: 'Prof. Rajesh Kumar',
      enrolled: 38,
      capacity: 50,
      rating: 4.6,
      duration: '16 weeks',
      difficulty: 'Intermediate',
      description: 'Comprehensive database design, advanced SQL, normalization, and transaction management.',
      progress: 0,
      assignments: 6,
      lectures: 28,
      isEnrolled: false,
      nextDeadline: null,
      tags: ['Database', 'SQL', 'Design'],
      prerequisites: ['Data Structures'],
      learningOutcomes: 5,
      trending: false,
      color: 'green'
    },
    {
      id: 3,
      code: 'CSE301',
      title: 'Machine Learning',
      department: 'Computer Science',
      semester: 6,
      credits: 4,
      instructor: 'Dr. Anita Singh',
      enrolled: 52,
      capacity: 55,
      rating: 4.9,
      duration: '16 weeks',
      difficulty: 'Advanced',
      description: 'Advanced supervised/unsupervised learning, neural networks, and cutting-edge deep learning.',
      progress: 0,
      assignments: 10,
      lectures: 36,
      isEnrolled: false,
      nextDeadline: null,
      tags: ['AI', 'Python', 'Statistics'],
      prerequisites: ['Mathematics', 'Statistics'],
      learningOutcomes: 6,
      trending: true,
      color: 'purple'
    },
    {
      id: 4,
      code: 'CSE401',
      title: 'Computer Networks',
      department: 'Computer Science',
      semester: 7,
      credits: 4,
      instructor: 'Prof. Vikram Patel',
      enrolled: 42,
      capacity: 50,
      rating: 4.7,
      duration: '16 weeks',
      difficulty: 'Advanced',
      description: 'Network protocols, security, distributed systems, and modern networking architectures.',
      progress: 25,
      assignments: 7,
      lectures: 30,
      isEnrolled: true,
      nextDeadline: '5 days',
      tags: ['Networking', 'Security', 'Protocols'],
      prerequisites: ['Operating Systems'],
      learningOutcomes: 5,
      trending: false,
      color: 'indigo'
    },
    {
      id: 5,
      code: 'CSE501',
      title: 'Software Engineering',
      department: 'Computer Science',
      semester: 5,
      credits: 3,
      instructor: 'Dr. Meera Gupta',
      enrolled: 35,
      capacity: 45,
      rating: 4.5,
      duration: '16 weeks',
      difficulty: 'Intermediate',
      description: 'Software development lifecycle, design patterns, testing methodologies, and project management.',
      progress: 0,
      assignments: 5,
      lectures: 24,
      isEnrolled: false,
      nextDeadline: null,
      tags: ['SDLC', 'Testing', 'Design Patterns'],
      prerequisites: ['Object Oriented Programming'],
      learningOutcomes: 4,
      trending: true,
      color: 'emerald'
    },
    {
      id: 6,
      code: 'CSE601',
      title: 'Cloud Computing',
      department: 'Computer Science',
      semester: 8,
      credits: 4,
      instructor: 'Prof. Arjun Reddy',
      enrolled: 28,
      capacity: 40,
      rating: 4.8,
      duration: '16 weeks',
      difficulty: 'Advanced',
      description: 'AWS, Azure, containerization, microservices, and scalable cloud architecture design.',
      progress: 0,
      assignments: 9,
      lectures: 32,
      isEnrolled: false,
      nextDeadline: null,
      tags: ['AWS', 'Docker', 'Microservices'],
      prerequisites: ['Distributed Systems'],
      learningOutcomes: 6,
      trending: true,
      color: 'orange'
    }
  ]

  const toggleBookmark = (courseId) => {
    const newBookmarks = new Set(bookmarkedCourses)
    if (newBookmarks.has(courseId)) {
      newBookmarks.delete(courseId)
      toast.success('Course removed from bookmarks')
    } else {
      newBookmarks.add(courseId)
      toast.success('Course bookmarked successfully!')
    }
    setBookmarkedCourses(newBookmarks)
  }

  const handleEnroll = (course) => {
    setEnrollmentModal(course)
  }

  const confirmEnrollment = () => {
    toast.success(`Successfully enrolled in ${enrollmentModal.title}!`)
    setEnrollmentModal(null)
  }

  const filteredCourses = engineeringCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSemester = selectedSemester === 'all' || course.semester.toString() === selectedSemester
    const matchesDepartment = selectedDepartment === 'all' || course.department === selectedDepartment
    
    return matchesSearch && matchesSemester && matchesDepartment
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner h-16 w-16 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading your courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen animate-fade-in relative overflow-hidden">
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
        <div className="floating-orb floating-orb-4"></div>
        <div className="floating-orb floating-orb-5"></div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Enhanced Header */}
        <div className="mb-8 animate-slide-up">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-black gradient-text mb-4 animate-text-glow">
              Engineering Courses
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover, learn, and excel in your{' '}
              <span className="text-cyan-400 font-semibold">academic journey</span>
            </p>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card-black p-6 hover-glow-cyan">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl shadow-lg shadow-cyan-500/25">
                  <BookOpen className="w-6 h-6 text-black" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Courses</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-white">6</p>
                    <TrendingUp className="w-4 h-4 text-green-400 ml-2" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card-black p-6 hover-glow-green">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg shadow-green-500/25">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Enrolled</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-white">{engineeringCourses.filter(c => c.isEnrolled).length}</p>
                    <Target className="w-4 h-4 text-cyan-400 ml-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-black p-6 hover-glow-purple">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-3 rounded-xl shadow-lg shadow-purple-500/25">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Credits Earned</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-white">11</p>
                    <Trophy className="w-4 h-4 text-yellow-400 ml-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-black p-6 hover-glow-cyan">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-3 rounded-xl shadow-lg shadow-yellow-500/25">
                  <Star className="w-6 h-6 text-black" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Avg Rating</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-white">4.6</p>
                    <Heart className="w-4 h-4 text-red-400 ml-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="card-premium mb-8 animate-slide-up hover-glow-cyan p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-80">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses, skills, instructors..."
                  className="form-input pl-12 h-14 text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <select
              className="form-select h-14 text-base"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="all">All Semesters</option>
              {[1,2,3,4,5,6,7,8].map(sem => (
                <option key={sem} value={sem.toString()}>Semester {sem}</option>
              ))}
            </select>

            <select
              className="form-select h-14 text-base"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="btn-primary flex items-center h-14"
            >
              <Filter className="w-5 h-5 mr-2" />
              Advanced
            </button>
          </div>
        </div>

        {/* Enhanced Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCourses.map((course, index) => (
            <div 
              key={course.id} 
              className="card-premium neon-border hover-glow-cyan animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
              onMouseEnter={() => setHoveredCard(course.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Course Header */}
              <div className="p-8 border-b border-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-500 px-3 py-1 rounded-lg shadow-lg shadow-cyan-500/25">
                        {course.code}
                      </span>
                      <span className="text-xs px-3 py-1 rounded-full border border-cyan-400/30 text-cyan-400 bg-cyan-500/10">
                        {course.difficulty}
                      </span>
                      {course.trending && (
                        <span className="flex items-center text-xs text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-400/30">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </span>
                      )}
                      <button
                        onClick={() => toggleBookmark(course.id)}
                        className={`ml-auto p-2 rounded-lg transition-all ${
                          bookmarkedCourses.has(course.id) 
                            ? 'text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20' 
                            : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                        }`}
                      >
                        {bookmarkedCourses.has(course.id) ? (
                          <BookmarkCheck className="w-5 h-5" />
                        ) : (
                          <Bookmark className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">{course.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center text-gray-300">
                        <Users className="w-4 h-4 mr-2 text-cyan-400" />
                        <span>{course.enrolled}/{course.capacity}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Clock className="w-4 h-4 mr-2 text-green-400" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Star className="w-4 h-4 mr-2 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Award className="w-4 h-4 mr-2 text-purple-400" />
                        <span>{course.credits} Credits</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Section for Enrolled Courses */}
              {course.isEnrolled && (
                <div className="px-8 py-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Brain className="w-5 h-5 text-cyan-400 mr-2" />
                      <span className="text-sm font-semibold text-white">Learning Progress</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-bold text-white mr-2">{course.progress}%</span>
                      {course.nextDeadline && (
                        <span className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded-full border border-red-400/30">
                          <Clock3 className="w-3 h-3 inline mr-1" />
                          Due in {course.nextDeadline}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 ease-out shadow-lg shadow-cyan-500/25"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Course Details */}
              <div className="px-8 py-6">
                <div className="flex items-center justify-between text-sm text-gray-300 mb-6">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-cyan-400" />
                    <span className="font-medium">{course.instructor}</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2 text-green-400" />
                    <span>{course.department}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-cyan-500/10 rounded-xl border border-cyan-400/30 hover:bg-cyan-500/20 transition-all">
                    <FileText className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-lg font-bold text-white">{course.assignments}</p>
                    <p className="text-xs text-gray-400">Assignments</p>
                  </div>
                  <div className="text-center p-4 bg-green-500/10 rounded-xl border border-green-400/30 hover:bg-green-500/20 transition-all">
                    <Play className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <p className="text-lg font-bold text-white">{course.lectures}</p>
                    <p className="text-xs text-gray-400">Lectures</p>
                  </div>
                  <div className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-400/30 hover:bg-purple-500/20 transition-all">
                    <Lightbulb className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-lg font-bold text-white">{course.learningOutcomes}</p>
                    <p className="text-xs text-gray-400">Outcomes</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="px-8 py-6 border-t border-gray-800">
                {course.isEnrolled ? (
                  <div className="grid grid-cols-3 gap-3">
                    <button className="btn-primary flex items-center justify-center">
                      <Play className="w-4 h-4 mr-2" />
                      Continue
                    </button>
                    <button className="btn-outline flex items-center justify-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </button>
                    <button className="btn-outline flex items-center justify-center">
                      <Download className="w-4 h-4 mr-2" />
                      Resources
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleEnroll(course)}
                      className="flex-1 btn-primary flex items-center justify-center"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Enroll Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                    <button className="btn-outline flex items-center justify-center px-4">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="card-premium w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 hover-glow-cyan">
              <Search className="w-12 h-12 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search criteria or explore different departments</p>
            <button 
              onClick={() => {
                setSearchTerm('')
                setSelectedSemester('all')
                setSelectedDepartment('all')
              }}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Modal Portal - Renders outside layout */}
      <ModalPortal isOpen={!!enrollmentModal}>
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          style={{ zIndex: 999999 }}
        >
          <div className="card-premium max-w-md w-full animate-slide-up hover-glow-cyan p-8">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <GraduationCap className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Enroll in Course</h3>
              <p className="text-gray-300">{enrollmentModal?.title}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Credits:</span>
                <span className="font-semibold text-white">{enrollmentModal?.credits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Duration:</span>
                <span className="font-semibold text-white">{enrollmentModal?.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Available Spots:</span>
                <span className="font-semibold text-white">{enrollmentModal ? enrollmentModal.capacity - enrollmentModal.enrolled : 0}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEnrollmentModal(null)}
                className="flex-1 btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={confirmEnrollment}
                className="flex-1 btn-primary"
              >
                Confirm Enrollment
              </button>
            </div>
          </div>
        </div>
      </ModalPortal>
    </div>
  )
}

export default Courses