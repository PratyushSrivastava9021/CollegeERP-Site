import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Book, Download, Eye, Upload, Search, Filter, FileText, Video, Image, Star, ThumbsUp, Share, Bookmark, TrendingUp, Users } from 'lucide-react'
import ModalPortal from '../components/ModalPortal'
import toast from 'react-hot-toast'

const Library = () => {
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  
  const [resources] = useState([
    {
      id: 1,
      title: 'Data Structures and Algorithms',
      type: 'pdf',
      course: 'Data Structures',
      author: 'Dr. Rajesh Kumar',
      size: '2.5 MB',
      downloads: 156,
      uploadedAt: '2024-01-10',
      rating: 4.5,
      reviews: 23,
      tags: ['algorithms', 'data-structures', 'programming'],
      description: 'Comprehensive guide covering all fundamental data structures and algorithms with practical examples.',
      isBookmarked: false
    },
    {
      id: 2,
      title: 'Database Design Lecture Recording',
      type: 'video',
      course: 'Database Systems',
      author: 'Prof. Meera Sharma',
      size: '45.2 MB',
      downloads: 89,
      uploadedAt: '2024-01-12',
      rating: 4.8,
      reviews: 15,
      tags: ['database', 'design', 'normalization'],
      description: 'Complete lecture recording covering database design principles and normalization techniques.',
      isBookmarked: true,
      duration: '1h 25m'
    },
    {
      id: 3,
      title: 'Machine Learning Notes',
      type: 'pdf',
      course: 'Machine Learning',
      author: 'Dr. Anita Verma',
      size: '1.8 MB',
      downloads: 203,
      uploadedAt: '2024-01-08',
      rating: 4.2,
      reviews: 31,
      tags: ['machine-learning', 'ai', 'algorithms'],
      description: 'Detailed notes covering supervised and unsupervised learning algorithms with examples.',
      isBookmarked: false
    }
  ])

  const categories = [
    { id: 'all', name: 'All Resources', count: resources.length },
    { id: 'pdf', name: 'Documents', count: resources.filter(r => r.type === 'pdf').length },
    { id: 'video', name: 'Videos', count: resources.filter(r => r.type === 'video').length },
    { id: 'image', name: 'Images', count: resources.filter(r => r.type === 'image').length }
  ]

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-400" />
      case 'video': return <Video className="h-5 w-5 text-blue-400" />
      case 'image': return <Image className="h-5 w-5 text-green-400" />
      default: return <FileText className="h-5 w-5 text-gray-400" />
    }
  }

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(r => r.type === selectedCategory)

  return (
    <div className="min-h-screen animate-fade-in relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"></div>
        <div className="absolute inset-0 grid-bg"></div>
      </div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb floating-orb-2"></div>
        <div className="floating-orb floating-orb-4"></div>
        <div className="floating-orb floating-orb-5"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10" style={{padding: 'clamp(1rem, 4vw, 2rem)'}}>
        {/* Enhanced Header */}
        <div className="animate-slide-up" style={{marginBottom: 'clamp(2rem, 6vh, 3rem)'}}>
          <div className="text-center" style={{marginBottom: 'clamp(2rem, 5vh, 3rem)'}}>
            <h1 className="text-3xl md:text-5xl font-black gradient-text mb-4 animate-text-glow">
              Digital Library
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Access course materials and{' '}
              <span className="text-purple-400 font-semibold">digital resources</span>
            </p>
          </div>
          
          {user?.role === 'faculty' && (
            <div className="text-center">
              <button className="btn-primary flex items-center justify-center mx-auto">
                <Upload className="h-4 w-4 mr-2" />
                Upload Resource
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Enhanced Categories Sidebar */}
          <div className="w-full lg:w-80">
            <div className="card-premium hover-glow-purple" style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
              <h3 className="font-bold text-white text-base md:text-lg" style={{marginBottom: 'clamp(1rem, 3vh, 1.5rem)'}}>Resource Categories</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-3">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left rounded-xl transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-400/30'
                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-white border border-transparent'
                    }`}
                    style={{padding: 'clamp(0.75rem, 2vw, 1rem)'}}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm md:text-base break-words">{category.name}</span>
                      <span className="text-xs bg-gray-800 px-2 py-1 rounded-full flex-shrink-0">{category.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="flex-1">
            <div className="card-premium hover-glow-purple" style={{marginBottom: 'clamp(2rem, 5vh, 3rem)', padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search resources, documents, videos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-input pl-12 h-14 text-base"
                    />
                  </div>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select h-14 text-base"
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Downloaded</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* Enhanced Resource Cards */}
            <div className="grid" style={{gap: 'clamp(1rem, 3vh, 1.5rem)'}}>
              {filteredResources.map((resource, index) => (
                <div 
                  key={resource.id} 
                  className="card-premium neon-border hover-glow-purple animate-slide-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div style={{padding: 'clamp(1rem, 3vw, 1.5rem)'}}>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                      <div className="flex items-start gap-3 md:gap-4 flex-1">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg shadow-purple-500/25 flex-shrink-0">
                          {getFileIcon(resource.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-bold text-white text-base md:text-lg break-words pr-2">{resource.title}</h3>
                            <button 
                              className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                                resource.isBookmarked ? 'text-yellow-400 bg-yellow-500/10' : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10'
                              }`}
                              onClick={() => toast.success(resource.isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks')}
                            >
                              <Bookmark className="h-5 w-5" fill={resource.isBookmarked ? 'currentColor' : 'none'} />
                            </button>
                          </div>
                          <p className="text-xs md:text-sm text-gray-300 mb-4 leading-relaxed break-words">{resource.description}</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 text-xs md:text-sm mb-4">
                            <div className="flex items-center text-gray-300">
                              <Book className="h-4 w-4 mr-2 text-purple-400" />
                              <span className="text-purple-400 font-medium">{resource.course}</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                              <Users className="h-4 w-4 mr-2 text-green-400" />
                              <span>{resource.downloads} downloads</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                              <Star className="h-4 w-4 mr-2 text-yellow-400" />
                              <span>{resource.rating} ({resource.reviews})</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                              <FileText className="h-4 w-4 mr-2 text-cyan-400" />
                              <span>{resource.size}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                            <span className="text-xs md:text-sm text-gray-400 break-words">by {resource.author}</span>
                            <span className="text-xs text-gray-500">{new Date(resource.uploadedAt).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {resource.tags.slice(0, 4).map(tag => (
                              <span key={tag} className="text-xs px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full border border-purple-400/30">
                                #{tag}
                              </span>
                            ))}
                            {resource.tags.length > 4 && (
                              <span className="text-xs px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full">
                                +{resource.tags.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-row sm:flex-col lg:flex-col gap-2 sm:gap-3 lg:w-auto overflow-x-auto sm:overflow-x-visible">
                        <button className="btn-outline flex items-center justify-center whitespace-nowrap px-3 py-2 text-sm">
                          <Eye className="h-4 w-4 sm:mr-2" />
                          <span className="hidden sm:inline">Preview</span>
                        </button>
                        <button className="btn-outline flex items-center justify-center whitespace-nowrap px-3 py-2 text-sm">
                          <ThumbsUp className="h-4 w-4 sm:mr-2" />
                          <span className="hidden sm:inline">Like</span>
                        </button>
                        <button className="btn-primary flex items-center justify-center whitespace-nowrap px-3 py-2 text-sm">
                          <Download className="h-4 w-4 sm:mr-2" />
                          <span className="hidden sm:inline">Download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Library